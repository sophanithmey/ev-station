import { useSyncExternalStore, useCallback } from 'react';
import { ALL_EV_MODELS, CAMBODIA_EV_MODELS } from '../data/ev-models';

const STORAGE_KEY = 'evkh_comparison_ids';

const fallbackIds = [
  CAMBODIA_EV_MODELS[0]?.id || 'byd-atto-2-standard',
  CAMBODIA_EV_MODELS[1]?.id || 'byd-atto-3',
];

function sanitizeIds(ids: unknown): string[] {
  if (!Array.isArray(ids)) return fallbackIds;
  const valid = ids.filter(
    (id): id is string =>
      typeof id === 'string' && ALL_EV_MODELS.some((m) => m.id === id),
  );
  return valid.length > 0 ? valid.slice(0, 3) : fallbackIds;
}

function loadInitialIds(): string[] {
  if (typeof window === 'undefined') return fallbackIds;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallbackIds;
    return sanitizeIds(JSON.parse(raw));
  } catch {
    return fallbackIds;
  }
}

let currentIds: string[] = loadInitialIds();
const listeners = new Set<() => void>();

function notify() {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentIds));
    } catch {
      // Ignore localStorage errors
    }
  }
  for (const listener of listeners) {
    listener();
  }
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function getSnapshot(): string[] {
  return currentIds;
}

export function useEvComparison() {
  const comparisonIds = useSyncExternalStore(subscribe, getSnapshot, () => fallbackIds);

  const toggleCompare = useCallback((id: string) => {
    if (currentIds.includes(id)) {
      currentIds = currentIds.filter((item) => item !== id);
    } else if (currentIds.length >= 3) {
      currentIds = [...currentIds.slice(1), id];
    } else {
      currentIds = [...currentIds, id];
    }
    notify();
  }, []);

  const addCompare = useCallback((id: string) => {
    if (!currentIds.includes(id) && currentIds.length < 3) {
      currentIds = [...currentIds, id];
      notify();
    }
  }, []);

  const removeCompare = useCallback((id: string) => {
    currentIds = currentIds.filter((item) => item !== id);
    notify();
  }, []);

  const clearCompare = useCallback(() => {
    currentIds = [];
    notify();
  }, []);

  const isCompared = useCallback(
    (id: string) => comparisonIds.includes(id),
    [comparisonIds],
  );

  return {
    comparisonIds,
    isCompared,
    toggleCompare,
    addCompare,
    removeCompare,
    clearCompare,
  };
}
