import { memo } from 'react';
import type { EACProvinceStat } from '../../data/eac-province-stats';
import { PROVINCE_IMAGES, type EACModalImageInfo } from '../../data/eac-types';
import { PROVINCE_PATH_MAP } from './map/cambodia-map-paths';
import CambodiaSvgMesh from './map/cambodia-svg-mesh';
import EacMapCallout from './map/eac-map-callout';

interface Props {
  provinces: EACProvinceStat[];
  selectedProvince: EACProvinceStat | null;
  onSelectProvince: (id: string) => void;
  onClearSelected: () => void;
  onOpenImage: (image?: EACModalImageInfo) => void;
}

function EacCambodiaMap({
  provinces,
  selectedProvince,
  onSelectProvince,
  onClearSelected,
  onOpenImage,
}: Props) {
  const provinceImage = selectedProvince
    ? PROVINCE_IMAGES[selectedProvince.id]
    : null;

  return (
    <div className='relative w-full rounded-2xl bg-linear-to-b from-sky-50/70 via-emerald-50/30 to-slate-100/70 border border-slate-200/90 shadow-sm overflow-hidden p-3 sm:p-5 flex flex-col items-center justify-center min-h-[420px] sm:min-h-[580px] lg:min-h-[640px]'>
      {/* Top Map Action Bar */}
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

      {/* Main SVG Vector Canvas Stage */}
      <div className='w-full overflow-x-auto scrollbar-none py-1.5 touch-pan-x touch-pan-y overscroll-x-contain'>
        <div className='relative min-w-[760px] sm:min-w-[860px] lg:min-w-0 w-full max-w-5xl aspect-12/8 mx-auto flex items-center justify-center select-none px-3 sm:px-4 lg:px-0'>
          <div className='absolute inset-0 flex items-center justify-center'>
            <CambodiaSvgMesh
              selectedProvinceId={selectedProvince?.id || null}
              onSelectProvince={onSelectProvince}
            />
          </div>

          {provinces.map((prov) => (
            <EacMapCallout
              key={prov.id}
              province={prov}
              pathData={PROVINCE_PATH_MAP.get(prov.id)}
              isSelected={selectedProvince?.id === prov.id}
              onSelect={onSelectProvince}
            />
          ))}
        </div>
      </div>

      {/* Mobile Swipe Helper Hint */}
      <div className='sm:hidden flex items-center justify-center gap-1.5 text-[11px] text-slate-500 mt-1 font-medium bg-white/80 px-3 py-1 rounded-full border border-slate-200 shadow-2xs'>
        <span className='font-["Kantumruy_Pro",sans-serif]'>
          👈 អូសទៅស្តាំដើម្បីមើលខេត្តភាគខាងកើត (Swipe to view all provinces) 👉
        </span>
      </div>

      {/* Selected Province Floating Quick Card */}
      {selectedProvince && (
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
      )}
    </div>
  );
}

export default memo(EacCambodiaMap);
