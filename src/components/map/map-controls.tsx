type Props = {
  isLocating: boolean;
  isNearMeActive: boolean;
  hasUserLocation: boolean;
  onLocateClick: () => void;
};

export default function MapControls({
  isLocating,
  isNearMeActive,
  hasUserLocation,
  onLocateClick,
}: Props) {
  return (
    <div className='absolute top-3 left-3 z-[400] flex items-center gap-2'>
      <button
        type='button'
        onClick={onLocateClick}
        disabled={isLocating}
        title={
          isNearMeActive
            ? 'Tap to zoom back to full Cambodia view'
            : hasUserLocation
              ? 'Tap to zoom back to your location'
              : 'Find stations near your location'
        }
        className={`flex items-center gap-1.5 backdrop-blur-md px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all active:scale-95 disabled:opacity-60 shadow-sm ${
          isNearMeActive
            ? 'bg-emerald-600 text-white border-emerald-500 shadow-emerald-600/20 ring-2 ring-emerald-300/50'
            : hasUserLocation
              ? 'bg-white/95 border-slate-300 text-slate-700 hover:bg-white hover:text-emerald-700'
              : 'bg-white/95 border-slate-200 text-slate-700 hover:text-emerald-700 hover:bg-white'
        }`}
      >
        {isLocating ? (
          <svg
            className='animate-spin w-3.5 h-3.5 text-current'
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
        ) : isNearMeActive ? (
          <span className='relative flex items-center justify-center w-3.5 h-3.5'>
            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-50'></span>
            <span className='relative inline-flex rounded-full h-2 w-2 bg-white'></span>
          </span>
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
            : isNearMeActive
              ? 'Near Me ✓'
              : hasUserLocation
                ? 'Near Me'
                : 'Locate Me'}
        </span>
      </button>
    </div>
  );
}
