import { useState } from "react";
import type { ChargingStation } from "../data/charging-stations";
import CardRoadAnimation from "./card-road-animation";

type Props = {
  station: ChargingStation;
  distance?: number;
  isSelected?: boolean;
  onSelectOnMap?: (station: ChargingStation) => void;
};

const connectorStyles: Record<string, { bg: string; text: string; border: string }> = {
  "GB-T": { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  "GB-T/CCS2": { bg: "bg-teal-50", text: "text-teal-700", border: "border-teal-200" },
  "CCS2": { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  "CCS/SAE": { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
  "Unknown": { bg: "bg-slate-50", text: "text-slate-600", border: "border-slate-200" },
};

const StationCard = ({ station, distance, isSelected = false, onSelectOnMap }: Props) => {
  const [copied, setCopied] = useState(false);
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${station.latitude},${station.longitude}`;
  const style = connectorStyles[station.connector] || connectorStyles.Unknown;

  const handleCopyCoords = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`${station.latitude.toFixed(6)}, ${station.longitude.toFixed(6)}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article
      onClick={() => onSelectOnMap?.(station)}
      className={`group relative bg-white rounded-2xl border transition-all duration-200 p-4 flex flex-col gap-3 cursor-pointer ${
        isSelected
          ? "border-emerald-500 shadow-md ring-2 ring-emerald-500/20 bg-emerald-50/20"
          : "border-slate-200/90 shadow-sm hover:border-emerald-300 hover:shadow-md"
      }`}
    >
      {/* Header: Title + Plug Badge */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {station.brand && (
              <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                {station.brand}
              </span>
            )}
            {distance !== undefined && (
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                {distance} km
              </span>
            )}
          </div>
          <h3 className="font-semibold text-slate-900 text-sm leading-snug mt-1 group-hover:text-emerald-700 transition-colors">
            {station.name}
          </h3>
        </div>

        <span className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full border ${style.bg} ${style.text} ${style.border}`}>
          {station.connector}
        </span>
      </div>

      {/* Location & Province */}
      <div className="flex items-center gap-2 text-xs text-slate-600">
        <span className="flex items-center gap-1 text-slate-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <strong className="font-medium text-slate-700">{station.province}</strong>
        </span>

        <span className="text-slate-300">•</span>

        {/* Operating Hours */}
        <span className={`flex items-center gap-1 font-medium ${station.is24Hours ? "text-emerald-600" : "text-slate-600"}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${station.is24Hours ? "bg-emerald-500 animate-pulse" : "bg-slate-400"}`}></span>
          {station.operationTime}
        </span>
      </div>

      {/* Coordinates / DMS preview */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1 border-t border-slate-100">
        <span>{station.latitude.toFixed(4)}, {station.longitude.toFixed(4)}</span>
        <button
          type="button"
          onClick={handleCopyCoords}
          className="hover:text-slate-700 underline transition-colors px-1 py-0.5 rounded"
          title="Copy exact coordinates"
        >
          {copied ? "✓ Copied" : "Copy Coords"}
        </button>
      </div>

      {/* Mini Road & Driving EV Animation */}
      <CardRoadAnimation
        stationId={station.id}
        connector={station.connector}
      />

      {/* Action Buttons: View on Map + Directions */}
      <div className="grid grid-cols-2 gap-2 mt-auto pt-1">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelectOnMap?.(station);
          }}
          className="flex items-center justify-center gap-1.5 w-full py-2 px-2.5 rounded-xl border border-slate-200 bg-slate-50/80 text-slate-700 text-xs font-semibold hover:bg-slate-100 hover:text-slate-900 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          Map Pin
        </button>

        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center justify-center gap-1.5 w-full py-2 px-2.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 active:scale-95 transition-all shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
          Directions
        </a>
      </div>
    </article>
  );
};

export default StationCard;
