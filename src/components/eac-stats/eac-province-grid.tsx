import { memo } from 'react';
import type { EACProvinceStat } from '../../data/eac-province-stats';
import type { SortField, SortOrder } from '../../hooks/use-eac-stats';

interface Props {
  provinces: EACProvinceStat[];
  selectedProvinceId: string | null;
  search: string;
  sortField: SortField;
  sortOrder: SortOrder;
  onSearchChange: (value: string) => void;
  onToggleSort: (field: SortField) => void;
  onSelectProvince: (id: string) => void;
}

function EacProvinceGrid({
  provinces,
  selectedProvinceId,
  search,
  sortField,
  sortOrder,
  onSearchChange,
  onToggleSort,
  onSelectProvince,
}: Props) {
  const maxStations = 84;

  return (
    <section className='bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs space-y-4 [contain:paint] [content-visibility:auto] [contain-intrinsic-size:auto_400px]'>
      {/* Header, Search & Sort controls */}
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3'>
        <div>
          <h3 className='text-base font-bold text-slate-900 font-["Kantumruy_Pro",sans-serif]'>
            បញ្ជីរាយនាមខេត្ត-រាជធានី ({provinces.length})
          </h3>
          <p className='text-xs text-slate-500'>
            Province-by-province breakdown of authorized EV stations & chargers
          </p>
        </div>

        <div className='flex items-center gap-2 flex-wrap'>
          {/* Search box */}
          <div className='relative min-w-[180px] sm:min-w-[220px]'>
            <input
              type='text'
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder='ស្វែងរកខេត្ត / Search province...'
              className='w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 pl-8 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-800'
            />
            <svg
              className='w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth={2}
            >
              <circle cx='11' cy='11' r='8' />
              <line x1='21' y1='21' x2='16.65' y2='16.65' />
            </svg>
          </div>

          {/* Sort Buttons */}
          <div className='flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200'>
            <button
              type='button'
              onClick={() => onToggleSort('stations')}
              className={`px-2 py-1 text-[11px] font-semibold rounded-lg transition-all ${
                sortField === 'stations'
                  ? 'bg-white text-emerald-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ស្ថានីយ {sortField === 'stations' && (sortOrder === 'desc' ? '↓' : '↑')}
            </button>
            <button
              type='button'
              onClick={() => onToggleSort('chargers')}
              className={`px-2 py-1 text-[11px] font-semibold rounded-lg transition-all ${
                sortField === 'chargers'
                  ? 'bg-white text-teal-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ទូសាក {sortField === 'chargers' && (sortOrder === 'desc' ? '↓' : '↑')}
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Province Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5'>
        {provinces.map((prov, index) => {
          const isSelected = selectedProvinceId === prov.id;
          const ratioPercent = Math.round((prov.stations / maxStations) * 100);

          return (
            <button
              key={prov.id}
              type='button'
              onClick={() => onSelectProvince(prov.id)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2.5 ${
                isSelected
                  ? 'bg-emerald-50/90 border-emerald-500 shadow-sm ring-2 ring-emerald-400/40'
                  : 'bg-white hover:bg-slate-50/80 border-slate-200/90 hover:border-slate-300'
              }`}
            >
              <div className='flex items-start justify-between gap-2'>
                <div>
                  <div className='flex items-center gap-1.5'>
                    <span className='text-[10px] font-bold text-slate-400'>
                      #{index + 1}
                    </span>
                    <h4 className='text-sm font-bold font-["Kantumruy_Pro",sans-serif] text-slate-900 leading-snug'>
                      {prov.nameKh}
                    </h4>
                  </div>
                  <p className='text-[11px] text-slate-500 font-medium'>
                    {prov.nameEn}
                  </p>
                </div>

                <div className='text-right'>
                  <span className='inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs font-["Kantumruy_Pro",sans-serif]'>
                    {prov.stations} ស្ថានីយ
                  </span>
                  <div className='text-[10px] font-semibold text-teal-700 mt-0.5 font-["Kantumruy_Pro",sans-serif]'>
                    {prov.chargers} ទូសាក
                  </div>
                </div>
              </div>

              {/* Station Volume Benchmark Bar */}
              <div className='w-full'>
                <div className='h-1.5 w-full bg-slate-100 rounded-full overflow-hidden'>
                  <div
                    style={{ width: `${Math.max(ratioPercent, 6)}%` }}
                    className='h-full bg-linear-to-r from-emerald-500 to-teal-500 rounded-full'
                  />
                </div>
                <div className='flex items-center justify-between text-[9px] text-slate-400 mt-1'>
                  <span>{prov.region} Region</span>
                  <span>{((prov.stations / 234) * 100).toFixed(1)}% of total</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default memo(EacProvinceGrid);
