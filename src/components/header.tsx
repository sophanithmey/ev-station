import { useState } from 'react';
import DisclaimerModal from './disclaimer-modal';
import DonationModal from './donation/donation-modal';

type Props = {
  totalCount: number;
  filteredCount: number;
};

const DATASET_URL =
  'https://data.mef.gov.kh/datasets/pd_67b6d073cb47dc00012464a6';

const Header = ({ totalCount, filteredCount }: Props) => {
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showDonate, setShowDonate] = useState(false);

  return (
    <>
      <header className='bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-30'>
        {/* Web Status Bar in Eco Green */}
        <div
          aria-hidden='true'
          className='h-1 w-full bg-linear-to-r from-emerald-500 via-teal-400 to-emerald-600'
        />
        <div className='max-w-7xl mx-auto px-4 py-3 flex items-center gap-3'>
          {/* Icon */}
          <div className='flex items-center justify-center w-9 h-9 rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20 shrink-0'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-4.5 h-4.5'
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
          </div>

          {/* Title */}
          <div className='min-w-0'>
            <h1 className='text-base font-bold text-slate-900 leading-tight'>
              EV Stations
            </h1>
            <p className='text-[11px] text-slate-400 leading-tight'>
              {filteredCount === totalCount
                ? `${totalCount} chargers · Cambodia`
                : `${filteredCount} of ${totalCount} chargers`}
            </p>
          </div>


          {/* Right actions: Buy Me a Coffee & Disclaimer button */}
          <div className='ml-auto flex items-center gap-1.5 sm:gap-2'>
            <button
              type='button'
              onClick={() => setShowDonate(true)}
              className='inline-flex items-center gap-1.5 text-xs text-amber-950 bg-amber-300 hover:bg-amber-400 border border-amber-400/80 px-2 sm:px-2.5 py-1.5 rounded-xl transition-all font-semibold shadow-xs active:scale-95'
              title='Buy Me a Coffee &amp; Support'
              aria-label='Open donation and Buy Me a Coffee modal'
            >
              <span className='text-sm leading-none'>☕</span>
              <span className='hidden sm:inline'>Buy Me a Coffee</span>
              <span className='sm:hidden text-[11px]'>Donate</span>
            </button>

            <button
              type='button'
              onClick={() => setShowDisclaimer(true)}
              className='inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 border border-slate-200/80 px-2 sm:px-2.5 py-1.5 rounded-xl transition-all font-medium active:scale-95'
              title='Data Disclaimer & Source'
              aria-label='Data Source and Disclaimer'
            >
              <svg
                className='w-3.5 h-3.5 text-red-500'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth={2}
              >
                <circle cx='12' cy='12' r='10' />
                <line x1='12' y1='16' x2='12' y2='12' />
                <line x1='12' y1='8' x2='12.01' y2='8' />
              </svg>
              <span className='hidden md:inline'>
                Data Source &amp; Disclaimer
              </span>
              <span className='hidden sm:inline md:hidden text-[11px]'>
                Disclaimer
              </span>
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
