import { memo } from 'react';
import type { EACMetadata } from '../../data/eac-province-stats';

interface Props {
  metadata: EACMetadata;
}

function EacHeaderBanner({ metadata }: Props) {
  return (
    <section className='bg-linear-to-r from-white via-emerald-50/25 to-white rounded-3xl p-4 sm:p-5 lg:p-6 border border-emerald-100/80 shadow-xs relative overflow-hidden [contain:paint]'>
      {/* Ambient background energy glows */}
      <div
        aria-hidden='true'
        className='absolute -right-16 -top-16 w-56 h-56 bg-linear-to-br from-emerald-400/20 to-teal-400/5 rounded-full blur-3xl pointer-events-none'
      />
      <div
        aria-hidden='true'
        className='absolute -left-16 -bottom-16 w-56 h-56 bg-linear-to-tr from-amber-300/15 to-emerald-300/5 rounded-full blur-3xl pointer-events-none'
      />

      <div className='flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 sm:gap-6 relative z-10'>
        {/* Left: EAC Official Gold Emblem & Title Header */}
        <div className='flex items-center gap-3.5 sm:gap-4.5 text-left w-full lg:w-auto'>
          {/* Authentic EAC Royal Gold Badge */}
          <div className='relative shrink-0 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-linear-to-br from-amber-400 via-yellow-500 to-amber-600 text-white shadow-md shadow-amber-500/20 ring-4 ring-amber-100/60 p-2.5'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              className='w-full h-full drop-shadow-xs'
              fill='currentColor'
            >
              <path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' />
            </svg>
            <span className='absolute -bottom-2 px-2 py-0.5 bg-slate-900 text-amber-300 text-[8.5px] font-black rounded-full tracking-wider border border-amber-400/50 shadow-xs'>
              EAC
            </span>
          </div>

          <div className='min-w-0 flex-1 space-y-1'>
            {/* Meta Tags Row */}
            <div className='flex items-center gap-2 flex-wrap'>
              <span className='inline-flex items-center gap-1.5 text-[10.5px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200/80 shadow-2xs font-["Kantumruy_Pro",sans-serif]'>
                <span className='w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse' />
                {metadata.authorityKh} (EAC)
              </span>
              <span className='text-[10px] sm:text-xs text-slate-500 font-semibold bg-white/90 px-2 py-0.5 rounded-full border border-slate-200 shadow-2xs font-["Kantumruy_Pro",sans-serif]'>
                {metadata.asOfKh}
              </span>
            </div>

            {/* Khmer Official Headline */}
            <h2 className='text-base sm:text-lg lg:text-xl font-extrabold text-slate-900 font-["Kantumruy_Pro",sans-serif] leading-snug tracking-tight'>
              {metadata.titleKh}
            </h2>

            {/* Subtitle */}
            <p className='text-xs text-slate-500 font-medium hidden sm:block'>
              {metadata.titleEn} · {metadata.asOfEn}
            </p>
          </div>
        </div>

        {/* Right: National Total EV Metric Pill */}
        <div className='w-full lg:w-auto flex items-center justify-between lg:justify-end gap-3 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100'>
          <div className='bg-linear-to-r from-emerald-600 via-emerald-700 to-teal-800 text-white px-4 py-2.5 rounded-2xl shadow-sm border border-emerald-500/40 flex items-center gap-3 w-full sm:w-auto justify-between'>
            <div className='w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center shrink-0 text-amber-300'>
              <svg className='w-4 h-4' viewBox='0 0 24 24' fill='currentColor'>
                <path d='M13 10V3L4 14h7v7l9-11h-7z' />
              </svg>
            </div>
            <div className='text-right'>
              <div className='text-sm sm:text-base font-black font-["Kantumruy_Pro",sans-serif] leading-tight text-white tracking-tight'>
                <span className='text-amber-300 font-black'>{metadata.totalStations}</span> ស្ថានីយ = <span className='text-emerald-200 font-black'>{metadata.totalChargers}</span> ទូសាក
              </div>
              <div className='text-[10.5px] text-emerald-100 font-semibold font-["Kantumruy_Pro",sans-serif] mt-0.5 flex items-center justify-end gap-1'>
                <span>ទូទាំង ២២ រាជធានី-ខេត្ត</span>
                <span className='w-1 h-1 rounded-full bg-emerald-300' />
                <span>ស្របច្បាប់</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(EacHeaderBanner);
