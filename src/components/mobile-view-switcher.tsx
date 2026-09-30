import { useLayoutEffect, useRef, useState } from 'react';

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

  const mapBtnRef = useRef<HTMLButtonElement>(null);
  const listBtnRef = useRef<HTMLButtonElement>(null);
  const [indicatorTop, setIndicatorTop] = useState(0);
  const [indicatorH, setIndicatorH] = useState(0);

  useLayoutEffect(() => {
    const btn = isMap ? mapBtnRef.current : listBtnRef.current;
    if (!btn) return;
    setIndicatorTop(btn.offsetTop);
    setIndicatorH(btn.offsetHeight);
  }, [isMap]);

  return (
    <div className='fixed right-3 top-1/2 -translate-y-1/2 z-30 lg:hidden'>
      <div
        role='tablist'
        aria-label='Mobile view mode switcher'
        className='relative flex flex-col items-center p-1.5 gap-0.5 bg-white/25 backdrop-blur-3xl border border-white/50 rounded-2xl shadow-2xl shadow-black/20 select-none'
        style={{ WebkitBackdropFilter: 'blur(40px)' }}
      >
        {/* Sliding active pill — slides between Map and List */}
        <span
          aria-hidden='true'
          className='absolute left-1.5 right-1.5 rounded-xl bg-emerald-500/90 shadow-md shadow-emerald-600/30 pointer-events-none'
          style={{
            top: indicatorTop,
            height: indicatorH,
            transition: 'top 320ms cubic-bezier(0.34,1.4,0.64,1), height 200ms ease',
          }}
        />

      {/* Map Tab */}
      <button
        ref={mapBtnRef}
        type='button'
        role='tab'
        aria-selected={isMap}
        onClick={() => onSelectView('map')}
        className={`relative z-10 w-11 py-3 rounded-xl text-[10px] font-semibold flex flex-col items-center justify-center gap-1.5 shrink-0 active:scale-[0.93] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 transition-colors duration-200 ${
          isMap ? 'text-white' : 'text-slate-700 hover:text-slate-900'
        }`}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='w-4 h-4 shrink-0'
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

      {/* Divider */}
      <span className='relative z-10 w-6 h-px bg-white/50 shrink-0' />

      {/* List Tab */}
      <button
        ref={listBtnRef}
        type='button'
        role='tab'
        aria-selected={isList}
        onClick={() => onSelectView('list')}
        className={`relative z-10 w-11 py-3 rounded-xl text-[10px] font-semibold flex flex-col items-center justify-center gap-1.5 shrink-0 active:scale-[0.93] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 transition-colors duration-200 ${
          isList ? 'text-white' : 'text-slate-700 hover:text-slate-900'
        }`}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='w-4 h-4 shrink-0'
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
          className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold leading-none shrink-0 transition-colors duration-200 ${
            isList
              ? 'bg-white/30 text-white border border-white/40'
              : 'bg-black/10 text-slate-600 border border-white/30'
          }`}
        >
          {filteredCount}
        </span>
      </button>

      {/* Near Me — shown below list tab when in list view */}
      {isList && onToggleNearMe && (
        <>
          <span className='relative z-10 w-6 h-px bg-white/50 shrink-0' />
          <button
            type='button'
            onClick={onToggleNearMe}
            disabled={isLocating}
            className={`relative z-10 w-11 py-3 rounded-xl text-[10px] font-semibold flex flex-col items-center justify-center gap-1.5 shrink-0 active:scale-[0.93] disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 transition-all duration-200 ${
              onlyNearMe
                ? 'bg-emerald-500/90 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-700 hover:text-slate-900 hover:bg-white/30'
            }`}
          >
            {isLocating ? (
              <svg
                className='animate-spin w-4 h-4 text-current shrink-0'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
                <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v8H4z' />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-4 h-4 shrink-0'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                <path strokeLinecap='round' strokeLinejoin='round' d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
              </svg>
            )}
            <span>{isLocating ? 'Locating' : onlyNearMe ? 'Nearest' : 'Near Me'}</span>
          </button>
        </>
      )}
      </div>
    </div>
  );
}
