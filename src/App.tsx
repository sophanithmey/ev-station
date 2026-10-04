import { chargingStations } from './data/charging-stations';
import { useUserLocation } from './hooks/use-user-location';
import { useStationFilters } from './hooks/use-station-filters';
import { useMobileNavigation } from './hooks/use-mobile-navigation';
import { useAppModals } from './hooks/use-app-modals';
import { useAppNavigation } from './hooks/use-app-navigation';
import StationAppShell from './components/station-app-shell';
import StationExplorerView from './components/station-explorer-view';
import EacStatsPage from './components/eac-stats/eac-stats-page';
import EacLocationsPage from './components/eac-locations/eac-locations-page';
import MobileStationDrawer from './components/mobile-station-drawer';
import MobileViewSwitcher from './components/mobile-view-switcher';
import DisclaimerModal from './components/disclaimer-modal';
import DonationModal from './components/donation/donation-modal';

const DATASET_URL =
  'https://data.mef.gov.kh/datasets/pd_67b6d073cb47dc00012464a6';

export default function App() {
  const { activePage, handlePageChange } = useAppNavigation();
  const {
    isDisclaimerOpen,
    isDonateOpen,
    openDisclaimer,
    closeDisclaimer,
    openDonate,
    closeDonate,
  } = useAppModals();

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

  const overlays = (
    <>
      {activePage === 'explorer' && mobileView === 'map' && selectedStation && (
        <MobileStationDrawer
          station={selectedStation}
          distance={distances[selectedStation.id]}
          onClose={handleDeselectStation}
          onViewInList={handleViewStationInList}
        />
      )}
      {activePage === 'explorer' && (!selectedStation || mobileView === 'list') && (
        <MobileViewSwitcher
          mobileView={mobileView}
          filteredCount={filteredStations.length}
          onSelectView={handleSelectView}
          onlyNearMe={onlyNearMe}
          isLocating={isLocating}
          onToggleNearMe={handleToggleNearMe}
        />
      )}
    </>
  );

  return (
    <>
      <StationAppShell
        activePage={activePage}
        mobileView={mobileView}
        onPageChange={handlePageChange}
        onOpenDonate={openDonate}
        onOpenDisclaimer={openDisclaimer}
        overlays={overlays}
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
      </StationAppShell>

      <DisclaimerModal
        isOpen={isDisclaimerOpen}
        onClose={closeDisclaimer}
        datasetUrl={DATASET_URL}
      />
      <DonationModal isOpen={isDonateOpen} onClose={closeDonate} />
    </>
  );
}
