import * as maplibregl from 'maplibre-gl';
import type { TripWaypoint } from '../../types/trip';
import { createWaypointPinElement } from './maplibre-constants';

export function syncWaypointMarkers(
  map: maplibregl.Map,
  origin: TripWaypoint | null | undefined,
  destination: TripWaypoint | null | undefined,
  originMarkerRef: React.MutableRefObject<maplibregl.Marker | null>,
  destinationMarkerRef: React.MutableRefObject<maplibregl.Marker | null>,
): void {
  // 1. Origin (Departure) Pin
  if (originMarkerRef.current) {
    originMarkerRef.current.remove();
    originMarkerRef.current = null;
  }
  if (origin) {
    const el = createWaypointPinElement('origin', origin.name);
    originMarkerRef.current = new maplibregl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat([origin.lng, origin.lat])
      .addTo(map);
  }

  // 2. Destination (Arrival) Pin
  if (destinationMarkerRef.current) {
    destinationMarkerRef.current.remove();
    destinationMarkerRef.current = null;
  }
  if (destination) {
    const el = createWaypointPinElement('destination', destination.name);
    destinationMarkerRef.current = new maplibregl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat([destination.lng, destination.lat])
      .addTo(map);
  }
}
