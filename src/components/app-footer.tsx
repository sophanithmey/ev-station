import { useVisitorCount } from '../hooks/use-visitor-count';

type Props = {
  datasetUrl?: string;
  telegramUrl?: string;
  className?: string;
};

const DEFAULT_DATASET_URL =
  'https://data.mef.gov.kh/datasets/pd_67b6d073cb47dc00012464a6';
const DEFAULT_TELEGRAM_URL = 'https://t.me/sophanithmey';

export default function AppFooter({
  datasetUrl = DEFAULT_DATASET_URL,
  telegramUrl = DEFAULT_TELEGRAM_URL,
  className = '',
}: Props) {
  const { count, status } = useVisitorCount();

  return (
    <footer
      className={`shrink-0 border-t border-slate-200/80 bg-white/95 backdrop-blur-sm py-2 px-3 sm:px-4 text-xs text-slate-500 ${className}`}
    >
      <div className='max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-2 text-center sm:text-left'>
        <p className='text-[10px] sm:text-[11px] text-slate-600 leading-tight sm:leading-relaxed max-w-3xl line-clamp-1 sm:line-clamp-none'>
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
              className='w-2.5 h-2.5 inline shrink-0'
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
          . Station info may not be up-to-date. Please verify before traveling.
        </p>

        <div className='flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto shrink-0 pt-1 sm:pt-0 border-t sm:border-t-0 border-slate-200/60'>
          {/* Visitor counter */}
          <div className='flex items-center gap-1 text-[10px] text-slate-400'>
            <svg
              className='w-3 h-3 text-emerald-500 shrink-0'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
              />
            </svg>
            {status === 'loading' && (
              <span className='text-slate-300 animate-pulse'>…</span>
            )}
            {status === 'success' && count !== null && (
              <span className='font-semibold text-slate-500'>{count}</span>
            )}
            {(status === 'error' || (status === 'success' && count === null)) && (
              <span className='text-slate-300'>—</span>
            )}
            <span>visitors</span>
          </div>

          <span className='h-3 w-px bg-slate-200' />

          {/* Contact */}
          <a
            href={telegramUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 hover:text-sky-800 bg-sky-50 hover:bg-sky-100 border border-sky-200 px-3 py-1 rounded-xl sm:rounded-lg transition-all active:scale-95 shadow-2xs'
            title='Contact Developer on Telegram'
          >
            <svg
              className='w-3.5 h-3.5 text-sky-500 shrink-0'
              viewBox='0 0 24 24'
              fill='currentColor'
            >
              <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z' />
            </svg>
            <span>Contact Me</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
