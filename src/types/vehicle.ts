import type { ConnectorType } from './station';

export type RangeStandard = 'WLTP' | 'NEDC' | 'CLTC' | 'EPA';


export type PriceType =
  | 'official'
  | 'dealer-listing'
  | 'estimate';


export interface VehicleDimensions {
  length: number;
  width: number;
  height: number;
}

export interface EVModel {
  id: string;
  brand: string;
  modelName: string;
  variant: string;
  bodyType: 'SUV' | 'Sedan' | 'Hatchback' | 'City Car' | 'MPV';
  batteryCapacityKwh: number;
  usableCapacityKwh?: number;
  rangeKm: number;
  rangeStandard: RangeStandard;
  consumptionKwh100km: number;
  maxDcChargeKw: number;
  maxAcChargeKw: number;
  dcChargeTimeMin?: number;
  connector: ConnectorType;
  priceUsd: number;
  priceType: PriceType;
  sourceAttribution: string;
  dimensionsMm?: VehicleDimensions;
  warrantyYears?: number;
  updatedDate: string;
  notes?: string;
}

export interface EVFilterState {
  search: string;
  brand: string;
  bodyType: string;
  maxPrice: number;
}
