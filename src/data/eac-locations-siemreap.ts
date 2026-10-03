import type { EACProvinceDirectory } from './eac-location-types';
import { SIEMREAP_STATIONS_PART1 } from './siemreap-stations-part1';
import { SIEMREAP_STATIONS_PART2 } from './siemreap-stations-part2';

export const SIEMREAP_LOCATIONS: EACProvinceDirectory = {
  provinceId: 'siem-reap',
  provinceKh: 'សៀមរាប',
  provinceEn: 'Siem Reap',
  titleKh: 'ស្ថានីយបញ្ចូលថាមពលយានយន្តអគ្គិសនីស្របច្បាប់នៅខេត្តសៀមរាប',
  titleEn: 'Authorized EV Charging Stations in Siem Reap Province',
  totalStations: 23,
  totalChargers: 43,
  imageSrc: '/siemreap.jpeg',
  stations: [...SIEMREAP_STATIONS_PART1, ...SIEMREAP_STATIONS_PART2],
};
