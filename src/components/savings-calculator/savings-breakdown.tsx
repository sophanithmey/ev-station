import type { CurrencyCode, SavingsInputs, SavingsOutput } from '../../types/savings';
import { formatCurrency } from '../../services/savings-calculator';

type Props = {
  inputs: SavingsInputs;
  results: SavingsOutput;
  currency: CurrencyCode;
  exchangeRate: number;
};

export default function SavingsBreakdown({
  inputs,
  results,
  currency,
  exchangeRate,
}: Props) {
  const { fiveYearTcoIceUsd, fiveYearTcoEvUsd, breakevenMonths } = results;

  return (
    <div className='bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-4 text-xs text-slate-700 shadow-md'>
      <h3 className='font-bold text-slate-900 text-sm flex items-center gap-2'>
        <span>📊</span>
        <span>Transparent Formulas & 5-Year Ownership (TCO)</span>
      </h3>

      {/* TCO Comparison Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200/70'>
        <div className='space-y-1'>
          <span className='text-slate-500 block text-[11px] font-medium'>5-Year ICE Vehicle TCO:</span>
          <span className='text-lg font-bold text-rose-700'>
            {formatCurrency(fiveYearTcoIceUsd, currency, exchangeRate)}
          </span>
          <span className='block text-[10px] text-slate-400'>
            Purchase (${inputs.purchasePriceIceUsd.toLocaleString()}) + 5-yr petrol & servicing
          </span>
        </div>

        <div className='space-y-1'>
          <span className='text-slate-500 block text-[11px] font-medium'>5-Year EV Vehicle TCO:</span>
          <span className='text-lg font-bold text-emerald-700'>
            {formatCurrency(fiveYearTcoEvUsd, currency, exchangeRate)}
          </span>
          <span className='block text-[10px] text-slate-400'>
            Purchase (${inputs.purchasePriceEvUsd.toLocaleString()}) + 5-yr electricity charging
          </span>
        </div>
      </div>

      {breakevenMonths !== null && (
        <div className='p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2'>
          <span>⏱️</span>
          <span className='text-xs font-semibold'>
            {breakevenMonths === 0
              ? 'EV is already lower or equal in purchase price! Instant cashflow savings from Day 1.'
              : `Purchase price premium recovered in ~${breakevenMonths} months through fuel & maintenance savings.`}
          </span>
        </div>
      )}

      {/* Calculation Formulas */}
      <div className='space-y-2 border-t border-slate-100 pt-3'>
        <h4 className='text-[11px] uppercase tracking-wider font-bold text-slate-500'>
          Verified Methodology
        </h4>
        <ul className='space-y-1.5 text-[11px] text-slate-600'>
          <li className='flex items-start gap-1.5'>
            <span className='text-emerald-700 font-bold'>•</span>
            <span>
              <strong>Monthly Petrol Cost:</strong> (Distance / 100) × Fuel Consumption L/100km × Petrol $/L.
            </span>
          </li>
          <li className='flex items-start gap-1.5'>
            <span className='text-emerald-700 font-bold'>•</span>
            <span>
              <strong>Monthly EV Charging Cost:</strong> (Distance / 100) × Energy kWh/100km × Electricity Tariff $/kWh.
            </span>
          </li>
          <li className='flex items-start gap-1.5'>
            <span className='text-emerald-700 font-bold'>•</span>
            <span>
              <strong>Maintenance Differential:</strong> Based on Electric Authority & automotive benchmarks showing ~60% fewer moving parts in EV powertrains.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
