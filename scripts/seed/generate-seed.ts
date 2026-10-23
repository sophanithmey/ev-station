import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  haversineKm,
  normalizeFeature,
  type SeedStation,
} from './normalize-feature.ts';
import type { GeoJsonFeature } from '../../src/types/station.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../..');

function sqlQuote(val: string | null | undefined): string {
  if (val === null || val === undefined) return 'NULL';
  return `'${val.replace(/'/g, "''")}'`;
}

function sqlArray(arr: string[]): string {
  if (arr.length === 0) return "'{}'";
  const escaped = arr
    .map((item) => {
      const sanitized = item
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/'/g, "''");
      return `"${sanitized}"`;
    })
    .join(',');
  return `'{${escaped}}'`;
}

function findNearDuplicates(stations: SeedStation[]) {
  const duplicates: Array<{ a: SeedStation; b: SeedStation; distMeters: number }> = [];
  for (let i = 0; i < stations.length; i++) {
    for (let j = i + 1; j < stations.length; j++) {
      const a = stations[i];
      const b = stations[j];
      const dist = haversineKm(a.lat, a.lng, b.lat, b.lng) * 1000;
      if (dist < 100) {
        duplicates.push({ a, b, distMeters: Math.round(dist) });
      }
    }
  }
  return duplicates;
}

function buildSeedSql(
  provinces: Map<string, string | undefined>,
  stations: SeedStation[],
): string {
  const provInserts = Array.from(provinces.entries())
    .map(
      ([en, km]) =>
        `INSERT INTO public.provinces (name_en, name_km) VALUES (${sqlQuote(en)}, ${sqlQuote(km)}) ON CONFLICT (name_en) DO UPDATE SET name_km = EXCLUDED.name_km;`,
    )
    .join('\n');

  const stationInserts = stations
    .map((s) => {
      const provSubquery = `(SELECT id FROM public.provinces WHERE name_en = ${sqlQuote(s.provinceEn)})`;
      const locExpr = `st_setsrid(st_makepoint(${s.lng}, ${s.lat}), 4326)::geography`;
      const needsReview = s.reviewReasons.length > 0;
      const countVal = s.chargersCount !== undefined ? s.chargersCount : 'NULL';
      const qrVal = s.qrNumber !== undefined ? s.qrNumber : 'NULL';

      return `INSERT INTO public.stations (
  slug, name, name_en, name_km, brand, province_id, address, phones,
  connectors, speed_category, chargers_count, operation_time,
  location, source, qr_number, dms_location, needs_review, verified_at
) VALUES (
  ${sqlQuote(s.slug)}, ${sqlQuote(s.name)}, ${sqlQuote(s.nameEn)}, ${sqlQuote(s.nameKm)},
  ${sqlQuote(s.brand)}, ${provSubquery}, ${sqlQuote(s.address)},
  ${sqlArray(s.phones)}::text[], ${sqlArray(s.connectors)}::public.connector_type[],
  '${s.speedCategory}', ${countVal}, ${sqlQuote(s.operationTime)},
  ${locExpr}, ${sqlQuote(s.source)}, ${qrVal}, ${sqlQuote(s.dmsLocation)},
  ${needsReview}, '2025-02-01'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  brand = EXCLUDED.brand,
  address = EXCLUDED.address,
  phones = EXCLUDED.phones,
  connectors = EXCLUDED.connectors,
  speed_category = EXCLUDED.speed_category,
  chargers_count = EXCLUDED.chargers_count,
  operation_time = EXCLUDED.operation_time,
  location = EXCLUDED.location,
  updated_at = now();`;
    })
    .join('\n\n');

  return `-- Auto-generated seed file from src/data/data.json
-- Run via Supabase CLI: supabase db reset, or paste into Supabase SQL Editor

SET search_path = public, extensions;

BEGIN;

-- 1. Provinces
${provInserts}

-- 2. Stations
${stationInserts}

COMMIT;
`;
}

function buildReport(stations: SeedStation[], duplicates: ReturnType<typeof findNearDuplicates>): string {
  const flagged = stations.filter((s) => s.reviewReasons.length > 0);
  return `# EV Stations Data Quality Report

- Total Stations Processed: **${stations.length}**
- Stations Flagged for Review: **${flagged.length}**
- Near-duplicate coordinate pairs (<100m): **${duplicates.length}**

## Flagged Stations (${flagged.length})
${flagged
  .map(
    (s) => `- **${s.name}** (${s.provinceEn})
  - Slug: \`${s.slug}\`
  - Coords: (${s.lat}, ${s.lng})
  - Reasons: ${s.reviewReasons.join('; ')}`,
  )
  .join('\n')}

## Close Proximity / Potential Duplicates (${duplicates.length})
${duplicates
  .map(
    (d) => `- **${d.a.name}** <--> **${d.b.name}** (~${d.distMeters}m apart in ${d.a.provinceEn})
  - Station 1: \`${d.a.slug}\`
  - Station 2: \`${d.b.slug}\``,
  )
  .join('\n')}
`;
}

async function main() {
  const rawData = JSON.parse(
    readFileSync(resolve(ROOT, 'src/data/data.json'), 'utf-8'),
  ) as { features: GeoJsonFeature[] };

  const provinces = new Map<string, string | undefined>();
  const stations: SeedStation[] = [];

  rawData.features.forEach((f, i) => {
    const s = normalizeFeature(f, i);
    stations.push(s);
    if (!provinces.has(s.provinceEn) || (!provinces.get(s.provinceEn) && s.provinceKm)) {
      provinces.set(s.provinceEn, s.provinceKm);
    }
  });

  const duplicates = findNearDuplicates(stations);
  const sql = buildSeedSql(provinces, stations);
  const report = buildReport(stations, duplicates);

  const seedPath = resolve(ROOT, 'supabase/seed.sql');
  const reportPath = resolve(ROOT, 'supabase/data-quality-report.md');

  writeFileSync(seedPath, sql, 'utf-8');
  writeFileSync(reportPath, report, 'utf-8');

  console.log(`Generated: ${seedPath} (${stations.length} stations, ${provinces.size} provinces)`);
  console.log(`Report: ${reportPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
