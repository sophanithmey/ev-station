import { useState, useEffect, useCallback } from 'react';

export type AppPage =
  | 'explorer'
  | 'trip-planner'
  | 'ev-catalog'
  | 'compare'
  | 'savings-calculator'
  | 'locations'
  | 'eac-stats';

const VALID_PAGES: AppPage[] = [
  'explorer',
  'trip-planner',
  'ev-catalog',
  'compare',
  'savings-calculator',
  'locations',
  'eac-stats',
];

const isValidPage = (val: string | null): val is AppPage =>
  VALID_PAGES.includes(val as AppPage);

const parseCurrentPage = (): AppPage => {
  if (typeof window !== 'undefined') {
    const hash = window.location.hash.replace(/^#/, '');
    if (isValidPage(hash)) return hash;

    const path = window.location.pathname.replace(/^\//, '');
    if (isValidPage(path)) return path;
  }
  return 'explorer';
};

export function useAppNavigation() {
  const [activePage, setActivePage] = useState<AppPage>(parseCurrentPage);

  useEffect(() => {
    const handleUrlChange = () => {
      setActivePage(parseCurrentPage());
    };

    window.addEventListener('hashchange', handleUrlChange);
    window.addEventListener('popstate', handleUrlChange);
    return () => {
      window.removeEventListener('hashchange', handleUrlChange);
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, []);

  const handlePageChange = useCallback((page: AppPage) => {
    setActivePage(page);
    try {
      if (page === 'explorer') {
        window.history.pushState(null, '', '/');
      } else {
        window.history.pushState(null, '', `/${page}`);
      }
    } catch {
      window.location.hash = page;
    }
  }, []);

  return {
    activePage,
    handlePageChange,
  };
}
