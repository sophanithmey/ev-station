import type { EVModel } from '../../types/vehicle';

export const BAR_COLORS = ['#0062cc', '#72bcfb', '#0284c7'] as const;

export interface ChartItem {
  id: string;
  shortName: string;
  value: number;
  displayValue: string;
}

export interface MetricChartConfig {
  id: string;
  title: string;
  yAxisLabel: string;
  unit: string;
  getItems: (models: EVModel[]) => ChartItem[];
}

const CAMBODIA_MODEL_SPECS: Record<string, { powerKw: number; accel0to100s: number }> = {
  'byd-atto-2-standard': { powerKw: 70, accel0to100s: 10.5 },
  'byd-atto-3': { powerKw: 150, accel0to100s: 7.3 },
  'byd-sealion-7-dynamic': { powerKw: 230, accel0to100s: 6.7 },
  'byd-seal-performance': { powerKw: 390, accel0to100s: 3.8 },
  'byd-dolphin-standard': { powerKw: 70, accel0to100s: 10.9 },
  'gwm-ora-good-cat': { powerKw: 105, accel0to100s: 8.5 },
  'vinfast-vf-e34': { powerKw: 110, accel0to100s: 8.9 },
  'vinfast-vf8-plus': { powerKw: 300, accel0to100s: 5.5 },
};

export function getVehicleShortName(m: EVModel): string {
  const brandAndModel = `${m.brand} ${m.modelName}`;
  const variant = m.variant ? ` ${m.variant}` : '';
  const full = `${brandAndModel}${variant}`;
  return full.length > 28 ? `${full.slice(0, 26)}…` : full;
}

export function getModelPowerKw(m: EVModel): number {
  if (m.notes) {
    const match = m.notes.match(/(\d+(?:\.\d+)?)\s*kW\s+power/i);
    if (match) return parseFloat(match[1]);
  }
  return CAMBODIA_MODEL_SPECS[m.id]?.powerKw ?? Math.round(m.batteryCapacityKwh * 2.2);
}

export function getModel0To100(m: EVModel): number {
  if (m.notes) {
    const match = m.notes.match(/0-100(?:\s*km\/h)?\s+in\s+(\d+(?:\.\d+)?)\s*s/i);
    if (match) return parseFloat(match[1]);
  }
  return CAMBODIA_MODEL_SPECS[m.id]?.accel0to100s ?? 7.5;
}

export function getModelPriceEur(m: EVModel): number {
  if (m.priceUsd > 0) return Math.round(m.priceUsd / 1.08);
  return 0;
}

export function computeNiceScale(maxValue: number): { max: number; ticks: number[] } {
  if (maxValue <= 0) return { max: 10, ticks: [0, 5, 10] };
  if (maxValue <= 8) return { max: 8, ticks: [0, 2, 4, 6, 8] };
  if (maxValue <= 10) return { max: 10, ticks: [0, 2, 4, 6, 8, 10] };
  if (maxValue <= 20) return { max: 20, ticks: [0, 5, 10, 15, 20] };
  if (maxValue <= 60) return { max: 60, ticks: [0, 20, 40, 60] };
  if (maxValue <= 100) return { max: 100, ticks: [0, 25, 50, 75, 100] };
  if (maxValue <= 220) return { max: 220, ticks: [0, 100, 200] };
  if (maxValue <= 400) return { max: 400, ticks: [0, 100, 200, 300, 400] };
  if (maxValue <= 800) return { max: 800, ticks: [0, 200, 400, 600, 800] };
  if (maxValue <= 60000) return { max: 60000, ticks: [0, 20000, 40000, 60000] };
  if (maxValue <= 100000) return { max: 100000, ticks: [0, 25000, 50000, 75000, 100000] };

  const step = Math.pow(10, Math.floor(Math.log10(maxValue)));
  const ceiling = Math.ceil(maxValue / step) * step;
  const count = 4;
  const tickStep = ceiling / count;
  return {
    max: ceiling,
    ticks: Array.from({ length: count + 1 }, (_, i) => Math.round(i * tickStep)),
  };
}

export function formatTickValue(val: number): string {
  if (val >= 1000) return `${Math.round(val / 1000)}k`;
  return val.toString();
}

export const COMPARE_CHART_CONFIGS: MetricChartConfig[] = [
  {
    id: 'battery',
    title: 'Battery Capacity (kWh)',
    yAxisLabel: 'Battery (kWh)',
    unit: 'kWh',
    getItems: (models) =>
      models.map((m) => ({
        id: m.id,
        shortName: getVehicleShortName(m),
        value: m.batteryCapacityKwh,
        displayValue: m.batteryCapacityKwh.toFixed(1),
      })),
  },
  {
    id: 'range',
    title: 'WLTP Range (km)',
    yAxisLabel: 'Range (km)',
    unit: 'km',
    getItems: (models) =>
      models.map((m) => ({
        id: m.id,
        shortName: getVehicleShortName(m),
        value: m.rangeKm,
        displayValue: `${m.rangeKm}`,
      })),
  },
  {
    id: 'power',
    title: 'Total Power (kW)',
    yAxisLabel: 'Power (kW)',
    unit: 'kW',
    getItems: (models) =>
      models.map((m) => {
        const p = getModelPowerKw(m);
        return {
          id: m.id,
          shortName: getVehicleShortName(m),
          value: p,
          displayValue: `${p}`,
        };
      }),
  },
  {
    id: 'accel',
    title: '0-100 km/h (seconds)',
    yAxisLabel: '0-100 (sec)',
    unit: 's',
    getItems: (models) =>
      models.map((m) => {
        const a = getModel0To100(m);
        return {
          id: m.id,
          shortName: getVehicleShortName(m),
          value: a,
          displayValue: a.toFixed(1),
        };
      }),
  },
  {
    id: 'dc-charging',
    title: 'DC Fast Charging (kW)',
    yAxisLabel: 'Charging (kW)',
    unit: 'kW',
    getItems: (models) =>
      models.map((m) => ({
        id: m.id,
        shortName: getVehicleShortName(m),
        value: m.maxDcChargeKw,
        displayValue: `${m.maxDcChargeKw}`,
      })),
  },
  {
    id: 'price',
    title: 'Base Price (EUR)',
    yAxisLabel: 'Price (EUR)',
    unit: '€',
    getItems: (models) =>
      models.map((m) => {
        const eur = getModelPriceEur(m);
        return {
          id: m.id,
          shortName: getVehicleShortName(m),
          value: eur,
          displayValue: eur > 0 ? `€${eur.toLocaleString()}` : 'N/A',
        };
      }),
  },
];
