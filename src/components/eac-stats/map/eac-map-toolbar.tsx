import { memo } from 'react';
import type { EACModalImageInfo } from '../../../data/eac-types';

interface Props {
  onOpenImage: (image?: EACModalImageInfo) => void;
}

function EacMapToolbar({ onOpenImage }: Props) {
  return (
    <div className='w-full flex items-center justify-between gap-2 z-20 mb-2 sm:mb-3 pointer-events-auto flex-wrap'>
      <div className='flex items-center gap-2'>
        <div className='bg-white px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-slate-200 text-[11px] sm:text-xs font-bold text-slate-800 shadow-2xs flex items-center gap-2'>
          <span className='w-2 h-2 rounded-full bg-emerald-500 animate-pulse' />
          <span className='font-["Kantumruy_Pro",sans-serif]'>
            ផែនទីភូមិសាស្ត្រពិតកម្ពុជា (EAC Vector Map)
          </span>
        </div>
        <span className='hidden md:inline-flex text-[11px] font-semibold text-slate-500 bg-slate-100/80 px-2.5 py-1 rounded-lg border border-slate-200'>
          ២២ ខេត្ត-រាជធានី · ២៣៤ ស្ថានីយ · ៤២១ ទូសាក
        </span>
      </div>

      <button
        type='button'
        onClick={() => onOpenImage()}
        className='inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-slate-300 shadow-2xs transition-all active:scale-95 cursor-pointer'
      >
        <svg
          className='w-3.5 h-3.5 text-emerald-600'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth={2}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4'
          />
        </svg>
        <span className='font-["Kantumruy_Pro",sans-serif]'>
          រូបភាពផ្លូវការ EAC
        </span>
      </button>
    </div>
  );
}

export default memo(EacMapToolbar);
