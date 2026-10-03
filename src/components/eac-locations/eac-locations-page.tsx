import { useState, useCallback } from 'react';
import { useEacLocations } from '../../hooks/use-eac-locations';
import EacLocationsToolbar from './eac-locations-toolbar';
import EacLocationsTable from './eac-locations-table';
import EacLocationsQrModal from './eac-locations-qr-modal';
import EacImageModal from '../eac-stats/eac-image-modal';
import type { EACModalImageInfo } from '../../data/eac-types';

export default function EacLocationsPage() {
  const {
    provinceId,
    provinces,
    directory,
    search,
    filteredStations,
    summary,
    selectedStationForQr,
    setSearch,
    handleSelectProvince,
    handleOpenQr,
    handleCloseQr,
  } = useEacLocations('pursat');

  const [activePosterImage, setActivePosterImage] = useState<EACModalImageInfo | null>(null);

  const handleOpenPosterImage = useCallback(() => {
    if (!directory.imageSrc) return;
    setActivePosterImage({
      src: directory.imageSrc,
      title: directory.titleKh,
      subtitle: directory.titleEn,
      downloadName: `${directory.provinceId}-ev-stations.jpeg`,
    });
  }, [directory]);

  const handleClosePosterImage = useCallback(() => {
    setActivePosterImage(null);
  }, []);

  return (
    <div className='flex-1 min-h-0 w-full space-y-3 sm:space-y-4 pb-24 lg:pb-8 pr-0.5 scrollbar-thin lg:overflow-y-auto touch-pan-y'>
      {/* 1. Sleek Province Selector Pills & Fast Search Toolbar */}
      <EacLocationsToolbar
        directory={directory}
        provinces={provinces}
        selectedProvinceId={provinceId}
        search={search}
        summary={summary}
        onSelectProvince={handleSelectProvince}
        onSearchChange={setSearch}
        onOpenOriginalImage={handleOpenPosterImage}
      />

      {/* 2. Responsive Content: Mobile Touch Cards (< md) & Desktop 2-Column Table (>= md) */}
      <EacLocationsTable
        directory={directory}
        stations={filteredStations}
        summary={summary}
        onOpenQr={handleOpenQr}
      />

      {/* 3. Interactive QR Zoom & GPS Navigation Modal */}
      <EacLocationsQrModal
        station={selectedStationForQr}
        onClose={handleCloseQr}
      />

      {/* 4. Official Infographic High-Res Image Modal */}
      <EacImageModal
        isOpen={Boolean(activePosterImage)}
        imageData={activePosterImage}
        onClose={handleClosePosterImage}
      />
    </div>
  );
}
