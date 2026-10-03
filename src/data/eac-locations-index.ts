import type { EACProvinceDirectory, EACStationLocation } from './eac-location-types';
import { PURSAT_LOCATIONS } from './eac-locations-pursat';
import { SIEMREAP_LOCATIONS } from './eac-locations-siemreap';
import { EAC_PROVINCE_STATS } from './eac-province-stats';
import { chargingStations } from './charging-stations';

export * from './eac-location-types';
export { PURSAT_LOCATIONS } from './eac-locations-pursat';
export { SIEMREAP_LOCATIONS } from './eac-locations-siemreap';

const VERIFIED_PROVINCES: Record<string, EACProvinceDirectory> = {
  pursat: PURSAT_LOCATIONS,
  'siem-reap': SIEMREAP_LOCATIONS,
};

function generateFallbackProvinceDirectory(provinceId: string): EACProvinceDirectory {
  const stat = EAC_PROVINCE_STATS.find((p) => p.id === provinceId) || {
    id: provinceId,
    nameKh: 'ខេត្ត',
    nameEn: 'Province',
    stations: 0,
    chargers: 0,
  };

  const matched = chargingStations.filter(
    (s) => s.province.toLowerCase().replace(/\s+/g, '-') === provinceId ||
           s.province.toLowerCase() === stat.nameEn.toLowerCase()
  );

  const stations: EACStationLocation[] = matched.map((s, idx) => ({
    id: s.id,
    no: idx + 1,
    nameKh: s.name,
    nameEn: s.name,
    chargersCount: Math.max(1, Math.round((stat.chargers || 2) / Math.max(1, stat.stations || 1))),
    addressKh: `${s.province} (${s.operationTime})`,
    latitude: s.latitude,
    longitude: s.longitude,
    phone: '023 217 654',
    provinceId: stat.id,
    provinceKh: stat.nameKh,
    provinceEn: stat.nameEn,
  }));

  return {
    provinceId: stat.id,
    provinceKh: stat.nameKh,
    provinceEn: stat.nameEn,
    titleKh: `ស្ថានីយបញ្ចូលថាមពលយានយន្តអគ្គិសនីស្របច្បាប់នៅខេត្ត${stat.nameKh}`,
    titleEn: `Authorized EV Charging Stations in ${stat.nameEn} Province`,
    totalStations: stat.stations || stations.length,
    totalChargers: stat.chargers || stations.length * 2,
    stations,
  };
}

export function getProvinceDirectory(provinceId: string): EACProvinceDirectory {
  if (VERIFIED_PROVINCES[provinceId]) {
    return VERIFIED_PROVINCES[provinceId];
  }
  return generateFallbackProvinceDirectory(provinceId);
}

export interface ProvinceOption {
  id: string;
  nameKh: string;
  nameEn: string;
  stations: number;
  chargers: number;
  isOfficialVerified: boolean;
}

export const PROVINCE_DIRECTORY_OPTIONS: ProvinceOption[] = EAC_PROVINCE_STATS.map((p) => ({
  id: p.id,
  nameKh: p.nameKh,
  nameEn: p.nameEn,
  stations: p.stations,
  chargers: p.chargers,
  isOfficialVerified: Boolean(VERIFIED_PROVINCES[p.id]),
}));
