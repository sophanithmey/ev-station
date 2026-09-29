import { useRef, useState, useMemo } from 'react';
import type { ChargingStation } from '../data/charging-stations';
import { useLeafletMap } from './map/use-leaflet-map';
import MapControls from './map/map-controls';
import MapLocationHud from './map/map-location-hud';
import MapLegend from './map/map-legend';

type Props = {
  stations: ChargingStation[];
  selectedStation: ChargingStation | null;
  userLocation: { lat: number; lng: number } | null;
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
  onSelectStation,
  onDeselectStation,
  onRequestUserLocation,
  isLocating,
  distances = {},
  mobileView = 'map',
}: Props) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [isHudDismissed, setIsHudDismissed] = useState(false);
  const [isNearMeActive, setIsNearMeActive] = useState(false);

  // Initialize Leaflet map and marker lifecycle via custom hook
  const { mapRef, handleFitBounds } = useLeafletMap({
    mapContainerRef,
    stations,
    selectedStation,
    userLocation,
    distances,
    mobileView,
    onSelectStation,
    onDeselectStation,
  });

  // Compute minimum distance to any station when userLocation is active
  const nearestDistance = useMemo(() => {
    if (!userLocation || !distances) return null;
    const values = Object.values(distances);
    if (values.length === 0) return null;
    const min = Math.min(...values);
    return min < 9999 ? min : null;
  }, [userLocation, distances]);

  // Click handler: toggles between near-me zoom and full Cambodia view
  const handleLocateClick = () => {
    setIsHudDismissed(false);
    if (userLocation && mapRef.current) {
      if (isNearMeActive) {
        setIsNearMeActive(false);
        handleFitBounds();
      } else {
        setIsNearMeActive(true);
        mapRef.current.flyTo([userLocation.lat, userLocation.lng], 14, {
          duration: 1.0,
        });
      }
      return;
    }
    onRequestUserLocation();
  };

  const showLocationHud =
    Boolean(userLocation) && isNearMeActive && !isHudDismissed;

  return (
    <div className='relative w-full h-full min-h-0 flex-1 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm'>
      {/* Map DOM Container */}
      <div ref={mapContainerRef} className='w-full h-full' />

      {/* Floating Action Controls on Top-Left */}
      <MapControls
        isLocating={isLocating}
        isNearMeActive={isNearMeActive}
        hasUserLocation={Boolean(userLocation)}
        onLocateClick={handleLocateClick}
      />

      {/* Floating Live GPS Pill on Map */}
      {userLocation && showLocationHud && (
        <MapLocationHud
          stationsCount={stations.length}
          nearestDistance={nearestDistance}
          onHudClick={handleLocateClick}
          onDismiss={() => setIsHudDismissed(true)}
        />
      )}

      {/* Map Legend Indicator at Bottom-Left */}
      <MapLegend />
    </div>
  );
}
