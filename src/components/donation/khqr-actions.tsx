type Props = {
  isSharing: boolean;
  feedback: 'idle' | 'shared' | 'downloaded' | 'copied';
  onShare: () => void;
  onDownload: () => void;
};

export default function KhqrActions({
  isSharing,
  feedback,
  onShare,
  onDownload,
}: Props) {
  return (
    <div className='grid grid-cols-2 gap-2 pt-0.5'>
      <button
        type='button'
        onClick={onShare}
        disabled={isSharing}
        className='py-2 px-3 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 text-white font-semibold text-xs inline-flex items-center justify-center gap-1.5 transition-all shadow-xs'
        aria-label='Share Bakong KHQR code'
      >
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
            d='M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z'
          />
        </svg>
        <span>
          {feedback === 'shared'
            ? 'Shared!'
            : isSharing
              ? 'Sharing...'
              : 'Share QR'}
        </span>
      </button>

      <button
        type='button'
        onClick={onDownload}
        className='py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200/90 active:scale-95 text-slate-700 font-semibold text-xs inline-flex items-center justify-center gap-1.5 transition-all border border-slate-200'
        aria-label='Save Bakong KHQR image'
      >
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
            d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4'
          />
        </svg>
        <span>{feedback === 'downloaded' ? 'Saved!' : 'Save Image'}</span>
      </button>
    </div>
  );
}
