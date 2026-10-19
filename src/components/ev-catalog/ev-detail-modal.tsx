import type { EVModel } from '../../types/vehicle';

type Props = {
  model: EVModel;
  isCompared: boolean;
  onClose: () => void;
  onToggleCompare: (id: string) => void;
};

export default function EvDetailModal({
  model,
  isCompared,
  onClose,
  onToggleCompare,
}: Props) {
  const isOfficial = model.priceType === 'official';
  const isOpenEvdb = model.id.startsWith('open-evdb-');

  return (
    <div
      role='dialog'
      aria-modal='true'
      aria-labelledby='ev-modal-title'
      className='fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200'
    >
      <div className='bg-white border border-slate-200/90 rounded-3xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden text-slate-800 shadow-2xl'>
        {/* Header */}
        <div className='flex items-start justify-between p-4 sm:p-5 border-b border-slate-100 bg-slate-50/80'>
          <div>
            <div className='flex items-center gap-2 mb-1 flex-wrap'>
              <span className='px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold text-[10px] uppercase'>
                {model.bodyType}
              </span>
              <span
                className={`px-2 py-0.5 rounded font-bold text-[10px] border ${
                  isOpenEvdb
                    ? 'bg-sky-50 text-sky-800 border-sky-200/80'
                    : isOfficial
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200/80'
                      : 'bg-amber-50 text-amber-800 border-amber-200/80'
                }`}
              >
                {isOpenEvdb
                  ? 'Open-EVDB Global'
                  : isOfficial
                    ? 'Authorized Distributor'
                    : model.priceType === 'dealer-listing'
                      ? 'Dealer Listing'
                      : 'Market Estimate'}
              </span>
            </div>
            <h2 id='ev-modal-title' className='text-lg sm:text-xl font-bold text-slate-900'>
              {model.brand} {model.modelName}
            </h2>
            <p className='text-xs text-slate-500 mt-0.5'>{model.variant}</p>
          </div>

          <button
            type='button'
            onClick={onClose}
            className='p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer'
            aria-label='Close modal'
          >
            ✕
          </button>
        </div>

        {/* Scrollable Content */}
        <div className='flex-1 min-h-0 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs'>
          {/* Price & Source Header */}
          <div className='bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-1.5'>
            <div className='flex items-baseline justify-between'>
              <span className='text-slate-500 font-medium'>
                {isOpenEvdb ? 'Est. Global Price:' : 'Cambodia Quoted Price:'}
              </span>
              <span className='text-xl font-extrabold text-emerald-700'>
                {model.priceUsd > 0 ? `$${model.priceUsd.toLocaleString()}` : 'Price Unconfirmed'}
              </span>
            </div>
            <p className='text-[11px] text-slate-500'>
              Source: <strong className='text-slate-700'>{model.sourceAttribution}</strong>
            </p>
            <p className='text-[10px] text-slate-500'>Specs Updated: {model.updatedDate}</p>
          </div>

          {/* Powertrain & Battery */}
          <div className='space-y-2'>
            <h3 className='font-bold text-slate-800 uppercase tracking-wider text-[11px]'>
              Battery & Charging Architecture
            </h3>
            <div className='grid grid-cols-2 gap-2'>
              <div className='bg-slate-50 p-2.5 rounded-xl border border-slate-200/70'>
                <span className='text-[10px] text-slate-500 block'>Battery Capacity</span>
                <span className='font-bold text-slate-800 text-sm'>
                  {model.batteryCapacityKwh} kWh
                </span>
              </div>
              <div className='bg-slate-50 p-2.5 rounded-xl border border-slate-200/70'>
                <span className='text-[10px] text-slate-500 block'>Official Range</span>
                <span className='font-bold text-emerald-700 text-sm'>
                  {model.rangeKm} km ({model.rangeStandard})
                </span>
              </div>
              <div className='bg-slate-50 p-2.5 rounded-xl border border-slate-200/70'>
                <span className='text-[10px] text-slate-500 block'>Max DC Fast Charge</span>
                <span className='font-bold text-cyan-700 text-sm'>
                  {model.maxDcChargeKw} kW {model.dcChargeTimeMin ? `(~${model.dcChargeTimeMin}m 10-80%)` : ''}
                </span>
              </div>
              <div className='bg-slate-50 p-2.5 rounded-xl border border-slate-200/70'>
                <span className='text-[10px] text-slate-500 block'>AC Home Charging</span>
                <span className='font-bold text-slate-800 text-sm'>
                  {model.maxAcChargeKw} kW (Type 2)
                </span>
              </div>
            </div>
          </div>

          {/* Port & Dimensions */}
          <div className='space-y-2'>
            <h3 className='font-bold text-slate-800 uppercase tracking-wider text-[11px]'>
              Compatibility & Dimensions
            </h3>
            <div className='bg-slate-50 p-3 rounded-xl border border-slate-200/70 space-y-1.5'>
              <div className='flex justify-between'>
                <span className='text-slate-500'>Cambodia Plug Standard:</span>
                <span className='font-bold text-slate-800'>{model.connector}</span>
              </div>
              {model.dimensionsMm && (
                <div className='flex justify-between'>
                  <span className='text-slate-500'>Dimensions (L × W × H):</span>
                  <span className='font-mono text-slate-700'>
                    {model.dimensionsMm.length} × {model.dimensionsMm.width} × {model.dimensionsMm.height} mm
                  </span>
                </div>
              )}
              {model.warrantyYears && (
                <div className='flex justify-between'>
                  <span className='text-slate-500'>Battery Warranty:</span>
                  <span className='font-semibold text-emerald-700'>
                    {model.warrantyYears} Years / Factory Standard
                  </span>
                </div>
              )}
            </div>
          </div>

          {model.notes && (
            <p className='text-[11px] text-slate-600 italic bg-slate-50 p-2.5 rounded-xl border border-slate-200'>
              Note: {model.notes}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className='p-4 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between gap-3'>
          <button
            type='button'
            onClick={() => onToggleCompare(model.id)}
            className={`py-2 px-4 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              isCompared
                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
            }`}
          >
            {isCompared ? 'Remove from Compare' : '+ Add to Compare Tool'}
          </button>

          <button
            type='button'
            onClick={onClose}
            className='py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-semibold cursor-pointer'
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
