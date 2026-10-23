import type { ChargingStation, SpeedCategory } from '../types/station';
import type { NewStationSubmission } from '../types/community';

const BRAND_RULES: ReadonlyArray<readonly [string, readonly string[]]> = [
  ['CAM EV', ['CAM EV', 'CAMEV']],
  ['EV168', ['EV168', 'EV 168']],
  ['Khmer EV', ['KHMER EV', 'KHMEREV']],
  ['Family EV', ['FAMILY EV']],
  ['Future EV', ['FUTURE EV']],
  ['HK EV', ['HK EV']],
  ['Evolt Energy', ['EVOLT']],
  ['GO EV', ['GO EV']],
  ['Pol Rithy EV', ['POL RITHY']],
  ['PTT Station', ['PTT']],
  ['TotalEnergies', ['TOTAL']],
  ['Lim Long', ['LIM LONG']],
  ['Sokimex', ['SOKIMEX']],
  ['Tela', ['TELA', 'តេលា']],
  ['Caltex', ['CALTEX']],
  ['3E EV', ['3E EV', '3E ']],
  ['EV Energy Tech', ['EV ENERGY TECH', 'EV ENERGY', 'CG EV']],
  ['BYD', ['BYD']],
  ['ZEEKR', ['ZEEKR']],
  ['Hotel / Resort', ['HOTEL', 'RESORT', 'GUEST HOUSE', 'GUESTHOUSE', 'HOMESTAY', 'BOUTIQUE']],
  ['Mall & Retail', ['MALL', 'MARKET', 'CENTRAL']],
  ['Café', ['COFFEE', 'CAFÉ', 'CAFE']],
];

const DEFAULT_BRAND = 'Charging Hub';

export const DEFAULT_PRICING_NOTES =
  'EAC Official Tariff ~1,200–1,500 KHR/kWh (subject to provider)';

/** Cambodia bounding box with a small margin. */
const CAMBODIA_BOUNDS = { minLat: 9.5, maxLat: 15, minLng: 102, maxLng: 108 };

export function detectBrand(name: string): string {
  const upper = name.toUpperCase();
  const match = BRAND_RULES.find(([, needles]) =>
    needles.some((needle) => upper.includes(needle)),
  );
  return match ? match[0] : DEFAULT_BRAND;
}

export function resolveSpeedCategory(plug: string): SpeedCategory {
  if (plug === 'Unknown' || plug === '') return 'unknown';
  if (plug === 'Type 2') return 'ac_standard';
  return 'dc_fast';
}

export function isOpen24Hours(operationTime: string): boolean {
  return operationTime.toLowerCase().includes('24');
}

export function isInsideCambodia(lat: number, lng: number): boolean {
  const b = CAMBODIA_BOUNDS;
  return lat >= b.minLat && lat <= b.maxLat && lng >= b.minLng && lng <= b.maxLng;
}

/** Returns [lat, lng], swapping the pair when it was stored reversed. */
export function normalizeLatLng(lat: number, lng: number): [number, number] {
  if (isInsideCambodia(lat, lng)) return [lat, lng];
  if (isInsideCambodia(lng, lat)) return [lng, lat];
  return [lat, lng];
}

export function splitPhones(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(',')
    .map((phone) => phone.trim())
    .filter((phone) => phone.length > 0);
}

export function mapApprovedSubmissionToStation(
  sub: NewStationSubmission,
): ChargingStation {
  const opTime = sub.operationTime || '24/7';
  return {
    id: sub.stationSlug || sub.id,
    name: sub.name,
    province: sub.province,
    connector: sub.connector,
    speedCategory: resolveSpeedCategory(sub.connector),
    operationTime: opTime,
    is24Hours: isOpen24Hours(opTime),
    latitude: sub.latitude,
    longitude: sub.longitude,
    address: sub.accessNotes,
    chargersCount: sub.chargersCount ?? 1,
    phone: sub.submitterContact,
    source: 'Community Submission',
    brand: detectBrand(sub.name),
    verifiedDate: sub.timestamp
      ? sub.timestamp.slice(0, 10)
      : new Date().toISOString().slice(0, 10),
    pricingNotes: DEFAULT_PRICING_NOTES,
    status: 'approved',
  };
}

