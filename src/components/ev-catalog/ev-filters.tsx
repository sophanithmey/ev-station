import type { CatalogSource } from '../../hooks/use-ev-catalog';

type Props = {
  source: CatalogSource;
  search: string;
  brand: string;
  bodyType: string;
  onSourceChange: (val: CatalogSource) => void;
  onSearchChange: (val: string) => void;
  onBrandChange: (val: string) => void;
  onBodyTypeChange: (val: string) => void;
  onReset: () => void;
};

const BRANDS = [
  'all',
  'BYD',
  'Tesla',
  'VinFast',
  'Hyundai',
  'MG',
  'Zeekr',
  'XPENG',
  'Toyota',
  'BMW',
  'Audi',
  'Kia',
  'Wuling',
];
const BODY_TYPES = ['all', 'SUV', 'Sedan', 'Hatchback', 'Crossover', 'Wagon', 'Van', 'City Car'];

export default function EvFilters({
  source,
  search,
  brand,
  bodyType,
  onSourceChange,
  onSearchChange,
  onBrandChange,
  onBodyTypeChange,
  onReset,
}: Props) {
  const hasFilters = search !== '' || brand !== 'all' || bodyType !== 'all' || source !== 'all';

  return (
    <div className='bg-white border border-slate-200/90 rounded-2xl p-3.5 space-y-3 text-xs text-slate-700 shadow-sm'>
      {/* Top Bar: Source Selector & Search */}
      <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5'>
        <div className='flex items-center gap-1 p-1 bg-slate-100 rounded-xl shrink-0'>
          {(['all', 'cambodia', 'open-evdb'] as const).map((s) => (
            <button
              key={s}
              type='button'
              onClick={() => onSourceChange(s)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                source === s
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {s === 'all' ? 'All (535)' : s === 'cambodia' ? 'Cambodia (9)' : 'Open-EVDB (526)'}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className='relative flex-1'>
          <input
            type='text'
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder='Search EV models (e.g. Model Y, Atto 3, Ioniq 5, Taycan)...'
            className='w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-emerald-500 text-xs'
          />
          {search && (
            <button
              type='button'
              onClick={() => onSearchChange('')}
              className='absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer'
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Brand & Body Type Filter Chips */}
      <div className='flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none'>
        <span className='text-[10px] text-slate-500 font-semibold uppercase shrink-0 mr-1'>
          Brand:
        </span>
        {BRANDS.map((b) => (
          <button
            key={b}
            type='button'
            onClick={() => onBrandChange(b)}
            className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors cursor-pointer ${
              brand.toLowerCase() === b.toLowerCase()
                ? 'bg-emerald-600 text-white font-bold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            {b === 'all' ? 'All Brands' : b}
          </button>
        ))}

        <span className='h-3.5 w-px bg-slate-200 shrink-0 mx-1' />

        <span className='text-[10px] text-slate-500 font-semibold uppercase shrink-0 mr-1'>
          Type:
        </span>
        {BODY_TYPES.map((t) => (
          <button
            key={t}
            type='button'
            onClick={() => onBodyTypeChange(t)}
            className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors cursor-pointer ${
              bodyType === t
                ? 'bg-slate-900 text-white font-bold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            {t === 'all' ? 'All Types' : t}
          </button>
        ))}

        {hasFilters && (
          <>
            <span className='h-3.5 w-px bg-slate-200 shrink-0 mx-1' />
            <button
              type='button'
              onClick={onReset}
              className='shrink-0 px-2 py-1 text-[11px] text-rose-600 hover:underline cursor-pointer font-semibold'
            >
              Reset
            </button>
          </>
        )}
      </div>
    </div>
  );
}
