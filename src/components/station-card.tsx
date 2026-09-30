import { useState } from 'react';
import type { ChargingStation } from '../data/charging-stations';
import { connectorStyles } from '../constants/connector-styles';
import StationCardActions from './station-card-actions';

type Props = {
  station: ChargingStation;
  distance?: number;
  isSelected?: boolean;
  onSelectOnMap?: (station: ChargingStation) => void;
};

const StationCard = ({
  station,
  distance,
  isSelected = false,
  onSelectOnMap,
}: Props) => {
  const [copied, setCopied] = useState(false);
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${station.latitude},${station.longitude}`;
  const style =
    connectorStyles[station.connector] || connectorStyles.Unknown;

  const handleCopyCoords = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(
      `${station.latitude.toFixed(6)}, ${station.longitude.toFixed(6)}`,
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article
      onClick={() => onSelectOnMap?.(station)}
      className={`group relative bg-white rounded-2xl border transition-all duration-200 p-3.5 sm:p-4 flex flex-col gap-2.5 cursor-pointer ${
        isSelected
          ? 'border-emerald-500 shadow-md ring-2 ring-emerald-500/20 bg-emerald-50/20'
          : 'border-slate-200/90 shadow-xs hover:border-emerald-300 hover:shadow-md'
      }`}
    >
      {/* Header: Brand/Distance Tags, Title, and Connector Badge */}
      <div className='flex items-start justify-between gap-3'>
        <div className='min-w-0 flex-1'>
          <div className='flex items-center gap-1.5 mb-1 flex-wrap'>
            {station.brand && (
              <span className='text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md'>
                {station.brand}
              </span>
            )}
            {distance !== undefined && (
              <span className='text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-md flex items-center gap-1'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-2.5 h-2.5 text-emerald-600 shrink-0'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
                  />
                </svg>
                {distance} km away
              </span>
            )}
          </div>
          <h3 className='font-bold text-slate-900 text-sm leading-snug group-hover:text-emerald-700 transition-colors line-clamp-1'>
            {station.name}
          </h3>
        </div>

        {/* Connector Badge */}
        <span
          className={`shrink-0 text-xs font-bold px-2.5 py-1 rounded-full border ${style.bg} ${style.text} ${style.border}`}
        >
          {station.connector}
        </span>
      </div>

      {/* Location & Operating Hours */}
      <div className='flex items-center justify-between gap-2 text-xs text-slate-600 pt-0.5'>
        <div className='flex items-center gap-1 text-slate-600 min-w-0'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='w-3.5 h-3.5 text-slate-400 shrink-0'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
            />
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
            />
          </svg>
          <span className='truncate font-medium text-slate-700'>
            {station.province}
          </span>
        </div>

        <div
          className={`flex items-center gap-1 font-semibold text-[11px] shrink-0 ${
            station.is24Hours
              ? 'text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full'
              : 'text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full'
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              station.is24Hours
                ? 'bg-emerald-500 animate-pulse'
                : 'bg-slate-400'
            }`}
          />
          <span>{station.operationTime}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <StationCardActions
        mapsUrl={mapsUrl}
        copied={copied}
        onSelectOnMap={() => onSelectOnMap?.(station)}
        onCopyCoords={handleCopyCoords}
      />
    </article>
  );
};

export default StationCard;
