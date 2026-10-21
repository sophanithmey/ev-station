import { useEffect, useRef, useCallback } from 'react';
import * as maplibregl from 'maplibre-gl';
import type { ChargingStation } from '../../types/station';
import type { TripWaypoint } from '../../types/trip';
import {
  CAMBODIA_CENTER_LNG_LAT,
  CAMBODIA_DEFAULT_ZOOM,
  MAPLIBRE_OSM_STYLE,
  createMapLibrePinElement,
} from './maplibre-constants';
import { syncWaypointMarkers } from './maplibre-waypoint-markers';
import { syncMaplibreRouteLayer } from './maplibre-route-layer';

type Props = {
  containerRef: React.RefObject<HTMLDivElement | null>;
  stations: ChargingStation[];
  selectedStation: ChargingStation | null;
  userLocation: { lat: number; lng: number } | null;
  routeGeometry?: [number, number][]; // [lng, lat]
  origin?: TripWaypoint | null;
  destination?: TripWaypoint | null;
  onSelectStation: (station: ChargingStation) => void;
  onUserMove?: () => void;
};

export function useMaplibreMap({
  containerRef,
  stations,
  selectedStation,
  userLocation,
  routeGeometry,
  origin,
  destination,
  onSelectStation,
  onUserMove,
}: Props) {
  const mapRef = useRef<maplibregl.Map | null>(null);
  const onUserMoveRef = useRef(onUserMove);
  useEffect(() => {
    onUserMoveRef.current = onUserMove;
  }, [onUserMove]);
  const markersRef = useRef<Map<string, maplibregl.Marker>>(new Map());
  const userMarkerRef = useRef<maplibregl.Marker | null>(null);
  const originMarkerRef = useRef<maplibregl.Marker | null>(null);
  const destinationMarkerRef = useRef<maplibregl.Marker | null>(null);

  // 1. Initialize Map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = new maplibregl.Map({
      container: containerRef.current,
      style: MAPLIBRE_OSM_STYLE,
      center: CAMBODIA_CENTER_LNG_LAT,
      zoom: CAMBODIA_DEFAULT_ZOOM,
      minZoom: 5,
      maxZoom: 19,
      attributionControl: false,
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
    map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-right');
    map.on('dragstart', () => onUserMoveRef.current?.());
    mapRef.current = map;

    map.on('load', () => map.resize());
    requestAnimationFrame(() => map.resize());
    const resizeTimer = setTimeout(() => map.resize(), 150);

    const observer = new ResizeObserver(() => map.resize());
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      clearTimeout(resizeTimer);
      observer.disconnect();
      map.remove();
      mapRef.current = null;
    };
  }, [containerRef]);

  // 2. Station Markers
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current.clear();

    stations.forEach((station) => {
      const isSelected = selectedStation?.id === station.id;
      const el = createMapLibrePinElement(station.connector, isSelected);
      el.addEventListener('click', () => onSelectStation(station));

      const marker = new maplibregl.Marker({ element: el, anchor: 'bottom' })
        .setLngLat([station.longitude, station.latitude])
        .addTo(map);

      markersRef.current.set(station.id, marker);
    });
  }, [stations, selectedStation, onSelectStation]);

  // 3. Selection pan & zoom
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedStation) return;
    map.flyTo({
      center: [selectedStation.longitude, selectedStation.latitude],
      zoom: 14,
      essential: true,
      duration: 800,
    });
  }, [selectedStation]);

  // 4. User Location Marker
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (userLocation) {
      if (!userMarkerRef.current) {
        const el = document.createElement('div');
        el.className = 'w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-lg animate-pulse';
        userMarkerRef.current = new maplibregl.Marker({ element: el })
          .setLngLat([userLocation.lng, userLocation.lat])
          .addTo(map);
      } else {
        userMarkerRef.current.setLngLat([userLocation.lng, userLocation.lat]);
      }
    } else if (userMarkerRef.current) {
      userMarkerRef.current.remove();
      userMarkerRef.current = null;
    }
  }, [userLocation]);

  // 5. Waypoint Markers (Departure & Destination)
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    syncWaypointMarkers(map, origin, destination, originMarkerRef, destinationMarkerRef);
  }, [origin, destination]);

  // 6. Route line layer
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const handleRouteSync = () => {
      syncMaplibreRouteLayer(map, routeGeometry);
      if ((!routeGeometry || routeGeometry.length === 0) && origin && destination) {
        const bounds = new maplibregl.LngLatBounds();
        bounds.extend([origin.lng, origin.lat]);
        bounds.extend([destination.lng, destination.lat]);
        map.fitBounds(bounds, { padding: 60, duration: 800 });
      }
    };

    if (map.isStyleLoaded()) {
      handleRouteSync();
    } else {
      map.once('load', handleRouteSync);
    }
  }, [routeGeometry, origin, destination]);

  const flyToUserLocation = useCallback(() => {
    const map = mapRef.current;
    if (!map || !userLocation) return;
    map.flyTo({
      center: [userLocation.lng, userLocation.lat],
      zoom: 14,
      essential: true,
      duration: 800,
    });
  }, [userLocation]);

  const fitBoundsToStations = useCallback(() => {
    const map = mapRef.current;
    if (!map || stations.length === 0) return;
    const bounds = new maplibregl.LngLatBounds();
    stations.forEach((s) => bounds.extend([s.longitude, s.latitude]));
    map.fitBounds(bounds, { padding: 40, maxZoom: 13, duration: 800 });
  }, [stations]);

  return { mapRef, fitBoundsToStations, flyToUserLocation };
}
