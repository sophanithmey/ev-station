import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes fresh
      gcTime: 24 * 60 * 60 * 1000, // 24 hours garbage collection
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export const queryKeys = {
  stations: {
    all: ['stations'] as const,
    nearby: (lat: number, lng: number, radiusKm: number) =>
      ['stations', 'nearby', lat, lng, radiusKm] as const,
    alongRoute: (coords: Array<[number, number]>, bufferKm: number) =>
      ['stations', 'route', coords, bufferKm] as const,
  },
  community: {
    all: ['community'] as const,
    reports: () => ['community', 'reports'] as const,
    submissions: () => ['community', 'submissions'] as const,
  },
  visitor: {
    count: ['visitor', 'count'] as const,
  },
} as const;
