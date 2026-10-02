import { useEacStats } from '../../hooks/use-eac-stats';
import EacKpiSummary from './eac-kpi-summary';
import EacCambodiaMap from './eac-cambodia-map';
import EacProvinceGrid from './eac-province-grid';
import EacImageModal from './eac-image-modal';

export default function EacStatsPage() {
  const {
    provinces,
    selectedProvince,
    selectedProvinceId,
    search,
    sortField,
    sortOrder,
    summary,
    isImageModalOpen,
    activeModalImage,
    setSearch,
    handleSelectProvince,
    handleClearSelected,
    handleToggleSort,
    handleOpenImageModal,
    handleCloseImageModal,
  } = useEacStats();

  return (
    <div className='flex-1 min-h-0 w-full space-y-3.5 sm:space-y-4 pb-24 lg:pb-8 pr-0.5 scrollbar-thin lg:overflow-y-auto touch-pan-y'>
      {/* 1. Key Summary KPI Metrics */}

      <EacKpiSummary
        summary={summary}
        onSelectTopProvince={handleSelectProvince}
      />

      {/* 3. Interactive Cambodia Map Infographic */}
      <EacCambodiaMap
        provinces={provinces}
        selectedProvince={selectedProvince}
        onSelectProvince={handleSelectProvince}
        onClearSelected={handleClearSelected}
        onOpenImage={handleOpenImageModal}
      />

      {/* 4. Searchable Province Breakdown Grid */}
      <EacProvinceGrid
        provinces={provinces}
        selectedProvinceId={selectedProvinceId}
        search={search}
        sortField={sortField}
        sortOrder={sortOrder}
        onSearchChange={setSearch}
        onToggleSort={handleToggleSort}
        onSelectProvince={handleSelectProvince}
      />

      {/* 5. High-Res Image Modal */}
      <EacImageModal
        isOpen={isImageModalOpen}
        imageData={activeModalImage}
        onClose={handleCloseImageModal}
      />
    </div>
  );
}

