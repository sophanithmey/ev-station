import type { ChargingStop } from '../../types/trip';

type Props = {
  stop: ChargingStop;
  index: number;
};

export default function TripStopCard({ stop, index }: Props) {
  const { station, arrivalSoc, targetSoc, kwhNeeded, estimatedMinutes, distanceAlongRouteKm } =
    stop;
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${station.latitude},${station.longitude}`;

  return (
    <article className='bg-white border border-slate-200/90 rounded-2xl p-3.5 space-y-2.5 text-xs text-slate-800 shadow-xs hover:shadow-md transition-all'>
      {/* Top row */}
      <div className='flex items-start justify-between gap-2'>
        <div className='min-w-0 flex-1'>
          <div className='flex items-center gap-1.5 mb-1 flex-wrap'>
            <span className='px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200/80 font-bold text-[10px] uppercase'>
              Stop #{index + 1}
            </span>
            <span className='text-[10px] text-slate-500'>
              At {distanceAlongRouteKm} km
            </span>
            <span className='text-[10px] text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded'>
              {station.connector}
            </span>
          </div>
          <h4 className='font-bold text-slate-900 text-sm leading-snug truncate'>
            {station.name}
          </h4>
          <p className='text-[11px] text-slate-500 truncate mt-0.5'>
            {station.province} — {station.operationTime}
          </p>
        </div>

        <a
          href={mapsUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold border border-slate-200 transition-colors shrink-0'
        >
          Directions ↗
        </a>
      </div>

      {/* Charge Metrics Grid */}
      <div className='grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 text-center'>
        <div>
          <span className='text-[10px] text-slate-500 block'>Battery SoC</span>
          <span className='font-bold text-slate-700'>
            {arrivalSoc}% → <span className='text-emerald-700'>{targetSoc}%</span>
          </span>
        </div>

        <div>
          <span className='text-[10px] text-slate-500 block'>Energy Needed</span>
          <span className='font-bold text-cyan-700'>+{kwhNeeded} kWh</span>
        </div>

        <div>
          <span className='text-[10px] text-slate-500 block'>Charge Duration</span>
          <span className='font-bold text-amber-700'>~{estimatedMinutes} mins</span>
        </div>
      </div>
    </article>
  );
}
