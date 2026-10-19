import { memo } from 'react';
import type { EACProvinceStat } from '../../../data/eac-province-stats';
import { PROVINCE_IMAGES, type EACModalImageInfo } from '../../../data/eac-types';

interface Props {
  selectedProvince: EACProvinceStat;
  onClearSelected: () => void;
  onOpenImage: (image?: EACModalImageInfo) => void;
}

function EacMapSelectedCard({
  selectedProvince,
  onClearSelected,
  onOpenImage,
}: Props) {
  const provinceImage = PROVINCE_IMAGES[selectedProvince.id] || null;

  return (
    <div className='fixed bottom-4 left-4 right-4 sm:absolute sm:bottom-3 sm:left-auto sm:right-4 sm:w-80 bg-slate-900/95 backdrop-blur-md text-white p-3.5 sm:p-4 rounded-2xl border border-slate-700 shadow-2xl z-40 transition-all'>
      <div className='flex items-start justify-between gap-2'>
        <div>
          <div className='flex items-center gap-1.5'>
            <span className='w-2 h-2 rounded-full bg-emerald-400' />
            <span className='text-xs font-semibold text-slate-300 font-["Kantumruy_Pro",sans-serif]'>
              {selectedProvince.region} Region
            </span>
          </div>
          <h3 className='text-base sm:text-lg font-black font-["Kantumruy_Pro",sans-serif] text-white leading-tight mt-0.5'>
            {selectedProvince.nameKh} ({selectedProvince.nameEn})
          </h3>
        </div>
        <button
          type='button'
          onClick={onClearSelected}
          className='text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer'
          aria-label='Close province card'
        >
          ✕
        </button>
      </div>

      <div className='grid grid-cols-2 gap-2 mt-2.5 pt-2 border-t border-slate-800'>
        <div className='bg-slate-800/80 rounded-xl p-2 text-center'>
          <div className='text-[11px] text-slate-400 font-["Kantumruy_Pro",sans-serif]'>
            ស្ថានីយ (Stations)
          </div>
          <div className='text-base sm:text-lg font-black text-amber-300'>
            {selectedProvince.stations}
          </div>
        </div>
        <div className='bg-slate-800/80 rounded-xl p-2 text-center'>
          <div className='text-[11px] text-slate-400 font-["Kantumruy_Pro",sans-serif]'>
            ទូសាក (Chargers)
          </div>
          <div className='text-base sm:text-lg font-black text-emerald-400'>
            {selectedProvince.chargers}
          </div>
        </div>
      </div>

      {provinceImage && (
        <button
          type='button'
          onClick={() => onOpenImage(provinceImage)}
          className='w-full mt-2.5 flex items-center justify-center gap-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 font-["Kantumruy_Pro",sans-serif] text-xs font-bold py-2 px-3 rounded-xl transition-all cursor-pointer shadow-xs active:scale-98'
        >
          <svg
            className='w-4 h-4 text-emerald-400'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth={2}
          >
            <rect width='18' height='18' x='3' y='3' rx='2' ry='2' />
            <circle cx='9' cy='9' r='2' />
            <path d='m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21' />
          </svg>
          <span>មើលរូបភាពផ្លូវការ (View Image)</span>
        </button>
      )}
    </div>
  );
}

export default memo(EacMapSelectedCard);
