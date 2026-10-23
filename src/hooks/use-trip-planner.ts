import { useState, useCallback, useEffect } from 'react';
import type {
  TripAssumptions,
  TripPlanResult,
  VehicleTripSpec,
} from '../types/trip';
import { CAMBODIA_CITIES } from '../data/cambodia-cities';
import { ALL_EV_MODELS } from '../data/ev-models';
import { useStations } from './use-stations';
import { fetchRoadRoute } from '../services/routing-service';
import { planTrip } from '../services/trip-calculator';

export function useTripPlanner() {
  const { stations } = useStations();
  const [originId, setOriginId] = useState('phnom-penh');
  const [destinationId, setDestinationId] = useState('sihanoukville');
  const [vehicleId, setVehicleId] = useState('byd-atto-2-standard');
  const [startSoc, setStartSoc] = useState(90);
  const [reserveSoc, setReserveSoc] = useState(15);
  const [preferredConnector, setPreferredConnector] = useState('all');
  const [assumptions, setAssumptions] = useState<TripAssumptions>({
    acActive: true,
    speedFactor: 1.0,
  });

  const [isCalculating, setIsCalculating] = useState(false);
  const [planResult, setPlanResult] = useState<TripPlanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getVehicleSpec = useCallback((): VehicleTripSpec => {
    const found = ALL_EV_MODELS.find((m) => m.id === vehicleId);
    if (found) {
      return {
        id: found.id,
        name: `${found.brand} ${found.modelName} (${found.variant})`,
        batteryCapacityKwh: found.batteryCapacityKwh,
        consumptionKwh100km: found.consumptionKwh100km,
        maxDcChargeKw: found.maxDcChargeKw,
        connector: found.connector,
      };
    }
    return {
      id: 'custom',
      name: 'Custom EV Profile',
      batteryCapacityKwh: 60,
      consumptionKwh100km: 16,
      maxDcChargeKw: 80,
      connector: 'GB/T',
    };
  }, [vehicleId]);

  const handleCalculate = useCallback(async () => {
    const origin = CAMBODIA_CITIES.find((c) => c.id === originId);
    const destination = CAMBODIA_CITIES.find((c) => c.id === destinationId);

    if (!origin || !destination) {
      setError('Please select valid origin and destination waypoints.');
      return;
    }

    if (origin.id === destination.id) {
      setError('Origin and destination cannot be the same location.');
      return;
    }

    setIsCalculating(true);
    setError(null);

    try {
      const route = await fetchRoadRoute(
        { lat: origin.lat, lng: origin.lng },
        { lat: destination.lat, lng: destination.lng },
      );

      const vehicle = getVehicleSpec();
      const result = planTrip(
        route,
        vehicle,
        startSoc,
        reserveSoc,
        preferredConnector,
        stations,
        assumptions,
      );

      setPlanResult(result);
    } catch {
      setError('Failed to compute route. Please try again.');
    } finally {
      setIsCalculating(false);
    }
  }, [
    stations,
    originId,
    destinationId,
    getVehicleSpec,
    startSoc,
    reserveSoc,
    preferredConnector,
    assumptions,
  ]);

  // Initial calculation on mount
  useEffect(() => {
    let isMounted = true;
    const init = async () => {
      const origin = CAMBODIA_CITIES[0];
      const destination = CAMBODIA_CITIES[2]; // Sihanoukville
      if (!origin || !destination) return;
      try {
        const route = await fetchRoadRoute(
          { lat: origin.lat, lng: origin.lng },
          { lat: destination.lat, lng: destination.lng },
        );
        if (!isMounted) return;
        const vehicle = getVehicleSpec();
        const result = planTrip(
          route,
          vehicle,
          startSoc,
          reserveSoc,
          preferredConnector,
          stations,
          assumptions,
        );
        setPlanResult(result);
      } catch {
        // Silent initial fallback
      }
    };
    init();
    return () => {
      isMounted = false;
    };
  }, [
    stations,
    getVehicleSpec,
    startSoc,
    reserveSoc,
    preferredConnector,
    assumptions,
  ]);

  const toggleAc = useCallback(() => {
    setAssumptions((prev) => ({ ...prev, acActive: !prev.acActive }));
  }, []);

  return {
    originId,
    destinationId,
    vehicleId,
    startSoc,
    reserveSoc,
    preferredConnector,
    assumptions,
    isCalculating,
    planResult,
    error,
    setOriginId,
    setDestinationId,
    setVehicleId,
    setStartSoc,
    setReserveSoc,
    setPreferredConnector,
    toggleAc,
    recalculate: handleCalculate,
  };
}
