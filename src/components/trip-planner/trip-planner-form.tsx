import { CAMBODIA_CITIES } from '../../data/cambodia-cities';
import { CAMBODIA_EV_MODELS, OPEN_EVDB_MODELS } from '../../data/ev-models';
import TripPlannerSocSliders from './trip-planner-soc-sliders';

type Props = {
  originId: string;
  destinationId: string;
  vehicleId: string;
  startSoc: number;
  reserveSoc: number;
  preferredConnector: string;
  acActive: boolean;
  isCalculating: boolean;
  onOriginChange: (id: string) => void;
  onDestinationChange: (id: string) => void;
  onVehicleChange: (id: string) => void;
  onStartSocChange: (val: number) => void;
  onReserveSocChange: (val: number) => void;
  onConnectorChange: (val: string) => void;
  onToggleAc: () => void;
  onSubmit: () => void;
};

export default function TripPlannerForm({
  originId,
  destinationId,
  vehicleId,
  startSoc,
  reserveSoc,
  preferredConnector,
  acActive,
  isCalculating,
  onOriginChange,
  onDestinationChange,
  onVehicleChange,
  onStartSocChange,
  onReserveSocChange,
  onConnectorChange,
  onToggleAc,
  onSubmit,
}: Props) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className='bg-white border border-slate-200/90 rounded-2xl p-4 space-y-3.5 text-xs text-slate-800 shadow-md'
    >
      <div className='flex items-center justify-between border-b border-slate-100 pb-2.5'>
        <h2 className='text-sm font-bold text-slate-900 flex items-center gap-1.5'>
          <span>🧭</span>
          <span>EV Route Configuration</span>
        </h2>
        <span className='text-[11px] text-emerald-700 font-semibold'>Cambodia Network</span>
      </div>

      {/* Origin & Destination */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-2.5'>
        <div>
          <label htmlFor='trip-origin' className='block text-slate-600 mb-1 text-[11px] font-medium'>
            Departure Origin
          </label>
          <select
            id='trip-origin'
            value={originId}
            onChange={(e) => onOriginChange(e.target.value)}
            className='w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-slate-800 font-medium focus:outline-hidden focus:border-emerald-500'
          >
            {CAMBODIA_CITIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} {c.nameKhmer ? `(${c.nameKhmer})` : ''}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor='trip-dest' className='block text-slate-600 mb-1 text-[11px] font-medium'>
            Destination
          </label>
          <select
            id='trip-dest'
            value={destinationId}
            onChange={(e) => onDestinationChange(e.target.value)}
            className='w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-slate-800 font-medium focus:outline-hidden focus:border-emerald-500'
          >
            {CAMBODIA_CITIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} {c.nameKhmer ? `(${c.nameKhmer})` : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* EV Model Selection */}
      <div>
        <label htmlFor='trip-vehicle' className='block text-slate-600 mb-1 text-[11px] font-medium'>
          EV Model (Battery & Consumption)
        </label>
        <select
          id='trip-vehicle'
          value={vehicleId}
          onChange={(e) => onVehicleChange(e.target.value)}
          className='w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-slate-800 font-medium focus:outline-hidden focus:border-emerald-500'
        >
          <optgroup label='Cambodia Official & Local'>
            {CAMBODIA_EV_MODELS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.brand} {m.modelName} — {m.batteryCapacityKwh} kWh ({m.rangeKm} km {m.rangeStandard})
              </option>
            ))}
          </optgroup>
          <optgroup label='Popular Global (Open-EVDB)'>
            {OPEN_EVDB_MODELS.slice(0, 40).map((m) => (
              <option key={m.id} value={m.id}>
                {m.brand} {m.modelName} ({m.variant}) — {m.batteryCapacityKwh} kWh
              </option>
            ))}
          </optgroup>
        </select>
      </div>

      {/* Battery SoC & Reserve */}
      <TripPlannerSocSliders
        startSoc={startSoc}
        reserveSoc={reserveSoc}
        onStartSocChange={onStartSocChange}
        onReserveSocChange={onReserveSocChange}
      />

      {/* Connector filter & Tropical AC Switch */}
      <div className='flex items-center justify-between gap-2 pt-1'>
        <div className='flex items-center gap-1.5'>
          <span className='text-slate-500 text-[11px]'>Plug:</span>
          {['all', 'GB-T', 'CCS2'].map((type) => (
            <button
              key={type}
              type='button'
              onClick={() => onConnectorChange(type)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                preferredConnector === type
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {type === 'all' ? 'Any Plug' : type}
            </button>
          ))}
        </div>

        <button
          type='button'
          onClick={onToggleAc}
          className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
            acActive
              ? 'bg-cyan-50 text-cyan-800 border border-cyan-200'
              : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
          }`}
          title='Air Conditioning compensation for tropical heat'
        >
          <span>❄️ A/C:</span>
          <span>{acActive ? 'On (+12%)' : 'Off'}</span>
        </button>
      </div>

      <button
        type='submit'
        disabled={isCalculating}
        className='w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold text-xs shadow-md transition-all cursor-pointer disabled:opacity-50'
      >
        {isCalculating ? 'Computing Road Route & Stops...' : 'Calculate Optimal EV Trip'}
      </button>
    </form>
  );
}
