import { useState, useMemo, useCallback } from 'react';
import {
  chargingStations,
  type ChargingStation,
} from '../data/charging-stations';

export function useStationFilters() {
  const [search, setSearch] = useState('');
  const [connector, setConnector] = useState('all');
  const [only24Hours, setOnly24Hours] = useState(false);

  const filteredStations = useMemo(() => {
    const q = search.toLowerCase().trim();
    return chargingStations.filter((station: ChargingStation) => {
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
  }, [search, connector, only24Hours]);

  const hasActiveFilters = search !== '' || connector !== 'all' || only24Hours;

  const handleClearFilters = useCallback(() => {
    setSearch('');
    setConnector('all');
    setOnly24Hours(false);
  }, []);

  const toggle24Hours = useCallback(() => {
    setOnly24Hours((prev) => !prev);
  }, []);

  return {
    search,
    connector,
    only24Hours,
    filteredStations,
    hasActiveFilters,
    totalCount: chargingStations.length,
    setSearch,
    setConnector,
    toggle24Hours,
    handleClearFilters,
  };
}
