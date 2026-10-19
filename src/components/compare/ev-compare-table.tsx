import type { EVModel } from '../../types/vehicle';

type Props = {
  models: EVModel[];
  onRemove: (id: string) => void;
};

export default function EvCompareTable({ models, onRemove }: Props) {
  const maxRange = Math.max(...models.map((m) => m.rangeKm));
  const maxBattery = Math.max(...models.map((m) => m.batteryCapacityKwh));
  const maxDc = Math.max(...models.map((m) => m.maxDcChargeKw));
  const validPrices = models.map((m) => m.priceUsd).filter((p) => p > 0);
  const minPrice = validPrices.length > 0 ? Math.min(...validPrices) : 0;

  return (
    <div className='w-full overflow-x-auto touch-pan-x rounded-2xl border border-slate-200/90 bg-white shadow-sm scrollbar-thin'>
      <table className='w-full text-left border-collapse text-xs text-slate-700 min-w-137.5'>
        <thead>
          <tr className='border-b border-slate-100 bg-slate-50/80'>
            <th className='p-3.5 text-slate-500 font-semibold w-40'>Specification</th>
            {models.map((m) => (
              <th key={m.id} className='p-3.5 text-slate-900 font-bold'>
                <div className='flex items-start justify-between gap-1'>
                  <div>
                    <span className='block text-sm'>{m.brand} {m.modelName}</span>
                    <span className='text-[10px] text-slate-500 font-normal'>{m.variant}</span>
                  </div>
                  {models.length > 1 && (
                    <button
                      type='button'
                      onClick={() => onRemove(m.id)}
                      className='text-slate-400 hover:text-rose-600 p-1 rounded hover:bg-slate-100 cursor-pointer'
                      title='Remove from comparison'
                    >
                      ✕
                    </button>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='divide-y divide-slate-100'>
          {/* Price */}
          <tr className='hover:bg-slate-50/60'>
            <td className='p-3 font-medium text-slate-500'>Price (USD)</td>
            {models.map((m) => (
              <td key={m.id} className='p-3'>
                <span className={`font-extrabold text-sm ${m.priceUsd === minPrice && m.priceUsd > 0 ? 'text-emerald-700' : 'text-slate-900'}`}>
                  {m.priceUsd > 0 ? `$${m.priceUsd.toLocaleString()}` : 'Price Unconfirmed'}
                </span>
                <span className='block text-[10px] text-slate-400'>
                  {m.id.startsWith('open-evdb-')
                    ? 'Open-EVDB Global'
                    : m.priceType === 'official'
                      ? 'Authorized Distributor'
                      : m.priceType === 'dealer-listing'
                        ? 'Dealer Listing'
                        : 'Market Estimate'}
                </span>
              </td>
            ))}
          </tr>

          {/* Battery */}
          <tr className='hover:bg-slate-50/60'>
            <td className='p-3 font-medium text-slate-500'>Battery Capacity</td>
            {models.map((m) => (
              <td key={m.id} className='p-3'>
                <span className={`font-bold ${m.batteryCapacityKwh === maxBattery ? 'text-cyan-700' : 'text-slate-800'}`}>
                  {m.batteryCapacityKwh} kWh
                </span>
              </td>
            ))}
          </tr>

          {/* Range */}
          <tr className='hover:bg-slate-50/60'>
            <td className='p-3 font-medium text-slate-500'>Driving Range</td>
            {models.map((m) => (
              <td key={m.id} className='p-3'>
                <span className={`font-bold ${m.rangeKm === maxRange ? 'text-emerald-700' : 'text-slate-800'}`}>
                  {m.rangeKm} km
                </span>
                <span className='text-[10px] text-slate-500 ml-1'>({m.rangeStandard})</span>
              </td>
            ))}
          </tr>

          {/* DC Fast Charge */}
          <tr className='hover:bg-slate-50/60'>
            <td className='p-3 font-medium text-slate-500'>Max DC Fast Charge</td>
            {models.map((m) => (
              <td key={m.id} className='p-3'>
                <span className={`font-bold ${m.maxDcChargeKw === maxDc ? 'text-amber-700' : 'text-slate-800'}`}>
                  {m.maxDcChargeKw} kW
                </span>
                {m.dcChargeTimeMin && (
                  <span className='block text-[10px] text-slate-500'>
                    ~{m.dcChargeTimeMin}m (10–80%)
                  </span>
                )}
              </td>
            ))}
          </tr>

          {/* AC Standard Charge */}
          <tr className='hover:bg-slate-50/60'>
            <td className='p-3 font-medium text-slate-500'>AC Home Charge</td>
            {models.map((m) => (
              <td key={m.id} className='p-3 font-medium text-slate-800'>
                {m.maxAcChargeKw} kW
              </td>
            ))}
          </tr>

          {/* Plug Type */}
          <tr className='hover:bg-slate-50/60'>
            <td className='p-3 font-medium text-slate-500'>Plug Connector</td>
            {models.map((m) => (
              <td key={m.id} className='p-3'>
                <span className='px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold text-[11px] border border-slate-200'>
                  {m.connector}
                </span>
              </td>
            ))}
          </tr>

          {/* Dimensions */}
          <tr className='hover:bg-slate-50/60'>
            <td className='p-3 font-medium text-slate-500'>Dimensions (L×W×H)</td>
            {models.map((m) => (
              <td key={m.id} className='p-3 text-[11px] font-mono text-slate-700'>
                {m.dimensionsMm
                  ? `${m.dimensionsMm.length}×${m.dimensionsMm.width}×${m.dimensionsMm.height} mm`
                  : 'Unknown'}
              </td>
            ))}
          </tr>

          {/* Warranty */}
          <tr className='hover:bg-slate-50/60'>
            <td className='p-3 font-medium text-slate-500'>Battery Warranty</td>
            {models.map((m) => (
              <td key={m.id} className='p-3 font-medium text-slate-800'>
                {m.warrantyYears ? `${m.warrantyYears} Years` : 'Standard'}
              </td>
            ))}
          </tr>

          {/* Source Attribution */}
          <tr className='bg-slate-50/60 text-[10px] text-slate-500'>
            <td className='p-3 font-medium text-slate-500'>Source Quotation</td>
            {models.map((m) => (
              <td key={m.id} className='p-3 text-slate-500'>
                {m.sourceAttribution} ({m.updatedDate})
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
