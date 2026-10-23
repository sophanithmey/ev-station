import { createHash } from 'node:crypto';
import { resolveProvince } from '../../src/data/province-resolver.ts';
import {
  detectBrand,
  isInsideCambodia,
  normalizeLatLng,
  resolveSpeedCategory,
  splitPhones,
} from '../../src/lib/station-normalizers.ts';
import type { GeoJsonFeature, SpeedCategory } from '../../src/types/station.ts';

export type DbConnector = 'GB-T' | 'CCS2' | 'Type 2' | 'CCS/SAE' | 'Unknown';

export interface SeedStation {
  slug: string;
  name: string;
  nameEn?: string;
  nameKm?: string;
  brand: string;
  provinceEn: string;
  provinceKm?: string;
  address?: string;
  phones: string[];
  connectors: DbConnector[];
  speedCategory: SpeedCategory;
  chargersCount?: number;
  operationTime: string;
  lat: number;
  lng: number;
  source?: string;
  qrNumber?: number;
  dmsLocation?: string;
  reviewReasons: string[];
}

const KNOWN_CONNECTORS: ReadonlySet<string> = new Set(['GB-T', 'CCS2', 'Type 2']);
const MISMATCH_THRESHOLD_KM = 0.1;

export function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const toRad = (deg: number): number => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function parseConnectors(raw: string | undefined): DbConnector[] {
  const value = (raw ?? '').trim();
  if (value === 'CCS/SAE') return ['CCS/SAE'];
  const parts = value.split('/').map((part) => part.trim());
  const mapped = parts.map((part): DbConnector =>
    KNOWN_CONNECTORS.has(part) ? (part as DbConnector) : 'Unknown',
  );
  const unique = [...new Set(mapped)];
  const known = unique.filter((c) => c !== 'Unknown');
  return known.length > 0 ? known : ['Unknown'];
}

function resolveCoordinates(feature: GeoJsonFeature, reasons: string[]): [number, number] {
  const p = feature.properties;
  const [geoLng = 0, geoLat = 0] = feature.geometry.coordinates;
  const [propLat, propLng] = normalizeLatLng(p.Latitude, p.Longitude);
  const [gLat, gLng] = normalizeLatLng(geoLat, geoLng);

  if (propLat !== p.Latitude) reasons.push('lat/lng swapped in source properties');

  const propValid = isInsideCambodia(propLat, propLng);
  const geoValid = isInsideCambodia(gLat, gLng);
  if (propValid && geoValid) {
    const gap = haversineKm(propLat, propLng, gLat, gLng);
    if (gap > MISMATCH_THRESHOLD_KM) {
      reasons.push(`geometry differs from properties by ${gap.toFixed(2)} km (used properties)`);
    }
  }
  if (propValid) return [propLat, propLng];
  if (geoValid) return [gLat, gLng];
  reasons.push('coordinates outside Cambodia');
  return [propLat, propLng];
}

function slugify(text: string): string {
  return text
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

function buildSlug(name: string, lat: number, lng: number): string {
  const hash = createHash('sha1').update(`${lat.toFixed(5)},${lng.toFixed(5)}`).digest('hex');
  return `${slugify(name) || 'station'}-${hash.slice(0, 6)}`;
}

const clean = (value: string | undefined): string | undefined => value?.trim() || undefined;

export function normalizeFeature(feature: GeoJsonFeature, index: number): SeedStation {
  const p = feature.properties;
  const reviewReasons: string[] = [];
  const [lat, lng] = resolveCoordinates(feature, reviewReasons);
  const name = clean(p['Location Name']) ?? `EV Station ${index + 1}`;
  const rawPlug = p['Plug Types'] ?? 'Unknown';

  return {
    slug: buildSlug(clean(p['Location Name (English)']) ?? name, lat, lng),
    name,
    nameEn: clean(p['Location Name (English)']),
    nameKm: clean(p['Location Name (Khmer)']),
    brand: detectBrand(name),
    provinceEn: clean(p.Province) ?? resolveProvince(feature),
    provinceKm: clean(p['Province (Khmer)']),
    address: clean(p.Address),
    phones: splitPhones(p.Phone),
    connectors: parseConnectors(rawPlug),
    speedCategory: resolveSpeedCategory(rawPlug),
    chargersCount: p['Chargers Count'],
    operationTime: clean(p['Operation Time']) ?? '24/7',
    lat,
    lng,
    source: clean(p.Source),
    qrNumber: p['QR Number'],
    dmsLocation: clean(p.Location),
    reviewReasons,
  };
}
