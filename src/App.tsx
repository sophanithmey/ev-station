import { useState, useCallback } from 'react';
import type { ChargingStation } from './data/charging-stations';
import { chargingStations } from './data/charging-stations';
import { useUserLocation } from './hooks/use-user-location';
import { useStationFilters } from './hooks/use-station-filters';
import Header from './components/header';
import StationFilters from './components/station-filters';
import StationList from './components/station-list';
import OpenMap from './components/open-map';
import MobileStationDrawer from './components/mobile-station-drawer';
import AppFooter from './components/app-footer';
import MobileViewSwitcher from './components/mobile-view-switcher';
import EcoBackground from './components/eco-background';

const App = () => {
  const [selectedStation, setSelectedStation] =
    useState<ChargingStation | null>(null);
  const [mobileView, setMobileView] = useState<'map' | 'list'>('map');

  // Geolocation & distances hook
  const {
    userLocation,
    isLocating,
    locationError,
    distances,
    requestUserLocation,
    clearLocationError,
  } = useUserLocation();

  // Search & filter state hook
  const {
    search,
    connector,
    only24Hours,
    filteredStations,
    hasActiveFilters,
    totalCount,
    setSearch,
    setConnector,
    toggle24Hours,
    handleClearFilters,
  } = useStationFilters();

  const handleSelectStation = useCallback((station: ChargingStation) => {
    setSelectedStation(station);
  }, []);

  const handleDeselectStation = useCallback(() => {
    setSelectedStation(null);
  }, []);

  const handleToggleMobileView = useCallback(() => {
    setMobileView((v) => (v === 'map' ? 'list' : 'map'));
  }, []);

  return (
    <div
      className={`min-h-screen ${
        mobileView === 'map' ? 'h-dvh max-h-dvh overflow-hidden' : ''
      } lg:h-screen lg:max-h-screen lg:overflow-hidden bg-transparent text-slate-800 flex flex-col relative`}
    >
      {/* Inspiring Green Energy Ambient Background */}
      <EcoBackground />

      {/* Header */}
      <Header
        totalCount={totalCount}
        filteredCount={filteredStations.length}
      />

      {/* Main Container */}
      <main
        className={`flex-1 min-h-0 max-w-7xl w-full mx-auto px-2.5 sm:px-4 py-2 sm:py-2.5 flex flex-col gap-2 sm:gap-2.5 ${
          mobileView === 'map' ? 'overflow-hidden' : ''
        } lg:overflow-hidden`}
      >
        {/* Location Error Notification */}
        {locationError && (
          <div className='bg-amber-50 border border-amber-200 text-amber-800 px-4 py-2 rounded-xl text-xs flex items-center justify-between shrink-0'>
            <span className='flex items-center gap-2'>
              <span>⚠️</span>
              <span>{locationError}</span>
            </span>
            <button
              type='button'
              onClick={clearLocationError}
              className='text-amber-900 font-bold hover:underline'
            >
              ✕
            </button>
          </div>
        )}

        {/* Filter Bar */}
        <div className='shrink-0'>
          <StationFilters
            search={search}
            connector={connector}
            only24Hours={only24Hours}
            hasActiveFilters={hasActiveFilters}
            stations={chargingStations}
            onSearchChange={setSearch}
            onConnectorChange={setConnector}
            onToggle24Hours={toggle24Hours}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* Responsive Content Grid: Desktop split / Mobile toggle */}
        <div className='flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch'>
          {/* Station List Panel */}
          <section
            aria-label='Stations list'
            className={`lg:col-span-5 h-full min-h-0 flex flex-col gap-1.5 ${
              mobileView === 'map' ? 'hidden lg:flex' : 'flex'
            }`}
          >
            <div className='flex items-center justify-between text-xs text-slate-500 px-0.5 shrink-0'>
              <span className='flex items-center gap-1.5'>
                <strong className='text-slate-700'>
                  {filteredStations.length}
                </strong>{' '}
                {filteredStations.length === 1 ? 'station' : 'stations'}
                {hasActiveFilters && (
                  <span className='text-slate-400'> · filtered</span>
                )}
              </span>
              <span className='hidden sm:inline-flex items-center gap-1 text-[11px] text-emerald-700 font-semibold bg-emerald-50/90 border border-emerald-200/80 px-2 py-0.5 rounded-full'>
                <span>🌱</span>
                <span>Clean Energy Travel</span>
              </span>
            </div>

            <div className='flex-1 min-h-0 overflow-y-auto space-y-2.5 scrollbar-thin pr-1'>
              <StationList
                stations={filteredStations}
                groupByProvince={false}
                selectedStationId={selectedStation?.id}
                distances={distances}
                onSelectStation={handleSelectStation}
                onReset={handleClearFilters}
              />
            </div>
          </section>

          {/* Interactive Map Panel */}
          <section
            aria-label='Interactive map'
            className={`lg:col-span-7 flex-1 h-full min-h-0 w-full ${
              mobileView === 'list' ? 'hidden lg:block' : 'flex flex-col'
            }`}
          >
            <OpenMap
              stations={filteredStations}
              selectedStation={selectedStation}
              userLocation={userLocation}
              onSelectStation={handleSelectStation}
              onDeselectStation={handleDeselectStation}
              onRequestUserLocation={requestUserLocation}
              isLocating={isLocating}
              distances={distances}
              mobileView={mobileView}
            />
          </section>
        </div>
      </main>

      {/* Desktop/Tablet Footer */}
      <AppFooter />

      {/* Mobile Selected Station Drawer */}
      {mobileView === 'map' && selectedStation && (
        <MobileStationDrawer
          station={selectedStation}
          distance={distances[selectedStation.id]}
          onClose={handleDeselectStation}
        />
      )}

      {/* Mobile Map/List View Switcher */}
      {!selectedStation && (
        <MobileViewSwitcher
          mobileView={mobileView}
          filteredCount={filteredStations.length}
          onToggleView={handleToggleMobileView}
        />
      )}
    </div>
  );
};

export default App;
