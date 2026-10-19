import { useRef } from 'react';
import type { ChargingStation } from '../../types/station';
import type { TripWaypoint } from '../../types/trip';
import { useMaplibreMap } from './use-maplibre-map';
import MapControls from './map-controls';
import MapLegend from './map-legend';

type Props = {
  stations: ChargingStation[];
  selectedStation: ChargingStation | null;
  userLocation: { lat: number; lng: number } | null;
  routeGeometry?: [number, number][];
  origin?: TripWaypoint | null;
  destination?: TripWaypoint | null;
  onSelectStation: (station: ChargingStation) => void;
  onRequestUserLocation: () => void;
  isLocating: boolean;
};

export default function MaplibreStationMap({
  stations,
  selectedStation,
  userLocation,
  routeGeometry,
  origin,
  destination,
  onSelectStation,
  onRequestUserLocation,
  isLocating,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { mapRef, fitBoundsToStations } = useMaplibreMap({
    containerRef,
    stations,
    selectedStation,
    userLocation,
    routeGeometry,
    origin,
    destination,
    onSelectStation,
  });

  const handleLocateClick = () => {
    if (userLocation && mapRef.current) {
      mapRef.current.flyTo({
        center: [userLocation.lng, userLocation.lat],
        zoom: 14,
        essential: true,
      });
      return;
    }
    onRequestUserLocation();
  };

  return (
    <div className='relative w-full h-full min-h-0 flex-1 bg-slate-100 rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs'>
      {/* Map DOM Element */}
      <div ref={containerRef} className='w-full h-full' />

      {/* Map Controls */}
      <MapControls
        isLocating={isLocating}
        isNearMeActive={Boolean(userLocation)}
        hasUserLocation={Boolean(userLocation)}
        onLocateClick={handleLocateClick}
      />

      {/* Recenter button */}
      <div className='absolute top-3.5 right-14 z-10'>
        <button
          type='button'
          onClick={fitBoundsToStations}
          className='px-3 py-1.5 rounded-xl bg-white/95 hover:bg-white text-slate-800 border border-slate-200 text-xs font-semibold shadow-xs backdrop-blur-md transition-all cursor-pointer'
          title='Reset Map View'
        >
          Reset View
        </button>
      </div>

      {/* Legend */}
      <MapLegend hasWaypoints={Boolean(origin || destination)} />
    </div>
  );
}
