type Props = {
  stationsCount: number;
  nearestDistance: number | null;
  onHudClick: () => void;
  onDismiss: () => void;
};

export default function MapLocationHud({
  stationsCount,
  nearestDistance,
  onHudClick,
  onDismiss,
}: Props) {
  return (
    <div
      role='status'
      aria-live='polite'
      onClick={onHudClick}
      className='absolute top-14 sm:top-3 left-1/2 -translate-x-1/2 z-400 max-w-[calc(100%-24px)] flex items-center gap-2 bg-slate-900/90 hover:bg-slate-900 active:scale-[0.98] backdrop-blur-xl text-white pl-3 pr-2 py-1.5 rounded-full shadow-xl shadow-slate-950/25 border border-slate-700/80 text-xs font-medium whitespace-nowrap cursor-pointer transition-all animate-in fade-in slide-in-from-top-2 duration-200'
      title='Tap to re-center on your location'
    >
      {/* Animated Radar Pulse */}
      <div className='relative flex items-center justify-center w-2.5 h-2.5 shrink-0'>
        <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75'></span>
        <span className='relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-xs shadow-emerald-400'></span>
      </div>

      {/* Status text */}
      <span className='font-semibold text-slate-100 text-xs tracking-tight shrink-0'>
        Live GPS
      </span>

      <span className='h-3 w-px bg-slate-700/90 shrink-0'></span>

      {/* Station count with bolt */}
      <span className='text-xs font-bold text-emerald-400 flex items-center gap-1 shrink-0'>
        <span className='text-[10px]'>⚡</span>
        <span>{stationsCount}</span>
        <span className='text-slate-300 font-normal text-[11px]'>found</span>
      </span>

      {/* Nearest station distance if available */}
      {nearestDistance !== null && (
        <>
          <span className='h-3 w-px bg-slate-700/90 shrink-0 hidden sm:inline-block'></span>
          <span className='text-slate-300 text-[11px] font-medium hidden sm:inline-block shrink-0'>
            Nearest:{' '}
            <strong className='text-white'>{nearestDistance} km</strong>
          </span>
        </>
      )}

      {/* Close button */}
      <button
        type='button'
        onClick={(e) => {
          e.stopPropagation();
          onDismiss();
        }}
        className='ml-0.5 w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-slate-300 hover:text-white flex items-center justify-center transition-colors shrink-0'
        title='Dismiss status'
        aria-label='Dismiss status'
      >
        <svg
          className='w-3 h-3'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2.5}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M6 18L18 6M6 6l12 12'
          />
        </svg>
      </button>
    </div>
  );
}
