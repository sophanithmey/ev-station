import { useCallback, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { chargingStations as bundledStations } from '../data/charging-stations';
import { isSupabaseConfigured } from '../lib/supabase-client';
import { fetchStations } from '../services/station-api';
import { queryKeys } from '../lib/query-client';
import {
  getInitialStationDataset,
  writeStationCache,
  type StationDataSource,
} from '../services/station-store';
import type { ChargingStation } from '../types/station';
import type { NewStationSubmission } from '../types/community';
import { mapApprovedSubmissionToStation } from '../lib/station-normalizers';

export type { StationDataSource };

export interface UseStationsResult {
  stations: ChargingStation[];
  source: StationDataSource;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useStations(): UseStationsResult {
  const queryClient = useQueryClient();
  const initial = getInitialStationDataset();

  const { data: rawStations, isLoading, error } = useQuery<ChargingStation[]>({
    queryKey: queryKeys.stations.all,
    queryFn: async () => {
      if (!isSupabaseConfigured) return bundledStations;
      const remote = await fetchStations();
      if (remote.length === 0) throw new Error('API returned no stations');
      writeStationCache(remote);
      return remote;
    },
    initialData: initial.stations,
    initialDataUpdatedAt: initial.savedAt,
    staleTime: 10 * 60 * 1000,
  });

  const { data: submissions = [] } = useQuery<NewStationSubmission[]>({
    queryKey: queryKeys.community.submissions(),
    staleTime: 60 * 1000,
  });

  const stations = useMemo(() => {
    const list = rawStations ?? initial.stations;

    const excludedSlugs = new Set<string>();
    const excludedNames = new Set<string>();
    const approvedIds = new Set<string>();
    const approvedNames = new Set<string>();
    const approvedSubmissions: NewStationSubmission[] = [];

    for (const sub of submissions) {
      if (sub.status === 'rejected' || sub.status === 'pending') {
        if (sub.stationSlug) excludedSlugs.add(sub.stationSlug.toLowerCase());
        excludedSlugs.add(sub.id.toLowerCase());
        if (sub.name) excludedNames.add(sub.name.toLowerCase().trim());
      } else if (sub.status === 'approved') {
        approvedSubmissions.push(sub);
        if (sub.stationSlug) approvedIds.add(sub.stationSlug.toLowerCase());
        approvedIds.add(sub.id.toLowerCase());
        if (sub.name) approvedNames.add(sub.name.toLowerCase().trim());
      }
    }

    const activeList = list.filter((station) => {
      const idKey = station.id.toLowerCase();
      const nameKey = station.name.toLowerCase().trim();
      const isApproved = approvedIds.has(idKey) || approvedNames.has(nameKey);

      if (!isApproved) {
        if (station.status === 'rejected' || station.status === 'pending') {
          return false;
        }
        if (excludedSlugs.has(idKey)) return false;
        if (excludedNames.has(nameKey)) return false;
      }
      return true;
    });

    const existingIds = new Set(activeList.map((s) => s.id.toLowerCase()));
    const existingNames = new Set(
      activeList.map((s) => s.name.toLowerCase().trim()),
    );

    const merged = [...activeList];
    for (const sub of approvedSubmissions) {
      const subId = (sub.stationSlug || sub.id).toLowerCase();
      const rawId = sub.id.toLowerCase();
      const slugId = sub.stationSlug?.toLowerCase();
      const subName = sub.name.toLowerCase().trim();

      const idExists =
        existingIds.has(subId) ||
        existingIds.has(rawId) ||
        (slugId ? existingIds.has(slugId) : false);
      const nameExists = existingNames.has(subName);

      if (!idExists && !nameExists) {
        merged.push(mapApprovedSubmissionToStation(sub));
        existingIds.add(subId);
        existingNames.add(subName);
      }
    }

    return merged;
  }, [rawStations, initial.stations, submissions]);

  const refetch = useCallback(async () => {
    await queryClient.refetchQueries({ queryKey: queryKeys.stations.all });
  }, [queryClient]);

  let source: StationDataSource = 'bundled';
  if (isSupabaseConfigured) {
    source =
      rawStations && rawStations !== bundledStations
        ? 'remote'
        : initial.source;
  }

  return {
    stations,
    source,
    isLoading,
    error: error instanceof Error ? error.message : null,
    refetch,
  };
}
