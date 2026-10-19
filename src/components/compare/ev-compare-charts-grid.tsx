import type { EVModel } from '../../types/vehicle';
import {
  BAR_COLORS,
  COMPARE_CHART_CONFIGS,
  getVehicleShortName,
} from './ev-compare-metrics';
import EvCompareBarChart from './ev-compare-bar-chart';

type Props = {
  models: EVModel[];
};

export default function EvCompareChartsGrid({ models }: Props) {
  if (models.length === 0) return null;

  return (
    <div className='flex flex-col gap-3.5 w-full'>
      {/* Vehicle Legend Header */}
      <div className='flex flex-wrap items-center gap-3 p-3 bg-white rounded-2xl border border-slate-200/90 shadow-2xs'>
        <span className='text-xs font-bold text-slate-700'>Vehicles:</span>
        {models.map((m, idx) => (
          <div key={m.id} className='flex items-center gap-1.5 text-xs text-slate-800 font-medium'>
            <span
              className='w-3 h-3 rounded-xs shrink-0'
              style={{ backgroundColor: BAR_COLORS[idx % BAR_COLORS.length] }}
            />
            <span>{getVehicleShortName(m)}</span>
          </div>
        ))}
      </div>

      {/* 2-Column Grid of 6 Bar Charts matching Open-EVDB */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3.5 w-full'>
        {COMPARE_CHART_CONFIGS.map((config) => {
          const items = config.getItems(models);
          return (
            <EvCompareBarChart
              key={config.id}
              title={config.title}
              yAxisLabel={config.yAxisLabel}
              items={items}
            />
          );
        })}
      </div>
    </div>
  );
}
