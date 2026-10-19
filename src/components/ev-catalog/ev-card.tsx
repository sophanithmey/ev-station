import type { EVModel } from '../../types/vehicle';

type Props = {
  model: EVModel;
  isCompared: boolean;
  onSelect: (model: EVModel) => void;
  onToggleCompare: (id: string) => void;
};

export default function EvCard({
  model,
  isCompared,
  onSelect,
  onToggleCompare,
}: Props) {
  const isOfficial = model.priceType === 'official';
  const isOpenEvdb = model.id.startsWith('open-evdb-');

  return (
    <article
      onClick={() => onSelect(model)}
      className='bg-white border border-slate-200/90 hover:border-emerald-300 rounded-2xl p-4 flex flex-col justify-between transition-all duration-200 shadow-xs hover:shadow-md group cursor-pointer'
    >
      <div>
        {/* Top Badges */}
        <div className='flex items-center justify-between gap-2 mb-2'>
          <span className='px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-semibold text-[10px] uppercase'>
            {model.bodyType}
          </span>
          {isOpenEvdb ? (
            <span className='px-2 py-0.5 rounded-md text-[10px] font-bold bg-sky-50 text-sky-800 border border-sky-200/80'>
              Open-EVDB Global
            </span>
          ) : (
            <span
              className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                isOfficial
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/80'
                  : 'bg-amber-50 text-amber-800 border border-amber-200/80'
              }`}
            >
              {isOfficial
                ? 'Official Distributor'
                : model.priceType === 'dealer-listing'
                  ? 'Dealer Listing'
                  : 'Market Estimate'}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className='text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors'>
          {model.brand} {model.modelName}
        </h3>
        <p className='text-xs text-slate-500 mb-3'>{model.variant}</p>

        {/* Pricing */}
        <div className='mb-3.5 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 flex items-baseline justify-between'>
          <span className='text-[11px] text-slate-500'>
            {isOpenEvdb ? 'Est. Global Price:' : 'Cambodia Price:'}
          </span>
          <span
            className={`text-base font-extrabold ${
              model.priceUsd > 0 ? 'text-slate-900' : 'text-slate-500 text-xs italic font-medium'
            }`}
          >
            {model.priceUsd > 0 ? `$${model.priceUsd.toLocaleString()}` : 'Price Unconfirmed'}
          </span>
        </div>

        {/* Key Specs Grid */}
        <div className='grid grid-cols-3 gap-2 text-center text-xs mb-3.5'>
          <div className='bg-slate-50 border border-slate-200/60 p-2 rounded-xl'>
            <span className='text-[10px] text-slate-500 block'>Battery</span>
            <span className='font-bold text-slate-700'>{model.batteryCapacityKwh} kWh</span>
          </div>

          <div className='bg-slate-50 border border-slate-200/60 p-2 rounded-xl'>
            <span className='text-[10px] text-slate-500 block'>Range</span>
            <span className='font-bold text-emerald-700'>
              {model.rangeKm} km <span className='text-[9px] text-slate-500'>{model.rangeStandard}</span>
            </span>
          </div>

          <div className='bg-slate-50 border border-slate-200/60 p-2 rounded-xl'>
            <span className='text-[10px] text-slate-500 block'>Max DC</span>
            <span className='font-bold text-cyan-700'>{model.maxDcChargeKw} kW</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className='pt-2 border-t border-slate-100 flex items-center justify-between gap-2'>
        <button
          type='button'
          onClick={(e) => {
            e.stopPropagation();
            onToggleCompare(model.id);
          }}
          className={`py-1.5 px-3 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
            isCompared
              ? 'bg-slate-900 text-white'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
          }`}
        >
          {isCompared ? '✓ In Compare' : '+ Compare'}
        </button>

        <span className='text-xs font-semibold text-emerald-700 group-hover:translate-x-0.5 transition-transform flex items-center gap-1'>
          Full Specs →
        </span>
      </div>
    </article>
  );
}
