type Props = {
  mapsUrl: string;
  copied: boolean;
  onSelectOnMap?: () => void;
  onCopyCoords: (e: React.MouseEvent) => void;
};

export default function StationCardActions({
  mapsUrl,
  copied,
  onSelectOnMap,
  onCopyCoords,
}: Props) {
  return (
    <div className='flex items-center gap-2 pt-2 border-t border-slate-100 mt-auto'>
      {/* Map Action */}
      <button
        type='button'
        onClick={(e) => {
          e.stopPropagation();
          onSelectOnMap?.();
        }}
        className='flex-1 h-9 px-3 rounded-xl border border-slate-200 bg-slate-50/80 text-slate-700 text-xs font-semibold hover:bg-slate-100 hover:text-slate-900 active:scale-95 transition-all flex items-center justify-center gap-1.5 whitespace-nowrap'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='w-3.5 h-3.5 text-emerald-600 shrink-0'
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

      {/* Directions Action */}
      <a
        href={mapsUrl}
        target='_blank'
        rel='noopener noreferrer'
        onClick={(e) => e.stopPropagation()}
        className='flex-1 h-9 px-3 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 active:scale-95 transition-all shadow-xs flex items-center justify-center gap-1.5 whitespace-nowrap'
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
            d='M14 5l7 7m0 0l-7 7m7-7H3'
          />
        </svg>
        <span>Directions</span>
      </a>

      {/* Quick Copy Coordinates Button */}
      <button
        type='button'
        onClick={onCopyCoords}
        className='h-9 w-9 rounded-xl border border-slate-200 bg-slate-50/80 text-slate-500 hover:text-slate-800 hover:bg-slate-100 active:scale-95 transition-all flex items-center justify-center shrink-0'
        title={copied ? 'Coordinates Copied!' : 'Copy coordinates'}
        aria-label='Copy coordinates'
      >
        {copied ? (
          <span className='text-xs font-bold text-emerald-600'>✓</span>
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
              d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'
            />
          </svg>
        )}
      </button>
    </div>
  );
}
