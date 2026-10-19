import { useState } from 'react';

type LegendItem = {
  label: string;
  color: string;
};

const LEGEND_ITEMS: LegendItem[] = [
  { label: 'GB-T', color: 'bg-emerald-600' },
  { label: 'GB-T/CCS2', color: 'bg-teal-600' },
  { label: 'CCS2', color: 'bg-blue-600' },
  { label: 'CCS/SAE', color: 'bg-purple-600' },
  { label: 'Type 2', color: 'bg-amber-600' },
  { label: 'Unknown', color: 'bg-slate-500' },
];

const INITIAL_VISIBLE_COUNT = 2;

type Props = {
  hasWaypoints?: boolean;
};

export default function MapLegend({ hasWaypoints }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const displayedItems = isExpanded
    ? LEGEND_ITEMS
    : LEGEND_ITEMS.slice(0, INITIAL_VISIBLE_COUNT);

  const hiddenCount = LEGEND_ITEMS.length - INITIAL_VISIBLE_COUNT;

  return (
    <div className='absolute bottom-3 left-3 z-10 bg-white/95 backdrop-blur-md px-3 py-1.5 sm:py-2 rounded-xl border border-slate-200/90 shadow-xs flex flex-wrap items-center gap-2 sm:gap-2.5 text-[11px] font-medium text-slate-600 select-none max-w-[calc(100%-90px)] sm:max-w-none transition-all duration-200'>
      {hasWaypoints && (
        <>
          <div className='flex items-center gap-1.5 font-bold text-emerald-700'>
            <span>🚩</span>
            <span>Start (A)</span>
          </div>
          <div className='flex items-center gap-1.5 font-bold text-rose-700'>
            <span>🏁</span>
            <span>Finish (B)</span>
          </div>
          <div className='h-3 w-px bg-slate-200' />
        </>
      )}

      {displayedItems.map((item) => (
        <div key={item.label} className='flex items-center gap-1.5 shrink-0'>
          <span
            className={`w-2.5 h-2.5 rounded-full ${item.color} shadow-2xs shrink-0`}
          />
          <span>{item.label}</span>
        </div>
      ))}

      <button
        type='button'
        onClick={() => setIsExpanded((prev) => !prev)}
        className='flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-semibold transition-colors cursor-pointer shrink-0 ml-0.5'
        aria-expanded={isExpanded}
        aria-label={
          isExpanded
            ? 'Hide extra connector legend items'
            : 'Expand connector legend'
        }
        title={isExpanded ? 'Hide extra connectors' : 'Show all connectors'}
      >
        <span>{isExpanded ? 'Hide' : `+${hiddenCount}`}</span>
        <svg
          className={`w-3 h-3 text-slate-500 transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`}
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2.5}
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7' />
        </svg>
      </button>
    </div>
  );
}

