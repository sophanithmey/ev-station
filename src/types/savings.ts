export type CurrencyCode = 'USD' | 'KHR';

export interface SavingsInputs {
  monthlyDistanceKm: number;
  iceConsumptionL100km: number;
  petrolPricePerLiterUsd: number;
  evConsumptionKwh100km: number;
  electricityTariffPerKwhUsd: number;
  annualMaintenanceSavingsUsd: number;
  purchasePriceIceUsd: number;
  purchasePriceEvUsd: number;
  currency: CurrencyCode;
  exchangeRateKhr: number;
}

export interface SavingsOutput {
  monthlyIceCostUsd: number;
  monthlyEvCostUsd: number;
  monthlySavingsUsd: number;
  annualSavingsUsd: number;
  fiveYearTotalSavingsUsd: number;
  fiveYearTcoIceUsd: number;
  fiveYearTcoEvUsd: number;
  breakevenMonths: number | null;
}
