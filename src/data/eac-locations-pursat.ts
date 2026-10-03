import type { EACProvinceDirectory } from './eac-location-types';
import { PURSAT_STATIONS_PART1 } from './pursat-stations-part1';
import { PURSAT_STATIONS_PART2 } from './pursat-stations-part2';

export const PURSAT_LOCATIONS: EACProvinceDirectory = {
  provinceId: 'pursat',
  provinceKh: 'ពោធិ៍សាត់',
  provinceEn: 'Pursat',
  titleKh: 'ស្ថានីយបញ្ចូលថាមពលយានយន្តអគ្គិសនីស្របច្បាប់នៅខេត្តពោធិ៍សាត់',
  titleEn: 'Authorized EV Charging Stations in Pursat Province',
  totalStations: 22,
  totalChargers: 36,
  imageSrc: '/pursat.jpeg',
  stations: [...PURSAT_STATIONS_PART1, ...PURSAT_STATIONS_PART2],
};
