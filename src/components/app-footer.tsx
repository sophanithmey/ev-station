import { useVisitorCount } from '../hooks/use-visitor-count';

type Props = {
  datasetUrl?: string;
  telegramUrl?: string;
  className?: string;
  onOpenDisclaimer?: () => void;
  onOpenDonate?: () => void;
};

const DEFAULT_DATASET_URL =
  'https://data.mef.gov.kh/datasets/pd_67b6d073cb47dc00012464a6';
const DEFAULT_TELEGRAM_URL = 'https://t.me/sophanithmey';

export default function AppFooter({
  datasetUrl = DEFAULT_DATASET_URL,
  telegramUrl = DEFAULT_TELEGRAM_URL,
  className = '',
  onOpenDisclaimer,
  onOpenDonate,
}: Props) {
  const { count, status } = useVisitorCount();

  return (
    <footer
      className={`shrink-0 border-t border-slate-200/90 bg-white/95 backdrop-blur-md px-2.5 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 text-xs text-slate-500 shadow-xs select-none ${className}`}
    >
      <div className='flex flex-col md:flex-row items-center justify-between gap-1 sm:gap-2'>
        {/* Row 1 on mobile / Left on desktop: Open Data Attribution & Notice */}
        <div className='w-full md:w-auto flex items-center justify-between md:justify-start gap-1.5 sm:gap-2 text-[10px] sm:text-xs'>
          <div className='flex items-center gap-1 sm:gap-1.5 shrink-0'>
            <span className='inline-flex items-center gap-1 font-semibold text-slate-700'>
              <svg
                className='w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400 shrink-0'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4'
                />
              </svg>
              <span className='hidden sm:inline'>Open Data:</span>
            </span>

            <a
              href={datasetUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='group inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 rounded-full font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100/90 border border-emerald-200/80 transition-all hover:scale-102 shadow-2xs'
              title='Ministry of Economy and Finance Open Data Portal'
            >
              <span className='w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform' />
              <span>
                MEF<span className='hidden sm:inline'> Portal</span>
              </span>
            </a>

            <a
              href='https://www.eac.gov.kh'
              target='_blank'
              rel='noopener noreferrer'
              className='group inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 rounded-full font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100/90 border border-blue-200/80 transition-all hover:scale-102 shadow-2xs'
              title='Electricity Authority of Cambodia'
            >
              <span className='w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:scale-125 transition-transform' />
              <span>
                EAC<span className='hidden sm:inline'> Cambodia</span>
              </span>
            </a>
          </div>

          {onOpenDisclaimer ? (
            <button
              type='button'
              onClick={onOpenDisclaimer}
              className='inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 transition-all cursor-pointer active:scale-95 shadow-2xs shrink-0'
              title='View full legal disclaimer & data accuracy notice'
            >
              <span>⚠️</span>
              <span className='hover:underline'>Disclaimer</span>
            </button>
          ) : (
            <span className='text-[10px] text-slate-400 hidden xl:inline'>
              (Verify before travel)
            </span>
          )}
        </div>

        {/* Row 2 on mobile / Right on desktop: Interactive community widgets & contact */}
        <div className='w-full md:w-auto flex items-center justify-between md:justify-end gap-1.5 sm:gap-2 shrink-0 pt-1 md:pt-0 border-t md:border-t-0 border-slate-200/50'>
          {/* Visitor Counter */}
          <div
            className='inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-slate-50 border border-slate-200/80 text-[10px] sm:text-[11px] text-slate-600 shadow-2xs'
            title='Total Unique Visitors'
          >
            <span className='relative flex h-1.5 w-1.5 sm:h-2 sm:w-2 shrink-0'>
              <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75' />
              <span className='relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-emerald-500' />
            </span>
            {status === 'loading' && (
              <span className='text-slate-400 animate-pulse font-mono text-[9px] sm:text-[10px]'>
                ...
              </span>
            )}
            {status === 'success' && count !== null && (
              <span className='font-bold text-slate-800 font-mono'>
                {count}
              </span>
            )}
            {(status === 'error' ||
              (status === 'success' && count === null)) && (
              <span className='text-slate-400 font-medium'>Live</span>
            )}
            <span className='text-slate-400 text-[9px] sm:text-[10px]'>
              visitors
            </span>
          </div>

          <div className='flex items-center gap-1 sm:gap-1.5'>
            {/* Built with Love (Desktop only) */}
            <div className='hidden lg:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200/80 text-[11px] font-medium text-slate-500 shadow-2xs'>
              <span>Built with</span>
              <span
                role='img'
                aria-label='love'
                className='text-rose-500 animate-pulse text-xs transition-transform duration-200 hover:scale-125 select-none'
              >
                ❤️
              </span>
            </div>

            {/* Coffee Support (if available) */}
            {onOpenDonate && (
              <button
                type='button'
                onClick={onOpenDonate}
                className='inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-200 text-[11px] sm:text-xs shadow-2xs transition-all active:scale-95 cursor-pointer'
                title='Buy Me a Coffee (Bakong KHQR)'
                aria-label='Support Developer'
              >
                ☕
              </button>
            )}

            {/* Contact Me Telegram */}
            <a
              href={telegramUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold text-white bg-linear-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-600 hover:to-blue-700 shadow-2xs hover:shadow-xs transition-all active:scale-95 cursor-pointer'
              title='Contact Developer on Telegram'
            >
              <svg
                className='w-3 h-3 sm:w-3.5 sm:h-3.5 text-white shrink-0'
                viewBox='0 0 24 24'
                fill='currentColor'
              >
                <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z' />
              </svg>
              <span>
                Contact<span className='hidden sm:inline'> Me</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
