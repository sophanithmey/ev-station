import { useMemo } from 'react';
import type { EACProvinceDirectory } from '../../data/eac-location-types';
import { CAMBODIA_PROVINCE_PATHS } from '../../data/cambodia-province-paths';
import ProvinceLandmarkSvg from './province-landmark-svg';
import { getProvinceLandmarkInfo } from './province-landmark-utils';

type Props = {
  directory: EACProvinceDirectory;
  stationsCount: number;
  chargersCount: number;
};

function getPathViewBox(d: string): string {
  const matches = d.matchAll(/([\d.]+),([\d.]+)/g);
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const match of matches) {
    const x = parseFloat(match[1]);
    const y = parseFloat(match[2]);
    if (!isNaN(x) && !isNaN(y)) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }

  if (!isFinite(minX) || !isFinite(minY)) return '0 0 1000 800';

  const padX = Math.max(10, (maxX - minX) * 0.08);
  const padY = Math.max(10, (maxY - minY) * 0.08);

  return `${minX - padX} ${minY - padY} ${maxX - minX + padX * 2} ${maxY - minY + padY * 2}`;
}

export default function EacLocationsSummaryBox({
  directory,
  stationsCount,
  chargersCount,
}: Props) {
  const provinceData = useMemo(() => {
    return CAMBODIA_PROVINCE_PATHS.find((p) => p.id === directory.provinceId) || null;
  }, [directory.provinceId]);

  const viewBox = useMemo(() => {
    if (!provinceData?.path) return '0 0 1000 800';
    return getPathViewBox(provinceData.path);
  }, [provinceData]);

  const landmark = useMemo(() => {
    return getProvinceLandmarkInfo(directory.provinceId);
  }, [directory.provinceId]);

  return (
    <div className='relative overflow-hidden w-full bg-linear-to-b md:bg-linear-to-r from-blue-50/80 via-white/95 to-indigo-50/70 rounded-2xl border border-blue-200/80 shadow-xs p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-5'>
      {/* 0. Authentic Cambodian Heritage Landmark Watermark Background */}
      <div
        aria-hidden='true'
        className='absolute inset-0 pointer-events-none overflow-hidden opacity-[0.07] sm:opacity-[0.09] text-blue-950 flex items-end justify-center'
      >
        <ProvinceLandmarkSvg provinceId={directory.provinceId} className='w-full h-auto min-h-[160%] translate-y-6 scale-105' />
      </div>

      {/* 1. Left Side: Official Summary KPI Info */}
      <div className='relative z-10 flex flex-col gap-3 w-full md:w-auto md:min-w-[280px] lg:min-w-[340px] shrink-0'>
        <div className='flex items-center justify-between bg-white/90 backdrop-blur-xs rounded-xl border-2 border-blue-300 px-4 py-3 shadow-2xs'>
          <span className='text-base sm:text-lg font-black text-blue-900 font-["Kantumruy_Pro",sans-serif]'>
            សរុប
          </span>
          <div className='flex items-center gap-6 sm:gap-8'>
            <div className='text-center'>
              <span className='block text-2xl sm:text-3xl font-black text-blue-900 leading-none'>
                {stationsCount}
              </span>
              <span className='text-[10px] font-bold text-slate-500 uppercase tracking-tight'>
                ស្ថានីយ
              </span>
            </div>
            <div className='h-9 w-px bg-slate-200' />
            <div className='text-center'>
              <span className='block text-2xl sm:text-3xl font-black text-emerald-600 leading-none'>
                {chargersCount}
              </span>
              <span className='text-[10px] font-bold text-slate-500 uppercase tracking-tight'>
                ទូសាក
              </span>
            </div>
          </div>
        </div>

        <div className='px-1 flex items-center justify-between text-xs text-slate-600'>
          <span className='font-bold text-slate-800 font-["Kantumruy_Pro",sans-serif] flex items-center gap-1.5'>
            <span>🏛️</span>
            <span>{landmark.label}</span>
          </span>
        </div>
      </div>

      {/* 2. Right Side: Large Scaled SVG Map Shape */}
      <div className='relative z-10 flex-1 w-full flex flex-col items-center justify-center p-3.5 rounded-xl bg-white/85 backdrop-blur-xs border border-slate-200/80 shadow-2xs overflow-hidden'>
        {/* Subtle Landmark SVG Silhouette behind the Map Shape */}
        <div
          aria-hidden='true'
          className='absolute inset-0 pointer-events-none opacity-[0.06] text-rose-950 flex items-center justify-center'
        >
          <ProvinceLandmarkSvg provinceId={directory.provinceId} className='w-full h-full object-cover scale-125' />
        </div>

        <div className='relative z-10 text-center mb-2'>
          <h3 className='text-sm sm:text-base font-extrabold text-emerald-800 font-["Kantumruy_Pro",sans-serif] block leading-snug'>
            ខេត្ត{directory.provinceKh}
          </h3>
          <p className='text-xs font-semibold text-slate-600 font-["Kantumruy_Pro",sans-serif]'>
            ({stationsCount} ស្ថានីយ = {chargersCount} ទូសាក)
          </p>
        </div>

        {/* Scaled Province SVG Map */}
        <div className='relative z-10 w-full h-48 sm:h-56 max-w-sm sm:max-w-md flex items-center justify-center'>
          {provinceData ? (
            <svg
              viewBox={viewBox}
              className='w-full h-full filter drop-shadow-md transition-all duration-300'
            >
              <defs>
                <linearGradient id={`prov-bg-grad-${directory.provinceId}`} x1='0%' y1='0%' x2='100%' y2='100%'>
                  <stop offset='0%' stopColor='#fecdd3' />
                  <stop offset='100%' stopColor='#fda4af' />
                </linearGradient>
              </defs>
              <path
                d={provinceData.path}
                fill={`url(#prov-bg-grad-${directory.provinceId})`}
                stroke='#e11d48'
                strokeWidth='1.5'
                strokeLinejoin='round'
              />
            </svg>
          ) : (
            <div className='w-full h-full rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-700 text-sm font-bold'>
              ខេត្ត{directory.provinceKh}
            </div>
          )}

          {/* Floating EV Station Pins Overlay Badge */}
          <div className='absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none'>
            <div className='inline-flex items-center gap-1.5 bg-emerald-600/95 backdrop-blur-xs text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg border border-white/40'>
              <span className='animate-pulse'>⚡</span>
              <span>{stationsCount} ទីតាំង</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
