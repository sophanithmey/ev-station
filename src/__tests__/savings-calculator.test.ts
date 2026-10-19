import { describe, it, expect } from 'vitest';
import {
  calculateSavings,
  formatCurrency,
  DEFAULT_SAVINGS_INPUTS,
} from '../services/savings-calculator';

describe('Savings Calculator Service', () => {
  it('computes monthly fuel difference correctly', () => {
    // 1500 km, 8.5 L/100km @ $1.05/L = 15 * 8.5 * 1.05 = $133.875 -> ~$134
    // 1500 km, 16 kWh/100km @ $0.25/kWh = 15 * 16 * 0.25 = $60 -> $60
    const out = calculateSavings(DEFAULT_SAVINGS_INPUTS);

    expect(out.monthlyIceCostUsd).toBe(134);
    expect(out.monthlyEvCostUsd).toBe(60);
    // Fuel savings: 133.875 - 60 = 73.875
    // Monthly maintenance savings: 450 / 12 = 37.5
    // Total monthly savings: 73.875 + 37.5 = 111.375 -> ~$111
    expect(out.monthlySavingsUsd).toBe(111);
  });

  it('computes 5-year total savings and TCO correctly', () => {
    const out = calculateSavings(DEFAULT_SAVINGS_INPUTS);

    expect(out.annualSavingsUsd).toBeGreaterThan(1000);
    expect(out.fiveYearTotalSavingsUsd).toBe(out.annualSavingsUsd * 5);
    expect(out.fiveYearTcoIceUsd).toBeGreaterThan(out.fiveYearTcoEvUsd);
  });

  it('determines breakeven months when EV has initial price premium', () => {
    const inputsWithPremium = {
      ...DEFAULT_SAVINGS_INPUTS,
      purchasePriceIceUsd: 25000,
      purchasePriceEvUsd: 30000, // $5,000 premium
    };

    const out = calculateSavings(inputsWithPremium);
    expect(out.breakevenMonths).toBeGreaterThan(0);
    // $5,000 / $133 ≈ 38 months
    expect(out.breakevenMonths).toBeLessThan(50);
  });

  it('formats currency correctly in USD and KHR', () => {
    expect(formatCurrency(100, 'USD')).toBe('$100');
    // 100 * 4100 = 410,000 KHR
    expect(formatCurrency(100, 'KHR', 4100)).toBe('៛410,000');
  });
});
