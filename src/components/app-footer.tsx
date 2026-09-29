type Props = {
  datasetUrl?: string;
};

const DEFAULT_DATASET_URL =
  'https://data.mef.gov.kh/datasets/pd_67b6d073cb47dc00012464a6';

export default function AppFooter({ datasetUrl = DEFAULT_DATASET_URL }: Props) {
  return (
    <footer className='hidden sm:block shrink-0 border-t border-slate-200/80 bg-white/70 backdrop-blur-sm py-2 px-4 text-xs text-slate-500'>
      <div className='max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 text-center sm:text-left'>
        <p className='text-[11px] text-slate-600 leading-relaxed truncate max-w-4xl'>
          <span className='font-semibold text-slate-800'>Disclaimer:</span> We
          do not own this data. Sourced from the{' '}
          <a
            href={datasetUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='text-emerald-700 hover:text-emerald-800 underline font-semibold inline-flex items-center gap-0.5'
          >
            MEF Open Data Portal
            <svg
              className='w-3 h-3 inline shrink-0'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
              />
            </svg>
          </a>
          . Station info may not be up-to-date or reflect live availability.
          Please verify with operators before traveling.
        </p>
        <span className='text-[10px] text-slate-400 shrink-0 hidden sm:inline'>
          Cambodia EV Directory
        </span>
      </div>
    </footer>
  );
}
