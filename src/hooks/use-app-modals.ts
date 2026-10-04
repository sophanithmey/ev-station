import { useState, useCallback } from 'react';

export function useAppModals() {
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
  const [isDonateOpen, setIsDonateOpen] = useState(false);

  const openDisclaimer = useCallback(() => setIsDisclaimerOpen(true), []);
  const closeDisclaimer = useCallback(() => setIsDisclaimerOpen(false), []);
  const openDonate = useCallback(() => setIsDonateOpen(true), []);
  const closeDonate = useCallback(() => setIsDonateOpen(false), []);

  return {
    isDisclaimerOpen,
    isDonateOpen,
    openDisclaimer,
    closeDisclaimer,
    openDonate,
    closeDonate,
  };
}
