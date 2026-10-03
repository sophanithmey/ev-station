import { useState, useEffect, useCallback } from 'react';
import { chargingStations } from './data/charging-stations';
import { useUserLocation } from './hooks/use-user-location';
import { useStationFilters } from './hooks/use-station-filters';
import { useMobileNavigation } from './hooks/use-mobile-navigation';
import Header from './components/header';
import StationExplorerView from './components/station-explorer-view';
import EacStatsPage from './components/eac-stats/eac-stats-page';
import EacLocationsPage from './components/eac-locations/eac-locations-page';
import MobileStationDrawer from './components/mobile-station-drawer';
import AppFooter from './components/app-footer';
import MobileViewSwitcher from './components/mobile-view-switcher';
import EcoBackground from './components/eco-background';

type AppPage = 'explorer' | 'locations' | 'eac-stats';

const ACTIVE_TAB_STORAGE_KEY = 'cambodia_ev_active_tab';

const isValidPage = (val: string | null): val is AppPage =>
  val === 'explorer' || val === 'locations' || val === 'eac-stats';

const getInitialPage = (): AppPage => {
  if (typeof window !== 'undefined') {
    const hash = window.location.hash.replace(/^#/, '');
    if (isValidPage(hash)) return hash;
    try {
      const saved = localStorage.getItem(ACTIVE_TAB_STORAGE_KEY);
      if (isValidPage(saved)) return saved;
    } catch {
      // localStorage may be restricted
    }
  }
  return 'explorer';
};

const App = () => {
  const [activePage, setActivePage] = useState<AppPage>(getInitialPage);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (isValidPage(hash)) setActivePage(hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handlePageChange = useCallback((page: AppPage) => {
    setActivePage(page);
    try {
      localStorage.setItem(ACTIVE_TAB_STORAGE_KEY, page);
      window.location.hash = page;
    } catch {
      // ignore storage errors
    }
  }, []);

  const {
    mobileView,
    selectedStation,
    handleSelectStation,
    handleDeselectStation,
    handleSelectView,
    handleViewStationInList,
  } = useMobileNavigation();

  const {
    userLocation,
    isLocating,
    locationError,
    distances,
    requestUserLocation,
    clearLocationError,
  } = useUserLocation();

  const {
    search,
    connector,
    only24Hours,
    onlyNearMe,
    filteredStations,
    hasActiveFilters,
    totalCount,
    setSearch,
    setConnector,
    toggle24Hours,
    handleToggleNearMe,
    handleClearFilters,
  } = useStationFilters({
    distances,
    hasUserLocation: Boolean(userLocation),
    onRequestLocation: requestUserLocation,
  });

  return (
    <div
      className={`min-h-screen ${
        activePage === 'explorer' && mobileView === 'map'
          ? 'h-dvh max-h-dvh overflow-hidden'
          : ''
      } lg:h-screen lg:max-h-screen lg:overflow-hidden bg-transparent text-slate-800 flex flex-col relative`}
    >
      <EcoBackground />

      <Header
        totalCount={totalCount}
        filteredCount={filteredStations.length}
        activePage={activePage}
        onPageChange={handlePageChange}
      />

      <main
        className={`flex-1 min-h-0 max-w-7xl w-full mx-auto px-2.5 sm:px-4 py-2 sm:py-2.5 flex flex-col gap-2 sm:gap-2.5 ${
          activePage === 'explorer' && mobileView === 'map'
            ? 'overflow-hidden'
            : ''
        } lg:overflow-hidden`}
      >
        {activePage === 'explorer' && (
          <StationExplorerView
            stations={chargingStations}
            filteredStations={filteredStations}
            selectedStation={selectedStation}
            mobileView={mobileView}
            userLocation={userLocation}
            isLocating={isLocating}
            locationError={locationError}
            distances={distances}
            search={search}
            connector={connector}
            only24Hours={only24Hours}
            onlyNearMe={onlyNearMe}
            hasActiveFilters={hasActiveFilters}
            onSearchChange={setSearch}
            onConnectorChange={setConnector}
            onToggle24Hours={toggle24Hours}
            onToggleNearMe={handleToggleNearMe}
            onClearFilters={handleClearFilters}
            onClearLocationError={clearLocationError}
            onSelectStation={handleSelectStation}
            onDeselectStation={handleDeselectStation}
            onRequestUserLocation={requestUserLocation}
          />
        )}
        {activePage === 'locations' && <EacLocationsPage />}
        {activePage === 'eac-stats' && <EacStatsPage />}
      </main>

      <AppFooter />

      {activePage === 'explorer' && mobileView === 'map' && selectedStation && (
        <MobileStationDrawer
          station={selectedStation}
          distance={distances[selectedStation.id]}
          onClose={handleDeselectStation}
          onViewInList={handleViewStationInList}
        />
      )}

      {activePage === 'explorer' &&
        (!selectedStation || mobileView === 'list') && (
          <MobileViewSwitcher
            mobileView={mobileView}
            filteredCount={filteredStations.length}
            onSelectView={handleSelectView}
            onlyNearMe={onlyNearMe}
            isLocating={isLocating}
            onToggleNearMe={handleToggleNearMe}
          />
        )}
    </div>
  );
};

export default App;
