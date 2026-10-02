import { memo } from 'react';

function EcoBackground() {
  return (
    <div
      aria-hidden='true'
      className='fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-linear-to-b from-slate-50 via-slate-50/80 to-slate-100/70 [contain:strict]'
    >
      {/* 1. Ultra-subtle ambient energy glowing orbs */}
      <div className='absolute -top-28 -left-28 w-md h-112 rounded-full bg-linear-to-br from-emerald-200/15 via-teal-100/10 to-transparent blur-3xl opacity-80' />
      <div className='absolute top-1/4 -right-24 w-120 h-120 rounded-full bg-linear-to-bl from-teal-200/12 via-slate-100/10 to-transparent blur-3xl opacity-70' />
      <div className='absolute -bottom-28 left-1/4 w-136 h-136 rounded-full bg-linear-to-tr from-emerald-100/12 via-teal-50/10 to-transparent blur-3xl opacity-80' />

      {/* 2. Delicate renewable energy topographic waves & wind flow SVG */}
      <svg
        className='absolute inset-0 w-full h-full opacity-[0.06] text-slate-400/30'
        xmlns='http://www.w3.org/2000/svg'
        width='100%'
        height='100%'
        fill='none'
      >
        <defs>
          <pattern
            id='eco-grid'
            width='60'
            height='60'
            patternUnits='userSpaceOnUse'
          >
            <path
              d='M60 0H0V60'
              fill='none'
              stroke='currentColor'
              strokeWidth='0.6'
              strokeDasharray='2 4'
            />
          </pattern>
          <linearGradient
            id='eco-wave-grad'
            x1='0%'
            y1='0%'
            x2='100%'
            y2='100%'
          >
            <stop offset='0%' stopColor='#059669' stopOpacity='0.15' />
            <stop offset='50%' stopColor='#0d9488' stopOpacity='0.10' />
            <stop offset='100%' stopColor='#64748b' stopOpacity='0.06' />
          </linearGradient>
        </defs>

        {/* Subtle grid base */}
        <rect width='100%' height='100%' fill='url(#eco-grid)' />

        {/* Smooth organic clean air wave contours */}
        <path
          d='M-100 180 C 300 80, 600 260, 1100 140 C 1500 40, 1800 200, 2200 120'
          stroke='url(#eco-wave-grad)'
          strokeWidth='1.8'
          fill='none'
        />
        <path
          d='M-100 240 C 350 140, 650 320, 1150 200 C 1550 100, 1850 260, 2200 180'
          stroke='url(#eco-wave-grad)'
          strokeWidth='1.2'
          strokeDasharray='6 6'
          fill='none'
        />
        <path
          d='M-100 680 C 400 520, 800 780, 1300 620 C 1700 500, 1950 700, 2300 580'
          stroke='url(#eco-wave-grad)'
          strokeWidth='1.5'
          fill='none'
        />
        <path
          d='M-100 740 C 450 580, 850 840, 1350 680 C 1750 560, 2000 760, 2300 640'
          stroke='url(#eco-wave-grad)'
          strokeWidth='1.0'
          strokeDasharray='4 8'
          fill='none'
        />
      </svg>

      {/* 3. Floating Eco Leaf & Clean Energy Motifs */}
      <div className='absolute top-16 left-[8%] opacity-[0.08] text-emerald-800'>
        <svg className='w-6 h-6' viewBox='0 0 24 24' fill='currentColor'>
          <path d='M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z' />
        </svg>
      </div>

      <div className='absolute bottom-24 right-[6%] opacity-[0.08] text-slate-500'>
        <svg className='w-7 h-7' viewBox='0 0 24 24' fill='currentColor'>
          <path d='M12 2a10 10 0 1010 10A10 10 0 0012 2zm1 14.5V18h-2v-1.5a4 4 0 01-2.5-3.7 1 1 0 012 0 2 2 0 004 0c0-1.1-.9-2-2-2a4 4 0 01-4-4c0-1.8 1.2-3.3 2.5-3.7V4h2v1.5a4 4 0 012.5 3.7 1 1 0 01-2 0 2 2 0 00-4 0c0 1.1.9 2 2 2a4 4 0 014 4c0 1.8-1.2 3.3-2.5 3.7z' />
        </svg>
      </div>
    </div>
  );
}

export default memo(EcoBackground);
