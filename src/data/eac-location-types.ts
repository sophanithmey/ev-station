export interface EACStationLocation {
  id: string;
  no: number;
  nameKh: string;
  nameEn?: string;
  chargersCount: number;
  addressKh: string;
  addressEn?: string;
  latitude: number;
  longitude: number;
  phone: string;
  provinceId: string;
  provinceKh: string;
  provinceEn: string;
}

export interface EACProvinceDirectory {
  provinceId: string;
  provinceKh: string;
  provinceEn: string;
  titleKh: string;
  titleEn: string;
  totalStations: number;
  totalChargers: number;
  imageSrc?: string;
  stations: EACStationLocation[];
}
