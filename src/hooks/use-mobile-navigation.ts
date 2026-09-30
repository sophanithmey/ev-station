import { useState, useCallback } from 'react';
import type { ChargingStation } from '../data/charging-stations';

export type MobileView = 'map' | 'list';

export function useMobileNavigation() {
  const [mobileView, setMobileView] = useState<MobileView>('map');
  const [selectedStation, setSelectedStation] = useState<ChargingStation | null>(null);

  const handleSelectStation = useCallback((station: ChargingStation) => {
    setSelectedStation(station);
    // On mobile, selecting a station from list should switch smoothly to the map view
    setMobileView('map');
  }, []);

  const handleDeselectStation = useCallback(() => {
    setSelectedStation(null);
  }, []);

  const handleSelectView = useCallback((view: MobileView) => {
    setMobileView(view);
  }, []);

  const handleToggleMobileView = useCallback(() => {
    setMobileView((prev) => (prev === 'map' ? 'list' : 'map'));
  }, []);

  const handleViewStationInList = useCallback(() => {
    setMobileView('list');
  }, []);

  return {
    mobileView,
    selectedStation,
    handleSelectStation,
    handleDeselectStation,
    handleSelectView,
    handleToggleMobileView,
    handleViewStationInList,
  };
}
