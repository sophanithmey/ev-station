import type { ChargingStation } from '../data/charging-stations';
import LocationErrorAlert from './location-error-alert';
import StationFilters from './station-filters';
import StationListHeader from './station-list-header';
import StationList from './station-list';
import OpenMap from './open-map';
import ErrorBoundary from './error-boundary';

interface Props {
  stations: ChargingStation[];
  filteredStations: ChargingStation[];
  selectedStation: ChargingStation | null;
  mobileView: 'map' | 'list';
  userLocation: { lat: number; lng: number } | null;
  isLocating: boolean;
  locationError: string | null;
  distances: Record<string, number>;
  search: string;
  connector: string;
  only24Hours: boolean;
  onlyNearMe: boolean;
  hasActiveFilters: boolean;
  onSearchChange: (search: string) => void;
  onConnectorChange: (connector: string) => void;
  onToggle24Hours: () => void;
  onToggleNearMe: () => void;
  onClearFilters: () => void;
  onClearLocationError: () => void;
  onSelectStation: (station: ChargingStation) => void;
  onDeselectStation: () => void;
  onRequestUserLocation: () => void;
}

export default function StationExplorerView({
  stations,
  filteredStations,
  selectedStation,
  mobileView,
  userLocation,
  isLocating,
  locationError,
  distances,
  search,
  connector,
  only24Hours,
  onlyNearMe,
  hasActiveFilters,
  onSearchChange,
  onConnectorChange,
  onToggle24Hours,
  onToggleNearMe,
  onClearFilters,
  onClearLocationError,
  onSelectStation,
  onDeselectStation,
  onRequestUserLocation,
}: Props) {
  return (
    <>
      <LocationErrorAlert
        error={locationError}
        onClear={onClearLocationError}
      />

      <div className='shrink-0'>
        <StationFilters
          search={search}
          connector={connector}
          only24Hours={only24Hours}
          onlyNearMe={onlyNearMe}
          isLocating={isLocating}
          hasActiveFilters={hasActiveFilters}
          stations={stations}
          onSearchChange={onSearchChange}
          onConnectorChange={onConnectorChange}
          onToggle24Hours={onToggle24Hours}
          onToggleNearMe={onToggleNearMe}
          onClearFilters={onClearFilters}
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
            onToggleNearMe={onToggleNearMe}
          />

          <div className='flex-1 min-h-0 overflow-y-auto space-y-2.5 scrollbar-thin pr-1 pb-32 lg:pb-0'>
            <StationList
              stations={filteredStations}
              groupByProvince={false}
              selectedStationId={selectedStation?.id}
              distances={distances}
              onSelectStation={onSelectStation}
              onReset={onClearFilters}
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
              onSelectStation={onSelectStation}
              onDeselectStation={onDeselectStation}
              onRequestUserLocation={onRequestUserLocation}
              isLocating={isLocating}
              distances={distances}
              mobileView={mobileView}
            />
          </ErrorBoundary>
        </section>
      </div>
    </>
  );
}
