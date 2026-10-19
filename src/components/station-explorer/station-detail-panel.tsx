import { useState, useCallback } from 'react';
import type { ChargingStation } from '../../types/station';
import { connectorStyles } from '../../constants/connector-styles';

type Props = {
  station: ChargingStation;
  distance?: number;
  onClose: () => void;
  onReportIssue?: (station: ChargingStation) => void;
};

export default function StationDetailPanel({
  station,
  distance,
  onClose,
  onReportIssue,
}: Props) {
  const [copied, setCopied] = useState(false);
  const style = connectorStyles[station.connector] || connectorStyles.Unknown;
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${station.latitude},${station.longitude}`;

  const handleCopyCoords = useCallback(() => {
    navigator.clipboard.writeText(
      `${station.latitude.toFixed(6)}, ${station.longitude.toFixed(6)}`,
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [station.latitude, station.longitude]);

  return (
    <div
      role='dialog'
      aria-modal='true'
      aria-label='Station Details'
      className='flex flex-col h-full bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl overflow-hidden text-slate-900 shadow-2xl animate-in fade-in duration-200'
    >
      {/* Header bar */}
      <div className='flex items-start justify-between p-4 border-b border-slate-100 bg-slate-50/80'>
        <div className='min-w-0 pr-2'>
          <div className='flex items-center gap-2 mb-1 flex-wrap'>
            <span className='text-[10px] uppercase tracking-wider font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded'>
              {station.brand || 'EV Station'}
            </span>
            {distance !== undefined && (
              <span className='text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded'>
                {distance} km away
              </span>
            )}
          </div>
          <h2 className='text-base font-bold text-slate-900 leading-tight truncate'>
            {station.name}
          </h2>
          {station.nameKhmer && (
            <p className='text-xs text-slate-500 font-["Kantumruy_Pro",sans-serif] mt-0.5 truncate'>
              {station.nameKhmer}
            </p>
          )}
        </div>
        <button
          type='button'
          onClick={onClose}
          className='text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer shrink-0'
          aria-label='Close panel'
        >
          ✕
        </button>
      </div>

      {/* Content body */}
      <div className='flex-1 min-h-0 overflow-y-auto p-4 space-y-3.5 text-xs text-slate-600'>
        {/* Connector and Speed banner */}
        <div className='grid grid-cols-2 gap-2'>
          <div className='bg-slate-50 p-2.5 rounded-xl border border-slate-200/80'>
            <span className='text-[10px] text-slate-500 block mb-1'>Plug Standard</span>
            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${style.bg} ${style.text} ${style.border} border`}>
              {station.connector}
            </span>
          </div>
          <div className='bg-slate-50 p-2.5 rounded-xl border border-slate-200/80'>
            <span className='text-[10px] text-slate-500 block mb-1'>Charging Speed</span>
            <span className='font-bold text-emerald-700'>
              {station.speedCategory === 'dc_fast'
                ? 'DC Fast Charger'
                : station.speedCategory === 'ac_standard'
                  ? 'AC Standard (≤ 22kW)'
                  : 'Speed: Unknown'}
            </span>
          </div>
        </div>

        {/* Operating status & Chargers count */}
        <div className='bg-slate-50/70 p-3 rounded-xl border border-slate-200/70 space-y-2'>
          <div className='flex items-center justify-between'>
            <span className='text-slate-500'>Operating Hours:</span>
            <span className='font-medium text-slate-800'>{station.operationTime}</span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-slate-500'>Stalls / Chargers:</span>
            <span className='font-medium text-slate-800'>
              {station.chargersCount !== undefined ? `${station.chargersCount} unit(s)` : 'Unknown'}
            </span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-slate-500'>Province:</span>
            <span className='font-medium text-slate-800'>{station.province}</span>
          </div>
        </div>

        {/* Verified Address & Contact */}
        <div className='space-y-1.5'>
          <span className='text-[11px] font-semibold text-slate-500 uppercase tracking-wide block'>
            Verified Location & Access
          </span>
          <div className='bg-slate-50/70 p-3 rounded-xl border border-slate-200/70 space-y-1.5'>
            <p className='text-slate-700 leading-relaxed'>
              {station.address || 'Specific street address not provided in open dataset.'}
            </p>
            {station.phone && (
              <p className='text-slate-600 pt-1 border-t border-slate-200 flex items-center gap-1.5'>
                <span>📞</span>
                <a href={`tel:${station.phone.split(',')[0].trim()}`} className='text-emerald-700 hover:underline'>
                  {station.phone}
                </a>
              </p>
            )}
          </div>
        </div>

        {/* Coordinates */}
        <div className='flex items-center justify-between bg-slate-50/70 p-2.5 rounded-xl border border-slate-200/70'>
          <div className='font-mono text-[11px] text-slate-700'>
            {station.latitude.toFixed(6)}, {station.longitude.toFixed(6)}
          </div>
          <button
            type='button'
            onClick={handleCopyCoords}
            className='px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-[11px] font-semibold transition-colors cursor-pointer'
          >
            {copied ? '✓ Copied' : 'Copy GPS'}
          </button>
        </div>

        {/* Verification Source & Date */}
        <div className='rounded-xl bg-slate-50 p-2.5 border border-slate-200/80 text-[11px] text-slate-500 flex items-center justify-between'>
          <span>Source: <strong className='text-slate-700'>{station.source}</strong></span>
          <span className='text-emerald-700 font-medium'>{station.verifiedDate}</span>
        </div>
      </div>

      {/* Footer Actions */}
      <div className='p-3.5 border-t border-slate-100 bg-slate-50/80 grid grid-cols-2 gap-2'>
        <button
          type='button'
          onClick={() => onReportIssue?.(station)}
          className='py-2 px-3 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 text-xs font-semibold transition-colors text-center cursor-pointer shadow-xs'
        >
          ⚠️ Report Issue
        </button>
        <a
          href={mapsUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors text-center shadow-xs'
        >
          Open in Maps ↗
        </a>
      </div>
    </div>
  );
}
