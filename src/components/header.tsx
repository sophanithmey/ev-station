import { useState } from 'react';
import DisclaimerModal from './disclaimer-modal';
import DonationModal from './donation/donation-modal';
import HeaderNav, { type AppPage } from './header-nav';
import HeaderQuickJump from './header-quick-jump';

type Props = {
  totalCount: number;
  filteredCount: number;
  activePage: AppPage;
  onPageChange: (page: AppPage) => void;
};

const DATASET_URL =
  'https://data.mef.gov.kh/datasets/pd_67b6d073cb47dc00012464a6';

const CURRENT_YEAR = new Date().getFullYear();

export default function Header({
  totalCount,
  filteredCount,
  activePage,
  onPageChange,
}: Props) {
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showDonate, setShowDonate] = useState(false);

  return (
    <>
      <header className='bg-slate-950/92 backdrop-blur-2xl border-b border-emerald-950/80 sticky top-0 z-30 shadow-xl shadow-black/30 [contain:paint]'>
        {/* Neon Cyber Fiber Optic Accent Bar */}
        <div
          aria-hidden='true'
          className='h-0.5 w-full bg-linear-to-r from-emerald-400 via-cyan-400 to-emerald-500 shadow-[0_0_12px_rgba(52,211,153,0.8)]'
        />

        <div className='max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3'>
          {/* 1. Left: Cyber HUD Brand Mark + Metrics */}
          <div className='flex items-center justify-between w-full sm:w-auto gap-2.5 shrink-0'>
            <div className='flex items-center gap-2.5'>
              {/* Glowing Neon Cyber Shield */}
              <div className='relative flex items-center justify-center w-8.5 h-8.5 rounded-xl bg-linear-to-br from-emerald-500 via-teal-600 to-cyan-700 text-white shadow-lg shadow-emerald-500/40 ring-1 ring-emerald-400/60 shrink-0'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-4.5 h-4.5 text-white filter drop-shadow'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M13 10V3L4 14h7v7l9-11h-7z'
                  />
                </svg>
                {/* Live Cyber Pulse Halo */}
                <span className='absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5'>
                  <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-85' />
                  <span className='relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 border border-slate-950' />
                </span>
              </div>

              {/* Cockpit HUD Typography */}
              <div className='min-w-0'>
                <div className='flex items-center gap-1.5 leading-tight'>
                  <h1 className='text-sm sm:text-base font-black text-white tracking-tight font-["Bricolage_Grotesque",sans-serif] flex items-center gap-1'>
                    <span>CAMBODIA EV</span>
                  </h1>
                  <span className='text-emerald-500 font-mono text-xs'>//</span>
                  <span className='text-[9.5px] font-black px-1.5 py-0.2 rounded-md bg-emerald-950/90 text-emerald-300 border border-emerald-500/40'>
                    {CURRENT_YEAR} HUD
                  </span>
                </div>
                <p className='text-[10px] sm:text-[11px] font-medium text-slate-400 leading-tight hidden sm:block font-["Kantumruy_Pro",sans-serif]'>
                  {activePage === 'explorer'
                    ? filteredCount === totalCount
                      ? `${totalCount} ស្ថានីយសរុប · ផែនទីផ្ទាល់ GPS`
                      : `${filteredCount} / ${totalCount} ស្ថានីយសកម្ម`
                    : activePage === 'locations'
                      ? 'ទីតាំងផ្លូវការ & QR កូដ (Pursat & Siem Reap)'
                      : 'ស្ថិតិ & ទិន្នន័យផ្លូវការ EAC (146 ស្ថានីយ)'}
                </p>
              </div>
            </div>

            {/* Mobile Actions in Cockpit Theme */}
            <div className='flex sm:hidden items-center gap-1.5'>
              <HeaderQuickJump onPageChange={onPageChange} />
              <button
                type='button'
                onClick={() => setShowDonate(true)}
                className='inline-flex items-center justify-center w-8 h-8 rounded-xl bg-linear-to-r from-amber-400 to-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/30 active:scale-95 text-xs'
                title='Buy Me a Coffee'
              >
                ☕
              </button>
              <button
                type='button'
                onClick={() => setShowDisclaimer(true)}
                className='inline-flex items-center justify-center w-8 h-8 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 shadow-2xs active:scale-95 text-xs'
                title='Disclaimer & Sources'
              >
                ⚠️
              </button>
            </div>
          </div>

          {/* 2. Center: Segmented Cyber Navigation */}
          <HeaderNav activePage={activePage} onPageChange={onPageChange} />

          {/* 3. Right: Cockpit Action Hub */}
          <div className='hidden sm:flex items-center gap-1.5 sm:gap-2 shrink-0'>
            {/* ⌘K Quick-Jump Trigger */}
            <HeaderQuickJump onPageChange={onPageChange} />

            {/* Buy Me a Coffee Button */}
            <button
              type='button'
              onClick={() => setShowDonate(true)}
              className='inline-flex items-center gap-1.5 text-xs text-slate-950 bg-linear-to-r from-amber-400 via-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 font-black px-2.5 sm:px-3.5 py-1.5 rounded-xl transition-all duration-200 shadow-md shadow-amber-500/25 hover:shadow-amber-500/40 active:scale-95 cursor-pointer whitespace-nowrap'
              title='Buy Me a Coffee & Support'
            >
              <span className='text-sm leading-none'>☕</span>
              <span className='hidden xl:inline'>Buy Me a Coffee</span>
              <span className='inline xl:hidden'>Coffee</span>
            </button>

            {/* Disclaimer Modal Trigger */}
            <button
              type='button'
              onClick={() => setShowDisclaimer(true)}
              className='inline-flex items-center gap-1 text-xs text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 px-2 sm:px-2.5 py-1.5 rounded-xl transition-all duration-200 font-semibold shadow-2xs active:scale-95 cursor-pointer whitespace-nowrap'
              title='Data Sources & Disclaimer'
            >
              <span className='text-xs text-amber-400'>⚠️</span>
              <span className='hidden 2xl:inline'>Disclaimer</span>
            </button>
          </div>
        </div>
      </header>

      <DisclaimerModal
        isOpen={showDisclaimer}
        onClose={() => setShowDisclaimer(false)}
        datasetUrl={DATASET_URL}
      />

      <DonationModal isOpen={showDonate} onClose={() => setShowDonate(false)} />
    </>
  );
}
