import { useEffect, useRef, useCallback } from 'react';
import L from 'leaflet';
import type { ChargingStation } from '../../data/charging-stations';
import {
  CAMBODIA_CENTER,
  CAMBODIA_ZOOM,
  CAMBODIA_BOUNDS,
} from './map-constants';
import { createStationMarker, updateUserLocationMarker } from './map-markers';

type UseLeafletMapProps = {
  mapContainerRef: React.RefObject<HTMLDivElement | null>;
  stations: ChargingStation[];
  selectedStation: ChargingStation | null;
  userLocation: { lat: number; lng: number } | null;
  distances: Record<string, number>;
  mobileView?: 'map' | 'list';
  onSelectStation: (station: ChargingStation) => void;
  onDeselectStation?: () => void;
};

export function useLeafletMap({
  mapContainerRef,
  stations,
  selectedStation,
  userLocation,
  distances,
  mobileView = 'map',
  onSelectStation,
  onDeselectStation,
}: UseLeafletMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const userMarkerRef = useRef<L.LayerGroup | null>(null);
  const markerMapRef = useRef<Map<string, L.Marker>>(new Map());
  const prevSelectedStationRef = useRef<ChargingStation | null>(null);

  const handleFitBounds = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;
    try {
      const container = map.getContainer();
      if (
        !container ||
        container.offsetWidth === 0 ||
        container.offsetHeight === 0
      )
        return;
      map.closePopup();
      if (stations.length > 0) {
        const bounds = L.latLngBounds(
          stations.map((s) => [s.latitude, s.longitude] as [number, number]),
        );
        map.fitBounds(bounds, {
          padding: [50, 50],
          maxZoom: 13,
          animate: true,
          duration: 1.0,
        });
      } else {
        map.setView(CAMBODIA_CENTER, CAMBODIA_ZOOM, { animate: true });
      }
    } catch {
      // Guard against zero-dimension Leaflet calls
    }
  }, [stations]);

  // 1. Initialize Leaflet Map once
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;
    const map = L.map(mapContainerRef.current, {
      center: CAMBODIA_CENTER,
      zoom: CAMBODIA_ZOOM,
      zoomControl: false,
      minZoom: 7,
      maxZoom: 18,
      maxBounds: CAMBODIA_BOUNDS,
      maxBoundsViscosity: 1.0,
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> | Data: <a href="https://data.mef.gov.kh/datasets/pd_67b6d073cb47dc00012464a6" target="_blank" rel="noopener noreferrer">MEF Open Data</a>',
      maxZoom: 19,
    }).addTo(map);

    L.control.zoom({ position: 'topright' }).addTo(map);
    mapRef.current = map;
    markersLayerRef.current = L.layerGroup().addTo(map);
    userMarkerRef.current = L.layerGroup().addTo(map);

    const resizeObserver = new ResizeObserver(() => map.invalidateSize());
    if (mapContainerRef.current)
      resizeObserver.observe(mapContainerRef.current);
    setTimeout(() => map.invalidateSize(), 150);

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapRef.current = null;
    };
  }, [mapContainerRef]);

  // Invalidate map size on mobileView toggle
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.invalidateSize();
      setTimeout(() => mapRef.current?.invalidateSize(), 200);
    }
  }, [mobileView]);

  // 2. Render station markers
  useEffect(() => {
    const map = mapRef.current;
    const layer = markersLayerRef.current;
    if (!map || !layer) return;

    try {
      layer.clearLayers();
      markerMapRef.current.clear();
      stations.forEach((station) => {
        const isSelected = selectedStation?.id === station.id;
        const marker = createStationMarker(
          station,
          isSelected,
          distances[station.id],
          onSelectStation,
          onDeselectStation,
          handleFitBounds,
        );
        marker.addTo(layer);
        markerMapRef.current.set(station.id, marker);
      });
    } catch {
      // Guard against leaflet render issues during view switch
    }
  }, [
    stations,
    selectedStation,
    distances,
    onSelectStation,
    onDeselectStation,
    handleFitBounds,
  ]);

  // 3. Pan and open popup when selectedStation changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    try {
      const container = map.getContainer();
      if (
        !container ||
        container.offsetWidth === 0 ||
        container.offsetHeight === 0
      ) {
        prevSelectedStationRef.current = selectedStation;
        return;
      }
      if (selectedStation) {
        map.flyTo([selectedStation.latitude, selectedStation.longitude], 15, {
          duration: 0.8,
        });
        const marker = markerMapRef.current.get(selectedStation.id);
        if (marker) setTimeout(() => marker.openPopup(), 400);
      } else if (prevSelectedStationRef.current && !selectedStation) {
        handleFitBounds();
      }
    } catch {
      // Guard against zero-dimension Leaflet calls
    }
    prevSelectedStationRef.current = selectedStation;
  }, [selectedStation, handleFitBounds]);

  // 4. Update User Location Marker (only fly if map view is active)
  useEffect(() => {
    const map = mapRef.current;
    const userLayer = userMarkerRef.current;
    if (!map || !userLayer) return;

    const shouldFly = mobileView === 'map';
    updateUserLocationMarker(map, userLayer, userLocation, shouldFly);
  }, [userLocation, mobileView]);

  return { mapRef, handleFitBounds };
}
