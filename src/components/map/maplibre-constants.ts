import type { StyleSpecification } from 'maplibre-gl';
import { connectorColorMap } from './map-constants';

export const CAMBODIA_CENTER_LNG_LAT: [number, number] = [104.991, 12.5657];
export const CAMBODIA_DEFAULT_ZOOM = 7;
export const CAMBODIA_BOUNDS_LNG_LAT: [[number, number], [number, number]] = [
  [101.5, 9.5],
  [108.5, 15.5],
];

export const MAPLIBRE_OSM_STYLE: StyleSpecification = {
  version: 8,
  sources: {
    'osm-tiles': {
      type: 'raster',
      tiles: [
        'https://tile.openstreetmap.de/{z}/{x}/{y}.png',
        'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
        'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
        'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
      ],
      tileSize: 256,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
      maxzoom: 19,
    },
  },
  layers: [
    {
      id: 'osm-background',
      type: 'background',
      paint: {
        'background-color': '#f2efe9',
      },
    },
    {
      id: 'osm-tiles-layer',
      type: 'raster',
      source: 'osm-tiles',
      minzoom: 0,
      maxzoom: 20,
    },
  ],
};

export function createMapLibrePinElement(
  connector: string,
  isSelected: boolean,
): HTMLElement {
  const colors = connectorColorMap[connector] || connectorColorMap.Unknown;
  const el = document.createElement('div');
  el.className = 'cursor-pointer transition-transform duration-200 select-none';
  el.style.transform = isSelected ? 'scale(1.15)' : 'scale(1)';
  el.style.zIndex = isSelected ? '20' : '10';

  el.innerHTML = `
    <div style="position: relative; width: ${isSelected ? 38 : 30}px; height: ${isSelected ? 46 : 38}px; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));">
      ${
        isSelected
          ? `<div style="position: absolute; inset: -4px; border-radius: 9999px; background: ${colors.bg}; opacity: 0.45; animation: ping 1.2s cubic-bezier(0,0,0.2,1) infinite;"></div>`
          : ''
      }
      <svg viewBox="0 0 32 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0C7.163 0 0 7.163 0 16c0 10.5 16 24 16 24s16-13.5 16-24C32 7.163 24.837 0 16 0z" fill="${colors.bg}" stroke="#ffffff" stroke-width="2"/>
        <circle cx="16" cy="15" r="9" fill="#ffffff" />
        <path d="M16.8 8L12 15H15.5L14.2 21L20 14H16.2L16.8 8Z" fill="${colors.bg}" />
      </svg>
    </div>
  `;
  return el;
}

export function createWaypointPinElement(
  type: 'origin' | 'destination',
  name: string,
): HTMLElement {
  const isOrigin = type === 'origin';
  const color = isOrigin ? '#059669' : '#e11d48';
  const label = isOrigin ? 'A' : 'B';
  const icon = isOrigin ? '🚩' : '🏁';
  const prefix = isOrigin ? 'Start' : 'End';

  const el = document.createElement('div');
  el.className = 'cursor-pointer transition-transform duration-200 select-none flex flex-col items-center';
  el.style.zIndex = '30';
  el.title = `${prefix}: ${name}`;

  el.innerHTML = `
    <div style="display: flex; align-items: center; gap: 4px; padding: 2px 8px; border-radius: 9999px; background: ${color}; color: #ffffff; font-size: 11px; font-weight: 700; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.25); border: 1.5px solid #ffffff; white-space: nowrap; margin-bottom: 2px;">
      <span>${icon}</span>
      <span>${prefix}: ${name}</span>
    </div>
    <div style="position: relative; width: 34px; height: 42px; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.35));">
      <svg viewBox="0 0 32 40" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0C7.163 0 0 7.163 0 16c0 10.5 16 24 16 24s16-13.5 16-24C32 7.163 24.837 0 16 0z" fill="${color}" stroke="#ffffff" stroke-width="2"/>
        <circle cx="16" cy="15" r="9" fill="#ffffff" />
        <text x="16" y="19.5" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="12" fill="${color}" text-anchor="middle">${label}</text>
      </svg>
    </div>
  `;
  return el;
}
