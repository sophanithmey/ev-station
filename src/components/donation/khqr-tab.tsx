import { useState, useCallback } from 'react';
import { DONATION_CONFIG } from '../../constants/donation-config';
import { useQrShare } from '../../hooks/use-qr-share';
import KhqrActions from './khqr-actions';

export default function KhqrTab() {
  const [copied, setCopied] = useState(false);
  const { khqr } = DONATION_CONFIG;
  const { isSharing, feedback, handleShareQr, handleDownloadQr } = useQrShare();

  const handleCopyAccount = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(khqr.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [khqr.accountNumber]);

  return (
    <div className='space-y-3.5 text-xs text-slate-600'>
      {/* KHQR Card */}
      <div className='border-2 border-red-500 rounded-2xl overflow-hidden bg-white shadow-sm'>
        {/* KHQR Header */}
        <div className='bg-red-600 px-3.5 py-2 flex items-center justify-between text-white'>
          <div className='flex items-center gap-1.5'>
            <span className='font-black tracking-wider text-xs'>KHQR</span>
            <span className='text-[10px] opacity-80 border-l border-red-400 pl-1.5'>
              Bakong Payment
            </span>
          </div>
          <span className='text-[10px] font-semibold bg-red-700/60 px-2 py-0.5 rounded-full'>
            Cambodia
          </span>
        </div>

        {/* QR Code / Placeholder Body */}
        <div className='p-4 flex flex-col items-center justify-center gap-3 bg-slate-50/50'>
          {khqr.qrImageUrl ? (
            <div className='p-2 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center justify-center'>
              <img
                src={khqr.qrImageUrl}
                alt='Bakong KHQR Payment Code'
                className='w-44 h-44 object-contain'
              />
            </div>
          ) : (
            <div className='w-44 h-44 rounded-xl border-2 border-dashed border-red-300 bg-white flex flex-col items-center justify-center p-3 text-center'>
              {/* QR Pattern Placeholder SVG */}
              <svg
                className='w-16 h-16 text-red-500 mb-1 opacity-90'
                viewBox='0 0 24 24'
                fill='currentColor'
              >
                <path d='M3 3h7v7H3V3zm2 2v3h3V5H5zm8-2h7v7h-7V3zm2 2v3h3V5h-3zM3 13h7v7H3v-7zm2 2v3h3v-3H5zm13-2h3v2h-3v-2zm-3 0h2v3h-2v-3zm3 3h3v5h-2v-3h-1v-2zm-3 2h2v3h-2v-3zm-5-2h2v2h-2v-2zm0 3h2v2h-2v-2zm5-11h-2v2h2V5zm-2 2h-2v2h2V7zm-2-2h-2v2h2V5z' />
              </svg>
              <span className='text-[11px] font-bold text-red-700'>
                Bakong KHQR Code
              </span>
              <span className='text-[9px] text-slate-400 leading-tight mt-0.5'>
                Scan with any KH bank app
              </span>
            </div>
          )}

          {/* Account Details Box */}
          <div className='w-full bg-white border border-slate-200/90 rounded-xl p-3 space-y-1.5'>
            <div className='flex items-center justify-between text-[11px]'>
              <span className='text-slate-500 font-medium'>Account Name:</span>
              <span className='font-bold text-slate-900'>
                {khqr.accountName}
              </span>
            </div>
            <div className='flex items-center justify-between text-[11px]'>
              <span className='text-slate-500 font-medium'>
                Bank / Service:
              </span>
              <span className='font-semibold text-slate-800'>
                {khqr.bankName}
              </span>
            </div>
            <div className='flex items-center justify-between text-[11px] pt-1 border-t border-slate-100'>
              <span className='text-slate-500 font-medium'>Account No:</span>
              <div className='flex items-center gap-1.5'>
                <span className='font-mono font-bold text-slate-900'>
                  {khqr.accountNumber}
                </span>
                <button
                  type='button'
                  onClick={handleCopyAccount}
                  className='px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 active:scale-95 transition-all'
                >
                  {copied ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share & Save QR Action Buttons */}
      <KhqrActions
        isSharing={isSharing}
        feedback={feedback}
        onShare={handleShareQr}
        onDownload={handleDownloadQr}
      />

      {/* Note */}
      <p className='text-[10px] text-slate-500 text-center leading-relaxed'>
        {khqr.note}
      </p>
    </div>
  );
}
