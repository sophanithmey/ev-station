import L from 'leaflet';

// Cambodia geographic center and default zoom
export const CAMBODIA_CENTER: [number, number] = [12.5657, 104.991];
export const CAMBODIA_ZOOM = 7;

// Strict geographic bounding box — user cannot pan or zoom outside Cambodia
export const CAMBODIA_BOUNDS = L.latLngBounds(
  L.latLng(9.5, 101.5), // SW corner (with padding)
  L.latLng(15.5, 108.5), // NE corner (with padding)
);

export const connectorColorMap: Record<
  string,
  { bg: string; border: string; glow: string }
> = {
  'GB-T': { bg: '#059669', border: '#047857', glow: 'rgba(5, 150, 105, 0.4)' },
  'GB-T/CCS2': {
    bg: '#0d9488',
    border: '#0f766e',
    glow: 'rgba(13, 148, 136, 0.4)',
  },
  CCS2: { bg: '#2563eb', border: '#1d4ed8', glow: 'rgba(37, 99, 235, 0.4)' },
  'CCS/SAE': {
    bg: '#7c3aed',
    border: '#6d28d9',
    glow: 'rgba(124, 58, 237, 0.4)',
  },
  Unknown: {
    bg: '#64748b',
    border: '#475569',
    glow: 'rgba(100, 116, 139, 0.4)',
  },
};

export function createPinSvg(connector: string, isSelected: boolean): string {
  const colors = connectorColorMap[connector] || connectorColorMap.Unknown;
  const size = isSelected ? 42 : 32;
  const height = isSelected ? 50 : 40;

  return `
    <div style="position: relative; width: ${size}px; height: ${height}px; filter: drop-shadow(0 6px 10px rgba(0,0,0,0.22)); transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);">
      ${
        isSelected
          ? `<div style="position: absolute; top: -8px; left: -8px; right: -8px; bottom: 0px; border-radius: 50%; background: ${colors.bg}; opacity: 0.4; animation: ping 1.4s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>`
          : ''
      }
      <svg viewBox="0 0 32 40" width="${size}" height="${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad-${connector.replace(/[^a-zA-Z0-9]/g, '')}-${isSelected ? 'sel' : 'def'}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${colors.bg}" />
            <stop offset="100%" stop-color="${colors.border}" />
          </linearGradient>
        </defs>
        <path d="M16 0C7.163 0 0 7.163 0 16c0 10.5 16 24 16 24s16-13.5 16-24C32 7.163 24.837 0 16 0z" fill="url(#grad-${connector.replace(/[^a-zA-Z0-9]/g, '')}-${isSelected ? 'sel' : 'def'})" stroke="${isSelected ? '#ffffff' : 'rgba(255,255,255,0.7)'}" stroke-width="${isSelected ? 2.5 : 1.5}"/>
        <circle cx="16" cy="15" r="9.5" fill="#ffffff" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.15))" />
        <!-- EV Bolt Icon -->
        <path d="M16.8 7.5L11.5 15H15.5L14.2 21.5L20.5 14H16.2L16.8 7.5Z" fill="${colors.bg}" />
      </svg>
    </div>
  `;
}
