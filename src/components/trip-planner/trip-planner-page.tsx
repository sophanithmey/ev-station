import { useState } from 'react';
import { useTripPlanner } from '../../hooks/use-trip-planner';
import { chargingStations } from '../../data/charging-stations';
import { CAMBODIA_CITIES } from '../../data/cambodia-cities';
import type { ChargingStation } from '../../types/station';
import TripPlannerForm from './trip-planner-form';
import TripRouteSummary from './trip-route-summary';
import TripStopCard from './trip-stop-card';
import MaplibreStationMap from '../map/maplibre-station-map';

export default function TripPlannerPage() {
  const {
    originId,
    destinationId,
    vehicleId,
    startSoc,
    reserveSoc,
    preferredConnector,
    assumptions,
    isCalculating,
    planResult,
    error,
    setOriginId,
    setDestinationId,
    setVehicleId,
    setStartSoc,
    setReserveSoc,
    setPreferredConnector,
    toggleAc,
    recalculate,
  } = useTripPlanner();

  const [selectedStation, setSelectedStation] =
    useState<ChargingStation | null>(null);

  const originCity = CAMBODIA_CITIES.find((c) => c.id === originId) ?? null;
  const destinationCity =
    CAMBODIA_CITIES.find((c) => c.id === destinationId) ?? null;

  // Stations to display on trip map: if stops exist, highlight stop stations and general stations
  const displayStations =
    planResult?.stops.map((s) => s.station) ?? chargingStations;

  return (
    <div className='flex-1 w-full flex flex-col gap-3.5 pb-12 touch-pan-y'>
      {error && (
        <div className='p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center justify-between shrink-0'>
          <span>⚠️ {error}</span>
        </div>
      )}

      <div className='grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start'>
        {/* Left Column: Form + Summary + Stops */}
        <div className='lg:col-span-5 flex flex-col gap-3.5 w-full'>
          <TripPlannerForm
            originId={originId}
            destinationId={destinationId}
            vehicleId={vehicleId}
            startSoc={startSoc}
            reserveSoc={reserveSoc}
            preferredConnector={preferredConnector}
            acActive={assumptions.acActive}
            isCalculating={isCalculating}
            onOriginChange={setOriginId}
            onDestinationChange={setDestinationId}
            onVehicleChange={setVehicleId}
            onStartSocChange={setStartSoc}
            onReserveSocChange={setReserveSoc}
            onConnectorChange={setPreferredConnector}
            onToggleAc={toggleAc}
            onSubmit={recalculate}
          />

          {planResult && (
            <>
              <TripRouteSummary result={planResult} />

              {planResult.stops.length > 0 && (
                <div className='space-y-2'>
                  <h3 className='text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5'>
                    <span>⚡</span>
                    <span>
                      Recommended Charging Stops ({planResult.stops.length})
                    </span>
                  </h3>
                  {planResult.stops.map((stop, idx) => (
                    <TripStopCard
                      key={stop.station.id}
                      stop={stop}
                      index={idx}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Right Column: Interactive Map with Route Polyline */}
        <div className='lg:col-span-7 h-96 sm:h-110 lg:h-140 lg:sticky lg:top-0 w-full flex flex-col rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm shrink-0'>
          <MaplibreStationMap
            stations={displayStations}
            selectedStation={selectedStation}
            userLocation={null}
            routeGeometry={planResult?.route.coordinates}
            origin={originCity}
            destination={destinationCity}
            onSelectStation={setSelectedStation}
            onRequestUserLocation={() => {}}
            isLocating={false}
          />
        </div>
      </div>
    </div>
  );
}
