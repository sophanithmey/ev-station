/**
 * Row shapes returned by the Supabase API.
 * Keep in sync with `supabase/migrations/*.sql`
 * (or replace with `supabase gen types typescript` output).
 */

export type DbSpeedCategory = 'dc_fast' | 'ac_standard' | 'unknown';

export interface StationViewRow {
  id: string;
  slug: string;
  name: string;
  name_en: string | null;
  name_km: string | null;
  brand: string | null;
  province: string | null;
  province_km: string | null;
  address: string | null;
  phone: string | null;
  connector: string;
  speed_category: DbSpeedCategory;
  chargers_count: number | null;
  operation_time: string;
  is_24_hours: boolean;
  latitude: number;
  longitude: number;
  source: string | null;
  qr_number: number | null;
  dms_location: string | null;
  pricing_notes: string | null;
  verified_at: string | null;
}

export interface NearbyStationRow {
  slug: string;
  name: string;
  province: string | null;
  connector: string;
  distance_km: number;
}

export interface RouteStationRow {
  slug: string;
  name: string;
  connector: string;
  distance_from_route_km: number;
}

export type SubmissionKind = 'report' | 'new_station';

export interface StationSubmissionInsert {
  kind: SubmissionKind;
  station_slug: string | null;
  payload: Record<string, unknown>;
}
