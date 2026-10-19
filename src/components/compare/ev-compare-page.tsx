import { useState } from 'react';
import type { AppPage } from '../../hooks/use-app-navigation';
import { ALL_EV_MODELS, CAMBODIA_EV_MODELS, OPEN_EVDB_MODELS } from '../../data/ev-models';
import { useEvComparison } from '../../hooks/use-ev-comparison';
import EvCompareChartsGrid from './ev-compare-charts-grid';
import EvCompareTable from './ev-compare-table';

type Props = {
  onNavigate: (page: AppPage) => void;
};

type ViewMode = 'both' | 'charts' | 'table';

export default function EvComparePage({ onNavigate }: Props) {
  const { comparisonIds, addCompare, removeCompare } = useEvComparison();
  const [viewMode, setViewMode] = useState<ViewMode>('both');

  const models = ALL_EV_MODELS.filter((m) => comparisonIds.includes(m.id));

  const cambodiaToAdd = CAMBODIA_EV_MODELS.filter((m) => !comparisonIds.includes(m.id));
  const openEvdbToAdd = OPEN_EVDB_MODELS.filter((m) => !comparisonIds.includes(m.id));

  return (
    <div className='flex-1 w-full flex flex-col gap-3.5 pb-12 touch-pan-y'>
      {/* Top Header */}
      <div className='flex items-center justify-between gap-3 shrink-0 flex-wrap'>
        <div>
          <h1 className='text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2'>
            <span>⚖️</span>
            <span>Side-by-Side EV Comparison</span>
          </h1>
          <p className='text-xs text-slate-500'>
            Compare official Cambodian specifications, battery performance, range & pricing.
          </p>
        </div>

        <div className='flex items-center gap-2'>
          {models.length > 0 && (
            <div className='flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs font-semibold'>
              <button
                type='button'
                onClick={() => setViewMode('both')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'both'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All
              </button>
              <button
                type='button'
                onClick={() => setViewMode('charts')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'charts'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                📊 Charts
              </button>
              <button
                type='button'
                onClick={() => setViewMode('table')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                📋 Table
              </button>
            </div>
          )}

          {(cambodiaToAdd.length > 0 || openEvdbToAdd.length > 0) && comparisonIds.length < 3 && (
            <select
              onChange={(e) => {
                if (e.target.value) {
                  addCompare(e.target.value);
                  e.target.value = '';
                }
              }}
              defaultValue=''
              className='bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:outline-hidden focus:border-emerald-500 max-w-55 cursor-pointer'
            >
              <option value='' disabled>
                + Add vehicle to compare
              </option>
              <optgroup label='Cambodia Official/Local'>
                {cambodiaToAdd.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.brand} {m.modelName} ({m.variant})
                  </option>
                ))}
              </optgroup>
              <optgroup label='Open-EVDB Global (526 Models)'>
                {openEvdbToAdd.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.brand} {m.modelName} ({m.variant})
                  </option>
                ))}
              </optgroup>
            </select>
          )}

          <button
            type='button'
            onClick={() => onNavigate('ev-catalog')}
            className='py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-semibold cursor-pointer'
          >
            ← EV Catalog
          </button>
        </div>
      </div>

      {/* Main Content / Empty State */}
      <div className='w-full'>
        {models.length === 0 ? (
          <div className='p-12 text-center text-slate-600 bg-white border border-slate-200/90 rounded-2xl shadow-sm'>
            <p className='text-base font-bold text-slate-800'>No EV models selected for comparison</p>
            <p className='text-xs text-slate-500 mt-1'>
              Select up to 3 vehicles from the catalog to compare specs.
            </p>
            <button
              type='button'
              onClick={() => onNavigate('ev-catalog')}
              className='mt-3 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer'
            >
              Browse Catalog
            </button>
          </div>
        ) : (
          <div className='flex flex-col gap-4 w-full'>
            {(viewMode === 'both' || viewMode === 'charts') && (
              <EvCompareChartsGrid models={models} />
            )}
            {(viewMode === 'both' || viewMode === 'table') && (
              <div className='flex flex-col gap-2'>
                {viewMode === 'both' && (
                  <h2 className='text-sm font-bold text-slate-900 mt-2'>
                    Detailed Specifications Table
                  </h2>
                )}
                <EvCompareTable models={models} onRemove={removeCompare} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
