import { useState, useMemo, useCallback } from 'react';
import { calculateDistanceKm } from '../data/charging-stations';
import { useStations } from './use-stations';

export function useUserLocation() {
  const { stations } = useStations();
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const requestUserLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        setIsLocating(false);
      },
      (error) => {
        setIsLocating(false);
        if (error.code === error.PERMISSION_DENIED) {
          setLocationError(
            'Location permission denied. Please allow location access.',
          );
        } else {
          setLocationError('Unable to retrieve your location. Try again.');
        }
        setTimeout(() => setLocationError(null), 5000);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    );
  }, []);

  const clearLocationError = useCallback(() => {
    setLocationError(null);
  }, []);

  // Compute distances from user location to all charging stations
  const distances = useMemo<Record<string, number>>(() => {
    if (!userLocation) return {};
    const map: Record<string, number> = {};
    stations.forEach((s) => {
      map[s.id] = calculateDistanceKm(
        userLocation.lat,
        userLocation.lng,
        s.latitude,
        s.longitude,
      );
    });
    return map;
  }, [userLocation, stations]);

  return {
    userLocation,
    isLocating,
    locationError,
    distances,
    requestUserLocation,
    clearLocationError,
  };
}
