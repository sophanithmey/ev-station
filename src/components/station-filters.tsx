import type { ChargingStation } from '../data/charging-stations';
import SearchInput from './search-input';

type Props = {
  search: string;
  connector: string;
  speed?: string;
  only24Hours: boolean;
  onlyNearMe?: boolean;
  isLocating?: boolean;
  hasActiveFilters: boolean;
  stations: ChargingStation[];
  onSearchChange: (value: string) => void;
  onConnectorChange: (value: string) => void;
  onSpeedChange?: (value: string) => void;
  onToggle24Hours: () => void;
  onToggleNearMe?: () => void;
  onClearFilters: () => void;
};

const connectors = [
  { id: 'all', label: 'All Plugs' },
  { id: 'GB-T', label: 'GB-T' },
  { id: 'CCS2', label: 'CCS2' },
  { id: 'GB-T/CCS2', label: 'Dual GB/CCS' },
  { id: 'Type 2', label: 'Type 2' },
];

const speeds = [
  { id: 'all', label: 'All Speeds' },
  { id: 'dc_fast', label: '⚡ DC Fast' },
  { id: 'ac_standard', label: '🔌 AC' },
];

export default function StationFilters({
  search,
  connector,
  speed = 'all',
  only24Hours,
  onlyNearMe = false,
  isLocating = false,
  hasActiveFilters,
  onSearchChange,
  onConnectorChange,
  onSpeedChange,
  onToggle24Hours,
  onToggleNearMe,
  onClearFilters,
}: Props) {
  return (
    <div className='flex flex-col gap-2'>
      <SearchInput value={search} onChange={onSearchChange} />

      <div className='flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none'>
        {onToggleNearMe && (
          <button
            type='button'
            onClick={onToggleNearMe}
            disabled={isLocating}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 disabled:opacity-60 cursor-pointer ${
              onlyNearMe
                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-700/20'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-800'
            }`}
          >
            {isLocating ? (
              <span className='w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin' />
            ) : (
              <span>📍</span>
            )}
            <span>{isLocating ? 'Locating...' : onlyNearMe ? 'Near Me ✓' : 'Near Me'}</span>
          </button>
        )}

        {onToggleNearMe && <span className='h-4 w-px bg-slate-200 shrink-0 mx-0.5' />}

        {connectors.map((c) => {
          const isActive = connector === c.id;
          return (
            <button
              key={c.id}
              type='button'
              onClick={() => onConnectorChange(c.id)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 cursor-pointer ${
                isActive
                  ? 'bg-slate-900 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-800'
              }`}
            >
              {c.label}
            </button>
          );
        })}

        {onSpeedChange && (
          <>
            <span className='h-4 w-px bg-slate-200 shrink-0 mx-0.5' />
            {speeds.map((s) => {
              const isActive = speed === s.id;
              return (
                <button
                  key={s.id}
                  type='button'
                  onClick={() => onSpeedChange(s.id)}
                  className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 cursor-pointer ${
                    isActive
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-800'
                  }`}
                >
                  {s.label}
                </button>
              );
            })}
          </>
        )}

        <span className='h-4 w-px bg-slate-200 shrink-0 mx-0.5' />

        <button
          type='button'
          onClick={onToggle24Hours}
          className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer ${
            only24Hours
              ? 'bg-emerald-500 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-800'
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${only24Hours ? 'bg-white' : 'bg-emerald-400'}`} />
          24/7
        </button>

        {hasActiveFilters && (
          <>
            <span className='h-4 w-px bg-slate-200 shrink-0 mx-0.5' />
            <button
              type='button'
              onClick={onClearFilters}
              className='shrink-0 px-3 py-1.5 rounded-full text-xs font-medium text-slate-500 hover:text-red-600 bg-white border border-slate-200 hover:border-red-200 transition-all active:scale-95 cursor-pointer'
            >
              Reset
            </button>
          </>
        )}
      </div>
    </div>
  );
}
