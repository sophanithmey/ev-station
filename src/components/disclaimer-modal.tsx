import { createPortal } from 'react-dom';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  datasetUrl: string;
};

const CURRENT_YEAR = new Date().getFullYear();

export default function DisclaimerModal({ isOpen, onClose, datasetUrl }: Props) {
  if (!isOpen) return null;

  return createPortal(
    <div
      role='dialog'
      aria-modal='true'
      className='fixed inset-0 z-9999 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200'
      onClick={onClose}
    >
      <div
        className='bg-white rounded-2xl p-5 sm:p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-200'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className='flex items-start justify-between gap-3'>
          <div className='flex items-center gap-2.5'>
            <div className='w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 text-lg font-bold shrink-0'>
              ⚠️
            </div>
            <div>
              <h2 className='text-base font-bold text-slate-900 leading-tight'>
                Data Disclaimer &amp; Notice
              </h2>
              <p className='text-[11px] text-slate-500'>
                Important information regarding station records
              </p>
            </div>
          </div>
          <button
            type='button'
            onClick={onClose}
            className='w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors text-sm'
            aria-label='Close dialog'
          >
            ✕
          </button>
        </div>

        {/* Content items */}
        <div className='space-y-3 text-xs text-slate-600 leading-relaxed'>
          {/* Data Ownership */}
          <div className='p-3 bg-amber-50/60 rounded-xl border border-amber-200/70 space-y-1'>
            <div className='flex items-center gap-1.5 font-semibold text-slate-900'>
              <span>🏛️</span>
              <span>Data Ownership &amp; Attribution</span>
            </div>
            <p>
              <strong>We do not own or produce this data.</strong> Charging station
              records, coordinates, and plug specifications are compiled from open public
              datasets by the <strong>Ministry of Economy and Finance (MEF)</strong> and
              the <strong>Electricity Authority of Cambodia (EAC)</strong>.
            </p>
          </div>

          {/* Not up to date */}
          <div className='p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1'>
            <div className='flex items-center gap-1.5 font-semibold text-slate-900'>
              <span>🕒</span>
              <span>Data Might Not Be Up to Date</span>
            </div>
            <p>
              This directory reflects public records from {CURRENT_YEAR}. Stations may
              have been added, relocated, or permanently closed. Connector
              types, charging power, and operating hours may have changed since
              publication.
            </p>
          </div>

          {/* No Real-Time Status */}
          <div className='p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1'>
            <div className='flex items-center gap-1.5 font-semibold text-slate-900'>
              <span>⚡</span>
              <span>No Real-Time Status or Pricing</span>
            </div>
            <p>
              This application does <strong>not</strong> display live charger
              occupancy (in-use / offline), maintenance outages, queue lengths,
              or current electricity pricing.
            </p>
          </div>

          {/* Driver verification recommendation */}
          <div className='p-3 bg-emerald-50/60 rounded-xl border border-emerald-200/70 space-y-1'>
            <div className='flex items-center gap-1.5 font-semibold text-emerald-950'>
              <span>🚗</span>
              <span>Driver Verification Advised</span>
            </div>
            <p className='text-emerald-900'>
              Always verify with the station operator or venue before relying on
              a station for long-distance travel, and maintain sufficient battery
              buffer between stops.
            </p>
          </div>

          {/* Official Sources Links */}
          <div className='pt-1 space-y-1.5'>
            <span className='text-[11px] font-semibold text-slate-700 block'>
              Official Data Sources:
            </span>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-1.5'>
              <a
                href={datasetUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-emerald-700 hover:text-emerald-800 font-medium text-[11px] flex items-center justify-between gap-1.5 transition-colors'
              >
                <span className='truncate'>🏛️ MEF Open Data Portal</span>
                <span className='text-[10px]'>↗</span>
              </a>
              <a
                href='https://www.eac.gov.kh'
                target='_blank'
                rel='noopener noreferrer'
                className='p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-blue-700 hover:text-blue-800 font-medium text-[11px] flex items-center justify-between gap-1.5 transition-colors'
              >
                <span className='truncate'>⚡ EAC Cambodia</span>
                <span className='text-[10px]'>↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className='flex flex-col-reverse sm:flex-row items-center justify-end gap-2 pt-2 border-t border-slate-100'>
          <a
            href={datasetUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='w-full sm:w-auto px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors'
          >
            <span>Visit Dataset Portal</span>
            <svg
              className='w-3.5 h-3.5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M14 5l7 7m0 0l-7 7m7-7H3'
              />
            </svg>
          </a>
          <button
            type='button'
            onClick={onClose}
            className='w-full sm:w-auto px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-colors'
          >
            I Understand
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
