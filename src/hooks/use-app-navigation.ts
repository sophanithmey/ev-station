import { useState, useEffect, useCallback } from 'react';

export type AppPage = 'explorer' | 'locations' | 'eac-stats';

const STORAGE_KEY = 'cambodia_ev_active_tab';

const isValidPage = (val: string | null): val is AppPage =>
  val === 'explorer' || val === 'locations' || val === 'eac-stats';

const getInitialPage = (): AppPage => {
  if (typeof window !== 'undefined') {
    const hash = window.location.hash.replace(/^#/, '');
    if (isValidPage(hash)) return hash;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (isValidPage(saved)) return saved;
    } catch {
      // localStorage may be restricted
    }
  }
  return 'explorer';
};

export function useAppNavigation() {
  const [activePage, setActivePage] = useState<AppPage>(getInitialPage);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (isValidPage(hash)) setActivePage(hash);
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handlePageChange = useCallback((page: AppPage) => {
    setActivePage(page);
    try {
      localStorage.setItem(STORAGE_KEY, page);
      window.location.hash = page;
    } catch {
      // ignore storage errors
    }
  }, []);

  return {
    activePage,
    handlePageChange,
  };
}
