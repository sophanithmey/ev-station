import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import KhqrTab from './khqr-tab';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function DonationModal({ isOpen, onClose }: Props) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      role='dialog'
      aria-modal='true'
      aria-labelledby='donation-modal-title'
      className='fixed inset-0 z-9999 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200'
      onClick={onClose}
    >
      <div
        className='bg-white rounded-2xl p-5 sm:p-6 max-w-md w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-200'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className='flex items-start justify-between gap-3'>
          <div className='flex items-center gap-2.5'>
            <div className='w-9 h-9 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600 text-lg font-bold shrink-0'>
              ☕
            </div>
            <div>
              <h2
                id='donation-modal-title'
                className='text-base font-bold text-slate-900 leading-tight'
              >
                Buy Me a Coffee (Bakong KHQR)
              </h2>
              <p className='text-[11px] text-slate-500'>
                Support server hosting &amp; data maintenance in Cambodia
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

        {/* Bakong KHQR Donation Content */}
        <KhqrTab />

        {/* Footer Note */}
        <div className='pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500'>
          <span>Made for EV drivers in Cambodia</span>
          <button
            type='button'
            onClick={onClose}
            className='px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-medium active:scale-95 transition-all text-xs'
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

