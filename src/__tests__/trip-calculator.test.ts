import { describe, it, expect } from 'vitest';
import {
  calculateEnergyConsumptionKwh,
  planTrip,
} from '../services/trip-calculator';
import type { RouteGeometry, TripAssumptions, VehicleTripSpec } from '../types/trip';
import type { ChargingStation } from '../types/station';

describe('Trip Calculator Service', () => {
  const mockVehicle: VehicleTripSpec = {
    id: 'test-ev',
    name: 'Test EV',
    batteryCapacityKwh: 60,
    consumptionKwh100km: 15.0,
    maxDcChargeKw: 80,
    connector: 'GB/T',
  };

  const defaultAssumptions: TripAssumptions = {
    acActive: false,
    speedFactor: 1.0,
  };

  it('calculates base energy consumption correctly', () => {
    // 200 km at 15 kWh/100km = 30 kWh
    const kwh = calculateEnergyConsumptionKwh(200, 15.0, defaultAssumptions);
    expect(kwh).toBe(30);
  });

  it('applies tropical AC penalty (+12%) and speed factor', () => {
    const acAssumptions: TripAssumptions = {
      acActive: true,
      speedFactor: 1.1,
    };
    // 200 km * 0.15 * 1.12 * 1.1 = 36.96 => 37 kWh
    const kwh = calculateEnergyConsumptionKwh(200, 15.0, acAssumptions);
    expect(kwh).toBeCloseTo(37.0, 0);
  });

  it('verifies route is feasible without stops when distance is within range', () => {
    const shortRoute: RouteGeometry = {
      distanceKm: 120,
      durationMinutes: 110,
      coordinates: [
        [104.92, 11.55],
        [104.18, 10.61],
      ],
      isOfflineFallback: false,
    };

    const result = planTrip(
      shortRoute,
      mockVehicle,
      90, // start SoC: 54 kWh
      15, // reserve SoC: 9 kWh
      'all',
      [],
      defaultAssumptions,
    );

    expect(result.isFeasible).toBe(true);
    expect(result.requiresCharging).toBe(false);
    expect(result.stops.length).toBe(0);
    expect(result.arrivalSoc).toBeGreaterThan(result.reserveSoc);
  });

  it('identifies stop and adds warning when distance exceeds single charge', () => {
    const longRoute: RouteGeometry = {
      distanceKm: 420,
      durationMinutes: 380,
      coordinates: [
        [104.92, 11.55], // Phnom Penh
        [103.91, 12.53], // Pursat midpoint
        [103.84, 13.36], // Siem Reap
      ],
      isOfflineFallback: false,
    };

    const mockStation: ChargingStation = {
      id: 'pursat-hub',
      name: 'Pursat EV Station',
      province: 'Pursat',
      connector: 'GB/T',
      speedCategory: 'dc_fast',
      operationTime: '24/7',
      is24Hours: true,
      latitude: 12.53,
      longitude: 103.91,
      source: 'MEF',
      verifiedDate: 'Feb 2025',
    };

    const result = planTrip(
      longRoute,
      mockVehicle,
      80,
      15,
      'all',
      [mockStation],
      defaultAssumptions,
    );

    expect(result.requiresCharging).toBe(true);
    expect(result.stops.length).toBe(1);
    expect(result.stops[0].station.id).toBe('pursat-hub');
    expect(result.stops[0].targetSoc).toBe(80);
  });
});
