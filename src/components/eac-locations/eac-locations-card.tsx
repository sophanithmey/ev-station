import type { EACStationLocation } from '../../data/eac-location-types';
import EacLocationsQrCode from './eac-locations-qr-code';

type Props = {
  station: EACStationLocation;
  onOpenQr: (station: EACStationLocation) => void;
};

export default function EacLocationsCard({ station, onOpenQr }: Props) {
  const mapUrl = `https://maps.google.com/?q=${station.latitude},${station.longitude}`;
  const cleanPhone = station.phone.replace(/\s+/g, '');

  return (
    <div className='bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs p-3.5 flex flex-col gap-2.5 transition-all'>
      {/* Top Row: No, Name & Charger Badge */}
      <div className='flex items-start justify-between gap-2'>
        <div className='flex items-start gap-2 min-w-0'>
          <span className='inline-flex items-center justify-center w-6 h-6 rounded-lg bg-blue-100 text-blue-800 text-xs font-black shrink-0 mt-0.5'>
            {station.no}
          </span>
          <div className='min-w-0'>
            <h3 className='text-sm font-bold text-slate-900 leading-snug font-["Kantumruy_Pro",sans-serif]'>
              {station.nameKh}
            </h3>
            {station.nameEn && (
              <p className='text-[11px] text-slate-400 font-normal leading-tight'>
                {station.nameEn}
              </p>
            )}
          </div>
        </div>

        <span className='inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-extrabold shrink-0'>
          <span>⚡</span>
          <span>{station.chargersCount} ទូ</span>
        </span>
      </div>

      {/* Address */}
      <div className='flex items-start gap-1.5 text-xs text-slate-600 leading-relaxed pl-8'>
        <span className='text-slate-400 shrink-0 text-sm'>📍</span>
        <span className='font-["Kantumruy_Pro",sans-serif]'>{station.addressKh}</span>
      </div>

      {/* Actions Row: Phone Call + Google Maps + QR Code */}
      <div className='flex items-center justify-between gap-2 pt-2 border-t border-slate-100 mt-0.5'>
        <div className='flex items-center gap-1.5 flex-1 min-w-0'>
          <a
            href={`tel:${cleanPhone}`}
            className='inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200/80 text-xs font-bold transition-all shrink-0 active:scale-95'
            title={`Call ${station.phone}`}
          >
            <span>📞</span>
            <span className='font-mono'>{station.phone}</span>
          </a>

          <a
            href={mapUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-semibold transition-all active:scale-95'
            title='បើកក្នុង Google Maps'
          >
            <span>🗺️</span>
            <span className='hidden sm:inline'>ផែនទី</span>
          </a>
        </div>

        {/* QR Code thumbnail */}
        <EacLocationsQrCode
          lat={station.latitude}
          lng={station.longitude}
          size={38}
          onClick={() => onOpenQr(station)}
        />
      </div>
    </div>
  );
}
