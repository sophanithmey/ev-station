import type { RouteGeometry } from '../types/trip';
import { calculateDistanceKm } from '../data/charging-stations';

type OSRMResponse = {
  code: string;
  routes?: Array<{
    distance: number; // meters
    duration: number; // seconds
    geometry: {
      coordinates: [number, number][]; // [lon, lat]
    };
  }>;
};

export async function fetchRoadRoute(
  origin: { lat: number; lng: number },
  destination: { lat: number; lng: number },
): Promise<RouteGeometry> {
  const url = `https://router.project-osrm.org/route/v1/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?overview=full&geometries=geojson`;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);

    if (res.ok) {
      const data: OSRMResponse = await res.json();
      if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        return {
          distanceKm: Math.round((route.distance / 1000) * 10) / 10,
          durationMinutes: Math.round(route.duration / 60),
          coordinates: route.geometry.coordinates,
          isOfflineFallback: false,
        };
      }
    }
  } catch {
    // Fall through to fallback
  }

  // Robust road estimation fallback (Cambodian highway winding factor ~1.22)
  const straightDist = calculateDistanceKm(
    origin.lat,
    origin.lng,
    destination.lat,
    destination.lng,
  );
  const roadDist = Math.round(straightDist * 1.22 * 10) / 10;
  // Average highway speed ~65 km/h in Cambodia
  const durationMin = Math.round((roadDist / 65) * 60);

  const steps = 12;
  const coords: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const frac = i / steps;
    const lng = origin.lng + (destination.lng - origin.lng) * frac;
    const lat = origin.lat + (destination.lat - origin.lat) * frac;
    coords.push([lng, lat]);
  }

  return {
    distanceKm: roadDist,
    durationMinutes: durationMin,
    coordinates: coords,
    isOfflineFallback: true,
  };
}

export function findDistanceToPolylineKm(
  point: { lat: number; lng: number },
  polyline: [number, number][], // [lon, lat]
): number {
  if (polyline.length === 0) return 9999;
  let min = 9999;
  for (let i = 0; i < polyline.length; i++) {
    const [lon, lat] = polyline[i];
    const d = calculateDistanceKm(point.lat, point.lng, lat, lon);
    if (d < min) min = d;
  }
  return min;
}
