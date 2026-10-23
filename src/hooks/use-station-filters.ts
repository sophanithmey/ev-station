import { useState, useMemo, useCallback } from 'react';
import type { ChargingStation } from '../types/station';
import { useStations } from './use-stations';

type StationFiltersOptions = {
  distances?: Record<string, number>;
  hasUserLocation?: boolean;
  onRequestLocation?: () => void;
};

export function useStationFilters({
  distances = {},
  hasUserLocation = false,
  onRequestLocation,
}: StationFiltersOptions = {}) {
  const { stations } = useStations();
  const [search, setSearch] = useState('');
  const [connector, setConnector] = useState('all');
  const [speed, setSpeed] = useState('all');
  const [only24Hours, setOnly24Hours] = useState(false);
  const [onlyNearMe, setOnlyNearMe] = useState(false);

  const filteredStations = useMemo(() => {
    const q = search.toLowerCase().trim();
    const result = stations.filter((station: ChargingStation) => {
      if (station.status === 'rejected' || station.status === 'pending') {
        return false;
      }

      const matchesSearch =
        q === '' ||
        station.name.toLowerCase().includes(q) ||
        (station.nameKhmer && station.nameKhmer.toLowerCase().includes(q)) ||
        (station.nameEn && station.nameEn.toLowerCase().includes(q)) ||
        station.province.toLowerCase().includes(q) ||
        (station.provinceKhmer &&
          station.provinceKhmer.toLowerCase().includes(q)) ||
        (station.address && station.address.toLowerCase().includes(q)) ||
        (station.brand && station.brand.toLowerCase().includes(q));

      const matchesConnector =
        connector === 'all' ||
        station.connector === connector ||
        (connector === 'GB-T' &&
          (station.connector.includes('GB-T') ||
            station.connector.includes('GB/T'))) ||
        (connector === 'CCS2' && station.connector.includes('CCS2')) ||
        (connector === 'Type 2' && station.connector.includes('Type 2')) ||
        (connector === 'GB-T/CCS2' &&
          station.connector.includes('GB') &&
          station.connector.includes('CCS'));

      const matchesSpeed = speed === 'all' || station.speedCategory === speed;

      const matches24Hours = !only24Hours || station.is24Hours;

      return (
        matchesSearch && matchesConnector && matchesSpeed && matches24Hours
      );
    });

    if (onlyNearMe && hasUserLocation) {
      result.sort((a, b) => {
        const distA = distances[a.id] ?? Number.MAX_SAFE_INTEGER;
        const distB = distances[b.id] ?? Number.MAX_SAFE_INTEGER;
        return distA - distB;
      });
    }

    return result;
  }, [
    stations,
    search,
    connector,
    speed,
    only24Hours,
    onlyNearMe,
    hasUserLocation,
    distances,
  ]);

  const hasActiveFilters =
    search !== '' ||
    connector !== 'all' ||
    speed !== 'all' ||
    only24Hours ||
    onlyNearMe;

  const handleClearFilters = useCallback(() => {
    setSearch('');
    setConnector('all');
    setSpeed('all');
    setOnly24Hours(false);
    setOnlyNearMe(false);
  }, []);

  const toggle24Hours = useCallback(() => {
    setOnly24Hours((prev) => !prev);
  }, []);

  const handleToggleNearMe = useCallback(() => {
    if (!hasUserLocation && !onlyNearMe) {
      onRequestLocation?.();
    }
    setOnlyNearMe((prev) => !prev);
  }, [hasUserLocation, onlyNearMe, onRequestLocation]);

  return {
    search,
    connector,
    speed,
    only24Hours,
    onlyNearMe,
    filteredStations,
    hasActiveFilters,
    allStations: stations,
    totalCount: stations.length,
    setSearch,
    setConnector,
    setSpeed,
    toggle24Hours,
    handleToggleNearMe,
    handleClearFilters,
  };
}
