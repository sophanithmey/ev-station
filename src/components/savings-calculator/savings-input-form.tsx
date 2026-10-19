import type { CurrencyCode, SavingsInputs } from '../../types/savings';

type Props = {
  inputs: SavingsInputs;
  onUpdate: <K extends keyof SavingsInputs>(key: K, val: SavingsInputs[K]) => void;
  onSetCurrency: (curr: CurrencyCode) => void;
  onReset: () => void;
};

export default function SavingsInputForm({
  inputs,
  onUpdate,
  onSetCurrency,
  onReset,
}: Props) {
  return (
    <div className='bg-white border border-slate-200/90 rounded-2xl p-4 space-y-3.5 text-xs text-slate-800 shadow-md'>
      {/* Header and Currency Switcher */}
      <div className='flex items-center justify-between border-b border-slate-100 pb-2.5'>
        <h2 className='text-sm font-bold text-slate-900 flex items-center gap-1.5'>
          <span>⚙️</span>
          <span>Cost & Driving Parameters</span>
        </h2>
        <div className='flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200'>
          <button
            type='button'
            onClick={() => onSetCurrency('USD')}
            className={`px-2.5 py-0.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              inputs.currency === 'USD'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            USD ($)
          </button>
          <button
            type='button'
            onClick={() => onSetCurrency('KHR')}
            className={`px-2.5 py-0.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              inputs.currency === 'KHR'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            KHR (៛)
          </button>
        </div>
      </div>

      {/* Monthly Distance Slider */}
      <div className='space-y-1.5 bg-slate-50/70 p-3 rounded-xl border border-slate-200/70'>
        <div className='flex justify-between font-semibold'>
          <span className='text-slate-600'>Monthly Driving Distance:</span>
          <span className='text-emerald-700 font-bold text-sm'>
            {inputs.monthlyDistanceKm.toLocaleString()} km/month
          </span>
        </div>
        <input
          type='range'
          min='300'
          max='4000'
          step='100'
          value={inputs.monthlyDistanceKm}
          onChange={(e) => onUpdate('monthlyDistanceKm', Number(e.target.value))}
          className='w-full accent-emerald-600 cursor-pointer'
        />
        <div className='flex justify-between text-[10px] text-slate-400'>
          <span>300 km (Weekend)</span>
          <span>1,500 km (Commuter)</span>
          <span>4,000 km (High Mileage)</span>
        </div>
      </div>

      {/* Petrol Parameters */}
      <div className='grid grid-cols-2 gap-2.5'>
        <div>
          <label htmlFor='savings-ice-cons' className='block text-slate-600 mb-1 text-[11px] font-medium'>
            Petrol Fuel Cons. (L/100km)
          </label>
          <input
            id='savings-ice-cons'
            type='number'
            step='0.5'
            min='4'
            max='25'
            value={inputs.iceConsumptionL100km}
            onChange={(e) => onUpdate('iceConsumptionL100km', Number(e.target.value))}
            className='w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800 font-bold focus:outline-hidden focus:border-emerald-500'
          />
        </div>

        <div>
          <label htmlFor='savings-gas-price' className='block text-slate-600 mb-1 text-[11px] font-medium'>
            Gasoline Price ($/Liter)
          </label>
          <input
            id='savings-gas-price'
            type='number'
            step='0.05'
            min='0.5'
            max='3'
            value={inputs.petrolPricePerLiterUsd}
            onChange={(e) => onUpdate('petrolPricePerLiterUsd', Number(e.target.value))}
            className='w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800 font-bold focus:outline-hidden focus:border-emerald-500'
          />
        </div>
      </div>

      {/* EV Parameters */}
      <div className='grid grid-cols-2 gap-2.5'>
        <div>
          <label htmlFor='savings-ev-cons' className='block text-slate-600 mb-1 text-[11px] font-medium'>
            EV Energy Cons. (kWh/100km)
          </label>
          <input
            id='savings-ev-cons'
            type='number'
            step='0.5'
            min='10'
            max='30'
            value={inputs.evConsumptionKwh100km}
            onChange={(e) => onUpdate('evConsumptionKwh100km', Number(e.target.value))}
            className='w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800 font-bold focus:outline-hidden focus:border-emerald-500'
          />
        </div>

        <div>
          <label htmlFor='savings-elec-rate' className='block text-slate-600 mb-1 text-[11px] font-medium'>
            Electricity Rate ($/kWh)
          </label>
          <input
            id='savings-elec-rate'
            type='number'
            step='0.01'
            min='0.08'
            max='0.5'
            value={inputs.electricityTariffPerKwhUsd}
            onChange={(e) => onUpdate('electricityTariffPerKwhUsd', Number(e.target.value))}
            className='w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800 font-bold focus:outline-hidden focus:border-emerald-500'
          />
        </div>
      </div>

      {/* Maintenance Savings */}
      <div>
        <label htmlFor='savings-maint' className='block text-slate-600 mb-1 text-[11px] font-medium'>
          Estimated Annual Maintenance Savings ($/year)
        </label>
        <input
          id='savings-maint'
          type='number'
          step='50'
          min='0'
          max='2000'
          value={inputs.annualMaintenanceSavingsUsd}
          onChange={(e) => onUpdate('annualMaintenanceSavingsUsd', Number(e.target.value))}
          className='w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800 font-bold focus:outline-hidden focus:border-emerald-500'
        />
      </div>

      <div className='flex items-center justify-between pt-1'>
        <button
          type='button'
          onClick={onReset}
          className='text-slate-500 hover:text-slate-800 text-xs font-semibold cursor-pointer'
        >
          Reset to Cambodia Standards
        </button>
        <span className='text-[10px] text-slate-400'>
          Configurable rate: 1 USD = {inputs.exchangeRateKhr.toLocaleString()} KHR
        </span>
      </div>
    </div>
  );
}
