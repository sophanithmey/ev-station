import type { CurrencyCode, SavingsOutput } from '../../types/savings';
import { formatCurrency } from '../../services/savings-calculator';

type Props = {
  results: SavingsOutput;
  currency: CurrencyCode;
  exchangeRate: number;
};

export default function SavingsResultsCard({
  results,
  currency,
  exchangeRate,
}: Props) {
  const {
    monthlyIceCostUsd,
    monthlyEvCostUsd,
    monthlySavingsUsd,
    annualSavingsUsd,
    fiveYearTotalSavingsUsd,
  } = results;

  const totalMonthly = Math.max(1, monthlyIceCostUsd + monthlyEvCostUsd);
  const icePercent = Math.round((monthlyIceCostUsd / totalMonthly) * 100);
  const evPercent = 100 - icePercent;

  return (
    <div className='bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-4 text-xs text-slate-800 shadow-md'>
      {/* Big 5-Year Savings Callout */}
      <div className='bg-linear-to-br from-emerald-50 to-teal-50/50 border border-emerald-200 rounded-2xl p-4 sm:p-5 text-center space-y-1 relative overflow-hidden'>
        <span className='text-[10px] sm:text-xs uppercase tracking-widest font-bold text-emerald-800'>
          Estimated 5-Year Net Savings
        </span>
        <div className='text-3xl sm:text-4xl font-black text-emerald-700'>
          {formatCurrency(fiveYearTotalSavingsUsd, currency, exchangeRate)}
        </div>
        <p className='text-[11px] text-slate-600'>
          Combines electricity efficiency & reduced EV powertrain maintenance.
        </p>
      </div>

      {/* Monthly & Annual Highlights Grid */}
      <div className='grid grid-cols-2 gap-2.5'>
        <div className='bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-center'>
          <span className='text-[10px] text-slate-500 block mb-0.5'>Monthly Savings</span>
          <span className='text-lg font-extrabold text-slate-900'>
            {formatCurrency(monthlySavingsUsd, currency, exchangeRate)}
          </span>
          <span className='text-[10px] text-slate-400 block'>/ month</span>
        </div>

        <div className='bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-center'>
          <span className='text-[10px] text-slate-500 block mb-0.5'>Annual Savings</span>
          <span className='text-lg font-extrabold text-emerald-700'>
            {formatCurrency(annualSavingsUsd, currency, exchangeRate)}
          </span>
          <span className='text-[10px] text-slate-400 block'>/ year</span>
        </div>
      </div>

      {/* Monthly Operating Cost Comparison */}
      <div className='bg-slate-50/70 p-3.5 rounded-xl border border-slate-200/70 space-y-2.5'>
        <div className='flex justify-between items-center text-xs font-semibold'>
          <span className='text-rose-700 flex items-center gap-1.5'>
            <span>⛽ Petrol:</span>
            <span>{formatCurrency(monthlyIceCostUsd, currency, exchangeRate)}</span>
          </span>
          <span className='text-emerald-700 flex items-center gap-1.5'>
            <span>⚡ EV:</span>
            <span>{formatCurrency(monthlyEvCostUsd, currency, exchangeRate)}</span>
          </span>
        </div>

        {/* Visual Bar */}
        <div className='w-full h-3 bg-slate-200 rounded-full overflow-hidden flex'>
          <div
            style={{ width: `${icePercent}%` }}
            className='h-full bg-rose-500/80 transition-all duration-300'
            title={`Petrol: ${icePercent}%`}
          />
          <div
            style={{ width: `${evPercent}%` }}
            className='h-full bg-emerald-600 transition-all duration-300'
            title={`EV: ${evPercent}%`}
          />
        </div>

        <div className='flex justify-between text-[10px] text-slate-500'>
          <span>Fuel Cost (~75–80% higher)</span>
          <span>Electricity (Lower energy tariff)</span>
        </div>
      </div>
    </div>
  );
}
