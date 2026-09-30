import { chargingStations } from './data/charging-stations';
import { useUserLocation } from './hooks/use-user-location';
import { useStationFilters } from './hooks/use-station-filters';
import { useMobileNavigation } from './hooks/use-mobile-navigation';
import Header from './components/header';
import LocationErrorAlert from './components/location-error-alert';
import StationFilters from './components/station-filters';
import StationListHeader from './components/station-list-header';
import StationList from './components/station-list';
import OpenMap from './components/open-map';
import ErrorBoundary from './components/error-boundary';
import MobileStationDrawer from './components/mobile-station-drawer';
import AppFooter from './components/app-footer';
import MobileViewSwitcher from './components/mobile-view-switcher';
import EcoBackground from './components/eco-background';

const App = () => {
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
        mobileView === 'map' ? 'h-dvh max-h-dvh overflow-hidden' : ''
      } lg:h-screen lg:max-h-screen lg:overflow-hidden bg-transparent text-slate-800 flex flex-col relative`}
    >
      <EcoBackground />

      <Header
        totalCount={totalCount}
        filteredCount={filteredStations.length}
      />

      <main
        className={`flex-1 min-h-0 max-w-7xl w-full mx-auto px-2.5 sm:px-4 py-2 sm:py-2.5 flex flex-col gap-2 sm:gap-2.5 ${
          mobileView === 'map' ? 'overflow-hidden' : ''
        } lg:overflow-hidden`}
      >
        <LocationErrorAlert
          error={locationError}
          onClear={clearLocationError}
        />

        <div className='shrink-0'>
          <StationFilters
            search={search}
            connector={connector}
            only24Hours={only24Hours}
            onlyNearMe={onlyNearMe}
            isLocating={isLocating}
            hasActiveFilters={hasActiveFilters}
            stations={chargingStations}
            onSearchChange={setSearch}
            onConnectorChange={setConnector}
            onToggle24Hours={toggle24Hours}
            onToggleNearMe={handleToggleNearMe}
            onClearFilters={handleClearFilters}
          />
        </div>

        <div className='flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch'>
          <section
            aria-label='Stations list'
            className={`lg:col-span-5 h-full min-h-0 flex flex-col gap-1.5 ${
              mobileView === 'map' ? 'hidden lg:flex' : 'flex'
            }`}
          >
            <StationListHeader
              filteredCount={filteredStations.length}
              hasActiveFilters={hasActiveFilters}
              onlyNearMe={onlyNearMe}
              isLocating={isLocating}
              onToggleNearMe={handleToggleNearMe}
            />

            <div className='flex-1 min-h-0 overflow-y-auto space-y-2.5 scrollbar-thin pr-1 pb-32 lg:pb-0'>
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

          <section
            aria-label='Interactive map'
            className={`lg:col-span-7 flex-1 h-full min-h-0 w-full ${
              mobileView === 'list' ? 'hidden lg:block' : 'flex flex-col'
            }`}
          >
            <ErrorBoundary>
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
            </ErrorBoundary>
          </section>
        </div>
      </main>

      <AppFooter />

      {mobileView === 'map' && selectedStation && (
        <MobileStationDrawer
          station={selectedStation}
          distance={distances[selectedStation.id]}
          onClose={handleDeselectStation}
          onViewInList={handleViewStationInList}
        />
      )}

      {(!selectedStation || mobileView === 'list') && (
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
