type Props = {
  mobileView: 'map' | 'list';
  filteredCount: number;
  onSelectView: (view: 'map' | 'list') => void;
  onlyNearMe?: boolean;
  isLocating?: boolean;
  onToggleNearMe?: () => void;
};

export default function MobileViewSwitcher({
  mobileView,
  filteredCount,
  onSelectView,
  onlyNearMe = false,
  isLocating = false,
  onToggleNearMe,
}: Props) {
  const isMap = mobileView === 'map';
  const isList = mobileView === 'list';

  return (
    <div
      role='tablist'
      aria-label='Mobile view mode switcher'
      className='fixed bottom-20 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 lg:hidden flex items-center p-1 bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 rounded-full shadow-2xl shadow-slate-950/50 select-none'
    >
      {/* Map Tab */}
      <button
        type='button'
        role='tab'
        aria-selected={isMap}
        onClick={() => onSelectView('map')}
        className={`h-8 px-3.5 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 transition-all duration-150 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
          isMap
            ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-950/40'
            : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
        }`}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='w-3.5 h-3.5 shrink-0'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7'
          />
        </svg>
        <span>Map</span>
      </button>

      {/* List Tab */}
      <button
        type='button'
        role='tab'
        aria-selected={isList}
        onClick={() => onSelectView('list')}
        className={`h-8 px-3.5 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 transition-all duration-150 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
          isList
            ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-950/40'
            : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
        }`}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='w-3.5 h-3.5 shrink-0'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M4 6h16M4 12h16M4 18h7'
          />
        </svg>
        <span>List</span>
        <span
          className={`ml-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold leading-none shrink-0 ${
            isList
              ? 'bg-emerald-700/90 text-white'
              : 'bg-slate-800 text-slate-300 border border-slate-700'
          }`}
        >
          {filteredCount}
        </span>
      </button>

      {/* Near Me Quick Action in Floating Switcher (when on list view) */}
      {isList && onToggleNearMe && (
        <>
          <span className='h-4 w-px bg-slate-700/80 mx-0.5 shrink-0' />
          <button
            type='button'
            onClick={onToggleNearMe}
            disabled={isLocating}
            className={`h-8 px-3 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 transition-all duration-150 active:scale-95 disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
              onlyNearMe
                ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-950/40'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            {isLocating ? (
              <svg
                className='animate-spin w-3 h-3 text-current shrink-0'
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
                className='w-3.5 h-3.5 shrink-0'
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
                  ? 'Nearest ✓'
                  : 'Near Me'}
            </span>
          </button>
        </>
      )}
    </div>
  );
}
