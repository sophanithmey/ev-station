import type { ChargingStation } from '../types/station';
import MaplibreStationMap from './map/maplibre-station-map';

type Props = {
  stations: ChargingStation[];
  selectedStation: ChargingStation | null;
  userLocation: { lat: number; lng: number } | null;
  routeGeometry?: [number, number][];
  onSelectStation: (station: ChargingStation) => void;
  onDeselectStation?: () => void;
  onRequestUserLocation: () => void;
  isLocating: boolean;
  distances?: Record<string, number>;
  mobileView?: 'map' | 'list';
};

export default function OpenMap({
  stations,
  selectedStation,
  userLocation,
  routeGeometry,
  onSelectStation,
  onRequestUserLocation,
  isLocating,
}: Props) {
  return (
    <MaplibreStationMap
      stations={stations}
      selectedStation={selectedStation}
      userLocation={userLocation}
      routeGeometry={routeGeometry}
      onSelectStation={onSelectStation}
      onRequestUserLocation={onRequestUserLocation}
      isLocating={isLocating}
    />
  );
}
