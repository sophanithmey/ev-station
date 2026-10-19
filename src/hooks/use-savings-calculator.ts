import { useState, useMemo, useCallback } from 'react';
import type { CurrencyCode, SavingsInputs } from '../types/savings';
import {
  calculateSavings,
  DEFAULT_SAVINGS_INPUTS,
} from '../services/savings-calculator';

export function useSavingsCalculator() {
  const [inputs, setInputs] = useState<SavingsInputs>(DEFAULT_SAVINGS_INPUTS);

  const results = useMemo(() => calculateSavings(inputs), [inputs]);

  const updateInput = useCallback(
    <K extends keyof SavingsInputs>(key: K, value: SavingsInputs[K]) => {
      setInputs((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const setCurrency = useCallback((currency: CurrencyCode) => {
    setInputs((prev) => ({ ...prev, currency }));
  }, []);

  const resetDefaults = useCallback(() => {
    setInputs(DEFAULT_SAVINGS_INPUTS);
  }, []);

  return {
    inputs,
    results,
    updateInput,
    setCurrency,
    resetDefaults,
  };
}
