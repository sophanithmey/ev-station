export type ConnectorType = 'GB/T' | 'CCS2' | 'Type 2' | 'Unknown';

export type SpeedCategory = 'dc_fast' | 'ac_standard' | 'unknown';

export interface GeoJsonFeature {
  type: string;
  geometry: {
    type: string;
    coordinates: number[];
  };
  properties: {
    'Location Name': string;
    'Location Name (Khmer)'?: string;
    'Location Name (English)'?: string;
    Location?: string;
    Latitude: number;
    Longitude: number;
    Province?: string;
    'Province (Khmer)'?: string;
    Address?: string;
    'Chargers Count'?: number;
    Phone?: string;
    'Plug Types': string;
    'Operation Time'?: string;
    Source?: string;
    'QR Number'?: number;
  };
}

export interface ChargingStation {
  id: string;
  name: string;
  nameKhmer?: string;
  nameEn?: string;
  province: string;
  provinceKhmer?: string;
  connector: ConnectorType;
  speedCategory: SpeedCategory;
  operationTime: string;
  is24Hours: boolean;
  latitude: number;
  longitude: number;
  address?: string;
  chargersCount?: number;
  phone?: string;
  source: string;
  qrNumber?: number;
  dmsLocation?: string;
  brand?: string;
  verifiedDate: string;
  pricingNotes?: string;
}

export interface StationFilterState {
  search: string;
  connector: string;
  speed: string;
  only24Hours: boolean;
  onlyNearMe: boolean;
}
