import rawGeoJson from './data.json';
import { resolveProvince } from './province-resolver';
import {
  DEFAULT_PRICING_NOTES,
  detectBrand,
  isOpen24Hours,
  normalizeLatLng,
  resolveSpeedCategory,
} from '../lib/station-normalizers';
import type {
  ChargingStation,
  ConnectorType,
  GeoJsonFeature,
  SpeedCategory,
} from '../types/station';

export type { ChargingStation, ConnectorType, GeoJsonFeature, SpeedCategory };

const features = (rawGeoJson as { features: GeoJsonFeature[] }).features || [];

/**
 * Bundled offline dataset. Used as the initial snapshot and as a fallback
 * when the Supabase API is not configured or unreachable.
 */
export const chargingStations: ChargingStation[] = features.map((f, index) => {
  const p = f.properties;
  const opTime = p['Operation Time'] ? p['Operation Time'].trim() : '24/7';
  const [latitude, longitude] = normalizeLatLng(p.Latitude, p.Longitude);
  const connector = (p['Plug Types'] as ConnectorType) || 'Unknown';

  return {
    id: `kh-ev-${index + 1}`,
    name: (p['Location Name'] || `EV Station ${index + 1}`).trim(),
    nameKhmer: p['Location Name (Khmer)']?.trim() || undefined,
    nameEn: p['Location Name (English)']?.trim() || undefined,
    province: p.Province || resolveProvince(f),
    provinceKhmer: p['Province (Khmer)']?.trim() || undefined,
    connector,
    speedCategory: resolveSpeedCategory(connector),
    operationTime: opTime,
    is24Hours: isOpen24Hours(opTime),
    latitude,
    longitude,
    address: p.Address?.trim() || undefined,
    chargersCount: p['Chargers Count'] ?? undefined,
    phone: p.Phone?.trim() || undefined,
    source: p.Source ?? '',
    qrNumber: p['QR Number'] ?? undefined,
    dmsLocation: p.Location,
    brand: detectBrand(p['Location Name'] || ''),
    verifiedDate: 'Feb 2025 (MEF Dataset)',
    pricingNotes: DEFAULT_PRICING_NOTES,
  };
});

export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}
