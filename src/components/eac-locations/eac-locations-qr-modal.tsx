import { useEffect, useState, useCallback } from 'react';
import type { EACStationLocation } from '../../data/eac-location-types';
import { useQrCode } from '../../hooks/use-qr-code';

type Props = {
  station: EACStationLocation | null;
  onClose: () => void;
};

export default function EacLocationsQrModal({ station, onClose }: Props) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const mapUrl = station ? `https://maps.google.com/?q=${station.latitude},${station.longitude}` : '';
  const { dataUrl } = useQrCode(mapUrl, { width: 300 });

  const handleCopyCoordinates = useCallback(async () => {
    if (!station) return;
    try {
      await navigator.clipboard.writeText(`${station.latitude}, ${station.longitude}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore clipboard error
    }
  }, [station]);

  if (!station) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn'>
      <div
        className='relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col'
        role='dialog'
        aria-modal='true'
      >
        <div className='bg-linear-to-r from-blue-700 via-indigo-600 to-blue-800 text-white p-4 flex items-center justify-between'>
          <div className='min-w-0 pr-2'>
            <span className='text-[11px] font-medium text-blue-200 uppercase tracking-wider'>
              ទីតាំងស្ថានីយ #{station.no}
            </span>
            <h2 className='text-base sm:text-lg font-bold truncate leading-tight'>
              {station.nameKh}
            </h2>
          </div>
          <button
            type='button'
            onClick={onClose}
            className='w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0'
            aria-label='Close modal'
          >
            ✕
          </button>
        </div>

        <div className='p-5 flex flex-col items-center gap-4 text-center'>
          <div className='p-3 bg-white rounded-2xl border-2 border-indigo-100 shadow-inner flex flex-col items-center'>
            {dataUrl ? (
              <img
                src={dataUrl}
                alt={`QR code for ${station.nameKh}`}
                className='w-48 h-48 sm:w-56 sm:h-56 object-contain rounded-lg'
              />
            ) : (
              <div className='w-48 h-48 sm:w-56 sm:h-56 bg-slate-100 animate-pulse rounded-lg' />
            )}
            <p className='text-xs font-semibold text-slate-500 mt-2'>
              ស្កេន QR ដើម្បីបើកទីតាំងលើ Google Maps
            </p>
          </div>

          <div className='w-full text-left bg-slate-50 rounded-xl p-3 border border-slate-200/80 space-y-2 text-xs text-slate-700'>
            <div>
              <span className='font-bold text-slate-900'>ទីតាំង៖ </span>
              <span>{station.addressKh}</span>
            </div>
            <div className='flex items-center justify-between'>
              <div>
                <span className='font-bold text-slate-900'>ទូសាក៖ </span>
                <span className='px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold'>
                  {station.chargersCount} ទូ
                </span>
              </div>
              <div>
                <span className='font-bold text-slate-900'>ទូរសព្ទ៖ </span>
                <a
                  href={`tel:${station.phone.replace(/\s+/g, '')}`}
                  className='text-blue-600 font-bold hover:underline'
                >
                  {station.phone}
                </a>
              </div>
            </div>
            <div className='text-[11px] text-slate-500'>
              <span className='font-mono'>
                GPS: {station.latitude.toFixed(5)}, {station.longitude.toFixed(5)}
              </span>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-2 w-full'>
            <a
              href={mapUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors'
            >
              📍 បើក Google Maps
            </a>
            <button
              type='button'
              onClick={handleCopyCoordinates}
              className='flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-300 transition-colors cursor-pointer'
            >
              {copied ? '✓ បានចម្លង!' : '📋 ចម្លង GPS'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
