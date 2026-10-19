import type { ChargingStation } from '../types/station';
import type {
  ChargingStop,
  RouteGeometry,
  TripAssumptions,
  TripPlanResult,
  VehicleTripSpec,
} from '../types/trip';
import { calculateDistanceKm } from '../data/charging-stations';
import { findDistanceToPolylineKm } from './routing-service';

export function calculateEnergyConsumptionKwh(
  distanceKm: number,
  consumptionKwh100km: number,
  assumptions: TripAssumptions,
): number {
  const baseKwh = (distanceKm / 100) * consumptionKwh100km;
  const acMultiplier = assumptions.acActive ? 1.12 : 1.0;
  const speedMultiplier = assumptions.speedFactor || 1.0;
  return Math.round(baseKwh * acMultiplier * speedMultiplier * 10) / 10;
}

export function planTrip(
  route: RouteGeometry,
  vehicle: VehicleTripSpec,
  startSoc: number,
  reserveSoc: number,
  preferredConnector: string,
  stations: ChargingStation[],
  assumptions: TripAssumptions,
): TripPlanResult {
  const totalEnergy = calculateEnergyConsumptionKwh(
    route.distanceKm,
    vehicle.consumptionKwh100km,
    assumptions,
  );

  const startEnergy = vehicle.batteryCapacityKwh * (startSoc / 100);
  const reserveEnergy = vehicle.batteryCapacityKwh * (reserveSoc / 100);
  const effectiveKwhPerKm = totalEnergy / Math.max(1, route.distanceKm);

  // Maximum distance vehicle can drive before hitting reserve
  const maxInitialRange = Math.max(
    0,
    (startEnergy - reserveEnergy) / effectiveKwhPerKm,
  );

  const warnings: string[] = [];
  if (route.isOfflineFallback) {
    warnings.push(
      'Estimated road distance based on Cambodian highway network. Routing service was unreachable.',
    );
  }

  // Case 1: Reachable without charging
  if (route.distanceKm <= maxInitialRange) {
    const arrivalEnergy = startEnergy - totalEnergy;
    const arrivalSoc = Math.round(
      (arrivalEnergy / vehicle.batteryCapacityKwh) * 100,
    );

    return {
      route,
      initialSoc: startSoc,
      reserveSoc,
      energyUsedKwh: totalEnergy,
      arrivalSoc: Math.max(0, arrivalSoc),
      stops: [],
      requiresCharging: false,
      warnings,
      isFeasible: true,
    };
  }

  // Case 2: Candidate stations along the corridor (<= 14 km from polyline)
  const candidateStations = stations.filter((s) => {
    const matchConnector =
      preferredConnector === 'all' ||
      s.connector === preferredConnector ||
      s.connector.includes(preferredConnector) ||
      vehicle.connector === s.connector;
    if (!matchConnector) return false;
    const distToRoute = findDistanceToPolylineKm(
      { lat: s.latitude, lng: s.longitude },
      route.coordinates,
    );
    return distToRoute <= 14;
  });

  const originLat = route.coordinates[0]?.[1] ?? 11.55;
  const originLng = route.coordinates[0]?.[0] ?? 104.92;

  // Sort candidate stations by distance from origin
  candidateStations.sort((a, b) => {
    const distA = calculateDistanceKm(originLat, originLng, a.latitude, a.longitude);
    const distB = calculateDistanceKm(originLat, originLng, b.latitude, b.longitude);
    return distA - distB;
  });

  const stops: ChargingStop[] = [];
  let currentDist = 0;
  let currentEnergy = startEnergy;

  for (const station of candidateStations) {
    const distFromOrigin = calculateDistanceKm(
      originLat,
      originLng,
      station.latitude,
      station.longitude,
    );

    const remainingToDest = route.distanceKm - currentDist;
    const canReachDest = (currentEnergy - reserveEnergy) >= remainingToDest * effectiveKwhPerKm;
    if (canReachDest) {
      break;
    }

    if (distFromOrigin > currentDist && distFromOrigin < route.distanceKm) {
      const legDist = distFromOrigin - currentDist;
      const legEnergy = legDist * effectiveKwhPerKm;

      if (currentEnergy - legEnergy >= reserveEnergy) {
        const arrivalSoc = Math.max(
          1,
          Math.round(((currentEnergy - legEnergy) / vehicle.batteryCapacityKwh) * 100),
        );
        const targetSoc = 80;
        const targetEnergy = vehicle.batteryCapacityKwh * (targetSoc / 100);
        const kwhNeeded = Math.round(
          Math.max(0, targetEnergy - (currentEnergy - legEnergy)) * 10,
        ) / 10;
        const chargePowerKw = Math.min(vehicle.maxDcChargeKw, 60);
        const chargeMinutes = Math.round((kwhNeeded / chargePowerKw) * 60) + 5;

        stops.push({
          station,
          arrivalSoc,
          targetSoc,
          kwhNeeded,
          estimatedMinutes: chargeMinutes,
          distanceAlongRouteKm: Math.round(distFromOrigin),
          notes: `${station.name} (${station.connector})`,
        });

        currentDist = distFromOrigin;
        currentEnergy = targetEnergy;
      }
    }
  }

  const remainingDist = route.distanceKm - currentDist;
  const remainingEnergyNeeded = remainingDist * effectiveKwhPerKm;
  const arrivalEnergy = currentEnergy - remainingEnergyNeeded;
  const arrivalSoc = Math.round((arrivalEnergy / vehicle.batteryCapacityKwh) * 100);

  if (stops.length === 0) {
    warnings.push(
      'Insufficient charging infrastructure found along this route for your vehicle range. Verify stations manually before departing.',
    );
  }

  return {
    route,
    initialSoc: startSoc,
    reserveSoc,
    energyUsedKwh: totalEnergy,
    arrivalSoc: Math.max(0, arrivalSoc),
    stops,
    requiresCharging: true,
    warnings,
    isFeasible: stops.length > 0 && arrivalSoc >= reserveSoc,
  };
}
