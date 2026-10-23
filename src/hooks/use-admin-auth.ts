import { useState, useCallback } from 'react';

const ADMIN_STORAGE_KEY = 'evkh_admin_passkey';
const DEFAULT_ADMIN_PIN = 'evkh2025';

function getInitialAdminPasskey(configuredPin: string): string | null {
  try {
    if (typeof sessionStorage !== 'undefined') {
      const stored = sessionStorage.getItem(ADMIN_STORAGE_KEY);
      if (stored === configuredPin) return stored;
      sessionStorage.removeItem(ADMIN_STORAGE_KEY);
    }
  } catch {
    // Storage access blocked or restricted
  }
  return null;
}

export function useAdminAuth() {
  const configuredPin = import.meta.env.VITE_ADMIN_PIN || DEFAULT_ADMIN_PIN;
  const [passkey, setPasskey] = useState<string | null>(() =>
    getInitialAdminPasskey(configuredPin),
  );

  const unlock = useCallback(
    (inputPin: string): { success: boolean; error?: string } => {
      const clean = inputPin.trim();
      if (!clean) {
        return { success: false, error: 'PIN cannot be empty' };
      }
      if (clean !== configuredPin) {
        return { success: false, error: 'Incorrect Admin PIN' };
      }

      setPasskey(clean);
      try {
        sessionStorage.setItem(ADMIN_STORAGE_KEY, clean);
      } catch {
        // Best-effort storage
      }
      return { success: true };
    },
    [configuredPin],
  );

  const lock = useCallback(() => {
    setPasskey(null);
    try {
      sessionStorage.removeItem(ADMIN_STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  return {
    isAdmin: passkey === configuredPin,
    adminPasskey: passkey,
    unlock,
    lock,
  };
}
