import L from 'leaflet';
import type { ChargingStation } from '../../data/charging-stations';

export function createStationPopupHtml(
  station: ChargingStation,
  distance?: number,
): string {
  const distHtml =
    distance !== undefined
      ? `<span style="display: inline-flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 700; color: #047857; background: #ecfdf5; border: 1px solid #a7f3d0; padding: 2px 7px; border-radius: 6px;">
          <span>⚡</span> ${distance} km away
        </span>`
      : '';

  const gmapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${station.latitude},${station.longitude}`;

  return `
    <div style="font-family: inherit; width: 270px; padding: 16px 14px 14px; background: #ffffff;">
      <div style="margin-bottom: 8px; padding-right: 22px;">
        ${
          station.brand
            ? `<span style="display: inline-block; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: #475569; background: #f1f5f9; padding: 2px 6px; border-radius: 5px; margin-bottom: 4px;">${station.brand}</span>`
            : ''
        }
        <h4 style="font-weight: 700; font-size: 14px; color: #0f172a; line-height: 1.3; margin: 0;">${station.name}</h4>
      </div>
      <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px;">
        <span style="font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 9999px; background: #f1f5f9; color: #1e293b; border: 1px solid #cbd5e1;">
          🔌 ${station.connector}
        </span>
        <span style="font-size: 11px; font-weight: 600; padding: 3px 8px; border-radius: 9999px; display: inline-flex; align-items: center; gap: 4px; ${
          station.is24Hours
            ? 'background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0;'
            : 'background: #f8fafc; color: #64748b; border: 1px solid #e2e8f0;'
        }">
          <span style="width: 6px; height: 6px; border-radius: 50%; ${station.is24Hours ? 'background: #10b981;' : 'background: #94a3b8;'}"></span>
          ${station.is24Hours ? 'Open 24/7' : station.operationTime}
        </span>
      </div>
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 7px 9px; background: #f8fafc; border: 1px solid #f1f5f9; border-radius: 8px; margin-bottom: 12px; font-size: 11px; color: #475569;">
        <span style="font-weight: 500;">📍 ${station.province}</span>
        ${distHtml}
      </div>
      <a href="${gmapsUrl}" target="_blank" rel="noopener noreferrer" style="display: flex; align-items: center; justify-content: center; gap: 6px; width: 100%; padding: 9px 12px; border-radius: 10px; background: linear-gradient(135deg, #059669 0%, #0d9488 100%); color: #ffffff; font-size: 12px; font-weight: 700; text-decoration: none; box-shadow: 0 4px 10px -2px rgba(5, 150, 105, 0.35);">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
        Start Navigation
      </a>
    </div>
  `;
}

export function createUserDotIcon(): L.DivIcon {
  return L.divIcon({
    className: 'custom-user-marker',
    html: `
      <div style="position: relative; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;">
        <div style="position: absolute; width: 30px; height: 30px; border-radius: 50%; background: #3b82f6; opacity: 0.25; animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
        <div style="position: absolute; width: 22px; height: 22px; border-radius: 50%; background: rgba(59, 130, 246, 0.2); border: 1.5px solid rgba(59, 130, 246, 0.5);"></div>
        <div style="position: relative; width: 14px; height: 14px; border-radius: 50%; background: #2563eb; border: 2.5px solid #ffffff; box-shadow: 0 2px 6px rgba(37, 99, 235, 0.5);"></div>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
}

export function createUserPopupHtml(lat: number, lng: number): string {
  return `
    <div style="font-family: inherit; width: 220px; padding: 14px 14px 12px; background: #ffffff;">
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
        <div style="width: 8px; height: 8px; border-radius: 50%; background: #2563eb;"></div>
        <span style="font-size: 13px; font-weight: 700; color: #0f172a;">Your Current Location</span>
      </div>
      <div style="font-size: 11px; color: #64748b; font-family: ui-monospace, monospace; margin-bottom: 8px;">
        ${lat.toFixed(5)}° N, ${lng.toFixed(5)}° E
      </div>
      <div style="display: inline-flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 600; color: #059669; background: #ecfdf5; padding: 2px 8px; border-radius: 9999px;">
        ⚡ Tracking nearby EV chargers
      </div>
    </div>
  `;
}
