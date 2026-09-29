import type { ChargingStation } from "../data/charging-stations";
import StationCard from "./station-card";

type Props = {
  province: string;
  stations: ChargingStation[];
  selectedStationId?: string;
  distances?: Record<string, number>;
  onSelectStation?: (station: ChargingStation) => void;
};

const ProvinceSection = ({
  province,
  stations,
  selectedStationId,
  distances = {},
  onSelectStation,
}: Props) => (
  <section aria-label={`${province} stations`}>
    <div className="flex items-center gap-3 mb-3">
      <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
        {province}
      </h2>
      <span className="text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full">
        {stations.length} {stations.length === 1 ? "station" : "stations"}
      </span>
      <div className="flex-1 h-px bg-slate-200" />
    </div>
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
  </section>
);

export default ProvinceSection;
