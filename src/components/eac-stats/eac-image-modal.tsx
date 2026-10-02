import { useEffect } from 'react';
import type { EACModalImageInfo } from '../../data/eac-types';
import { DEFAULT_EAC_IMAGE } from '../../data/eac-types';

interface Props {
  isOpen: boolean;
  imageData?: EACModalImageInfo | null;
  onClose: () => void;
}

export default function EacImageModal({ isOpen, imageData, onClose }: Props) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentImage = imageData || DEFAULT_EAC_IMAGE;

  return (
    <div
      role='dialog'
      aria-modal='true'
      className='fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200'
      onClick={onClose}
    >
      <div
        className='relative max-w-5xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col max-h-[92vh]'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className='flex items-center justify-between px-4 py-3 bg-slate-950/90 border-b border-slate-800 text-white shrink-0'>
          <div className='flex items-center gap-2 min-w-0'>
            <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0' />
            <div className='truncate'>
              <h3 className='text-xs sm:text-sm font-bold font-["Kantumruy_Pro",sans-serif] text-slate-100 truncate'>
                {currentImage.title}
              </h3>
              {currentImage.subtitle && (
                <p className='text-[10px] text-slate-400 truncate'>
                  {currentImage.subtitle}
                </p>
              )}
            </div>
          </div>

          <div className='flex items-center gap-2 shrink-0'>
            <a
              href={currentImage.src}
              download={currentImage.downloadName || 'ev-station-cambodia.jpeg'}
              className='inline-flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 bg-emerald-950/50 border border-emerald-800/60 px-2.5 py-1 rounded-lg transition-all'
            >
              <svg className='w-3.5 h-3.5' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2}>
                <path strokeLinecap='round' strokeLinejoin='round' d='M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V3' />
              </svg>
              <span className='hidden sm:inline font-["Kantumruy_Pro",sans-serif]'>ទាញយក</span>
            </a>

            <button
              type='button'
              onClick={onClose}
              className='text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-all cursor-pointer'
              aria-label='Close modal'
            >
              <svg className='w-5 h-5' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2}>
                <line x1='18' y1='6' x2='6' y2='18' />
                <line x1='6' y1='6' x2='18' y2='18' />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal Image Body */}
        <div className='flex-1 overflow-auto p-2 sm:p-4 flex items-center justify-center bg-slate-950'>
          <img
            src={currentImage.src}
            alt={currentImage.title}
            className='max-w-full max-h-[78vh] object-contain rounded-lg shadow-lg'
          />
        </div>
      </div>
    </div>
  );
}

