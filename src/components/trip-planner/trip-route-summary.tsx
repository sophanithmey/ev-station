import type { TripPlanResult } from '../../types/trip';

type Props = {
  result: TripPlanResult;
};

export default function TripRouteSummary({ result }: Props) {
  const { route, initialSoc, arrivalSoc, energyUsedKwh, stops, warnings, isFeasible } = result;
  const hours = Math.floor(route.durationMinutes / 60);
  const mins = route.durationMinutes % 60;
  const durationText = hours > 0 ? `${hours}h ${mins}m` : `${mins} mins`;

  return (
    <div className='bg-white border border-slate-200/90 rounded-2xl p-4 space-y-3 text-xs text-slate-800 shadow-md'>
      {/* Metrics Row */}
      <div className='grid grid-cols-2 sm:grid-cols-4 gap-2'>
        <div className='bg-slate-50 p-2.5 rounded-xl border border-slate-200/80'>
          <span className='text-[10px] text-slate-500 block'>Road Distance</span>
          <span className='text-sm font-bold text-slate-900'>{route.distanceKm} km</span>
        </div>

        <div className='bg-slate-50 p-2.5 rounded-xl border border-slate-200/80'>
          <span className='text-[10px] text-slate-500 block'>Est. Driving Time</span>
          <span className='text-sm font-bold text-slate-900'>{durationText}</span>
        </div>

        <div className='bg-slate-50 p-2.5 rounded-xl border border-slate-200/80'>
          <span className='text-[10px] text-slate-500 block'>Energy Required</span>
          <span className='text-sm font-bold text-cyan-700'>{energyUsedKwh} kWh</span>
        </div>

        <div className='bg-slate-50 p-2.5 rounded-xl border border-slate-200/80'>
          <span className='text-[10px] text-slate-500 block'>Est. Arrival Battery</span>
          <span
            className={`text-sm font-bold ${
              arrivalSoc >= result.reserveSoc
                ? 'text-emerald-700'
                : 'text-rose-600'
            }`}
          >
            {arrivalSoc}% SoC
          </span>
        </div>
      </div>

      {/* Battery State Comparison Bar */}
      <div className='bg-slate-50/70 p-3 rounded-xl border border-slate-200/70 space-y-1.5'>
        <div className='flex justify-between text-[11px] font-semibold text-slate-700'>
          <span>Start: {initialSoc}%</span>
          <span>
            {stops.length > 0 ? `${stops.length} Charging Stop(s)` : 'Direct Drive (0 Stops)'}
          </span>
          <span>Arrival: {arrivalSoc}%</span>
        </div>

        <div className='w-full h-2.5 bg-slate-200 rounded-full overflow-hidden flex'>
          <div
            style={{ width: `${Math.min(100, Math.max(5, arrivalSoc))}%` }}
            className={`h-full transition-all duration-500 rounded-full ${
              arrivalSoc >= result.reserveSoc ? 'bg-emerald-600' : 'bg-rose-500'
            }`}
          />
        </div>
      </div>

      {/* Feasibility Alert */}
      <div
        className={`p-2.5 rounded-xl border flex items-center gap-2 ${
          isFeasible
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
            : 'bg-amber-50 border-amber-200 text-amber-800'
        }`}
      >
        <span>{isFeasible ? '✅' : '⚠️'}</span>
        <span className='font-medium text-[11px] leading-snug'>
          {isFeasible
            ? 'Route is verified feasible with sufficient battery reserve on Cambodian roads.'
            : 'Battery level may dip below minimum reserve. Review suggested stops carefully.'}
        </span>
      </div>

      {/* Warning notices */}
      {warnings.length > 0 && (
        <div className='p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1'>
          {warnings.map((w) => (
            <p key={w} className='text-[10px] text-slate-600 flex items-start gap-1'>
              <span className='text-amber-600 shrink-0'>ℹ️</span>
              <span>{w}</span>
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
