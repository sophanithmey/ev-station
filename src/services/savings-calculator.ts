import type {
  CurrencyCode,
  SavingsInputs,
  SavingsOutput,
} from '../types/savings';

export const DEFAULT_EXCHANGE_RATE_KHR = 4100;

export const DEFAULT_SAVINGS_INPUTS: SavingsInputs = {
  monthlyDistanceKm: 1500,
  iceConsumptionL100km: 8.5,
  petrolPricePerLiterUsd: 1.05, // ~4,300 KHR per liter in Cambodia
  evConsumptionKwh100km: 16.0,
  electricityTariffPerKwhUsd: 0.25, // EAC residential standard (~1000 KHR/kWh)
  annualMaintenanceSavingsUsd: 450,
  purchasePriceIceUsd: 32000,
  purchasePriceEvUsd: 35000,
  currency: 'USD',
  exchangeRateKhr: DEFAULT_EXCHANGE_RATE_KHR,
};

export function calculateSavings(inputs: SavingsInputs): SavingsOutput {
  const monthlyIceCost =
    (inputs.monthlyDistanceKm / 100) *
    inputs.iceConsumptionL100km *
    inputs.petrolPricePerLiterUsd;

  const monthlyEvCost =
    (inputs.monthlyDistanceKm / 100) *
    inputs.evConsumptionKwh100km *
    inputs.electricityTariffPerKwhUsd;

  const monthlyFuelSavings = Math.max(0, monthlyIceCost - monthlyEvCost);
  const monthlyMaintenanceSavings = inputs.annualMaintenanceSavingsUsd / 12;
  const monthlyTotalSavings = monthlyFuelSavings + monthlyMaintenanceSavings;

  const annualSavings = Math.round(monthlyTotalSavings * 12);
  const fiveYearTotalSavings = annualSavings * 5;

  const fiveYearFuelIce = monthlyIceCost * 60;
  const fiveYearFuelEv = monthlyEvCost * 60;
  const fiveYearMaintDiff = inputs.annualMaintenanceSavingsUsd * 5;

  const fiveYearTcoIce =
    inputs.purchasePriceIceUsd + fiveYearFuelIce + fiveYearMaintDiff;
  const fiveYearTcoEv = inputs.purchasePriceEvUsd + fiveYearFuelEv;

  const priceDiff = inputs.purchasePriceEvUsd - inputs.purchasePriceIceUsd;
  let breakevenMonths: number | null = null;
  if (priceDiff <= 0) {
    breakevenMonths = 0; // EV already cheaper to purchase
  } else if (monthlyTotalSavings > 0) {
    breakevenMonths = Math.ceil(priceDiff / monthlyTotalSavings);
  }

  return {
    monthlyIceCostUsd: Math.round(monthlyIceCost),
    monthlyEvCostUsd: Math.round(monthlyEvCost),
    monthlySavingsUsd: Math.round(monthlyTotalSavings),
    annualSavingsUsd: Math.round(annualSavings),
    fiveYearTotalSavingsUsd: Math.round(fiveYearTotalSavings),
    fiveYearTcoIceUsd: Math.round(fiveYearTcoIce),
    fiveYearTcoEvUsd: Math.round(fiveYearTcoEv),
    breakevenMonths,
  };
}

export function formatCurrency(
  amountUsd: number,
  currency: CurrencyCode,
  exchangeRate: number = DEFAULT_EXCHANGE_RATE_KHR,
): string {
  if (currency === 'KHR') {
    const khr = Math.round((amountUsd * exchangeRate) / 100) * 100;
    return `៛${khr.toLocaleString()}`;
  }
  return `$${Math.round(amountUsd).toLocaleString()}`;
}
