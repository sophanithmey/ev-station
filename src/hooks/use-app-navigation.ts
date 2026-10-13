import { useState, useEffect, useCallback } from 'react';

export type AppPage = 'explorer' | 'locations' | 'eac-stats';

const isValidPage = (val: string | null): val is AppPage =>
  val === 'explorer' || val === 'locations' || val === 'eac-stats';

const getInitialPage = (): AppPage => {
  if (typeof window !== 'undefined') {
    const hash = window.location.hash.replace(/^#/, '');
    if (isValidPage(hash)) return hash;
  }
  return 'explorer';
};

export function useAppNavigation() {
  const [activePage, setActivePage] = useState<AppPage>(getInitialPage);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (isValidPage(hash)) {
        setActivePage(hash);
      } else if (!hash) {
        setActivePage('explorer');
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handlePageChange = useCallback((page: AppPage) => {
    setActivePage(page);
    try {
      if (page === 'explorer') {
        if (window.location.hash) {
          window.history.pushState(
            null,
            '',
            window.location.pathname + window.location.search,
          );
        }
      } else {
        window.location.hash = page;
      }
    } catch {
      // ignore history errors
    }
  }, []);

  return {
    activePage,
    handlePageChange,
  };
}
