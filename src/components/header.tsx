import { useState } from 'react';
import DisclaimerModal from './disclaimer-modal';
import DonationModal from './donation/donation-modal';

type Props = {
  totalCount: number;
  filteredCount: number;
  activePage: 'explorer' | 'eac-stats';
  onPageChange: (page: 'explorer' | 'eac-stats') => void;
};

const DATASET_URL =
  'https://data.mef.gov.kh/datasets/pd_67b6d073cb47dc00012464a6';

const Header = ({
  totalCount,
  filteredCount,
  activePage,
  onPageChange,
}: Props) => {
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showDonate, setShowDonate] = useState(false);

  return (
    <>
      <header className='bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-30 [contain:paint]'>
        {/* Status Accent Bar in Eco Green */}
        <div
          aria-hidden='true'
          className='h-1 w-full bg-linear-to-r from-emerald-500 via-teal-400 to-emerald-600'
        />

        <div className='max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3'>
          {/* Top Row on Mobile: Brand + Action Buttons */}
          <div className='flex items-center justify-between w-full sm:w-auto gap-2'>
            {/* Brand Logo & Title */}
            <div className='flex items-center gap-2.5 shrink-0'>
              <div className='flex items-center justify-center w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20 shrink-0'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-4 h-4 sm:w-4.5 sm:h-4.5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2.5}
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M13 10V3L4 14h7v7l9-11h-7z' />
                </svg>
              </div>

              <div className='min-w-0'>
                <h1 className='text-sm sm:text-base font-bold text-slate-900 leading-tight flex items-center gap-1.5'>
                  <span>Cambodia EV</span>
                </h1>
                <p className='text-[10px] sm:text-[11px] text-slate-400 leading-tight hidden sm:block'>
                  {activePage === 'explorer'
                    ? filteredCount === totalCount
                      ? `${totalCount} chargers · Live Map`
                      : `${filteredCount} of ${totalCount} chargers`
                    : '234 ស្ថានីយ · 421 ទូសាក (EAC)'}
                </p>
              </div>
            </div>

            {/* Mobile Actions: Coffee & Disclaimer Icon Buttons */}
            <div className='flex sm:hidden items-center gap-1.5'>
              <button
                type='button'
                onClick={() => setShowDonate(true)}
                className='inline-flex items-center justify-center w-8 h-8 rounded-xl bg-amber-300 hover:bg-amber-400 text-amber-950 border border-amber-400 shadow-2xs text-sm active:scale-95'
                title='Buy Me a Coffee & Support'
                aria-label='Open donation modal'
              >
                ☕
              </button>

              <button
                type='button'
                onClick={() => setShowDisclaimer(true)}
                className='inline-flex items-center justify-center w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 shadow-2xs active:scale-95'
                title='Data Source & Disclaimer'
                aria-label='Data Source and Disclaimer'
              >
                <svg className='w-4 h-4 text-red-500' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2}>
                  <circle cx='12' cy='12' r='10' />
                  <line x1='12' y1='16' x2='12' y2='12' />
                  <line x1='12' y1='8' x2='12.01' y2='8' />
                </svg>
              </button>
            </div>
          </div>

          {/* Center / Full-Width on Mobile: Segmented Tab Switcher */}
          <nav
            aria-label='Primary Navigation'
            className='flex items-center p-1 bg-slate-100/95 rounded-xl border border-slate-200 shadow-2xs w-full sm:w-auto'
          >
            <button
              type='button'
              onClick={() => onPageChange('explorer')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activePage === 'explorer'
                  ? 'bg-white text-emerald-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <svg className='w-3.5 h-3.5' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2}>
                <path strokeLinecap='round' strokeLinejoin='round' d='M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7' />
              </svg>
              <span className='font-["Kantumruy_Pro",sans-serif]'>ស្ថានីយផ្ទាល់</span>
              <span className='text-[10px] text-slate-400 font-normal hidden md:inline'>
                (Live)
              </span>
            </button>

            <button
              type='button'
              onClick={() => onPageChange('eac-stats')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activePage === 'eac-stats'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <svg className='w-3.5 h-3.5' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2}>
                <path strokeLinecap='round' strokeLinejoin='round' d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' />
              </svg>
              <span className='font-["Kantumruy_Pro",sans-serif]'>ស្ថិតិផ្លូវការ EAC</span>
              <span className='hidden sm:inline text-[9.5px] font-extrabold px-1.5 py-0.2 rounded-full bg-amber-300 text-slate-950'>
                2026
              </span>
            </button>
          </nav>

          {/* Desktop Right Action Buttons (Hidden on Mobile) */}
          <div className='hidden sm:flex items-center gap-2'>
            <button
              type='button'
              onClick={() => setShowDonate(true)}
              className='inline-flex items-center gap-1.5 text-xs text-amber-950 bg-amber-300 hover:bg-amber-400 border border-amber-400/80 px-2.5 py-1.5 rounded-xl transition-all font-semibold shadow-xs active:scale-95 cursor-pointer'
              title='Buy Me a Coffee & Support'
              aria-label='Open donation and Buy Me a Coffee modal'
            >
              <span className='text-sm leading-none'>☕</span>
              <span>Buy Me a Coffee</span>
            </button>

            <button
              type='button'
              onClick={() => setShowDisclaimer(true)}
              className='inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-2.5 py-1.5 rounded-xl transition-all font-medium active:scale-95 cursor-pointer'
              title='Data Disclaimer & Source'
              aria-label='Data Source and Disclaimer'
            >
              <svg className='w-3.5 h-3.5 text-red-500' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2}>
                <circle cx='12' cy='12' r='10' />
                <line x1='12' y1='16' x2='12' y2='12' />
                <line x1='12' y1='8' x2='12.01' y2='8' />
              </svg>
              <span className='hidden md:inline'>Data Source &amp; Disclaimer</span>
              <span className='md:hidden'>Disclaimer</span>
            </button>
          </div>
        </div>
      </header>

      {/* Disclaimer Modal Component */}
      <DisclaimerModal
        isOpen={showDisclaimer}
        onClose={() => setShowDisclaimer(false)}
        datasetUrl={DATASET_URL}
      />

      {/* Donation Modal Component */}
      <DonationModal
        isOpen={showDonate}
        onClose={() => setShowDonate(false)}
      />
    </>
  );
};

export default Header;
