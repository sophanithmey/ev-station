import { memo } from 'react';
import type { EACProvinceStat } from '../../../data/eac-province-stats';
import { PROVINCE_IMAGES } from '../../../data/eac-types';
import type { ProvincePathData } from './cambodia-map-paths';

interface Props {
  province: EACProvinceStat;
  pathData?: ProvincePathData;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

function EacMapCallout({
  province,
  pathData,
  isSelected,
  onSelect,
}: Props) {
  if (!pathData?.label) return null;

  const leftPercent = (pathData.label.x / 1200) * 100;
  const topPercent = (pathData.label.y / 820) * 100;
  const isCapital = province.id === 'phnom-penh';
  const hasPhoto = Boolean(PROVINCE_IMAGES[province.id]);

  const alignClass =
    pathData.label.align === 'left'
      ? '-translate-x-full -translate-y-1/2'
      : pathData.label.align === 'right'
      ? 'translate-x-0 -translate-y-1/2'
      : pathData.label.align === 'top'
      ? '-translate-x-1/2 -translate-y-full'
      : '-translate-x-1/2 translate-y-0';

  return (
    <div
      style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
      className={`absolute ${alignClass} pointer-events-auto z-10 transition-transform duration-150 touch-manipulation`}
    >
      <button
        type='button'
        onClick={() => onSelect(province.id)}
        className={`group flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-xl sm:rounded-2xl text-left transition-all duration-150 cursor-pointer shadow-xs whitespace-nowrap active:scale-95 ${
          isSelected
            ? 'bg-slate-900 text-white ring-2 sm:ring-2.5 ring-emerald-400 scale-105 shadow-xl z-30'
            : isCapital
            ? 'bg-emerald-700 text-white hover:bg-emerald-800 ring-2 ring-amber-300 shadow-md scale-102'
            : 'bg-white text-slate-900 hover:bg-emerald-50 hover:border-emerald-400 border border-slate-200/90 shadow-2xs hover:shadow-xs'
        }`}
        title={`${province.nameKh} (${province.nameEn}): ${province.stations} ស្ថានីយ, ${province.chargers} ទូសាក${
          hasPhoto ? ' (មានរូបភាព)' : ''
        }`}
      >
        <div
          className={`w-5 h-5 sm:w-6 sm:h-6 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 shadow-2xs ${
            isSelected || isCapital
              ? 'bg-emerald-400 text-slate-950'
              : 'bg-emerald-600 text-white group-hover:bg-emerald-500'
          }`}
        >
          <svg className='w-3 h-3 sm:w-3.5 sm:h-3.5' viewBox='0 0 24 24' fill='currentColor'>
            <path d='M13 10V3L4 14h7v7l9-11h-7z' />
          </svg>
        </div>

        <div className='flex items-center gap-1.5 sm:gap-2 leading-tight font-["Kantumruy_Pro",sans-serif]'>
          <div className='flex flex-col text-left leading-tight'>
            <span
              className={`text-[10px] sm:text-xs font-black ${
                isSelected || isCapital ? 'text-amber-300' : 'text-emerald-700 font-extrabold'
              }`}
            >
              {province.stations} ស្ថានីយ
            </span>
            <span
              className={`text-[9px] sm:text-[10.5px] font-semibold ${
                isSelected || isCapital ? 'text-slate-200' : 'text-slate-600'
              }`}
            >
              {province.chargers} ទូសាក
            </span>
          </div>

          <span
            className={`text-xs sm:text-sm font-extrabold pl-1 border-l flex items-center gap-1 ${
              isSelected || isCapital
                ? 'text-white border-slate-700'
                : 'text-slate-900 border-slate-200'
            }`}
          >
            <span>{province.nameKh}</span>
            {hasPhoto && (
              <svg
                className={`w-3.5 h-3.5 ${
                  isSelected || isCapital ? 'text-amber-300' : 'text-emerald-600'
                }`}
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth={2}
              >
                <rect width='18' height='18' x='3' y='3' rx='2' ry='2' />
                <circle cx='9' cy='9' r='2' />
                <path d='m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21' />
              </svg>
            )}
          </span>
        </div>
      </button>
    </div>
  );
}


export default memo(EacMapCallout);
