import type { ChargingStation } from "../data/charging-stations";
import StationCard from "./station-card";
import ProvinceSection from "./province-section";
import EmptyState from "./empty-state";

type Props = {
  stations: ChargingStation[];
  groupByProvince: boolean;
  selectedStationId?: string;
  distances?: Record<string, number>;
  onSelectStation?: (station: ChargingStation) => void;
  onReset: () => void;
};

const StationList = ({
  stations,
  groupByProvince,
  selectedStationId,
  distances = {},
  onSelectStation,
  onReset,
}: Props) => {
  if (stations.length === 0) {
    return <EmptyState onReset={onReset} />;
  }

  if (!groupByProvince) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {stations.map((station) => (
          <StationCard
            key={station.id}
            station={station}
            distance={distances[station.id]}
            isSelected={selectedStationId === station.id}
            onSelectOnMap={onSelectStation}
          />
        ))}
      </div>
    );
  }

  const grouped = stations.reduce<Record<string, ChargingStation[]>>((acc, station) => {
    if (!acc[station.province]) acc[station.province] = [];
    acc[station.province].push(station);
    return acc;
  }, {});

  const sortedProvinces = Object.keys(grouped).sort();

  return (
    <div className="space-y-6">
      {sortedProvinces.map((province) => (
        <ProvinceSection
          key={province}
          province={province}
          stations={grouped[province]}
          selectedStationId={selectedStationId}
          distances={distances}
          onSelectStation={onSelectStation}
        />
      ))}
    </div>
  );
};

export default StationList;
