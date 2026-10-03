import { useState, useMemo, useCallback } from 'react';
import type { EACStationLocation } from '../data/eac-location-types';
import { getProvinceDirectory, PROVINCE_DIRECTORY_OPTIONS } from '../data/eac-locations-index';

export function useEacLocations(initialProvinceId: string = 'pursat') {
  const [provinceId, setProvinceId] = useState<string>(initialProvinceId);
  const [search, setSearch] = useState<string>('');
  const [selectedStationForQr, setSelectedStationForQr] = useState<EACStationLocation | null>(null);

  const directory = useMemo(() => getProvinceDirectory(provinceId), [provinceId]);

  const filteredStations = useMemo(() => {
    if (!search.trim()) return directory.stations;
    const query = search.toLowerCase().trim();

    return directory.stations.filter((st) => {
      const matchNameKh = st.nameKh.toLowerCase().includes(query);
      const matchNameEn = st.nameEn?.toLowerCase().includes(query);
      const matchAddress = st.addressKh.toLowerCase().includes(query);
      const matchPhone = st.phone.replace(/\s+/g, '').includes(query.replace(/\s+/g, ''));
      const matchNo = String(st.no) === query;

      return matchNameKh || matchNameEn || matchAddress || matchPhone || matchNo;
    });
  }, [directory.stations, search]);

  const summary = useMemo(() => {
    const stationsCount = filteredStations.length;
    const chargersCount = filteredStations.reduce((sum, s) => sum + s.chargersCount, 0);
    return { stationsCount, chargersCount };
  }, [filteredStations]);

  const handleSelectProvince = useCallback((id: string) => {
    setProvinceId(id);
    setSearch('');
  }, []);

  const handleOpenQr = useCallback((station: EACStationLocation) => {
    setSelectedStationForQr(station);
  }, []);

  const handleCloseQr = useCallback(() => {
    setSelectedStationForQr(null);
  }, []);

  return {
    provinceId,
    provinces: PROVINCE_DIRECTORY_OPTIONS,
    directory,
    search,
    filteredStations,
    summary,
    selectedStationForQr,
    setSearch,
    handleSelectProvince,
    handleOpenQr,
    handleCloseQr,
  };
}
