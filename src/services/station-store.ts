import { chargingStations as bundledStations } from '../data/charging-stations';
import { isSupabaseConfigured } from '../lib/supabase-client';
import { queryClient, queryKeys } from '../lib/query-client';
import type { ChargingStation } from '../types/station';

export type StationDataSource = 'bundled' | 'cache' | 'remote';

export interface StationCachePayload {
  savedAt: number;
  stations: ChargingStation[];
}

const CACHE_KEY = 'evkh_stations_cache_v1';
const CACHE_TTL_MS = 6 * 60 * 60 * 1000;

function getStorage(): Storage | null {
  try {
    if (typeof localStorage !== 'undefined') return localStorage;
  } catch {
    // storage unavailable or blocked
  }
  return null;
}

export function readStationCache(): StationCachePayload | null {
  try {
    const storage = getStorage();
    if (!storage) return null;
    const raw = storage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed: StationCachePayload = JSON.parse(raw);
    return Array.isArray(parsed.stations) && parsed.stations.length > 0
      ? parsed
      : null;
  } catch {
    return null;
  }
}

export function writeStationCache(stations: ChargingStation[]): void {
  try {
    const storage = getStorage();
    if (!storage) return;
    const payload: StationCachePayload = { savedAt: Date.now(), stations };
    storage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch {
    // storage full or unavailable — cache is best-effort
  }
}

export function isStationCacheFresh(): boolean {
  const cached = readStationCache();
  return Boolean(cached && Date.now() - cached.savedAt < CACHE_TTL_MS);
}

export function getInitialStationDataset(): {
  stations: ChargingStation[];
  source: StationDataSource;
  savedAt: number;
} {
  if (isSupabaseConfigured) {
    const cached = readStationCache();
    if (cached) {
      return {
        stations: cached.stations,
        source: 'cache',
        savedAt: cached.savedAt,
      };
    }
  }
  return {
    stations: bundledStations,
    source: 'bundled',
    savedAt: 0,
  };
}

/**
 * Triggers revalidation of station data through TanStack Query cache.
 */
export async function loadStations(_force = false): Promise<void> {
  await queryClient.invalidateQueries({ queryKey: queryKeys.stations.all });
}
