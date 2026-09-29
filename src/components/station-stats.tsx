import type { ChargingStation } from "../data/charging-stations";

type Props = {
  stations: ChargingStation[];
  filteredCount: number;
};

const StatCard = ({
  label,
  value,
  subtext,
  icon,
}: {
  label: string;
  value: number | string;
  subtext?: string;
  icon: string;
}) => (
  <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-3 sm:p-4 flex items-center gap-3">
    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xl shrink-0">
      {icon}
    </div>
    <div className="min-w-0">
      <div className="flex items-baseline gap-1.5">
        <span className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          {value}
        </span>
        {subtext && (
          <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
            {subtext}
          </span>
        )}
      </div>
      <p className="text-xs font-medium text-slate-500 truncate">{label}</p>
    </div>
  </div>
);

const StationStats = ({ stations, filteredCount }: Props) => {
  const provinceCount = new Set(stations.map((s) => s.province)).size;
  const gbtCount = stations.filter(
    (s) => s.connector === "GB-T" || s.connector === "GB-T/CCS2"
  ).length;
  const is24hCount = stations.filter((s) => s.is24Hours).length;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
      <StatCard
        label="Available"
        value={filteredCount}
        subtext={`of ${stations.length}`}
        icon="⚡"
      />
      <StatCard label="Provinces" value={provinceCount} icon="🗺️" />
      <StatCard
        label="GB-T Ready"
        value={gbtCount}
        icon="🔌"
      />
      <StatCard
        label="Open 24/7"
        value={is24hCount}
        icon="🕒"
      />
    </div>
  );
};

export default StationStats;
