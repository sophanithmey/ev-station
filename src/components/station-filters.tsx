import type { ChargingStation } from '../data/charging-stations';
import SearchInput from './search-input';

type Props = {
  search: string;
  connector: string;
  only24Hours: boolean;
  onlyNearMe?: boolean;
  isLocating?: boolean;
  hasActiveFilters: boolean;
  stations: ChargingStation[];
  onSearchChange: (value: string) => void;
  onConnectorChange: (value: string) => void;
  onToggle24Hours: () => void;
  onToggleNearMe?: () => void;
  onClearFilters: () => void;
};

const connectors = [
  { id: 'all', label: 'All' },
  { id: 'GB-T', label: 'GB-T' },
  { id: 'GB-T/CCS2', label: 'GB-T/CCS2' },
  { id: 'CCS2', label: 'CCS2' },
];

const StationFilters = ({
  search,
  connector,
  only24Hours,
  onlyNearMe = false,
  isLocating = false,
  hasActiveFilters,
  onSearchChange,
  onConnectorChange,
  onToggle24Hours,
  onToggleNearMe,
  onClearFilters,
}: Props) => (
  <div className='flex flex-col gap-2'>
    {/* Row 1: Search Input */}
    <SearchInput value={search} onChange={onSearchChange} />

    {/* Row 2: Filter chips */}
    <div className='flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none'>
      {/* Near Me Quick Filter Chip */}
      {onToggleNearMe && (
        <button
          type='button'
          onClick={onToggleNearMe}
          disabled={isLocating}
          className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 disabled:opacity-60 ${
            onlyNearMe
              ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-700/20'
              : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-800'
          }`}
        >
          {isLocating ? (
            <svg
              className='animate-spin w-3 h-3 text-current'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              />
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8v8H4z'
              />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-3.5 h-3.5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
              />
            </svg>
          )}
          <span>
            {isLocating
              ? 'Locating...'
              : onlyNearMe
                ? 'Near Me ✓'
                : 'Near Me'}
          </span>
        </button>
      )}

      {onToggleNearMe && (
        <span className='h-4 w-px bg-slate-200 shrink-0 mx-0.5' />
      )}

      {connectors.map((c) => {
        const isActive = connector === c.id;
        return (
          <button
            key={c.id}
            type='button'
            onClick={() => onConnectorChange(c.id)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 ${
              isActive
                ? 'bg-slate-900 text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-800'
            }`}
          >
            {c.label}
          </button>
        );
      })}

      <span className='h-4 w-px bg-slate-200 shrink-0 mx-0.5' />

      {/* 24/7 toggle */}
      <button
        type='button'
        onClick={onToggle24Hours}
        className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 ${
          only24Hours
            ? 'bg-emerald-500 text-white'
            : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-800'
        }`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            only24Hours ? 'bg-white' : 'bg-emerald-400'
          }`}
        />
        24/7
      </button>

      {/* Clear — only when something is active */}
      {hasActiveFilters && (
        <>
          <span className='h-4 w-px bg-slate-200 shrink-0 mx-0.5' />
          <button
            type='button'
            id='clear-filters-btn'
            onClick={onClearFilters}
            className='shrink-0 px-3 py-1.5 rounded-full text-xs font-medium text-slate-500 hover:text-red-600 bg-white border border-slate-200 hover:border-red-200 transition-all active:scale-95'
          >
            Reset
          </button>
        </>
      )}
    </div>
  </div>
);

export default StationFilters;
