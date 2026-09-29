import type { ChargingStation } from "../data/charging-stations";

type Props = {
  search: string;
  connector: string;
  only24Hours: boolean;
  hasActiveFilters: boolean;
  stations: ChargingStation[];
  onSearchChange: (value: string) => void;
  onConnectorChange: (value: string) => void;
  onToggle24Hours: () => void;
  onClearFilters: () => void;
};

const connectors = [
  { id: "all", label: "All" },
  { id: "GB-T", label: "GB-T" },
  { id: "GB-T/CCS2", label: "GB-T/CCS2" },
  { id: "CCS2", label: "CCS2" },
];

const StationFilters = ({
  search,
  connector,
  only24Hours,
  hasActiveFilters,
  onSearchChange,
  onConnectorChange,
  onToggle24Hours,
  onClearFilters,
}: Props) => (
  <div className="flex flex-col gap-2">
    {/* Row 1: Search */}
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </span>
      <input
        id="search-input"
        type="search"
        placeholder="Search stations..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-9 pr-9 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-400 transition placeholder-slate-400"
      />
      {search && (
        <button
          type="button"
          onClick={() => onSearchChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
          aria-label="Clear search"
        >
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 8.586l3.293-3.293a1 1 0 011.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 011.414-1.414L10 8.586z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>

    {/* Row 2: Filter chips */}
    <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
      {connectors.map((c) => {
        const isActive = connector === c.id;
        return (
          <button
            key={c.id}
            type="button"
            onClick={() => onConnectorChange(c.id)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 ${
              isActive
                ? "bg-slate-900 text-white"
                : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-800"
            }`}
          >
            {c.label}
          </button>
        );
      })}

      {/* Divider */}
      <span className="h-4 w-px bg-slate-200 shrink-0 mx-0.5" />

      {/* 24/7 toggle */}
      <button
        type="button"
        onClick={onToggle24Hours}
        className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 ${
          only24Hours
            ? "bg-emerald-500 text-white"
            : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-800"
        }`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${only24Hours ? "bg-white" : "bg-emerald-400"}`} />
        24/7
      </button>

      {/* Clear — only when something is active */}
      {hasActiveFilters && (
        <>
          <span className="h-4 w-px bg-slate-200 shrink-0 mx-0.5" />
          <button
            type="button"
            id="clear-filters-btn"
            onClick={onClearFilters}
            className="shrink-0 px-3 py-1.5 rounded-full text-xs font-medium text-slate-500 hover:text-red-600 bg-white border border-slate-200 hover:border-red-200 transition-all active:scale-95"
          >
            Reset
          </button>
        </>
      )}
    </div>
  </div>
);

export default StationFilters;
