type Props = {
  filteredCount: number;
  hasActiveFilters: boolean;
  onlyNearMe: boolean;
  isLocating: boolean;
  onToggleNearMe: () => void;
};

export default function StationListHeader({
  filteredCount,
  hasActiveFilters,
  onlyNearMe,
  isLocating,
  onToggleNearMe,
}: Props) {
  return (
    <div className='flex items-center justify-between text-xs text-slate-500 px-0.5 shrink-0'>
      <span className='flex items-center gap-1.5'>
        <strong className='text-slate-700'>{filteredCount}</strong>{' '}
        {filteredCount === 1 ? 'station' : 'stations'}
        {hasActiveFilters && (
          <span className='text-slate-400'> · filtered</span>
        )}
        {onlyNearMe && (
          <span className='text-emerald-700 font-semibold'>
            · Nearest first
          </span>
        )}
      </span>

      <div className='flex items-center gap-1.5'>
        <button
          type='button'
          onClick={onToggleNearMe}
          disabled={isLocating}
          className={`inline-flex sm:hidden items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border transition-all active:scale-95 ${
            onlyNearMe
              ? 'bg-emerald-600 text-white border-emerald-600'
              : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
          }`}
        >
          <span>📍</span>
          <span>
            {isLocating ? 'Locating...' : onlyNearMe ? 'Nearest ✓' : 'Near Me'}
          </span>
        </button>
        <span className='hidden sm:inline-flex items-center gap-1 text-[11px] text-emerald-700 font-semibold bg-emerald-50/90 border border-emerald-200/80 px-2 py-0.5 rounded-full'>
          <span>🌱</span>
          <span>Clean Energy Travel</span>
        </span>
      </div>
    </div>
  );
}
