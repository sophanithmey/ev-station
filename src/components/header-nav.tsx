export type AppPage = 'explorer' | 'locations' | 'eac-stats';

type Props = {
  activePage: AppPage;
  onPageChange: (page: AppPage) => void;
};

const CURRENT_YEAR = new Date().getFullYear();

export default function HeaderNav({ activePage, onPageChange }: Props) {
  return (
    <nav
      aria-label='Primary Navigation'
      className='flex items-center p-1 bg-slate-900/90 backdrop-blur-md rounded-xl border border-slate-800/90 shadow-inner w-full sm:w-auto overflow-x-auto scrollbar-none'
    >
      {/* 1. Live Map Explorer Tab (Emerald Cyber HUD) */}
      <button
        type='button'
        onClick={() => onPageChange('explorer')}
        className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
          activePage === 'explorer'
            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/60 shadow-[0_0_12px_rgba(16,185,129,0.25)]'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
        }`}
      >
        <svg
          className='w-3.5 h-3.5 shrink-0 text-emerald-400'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth={2.2}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7'
          />
        </svg>
        <span className='font-["Kantumruy_Pro",sans-serif]'>ស្ថានីយផ្ទាល់</span>
        <span
          className={`text-[9.5px] font-black px-1.5 py-0.2 rounded-md ${
            activePage === 'explorer'
              ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-500/40'
              : 'bg-slate-800 text-slate-400'
          }`}
        >
          146
        </span>
      </button>

      {/* 2. Official Locations & QR Directory Tab (Cyan Cyber HUD) */}
      <button
        type='button'
        onClick={() => onPageChange('locations')}
        className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
          activePage === 'locations'
            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/60 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
        }`}
      >
        <svg
          className='w-3.5 h-3.5 shrink-0 text-cyan-400'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth={2.2}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
          />
        </svg>
        <span className='font-["Kantumruy_Pro",sans-serif]'>តារាងទីតាំង</span>
        <span
          className={`text-[9.5px] font-black px-1.5 py-0.2 rounded-md ${
            activePage === 'locations'
              ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-500/40'
              : 'bg-slate-800 text-slate-400'
          }`}
        >
          45 QR
        </span>
      </button>

      {/* 3. EAC Statistics & Analytics Tab (Teal Cyber HUD) */}
      <button
        type='button'
        onClick={() => onPageChange('eac-stats')}
        className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer whitespace-nowrap ${
          activePage === 'eac-stats'
            ? 'bg-teal-500/20 text-teal-300 border border-teal-500/60 shadow-[0_0_12px_rgba(20,184,166,0.25)]'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
        }`}
      >
        <svg
          className='w-3.5 h-3.5 shrink-0 text-teal-400'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth={2.2}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
          />
        </svg>
        <span className='font-["Kantumruy_Pro",sans-serif]'>ស្ថិតិ EAC</span>
        <span
          className={`text-[9.5px] font-black px-1.5 py-0.2 rounded-md ${
            activePage === 'eac-stats'
              ? 'bg-teal-500/30 text-teal-200 border border-teal-500/40'
              : 'bg-slate-800 text-slate-400'
          }`}
        >
          {CURRENT_YEAR}
        </span>
      </button>
    </nav>
  );
}
