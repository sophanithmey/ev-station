import { useEvCatalog } from '../../hooks/use-ev-catalog';
import EvFilters from './ev-filters';
import EvCard from './ev-card';
import EvDetailModal from './ev-detail-modal';
import type { AppPage } from '../../hooks/use-app-navigation';

type Props = {
  onNavigate: (page: AppPage) => void;
};

export default function EvCatalogPage({ onNavigate }: Props) {
  const {
    source,
    search,
    brand,
    bodyType,
    filteredModels,
    totalCount,
    hasMore,
    selectedModel,
    comparisonIds,
    setSource,
    setSearch,
    setBrand,
    setBodyType,
    setSelectedModel,
    toggleCompare,
    clearFilters,
    loadMore,
  } = useEvCatalog();

  return (
    <div className='flex-1 w-full flex flex-col gap-3.5 pb-12 touch-pan-y relative'>
      {/* Header bar */}
      <div className='flex items-center justify-between gap-3 shrink-0'>
        <div>
          <h1 className='text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2'>
            <span>⚡</span>
            <span>Electric Vehicle Directory</span>
          </h1>
          <p className='text-xs text-slate-500'>
            Showing {filteredModels.length} of {totalCount} specifications from Cambodia and Open-EVDB.
          </p>
        </div>

        {comparisonIds.length > 0 && (
          <button
            type='button'
            onClick={() => onNavigate('compare')}
            className='py-2 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer shrink-0'
          >
            <span>Compare ({comparisonIds.length})</span>
            <span>→</span>
          </button>
        )}
      </div>

      {/* Filters */}
      <div className='shrink-0 sticky top-0 z-10 bg-slate-50/95 backdrop-blur-xs py-1'>
        <EvFilters
          source={source}
          search={search}
          brand={brand}
          bodyType={bodyType}
          onSourceChange={setSource}
          onSearchChange={setSearch}
          onBrandChange={setBrand}
          onBodyTypeChange={setBodyType}
          onReset={clearFilters}
        />
      </div>

      {/* Vehicle Grid */}
      <div className='w-full'>
        {filteredModels.length === 0 ? (
          <div className='p-12 text-center text-slate-600 bg-white border border-slate-200/90 rounded-2xl shadow-sm'>
            <p className='text-base font-bold text-slate-800'>No EV models match your filters</p>
            <p className='text-xs text-slate-500 mt-1'>Try broadening your search or resetting filters.</p>
            <button
              type='button'
              onClick={clearFilters}
              className='mt-3 px-3 py-1.5 rounded-xl bg-slate-100 text-emerald-700 text-xs font-semibold hover:bg-slate-200 cursor-pointer'
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3.5'>
            {filteredModels.map((model) => (
              <EvCard
                key={model.id}
                model={model}
                isCompared={comparisonIds.includes(model.id)}
                onSelect={setSelectedModel}
                onToggleCompare={toggleCompare}
              />
            ))}

            {hasMore && (
              <div className='col-span-full flex justify-center py-4'>
                <button
                  type='button'
                  onClick={loadMore}
                  className='px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors shadow-sm cursor-pointer'
                >
                  Load More Vehicles ({totalCount - filteredModels.length} remaining)
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedModel && (
        <EvDetailModal
          model={selectedModel}
          isCompared={comparisonIds.includes(selectedModel.id)}
          onClose={() => setSelectedModel(null)}
          onToggleCompare={toggleCompare}
        />
      )}
    </div>
  );
}
