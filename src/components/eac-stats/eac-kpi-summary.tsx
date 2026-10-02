import { memo } from 'react';
import type { EACProvinceStat } from '../../data/eac-province-stats';

interface SummaryData {
  totalCoveredProvinces: number;
  totalStations: number;
  totalChargers: number;
  avgChargersPerStation: string;
  topProvince?: EACProvinceStat;
}

interface Props {
  summary: SummaryData;
  onSelectTopProvince: (id: string) => void;
}

function EacKpiSummary({ summary, onSelectTopProvince }: Props) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5'>
      {/* 1. Total Authorized Stations Card */}
      <div className='bg-linear-to-b from-white to-emerald-50/20 rounded-3xl p-4 sm:p-4.5 border border-emerald-100/90 shadow-2xs hover:shadow-xs flex flex-col justify-between transition-all hover:border-emerald-300 group'>
        <div>
          <div className='flex items-center justify-between gap-2 mb-2'>
            <span className='text-xs font-bold text-slate-600 font-["Kantumruy_Pro",sans-serif] flex items-center gap-1.5'>
              <span className='w-2 h-2 rounded-full bg-emerald-500' />
              ស្ថានីយសរុប (Stations)
            </span>
            <div className='w-8 h-8 rounded-xl bg-emerald-100/70 text-emerald-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform'>
              <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                <path strokeLinecap='round' strokeLinejoin='round' d='M13 10V3L4 14h7v7l9-11h-7z' />
              </svg>
            </div>
          </div>
          <div className='flex items-baseline gap-1.5'>
            <span className='text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans'>
              {summary.totalStations}
            </span>
            <span className='text-xs font-bold text-emerald-700 font-["Kantumruy_Pro",sans-serif] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60'>
              ស្ថានីយ
            </span>
          </div>
        </div>

        <div className='mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-500'>
          <span className='font-["Kantumruy_Pro",sans-serif]'>ស្របច្បាប់ទូទាំងប្រទេស</span>
          <span className='font-bold text-emerald-600'>EAC Official</span>
        </div>
      </div>

      {/* 2. Total Chargers / Guns Card */}
      <div className='bg-linear-to-b from-white to-teal-50/20 rounded-3xl p-4 sm:p-4.5 border border-teal-100/90 shadow-2xs hover:shadow-xs flex flex-col justify-between transition-all hover:border-teal-300 group'>
        <div>
          <div className='flex items-center justify-between gap-2 mb-2'>
            <span className='text-xs font-bold text-slate-600 font-["Kantumruy_Pro",sans-serif] flex items-center gap-1.5'>
              <span className='w-2 h-2 rounded-full bg-teal-500' />
              ទូសាកសរុប (Chargers)
            </span>
            <div className='w-8 h-8 rounded-xl bg-teal-100/70 text-teal-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform'>
              <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                <path strokeLinecap='round' strokeLinejoin='round' d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' />
              </svg>
            </div>
          </div>
          <div className='flex items-baseline gap-1.5'>
            <span className='text-2xl sm:text-3xl font-black text-teal-800 tracking-tight font-sans'>
              {summary.totalChargers}
            </span>
            <span className='text-xs font-bold text-teal-700 font-["Kantumruy_Pro",sans-serif] bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200/60'>
              ទូសាក
            </span>
          </div>
        </div>

        <div className='mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-500'>
          <span className='font-["Kantumruy_Pro",sans-serif]'>សមាមាត្រមធ្យម</span>
          <span className='font-bold text-teal-700'>{summary.avgChargersPerStation} ទូ / ស្ថានីយ</span>
        </div>
      </div>

      {/* 3. National Coverage Ratio Card */}
      <div className='bg-linear-to-b from-white to-sky-50/20 rounded-3xl p-4 sm:p-4.5 border border-sky-100/90 shadow-2xs hover:shadow-xs flex flex-col justify-between transition-all hover:border-sky-300 group'>
        <div>
          <div className='flex items-center justify-between gap-2 mb-2'>
            <span className='text-xs font-bold text-slate-600 font-["Kantumruy_Pro",sans-serif] flex items-center gap-1.5'>
              <span className='w-2 h-2 rounded-full bg-sky-500' />
              គ្របដណ្ដប់ (Coverage)
            </span>
            <div className='w-8 h-8 rounded-xl bg-sky-100/70 text-sky-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform'>
              <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                <path strokeLinecap='round' strokeLinejoin='round' d='M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7' />
              </svg>
            </div>
          </div>
          <div className='flex items-baseline gap-1.5'>
            <span className='text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans'>
              {summary.totalCoveredProvinces}
            </span>
            <span className='text-xs font-bold text-slate-500 font-["Kantumruy_Pro",sans-serif]'>
              / ២៥ រាជធានី-ខេត្ត
            </span>
          </div>
        </div>

        <div className='mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-500'>
          <span className='font-["Kantumruy_Pro",sans-serif]'>អត្រាគ្របដណ្តប់</span>
          <span className='font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200/50'>
            ៨៨% នៃប្រទេស
          </span>
        </div>
      </div>

      {/* 4. Top Hub Champion Card (Phnom Penh) */}
      <button
        type='button'
        onClick={() => summary.topProvince && onSelectTopProvince(summary.topProvince.id)}
        className='bg-linear-to-br from-emerald-700 via-teal-800 to-slate-900 text-white rounded-3xl p-4 sm:p-4.5 border border-emerald-600/50 shadow-sm hover:shadow-md flex flex-col justify-between text-left transition-all hover:scale-[1.01] active:scale-98 cursor-pointer group'
      >
        <div>
          <div className='flex items-center justify-between gap-2 mb-2'>
            <span className='text-xs font-bold text-emerald-200 font-["Kantumruy_Pro",sans-serif] flex items-center gap-1.5'>
              <span className='w-2 h-2 rounded-full bg-amber-400' />
              តំបន់ច្រើនជាងគេ (Top Hub)
            </span>
            <span className='text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-400/25 text-amber-300 border border-amber-300/40'>
              #1 TOP
            </span>
          </div>

          <div className='flex items-baseline justify-between gap-2'>
            <span className='text-xl sm:text-2xl font-black font-["Kantumruy_Pro",sans-serif] text-white tracking-tight'>
              {summary.topProvince?.nameKh || 'រាជធានីភ្នំពេញ'}
            </span>
            <div className='text-right'>
              <div className='text-sm sm:text-base font-black text-amber-300 font-sans'>
                {summary.topProvince?.stations} <span className='text-xs font-bold text-emerald-200 font-["Kantumruy_Pro",sans-serif]'>ស្ថានីយ</span>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-3 pt-2.5 border-t border-emerald-800/80 flex items-center justify-between text-[11px] text-emerald-200'>
          <span className='font-["Kantumruy_Pro",sans-serif]'>៣៦% នៃស្ថានីយទូទាំងប្រទេស ({summary.topProvince?.chargers} ទូ)</span>
          <span className='font-bold text-amber-300 group-hover:translate-x-0.5 transition-transform'>
            មើល ➜
          </span>
        </div>
      </button>
    </div>
  );
}

export default memo(EacKpiSummary);
