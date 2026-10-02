import { useState, useMemo, useCallback } from 'react';
import {
  EAC_PROVINCE_STATS,
  EAC_METADATA,
} from '../data/eac-province-stats';
import {
  PROVINCE_IMAGES,
  DEFAULT_EAC_IMAGE,
  type EACModalImageInfo,
} from '../data/eac-types';

export type SortField = 'stations' | 'chargers' | 'name';
export type SortOrder = 'asc' | 'desc';

export function useEacStats() {
  const [search, setSearch] = useState('');
  const [selectedProvinceId, setSelectedProvinceId] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>('stations');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [activeModalImage, setActiveModalImage] = useState<EACModalImageInfo | null>(null);

  const filteredProvinces = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = EAC_PROVINCE_STATS.filter((item) => {
      if (!q) return true;
      return (
        item.nameKh.toLowerCase().includes(q) ||
        item.nameEn.toLowerCase().includes(q) ||
        item.region.toLowerCase().includes(q)
      );
    });

    list = [...list].sort((a, b) => {
      let result = 0;
      if (sortField === 'stations') {
        result = b.stations - a.stations || b.chargers - a.chargers;
      } else if (sortField === 'chargers') {
        result = b.chargers - a.chargers || b.stations - a.stations;
      } else if (sortField === 'name') {
        result = a.nameEn.localeCompare(b.nameEn);
      }
      return sortOrder === 'desc' ? result : -result;
    });

    return list;
  }, [search, sortField, sortOrder]);

  const selectedProvince = useMemo(() => {
    if (!selectedProvinceId) return null;
    return EAC_PROVINCE_STATS.find((p) => p.id === selectedProvinceId) || null;
  }, [selectedProvinceId]);

  const summary = useMemo(() => {
    const totalCoveredProvinces = EAC_PROVINCE_STATS.length;
    const totalStations = EAC_METADATA.totalStations;
    const totalChargers = EAC_METADATA.totalChargers;
    const avgChargersPerStation = (totalChargers / totalStations).toFixed(1);
    const topProvince = [...EAC_PROVINCE_STATS].sort((a, b) => b.stations - a.stations)[0];

    return {
      totalCoveredProvinces,
      totalStations,
      totalChargers,
      avgChargersPerStation,
      topProvince,
    };
  }, []);

  const handleSelectProvince = useCallback((id: string) => {
    setSelectedProvinceId((prev) => (prev === id ? null : id));
    const provImg = PROVINCE_IMAGES[id];
    if (provImg) {
      setActiveModalImage(provImg);
    }
  }, []);

  const handleClearSelected = useCallback(() => {
    setSelectedProvinceId(null);
  }, []);

  const handleToggleSort = useCallback((field: SortField) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'));
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  }, [sortField]);

  const handleOpenImageModal = useCallback((img?: EACModalImageInfo) => {
    setActiveModalImage(img || DEFAULT_EAC_IMAGE);
  }, []);

  const handleCloseImageModal = useCallback(() => {
    setActiveModalImage(null);
  }, []);

  return {
    metadata: EAC_METADATA,
    provinces: filteredProvinces,
    allProvinces: EAC_PROVINCE_STATS,
    selectedProvince,
    selectedProvinceId,
    search,
    sortField,
    sortOrder,
    summary,
    isImageModalOpen: activeModalImage !== null,
    activeModalImage,
    setSearch,
    handleSelectProvince,
    handleClearSelected,
    handleToggleSort,
    handleOpenImageModal,
    handleCloseImageModal,
  };
}

