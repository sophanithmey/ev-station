import rawGeoJson from './data.json';
import { resolveProvince, type GeoJsonFeature } from './province-resolver';

export type ConnectorType =
  | 'GB-T'
  | 'CCS2'
  | 'GB-T/CCS2'
  | 'CCS/SAE'
  | 'Type 2'
  | 'Unknown';

export type ChargingStation = {
  id: string;
  name: string;
  province: string;
  connector: ConnectorType;
  operationTime: string;
  is24Hours: boolean;
  latitude: number;
  longitude: number;
  dmsLocation?: string;
  brand?: string;
};

export type { GeoJsonFeature };

function detectBrand(name: string): string {
  const n = name.toUpperCase();
  if (n.includes('CAM EV') || n.includes('CAMEV')) return 'CAM EV';
  if (n.includes('EV168') || n.includes('EV 168')) return 'EV168';
  if (n.includes('KHMER EV') || n.includes('KHMEREV')) return 'Khmer EV';
  if (n.includes('FAMILY EV')) return 'Family EV';
  if (n.includes('FUTURE EV')) return 'Future EV';
  if (n.includes('HK EV')) return 'HK EV';
  if (n.includes('EVOLT')) return 'Evolt Energy';
  if (n.includes('GO EV')) return 'GO EV';
  if (n.includes('POL RITHY')) return 'Pol Rithy EV';
  if (n.includes('PTT')) return 'PTT Station';
  if (n.includes('TOTAL')) return 'TotalEnergies';
  if (n.includes('LIM LONG')) return 'Lim Long';
  if (n.includes('SOKIMEX')) return 'Sokimex';
  if (n.includes('TELA') || n.includes('តេលា')) return 'Tela';
  if (n.includes('CALTEX')) return 'Caltex';
  if (n.includes('3E EV') || n.includes('3E ')) return '3E EV';
  if (
    n.includes('EV ENERGY TECH') ||
    n.includes('EV ENERGY') ||
    n.includes('CG EV')
  )
    return 'EV Energy Tech';
  if (n.includes('BYD')) return 'BYD';
  if (n.includes('ZEEKR')) return 'ZEEKR';
  if (
    n.includes('HOTEL') ||
    n.includes('RESORT') ||
    n.includes('GUEST HOUSE') ||
    n.includes('HOMESTAY') ||
    n.includes('HOME STAY') ||
    n.includes('BOUTIQUE')
  )
    return 'Hotel / Resort';
  if (n.includes('MALL') || n.includes('MARKET') || n.includes('CENTRAL'))
    return 'Mall & Retail';
  if (n.includes('COFFEE') || n.includes('CAFÉ') || n.includes('CAFE'))
    return 'Café';
  return 'Charging Hub';
}

// Convert GeoJSON features to strongly typed ChargingStation list
const features = (rawGeoJson as { features: GeoJsonFeature[] }).features || [];

export const chargingStations: ChargingStation[] = features.map((f, index) => {
  const p = f.properties;
  const opTime = p['Operation Time'] ? p['Operation Time'].trim() : '24/7';
  const opLower = opTime.toLowerCase();
  const is24Hours =
    opLower.includes('24') || opLower === '24/7' || opLower === '24hrs';

  const rawLat = p.Latitude;
  const rawLng = p.Longitude;
  const isSwapped = rawLat > 50 && rawLng < 25;
  const latitude = isSwapped ? rawLng : rawLat;
  const longitude = isSwapped ? rawLat : rawLng;

  return {
    id: `kh-ev-${index + 1}`,
    name: (p['Location Name'] || `EV Station ${index + 1}`).trim(),
    province: resolveProvince(f),
    connector: (p['Plug Types'] as ConnectorType) || 'Unknown',
    operationTime: opTime,
    is24Hours,
    latitude,
    longitude,
    dmsLocation: p.Location,
    brand: detectBrand(p['Location Name'] || ''),
  };
});

/**
 * Haversine formula to compute great-circle distance between two points in km
 */
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}
