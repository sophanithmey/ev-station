import { useState, useMemo, useCallback } from 'react';
import {
  chargingStations,
  type ChargingStation,
} from '../data/charging-stations';

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
  const [search, setSearch] = useState('');
  const [connector, setConnector] = useState('all');
  const [only24Hours, setOnly24Hours] = useState(false);
  const [onlyNearMe, setOnlyNearMe] = useState(false);

  const filteredStations = useMemo(() => {
    const q = search.toLowerCase().trim();
    const result = chargingStations.filter((station: ChargingStation) => {
      const matchesSearch =
        q === '' ||
        station.name.toLowerCase().includes(q) ||
        station.province.toLowerCase().includes(q) ||
        (station.brand && station.brand.toLowerCase().includes(q));

      const matchesConnector =
        connector === 'all' ||
        station.connector === connector ||
        (connector === 'GB-T' && station.connector.includes('GB-T')) ||
        (connector === 'CCS2' && station.connector.includes('CCS2'));

      const matches24Hours = !only24Hours || station.is24Hours;

      return matchesSearch && matchesConnector && matches24Hours;
    });

    if (onlyNearMe && hasUserLocation) {
      result.sort((a, b) => {
        const distA = distances[a.id] ?? Number.MAX_SAFE_INTEGER;
        const distB = distances[b.id] ?? Number.MAX_SAFE_INTEGER;
        return distA - distB;
      });
    }

    return result;
  }, [search, connector, only24Hours, onlyNearMe, hasUserLocation, distances]);

  const hasActiveFilters =
    search !== '' || connector !== 'all' || only24Hours || onlyNearMe;

  const handleClearFilters = useCallback(() => {
    setSearch('');
    setConnector('all');
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
    only24Hours,
    onlyNearMe,
    filteredStations,
    hasActiveFilters,
    totalCount: chargingStations.length,
    setSearch,
    setConnector,
    toggle24Hours,
    handleToggleNearMe,
    handleClearFilters,
  };
}
