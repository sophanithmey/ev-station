import type { ChargingStation, ConnectorType } from './station';

export interface TripWaypoint {
  id: string;
  name: string;
  nameKhmer?: string;
  lat: number;
  lng: number;
}

export interface VehicleTripSpec {
  id: string;
  name: string;
  batteryCapacityKwh: number;
  consumptionKwh100km: number;
  maxDcChargeKw: number;
  connector: ConnectorType;
}

export interface RouteGeometry {
  distanceKm: number;
  durationMinutes: number;
  coordinates: [number, number][]; // [longitude, latitude] for MapLibre
  isOfflineFallback?: boolean;
}

export interface ChargingStop {
  station: ChargingStation;
  arrivalSoc: number;
  targetSoc: number;
  kwhNeeded: number;
  estimatedMinutes: number;
  distanceAlongRouteKm: number;
  notes?: string;
}

export interface TripAssumptions {
  acActive: boolean; // AC in tropical Cambodian climate (+10-15% consumption)
  speedFactor: number; // 1.0 = standard road speed, 1.2 = fast highway
}

export interface TripPlanResult {
  route: RouteGeometry;
  initialSoc: number;
  reserveSoc: number;
  energyUsedKwh: number;
  arrivalSoc: number;
  stops: ChargingStop[];
  requiresCharging: boolean;
  warnings: string[];
  isFeasible: boolean;
}
