import L from 'leaflet';
import type { ChargingStation } from '../../data/charging-stations';
import { createPinSvg } from './map-constants';
import {
  createStationPopupHtml,
  createUserDotIcon,
  createUserPopupHtml,
} from './map-popups';

export function createStationMarker(
  station: ChargingStation,
  isSelected: boolean,
  distance: number | undefined,
  onSelect: (station: ChargingStation) => void,
  onDeselect?: () => void,
  onResetView?: () => void,
): L.Marker {
  const iconSize: [number, number] = isSelected ? [42, 50] : [32, 40];
  const iconAnchor: [number, number] = [iconSize[0] / 2, iconSize[1]];

  const customIcon = L.divIcon({
    className: 'custom-marker-icon',
    html: createPinSvg(station.connector, isSelected),
    iconSize,
    iconAnchor,
    popupAnchor: [0, -iconSize[1] + 4],
  });

  const marker = L.marker([station.latitude, station.longitude], {
    icon: customIcon,
    zIndexOffset: isSelected ? 1000 : 0,
  });

  marker.bindPopup(createStationPopupHtml(station, distance), {
    closeButton: true,
    autoPan: true,
  });

  marker.on('click', () => onSelect(station));

  marker.on('popupopen', (e) => {
    const popupEl = e.popup.getElement();
    const closeBtn = popupEl?.querySelector('.leaflet-popup-close-button');
    if (closeBtn) {
      const handleCloseClick = (ev: Event) => {
        ev.preventDefault();
        ev.stopPropagation();
        onDeselect?.();
        onResetView?.();
      };
      closeBtn.addEventListener('click', handleCloseClick, { once: true });
    }
  });

  return marker;
}

export function updateUserLocationMarker(
  map: L.Map,
  userLayer: L.LayerGroup,
  userLocation: { lat: number; lng: number } | null,
  shouldFly = true,
) {
  userLayer.clearLayers();
  if (!userLocation) return;

  const container = map.getContainer();
  const hasDimensions =
    Boolean(container) &&
    container.offsetWidth > 0 &&
    container.offsetHeight > 0;

  if (shouldFly && hasDimensions) {
    try {
      map.flyTo([userLocation.lat, userLocation.lng], 14, { duration: 1.2 });
    } catch {
      // Prevent Leaflet unmount crash if map container is hidden or 0x0
    }
  }

  const userMarker = L.marker([userLocation.lat, userLocation.lng], {
    icon: createUserDotIcon(),
    zIndexOffset: 2000,
  }).bindPopup(createUserPopupHtml(userLocation.lat, userLocation.lng), {
    closeButton: true,
    autoPan: false,
  });

  const accuracyCircle = L.circle([userLocation.lat, userLocation.lng], {
    radius: 800,
    color: '#3b82f6',
    fillColor: '#60a5fa',
    fillOpacity: 0.1,
    weight: 1,
  });

  userMarker.addTo(userLayer);
  accuracyCircle.addTo(userLayer);
}
