import { memo } from 'react';

interface Props {
  canScrollLeft: boolean;
  canScrollRight: boolean;
  onScrollLeft: () => void;
  onScrollRight: () => void;
}

function EacMapNavButtons({
  canScrollLeft,
  canScrollRight,
  onScrollLeft,
  onScrollRight,
}: Props) {
  if (!canScrollLeft && !canScrollRight) return null;

  return (
    <>
      {canScrollLeft && (
        <button
          type='button'
          onClick={onScrollLeft}
          aria-label='Scroll map left'
          className='absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 hover:bg-white text-slate-700 hover:text-emerald-700 shadow-md border border-slate-200/90 flex items-center justify-center transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-xs'
        >
          <svg
            className='w-5 h-5'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth={2.5}
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='m15 18-6-6 6-6' />
          </svg>
        </button>
      )}

      {canScrollRight && (
        <button
          type='button'
          onClick={onScrollRight}
          aria-label='Scroll map right'
          className='absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 hover:bg-white text-slate-700 hover:text-emerald-700 shadow-md border border-slate-200/90 flex items-center justify-center transition-all duration-150 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-xs'
        >
          <svg
            className='w-5 h-5'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth={2.5}
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='m9 18 6-6-6-6' />
          </svg>
        </button>
      )}
    </>
  );
}

export default memo(EacMapNavButtons);
