import { useState, useMemo, useCallback } from 'react';
import type { EVModel } from '../types/vehicle';
import { CAMBODIA_EV_MODELS } from '../data/ev-models';
import { OPEN_EVDB_MODELS } from '../data/open-evdb-models';
import { useEvComparison } from './use-ev-comparison';

export type CatalogSource = 'cambodia' | 'open-evdb' | 'all';

export function useEvCatalog() {
  const [source, setSource] = useState<CatalogSource>('all');
  const [search, setSearch] = useState('');
  const [brand, setBrand] = useState('all');
  const [bodyType, setBodyType] = useState('all');
  const [visibleCount, setVisibleCount] = useState(24);
  const [selectedModel, setSelectedModel] = useState<EVModel | null>(null);

  const { comparisonIds, toggleCompare } = useEvComparison();

  const baseModels = useMemo(() => {
    if (source === 'cambodia') return CAMBODIA_EV_MODELS;
    if (source === 'open-evdb') return OPEN_EVDB_MODELS;
    return [...CAMBODIA_EV_MODELS, ...OPEN_EVDB_MODELS];
  }, [source]);

  const filteredModels = useMemo(() => {
    const q = search.toLowerCase().trim();
    return baseModels.filter((m) => {
      const matchSearch =
        q === '' ||
        m.modelName.toLowerCase().includes(q) ||
        m.brand.toLowerCase().includes(q) ||
        m.variant.toLowerCase().includes(q);

      const matchBrand = brand === 'all' || m.brand.toLowerCase() === brand.toLowerCase();
      const matchBody = bodyType === 'all' || m.bodyType === bodyType;

      return matchSearch && matchBrand && matchBody;
    });
  }, [baseModels, search, brand, bodyType]);

  const displayedModels = useMemo(() => {
    return filteredModels.slice(0, visibleCount);
  }, [filteredModels, visibleCount]);

  const hasMore = visibleCount < filteredModels.length;

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => prev + 24);
  }, []);

  const handleSourceChange = useCallback((newSource: CatalogSource) => {
    setSource(newSource);
    setVisibleCount(24);
  }, []);

  const handleSearchChange = useCallback((val: string) => {
    setSearch(val);
    setVisibleCount(24);
  }, []);

  const handleBrandChange = useCallback((val: string) => {
    setBrand(val);
    setVisibleCount(24);
  }, []);

  const handleBodyTypeChange = useCallback((val: string) => {
    setBodyType(val);
    setVisibleCount(24);
  }, []);

  const clearFilters = useCallback(() => {
    setSearch('');
    setBrand('all');
    setBodyType('all');
    setVisibleCount(24);
  }, []);

  return {
    source,
    search,
    brand,
    bodyType,
    filteredModels: displayedModels,
    totalCount: filteredModels.length,
    hasMore,
    selectedModel,
    comparisonIds,
    setSource: handleSourceChange,
    setSearch: handleSearchChange,
    setBrand: handleBrandChange,
    setBodyType: handleBodyTypeChange,
    setSelectedModel,
    toggleCompare,
    clearFilters,
    loadMore,
  };
}
