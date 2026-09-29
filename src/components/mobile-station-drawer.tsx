import { useState } from "react";
import type { ChargingStation } from "../data/charging-stations";

type Props = {
  station: ChargingStation | null;
  distance?: number;
  onClose: () => void;
};

const connectorStyles: Record<string, { bg: string; text: string; border: string }> = {
  "GB-T": { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  "GB-T/CCS2": { bg: "bg-teal-50", text: "text-teal-700", border: "border-teal-200" },
  "CCS2": { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  "CCS/SAE": { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
  "Unknown": { bg: "bg-slate-50", text: "text-slate-600", border: "border-slate-200" },
};

export default function MobileStationDrawer({ station, distance, onClose }: Props) {
  const [copied, setCopied] = useState(false);

  if (!station) return null;

  const style = connectorStyles[station.connector] || connectorStyles.Unknown;
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${station.latitude},${station.longitude}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${station.latitude.toFixed(6)}, ${station.longitude.toFixed(6)}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 pointer-events-none sm:hidden">
      <div className="bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl shadow-2xl p-4 pointer-events-auto max-w-lg mx-auto animate-in slide-in-from-bottom-6 duration-300">
        {/* Handle / Header */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap mb-1">
              {station.brand && (
                <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                  {station.brand}
                </span>
              )}
              {distance !== undefined && (
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-md">
                  {distance} km away
                </span>
              )}
            </div>
            <h3 className="font-bold text-slate-900 text-sm leading-snug truncate">
              {station.name}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center shrink-0"
            aria-label="Close station preview"
          >
            ✕
          </button>
        </div>

        {/* Location & Connector Info */}
        <div className="flex items-center gap-2 text-xs text-slate-600 mb-3 flex-wrap">
          <span className="flex items-center gap-1">
            <span>📍</span>
            <strong>{station.province}</strong>
          </span>
          <span className="text-slate-300">•</span>
          <span className={`px-2 py-0.5 rounded-md font-semibold text-[11px] border ${style.bg} ${style.text} ${style.border}`}>
            {station.connector}
          </span>
          <span className="text-slate-300">•</span>
          <span className={station.is24Hours ? "text-emerald-600 font-medium" : "text-slate-600"}>
            🕒 {station.operationTime}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="py-2.5 px-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 text-xs font-semibold hover:bg-slate-100 active:scale-95 transition-all flex items-center justify-center gap-1.5"
          >
            <span>{copied ? "✓ Copied" : "📋 Copy Coords"}</span>
          </button>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-3 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 active:scale-95 transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-1.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            Directions
          </a>
        </div>
      </div>
    </div>
  );
}
