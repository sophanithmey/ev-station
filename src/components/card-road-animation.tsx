type Props = {
  stationId: string | number;
  connector: string;
};

export default function CardRoadAnimation({ stationId, connector }: Props) {
  // Convert stationId to a stable numeric hash for natural staggered animation start
  const numericId =
    typeof stationId === 'number'
      ? stationId
      : stationId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const delaySec = ((numericId * 7) % 35) / 10;

  return (
    <div
      aria-hidden='true'
      className='relative w-full h-9 rounded-xl overflow-hidden bg-linear-to-r from-emerald-50/80 via-slate-100/90 to-teal-50/80 border border-emerald-200/70 shadow-xs flex items-center select-none'
    >
      {/* 1. Road Curbs & Meadow Accents */}
      <div className='absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-emerald-400/60 via-teal-400/50 to-emerald-400/60' />
      <div className='absolute inset-x-0 bottom-0 h-[1.5px] bg-slate-300/80' />

      {/* 2. Scenic Background: Mini Clean-Energy Wind Turbine & Trees */}
      <div className='absolute left-[26%] top-1/2 -translate-y-1/2 flex items-center gap-1.5 opacity-35 pointer-events-none'>
        {/* Miniature Wind Turbine */}
        <div className='relative w-3.5 h-6 flex items-center justify-center'>
          <div className='absolute bottom-0 w-px h-4.5 bg-slate-400' />
          <svg
            className='absolute top-0 w-3.5 h-3.5 text-emerald-700 animate-spin'
            style={{ animationDuration: '4s', transformOrigin: 'center' }}
            viewBox='0 0 24 24'
            fill='currentColor'
          >
            <circle cx='12' cy='12' r='2' fill='#0f172a' />
            <path d='M12 12 L12 1 A1 1 0 0 1 13 2 L12 12' />
            <path d='M12 12 L22 18 A1 1 0 0 1 21 19 L12 12' />
            <path d='M12 12 L2 18 A1 1 0 0 1 2 17 L12 12' />
          </svg>
        </div>

        {/* Roadside clean eco tree */}
        <svg
          className='w-2.5 h-3.5 text-emerald-600'
          viewBox='0 0 10 14'
          fill='currentColor'
        >
          <polygon points='5,1 1,7 3.5,7 0,12 10,12 6.5,7 9,7' />
          <rect x='4.2' y='12' width='1.6' height='2' fill='#64748b' />
        </svg>
      </div>

      {/* 3. Center Streaming Dashed Lane (Smooth CSS flow) */}
      <div
        className='absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 opacity-40 pointer-events-none animate-road-flow'
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, #059669 0px, #059669 8px, transparent 8px, transparent 18px)',
          backgroundSize: '18px 2px',
        }}
      />

      {/* 4. Destination Charging Station Pillar (Right) */}
      <div className='absolute right-1.5 top-1/2 -translate-y-1/2 z-20 flex items-center gap-1 bg-white/95 backdrop-blur-xs border border-emerald-300/80 rounded-lg px-2 py-0.5 shadow-xs'>
        <span className='relative flex h-1.5 w-1.5'>
          <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75'></span>
          <span className='relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500'></span>
        </span>
        <svg
          className='w-2.5 h-2.5 text-emerald-600'
          viewBox='0 0 24 24'
          fill='currentColor'
        >
          <path d='M13 10V3L4 14h7v7l9-11h-7z' />
        </svg>
        <span className='text-[10px] font-bold text-emerald-800 font-mono tracking-tight'>
          {connector}
        </span>
      </div>

      {/* 5. Buttery Smooth Hardware-Accelerated Driving EV Track */}
      <div className='absolute inset-y-0 left-0 right-14 overflow-hidden pointer-events-none'>
        <div
          className='w-full h-full relative animate-ev-glide'
          style={{ animationDelay: `${delaySec}s` }}
        >
          <div className='absolute right-0 top-1/2 -translate-y-1/2 flex items-center'>
            {/* Electric energy pulse behind car */}
            <div className='absolute -left-3.5 top-1/2 -translate-y-1/2 flex items-center text-[10px] text-emerald-600 font-mono select-none'>
              <span className='animate-pulse'>⚡</span>
            </div>

            {/* Headlight beam on road ahead */}
            <div className='absolute left-8.25 top-1/2 -translate-y-1/2 w-10 h-4 bg-linear-to-r from-emerald-400/40 via-cyan-400/20 to-transparent blur-[1.5px]' />

            {/* Sleek Modern EV SVG */}
            <svg
              viewBox='0 0 38 16'
              width='38'
              height='16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='drop-shadow-[0_1.5px_2px_rgba(15,23,42,0.25)]'
            >
              {/* Ground shadow */}
              <ellipse
                cx='19'
                cy='15'
                rx='16'
                ry='1.2'
                fill='#334155'
                opacity='0.35'
              />

              {/* Aerodynamic White EV Body */}
              <path
                d='M2 11.5 C2 9.8 3.5 8.8 6 8.8 L9 8.8 C11 8.8 13.2 5.8 15 5.2 C17 4.5 24 4.5 27 5.2 C29 5.8 31 8.5 33 9.5 L36 10 C37.2 10.3 38 11.2 38 12.2 C38 13.5 37 14 35.5 14 L33.5 14 C33.5 12.5 32 11.5 30.5 11.5 C29 11.5 27.5 12.5 27.5 14 L11.5 14 C11.5 12.5 10 11.5 8.5 11.5 C7 11.5 5.5 12.5 5.5 14 L3.5 14 C2.5 14 2 13 2 11.5 Z'
                fill='#ffffff'
                stroke='#cbd5e1'
                strokeWidth='0.6'
              />

              {/* Cyan Tinted Glass Windshield & Windows */}
              <path
                d='M10.2 8.5 L15 5.8 C16.5 5.2 23.5 5.2 26 5.8 L29.5 8.5 Z'
                fill='#38bdf8'
                opacity='0.85'
              />
              <line
                x1='20'
                y1='5.5'
                x2='20'
                y2='8.5'
                stroke='#ffffff'
                strokeWidth='0.8'
                opacity='0.9'
              />

              {/* Clean Emerald Green Aero Line */}
              <path
                d='M7 10.5 Q 18 11 32 10.5'
                stroke='#10b981'
                strokeWidth='0.9'
                strokeLinecap='round'
              />

              {/* Front LED Headlight */}
              <path d='M35 10.4 L37.5 11.1 L35.5 11.7 Z' fill='#38bdf8' />

              {/* Rear Emerald Taillight */}
              <rect
                x='2'
                y='10'
                width='1.5'
                height='2'
                rx='0.5'
                fill='#10b981'
              />

              {/* Front Aero-Turbine Wheel */}
              <g transform='translate(29, 13)'>
                <circle
                  cx='0'
                  cy='0'
                  r='2.8'
                  fill='#0f172a'
                  stroke='#64748b'
                  strokeWidth='0.5'
                />
                <circle cx='0' cy='0' r='1.8' fill='#334155' />
                <circle cx='0' cy='0' r='0.9' fill='#10b981' />
              </g>

              {/* Rear Aero-Turbine Wheel */}
              <g transform='translate(8.5, 13)'>
                <circle
                  cx='0'
                  cy='0'
                  r='2.8'
                  fill='#0f172a'
                  stroke='#64748b'
                  strokeWidth='0.5'
                />
                <circle cx='0' cy='0' r='1.8' fill='#334155' />
                <circle cx='0' cy='0' r='0.9' fill='#10b981' />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
