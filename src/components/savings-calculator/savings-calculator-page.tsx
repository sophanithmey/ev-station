import { useSavingsCalculator } from '../../hooks/use-savings-calculator';
import SavingsInputForm from './savings-input-form';
import SavingsResultsCard from './savings-results-card';
import SavingsBreakdown from './savings-breakdown';

export default function SavingsCalculatorPage() {
  const { inputs, results, updateInput, setCurrency, resetDefaults } =
    useSavingsCalculator();

  return (
    <div className='flex-1 w-full flex flex-col gap-3.5 pb-12 touch-pan-y'>
      {/* Header */}
      <div className='shrink-0'>
        <h1 className='text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2'>
          <span>💰</span>
          <span>Cambodia EV Savings & TCO Calculator</span>
        </h1>
        <p className='text-xs text-slate-500'>
          Compare petrol versus EV electricity costs using realistic Cambodian tariffs and customizable driving distances.
        </p>
      </div>

      {/* Main Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start w-full'>
        {/* Left: Input Form */}
        <div className='lg:col-span-5'>
          <SavingsInputForm
            inputs={inputs}
            onUpdate={updateInput}
            onSetCurrency={setCurrency}
            onReset={resetDefaults}
          />
        </div>

        {/* Right: Results Card & Breakdown */}
        <div className='lg:col-span-7 space-y-3.5'>
          <SavingsResultsCard
            results={results}
            currency={inputs.currency}
            exchangeRate={inputs.exchangeRateKhr}
          />

          <SavingsBreakdown
            inputs={inputs}
            results={results}
            currency={inputs.currency}
            exchangeRate={inputs.exchangeRateKhr}
          />
        </div>
      </div>
    </div>
  );
}
