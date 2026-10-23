import { supabase } from '../lib/supabase-client';
import { DEFAULT_PRICING_NOTES, detectBrand } from '../lib/station-normalizers';
import type { ChargingStation, ConnectorType } from '../types/station';
import type {
  NearbyStationRow,
  RouteStationRow,
  StationViewRow,
} from '../types/database';

const STATION_COLUMNS = [
  'id', 'slug', 'name', 'name_en', 'name_km', 'brand', 'province', 'province_km',
  'address', 'phone', 'connector', 'speed_category', 'chargers_count',
  'operation_time', 'is_24_hours', 'latitude', 'longitude', 'source',
  'qr_number', 'dms_location', 'pricing_notes', 'verified_at',
].join(',');

function requireClient() {
  if (!supabase) throw new Error('Supabase is not configured');
  return supabase;
}

function formatVerifiedDate(isoDate: string | null): string {
  if (!isoDate) return 'Feb 2025 (MEF Dataset)';
  return new Date(isoDate).toLocaleDateString('en-GB', {
    month: 'short',
    year: 'numeric',
  });
}

/** Maps a `stations_view` row onto the app's existing domain model. */
export function mapStationRow(row: StationViewRow): ChargingStation {
  return {
    id: row.slug,
    name: row.name,
    nameKhmer: row.name_km ?? undefined,
    nameEn: row.name_en ?? undefined,
    province: row.province ?? 'Unknown',
    provinceKhmer: row.province_km ?? undefined,
    connector: (row.connector || 'Unknown') as ConnectorType,
    speedCategory: row.speed_category,
    operationTime: row.operation_time,
    is24Hours: row.is_24_hours,
    latitude: row.latitude,
    longitude: row.longitude,
    address: row.address ?? undefined,
    chargersCount: row.chargers_count ?? undefined,
    phone: row.phone || undefined,
    source: row.source ?? '',
    qrNumber: row.qr_number ?? undefined,
    dmsLocation: row.dms_location ?? undefined,
    brand: row.brand ?? detectBrand(row.name),
    verifiedDate: formatVerifiedDate(row.verified_at),
    pricingNotes: row.pricing_notes ?? DEFAULT_PRICING_NOTES,
  };
}

export async function fetchStations(): Promise<ChargingStation[]> {
  const { data, error } = await requireClient()
    .from('stations_view')
    .select(STATION_COLUMNS)
    .order('name');

  if (error) throw new Error(error.message);
  const rows = (data as unknown as StationViewRow[]) || [];
  return rows.map(mapStationRow);
}

export async function fetchNearbyStations(
  lat: number,
  lng: number,
  radiusKm = 20,
  maxResults = 50,
): Promise<NearbyStationRow[]> {
  const { data, error } = await requireClient()
    .rpc('nearby_stations', { lat, lng, radius_km: radiusKm, max_results: maxResults });

  if (error) throw new Error(error.message);
  return (data as unknown as NearbyStationRow[]) || [];
}

export async function fetchStationsAlongRoute(
  coordinates: Array<[number, number]>,
  bufferKm = 5,
): Promise<RouteStationRow[]> {
  const route = { type: 'LineString', coordinates };
  const { data, error } = await requireClient()
    .rpc('stations_along_route', { route, buffer_km: bufferKm });

  if (error) throw new Error(error.message);
  return (data as unknown as RouteStationRow[]) || [];
}

export {
  insertSubmission,
  submitNewStation,
  type SubmitStationParams,
} from './submission-api';
