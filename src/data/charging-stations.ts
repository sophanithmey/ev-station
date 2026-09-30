import rawGeoJson from "./ElectricVehicle(EV)ChargingStationsinCambodia2025.json";

export type ConnectorType = "GB-T" | "CCS2" | "GB-T/CCS2" | "CCS/SAE" | "Unknown";

export type ChargingStation = {
  id: string;
  name: string;
  province: string;
  connector: ConnectorType;
  operationTime: string;
  is24Hours: boolean;
  latitude: number;
  longitude: number;
  dmsLocation?: string;
  brand?: string;
};

interface GeoJsonFeature {
  type: string;
  geometry: {
    type: string;
    coordinates: number[];
  };
  properties: {
    "Location Name": string;
    Location?: string;
    Latitude: number;
    Longitude: number;
    "Plug Types": string;
    "Operation Time"?: string;
  };
}

function resolveProvince(feature: GeoJsonFeature): string {
  const p = feature.properties;
  const name = (p["Location Name"] || "").toLowerCase();
  const lat = p.Latitude;
  const lng = p.Longitude;

  // Explicit name matches
  if (name.includes("siem reap") || name.includes("angkor")) return "Siem Reap";
  if (name.includes("sihanouk") || name.includes("prey nob") || (!name.includes("kirirom") && lat < 10.8 && lng < 103.8)) return "Preah Sihanouk";
  if (name.includes("kampot")) return "Kampot";
  if (name.includes("kep")) return "Kep";
  if (name.includes("takeo") || name.includes("tnorl boat") || name.includes("tnol boat")) return "Takeo";
  if (name.includes("battambang")) return "Battambang";
  if (name.includes("poi pet") || name.includes("poipet") || name.includes("serey sophon")) return "Banteay Meanchey";
  if (name.includes("pusat") || name.includes("pursat")) return "Pursat";
  if (name.includes("pailin")) return "Pailin";
  if (name.includes("preah vihear")) return "Preah Vihear";
  if (name.includes("mondulkiri")) return "Mondulkiri";
  if (name.includes("krong kracheh") || name.includes("kracheh") || name.includes("kratie")) return "Kratie";
  if (name.includes("stueng saen") || name.includes("kampong thom")) return "Kampong Thom";
  if (name.includes("koh sdach") || name.includes("srae ambel")) return "Koh Kong";

  // Coordinates bounding boxes for Cambodia provinces
  if (lat >= 13.2 && lat <= 13.6 && lng >= 103.6 && lng <= 104.1) return "Siem Reap";
  if (lat >= 12.9 && lat <= 13.3 && lng >= 103.0 && lng <= 103.4) return "Battambang";
  if (lat >= 13.4 && lat <= 13.8 && lng >= 102.4 && lng <= 103.3) return "Banteay Meanchey";
  if (lat >= 12.7 && lat <= 12.95 && lng >= 102.4 && lng <= 102.8) return "Pailin";
  if (lat >= 12.1 && lat <= 12.7 && lng >= 103.0 && lng <= 104.2) return "Pursat";
  if (lat >= 12.0 && lat <= 12.4 && lng >= 104.4 && lng <= 104.8) return "Kampong Chhnang";
  if (lat >= 12.4 && lat <= 13.0 && lng >= 104.7 && lng <= 105.3) return "Kampong Thom";
  if (lat >= 13.5 && lat <= 14.5 && lng >= 104.5 && lng <= 105.5) return "Preah Vihear";
  if (lat >= 13.4 && lat <= 14.3 && lng >= 106.6 && lng <= 107.5) return "Ratanakiri";
  if (lat >= 12.0 && lat <= 13.0 && lng >= 106.8 && lng <= 107.6) return "Mondulkiri";
  if (lat >= 12.2 && lat <= 13.0 && lng >= 105.8 && lng <= 106.5) return "Kratie";
  if (lat >= 11.8 && lat <= 12.2 && lng >= 105.2 && lng <= 106.2) return "Kampong Cham";
  if (lat >= 11.2 && lat <= 11.7 && lng >= 103.9 && lng <= 104.7) return "Kampong Speu";
  if (lat >= 10.7 && lat <= 11.9 && lng >= 102.8 && lng <= 103.8) return "Koh Kong";
  if (lat >= 10.4 && lat <= 10.9 && lng >= 103.4 && lng <= 103.8) return "Preah Sihanouk";
  if (lat >= 10.4 && lat <= 10.8 && lng >= 104.0 && lng <= 104.4) return "Kampot";
  if (lat >= 10.7 && lat <= 11.25 && lng >= 104.5 && lng <= 105.1) return "Takeo";
  if (lat >= 10.4 && lat <= 10.55 && lng >= 104.25 && lng <= 104.35) return "Kep";

  return "Phnom Penh";
}

function detectBrand(name: string): string {
  const n = name.toUpperCase();
  if (n.includes("PTT")) return "PTT Station";
  if (n.includes("TOTAL")) return "TotalEnergies";
  if (n.includes("LIM LONG")) return "Lim Long";
  if (n.includes("SOKIMEX")) return "Sokimex";
  if (n.includes("TELA")) return "Tela";
  if (n.includes("EV ENERGY TECH") || n.includes("EV ENERGY")) return "EV Energy Tech";
  if (n.includes("BYD")) return "BYD";
  if (n.includes("ZEEKR")) return "ZEEKR";
  if (n.includes("HOTEL") || n.includes("RESORT") || n.includes("GUEST HOUSE")) return "Hotel / Resort";
  if (n.includes("MALL") || n.includes("MARKET") || n.includes("CENTRAL")) return "Mall & Retail";
  if (n.includes("COFFEE") || n.includes("CAFÉ") || n.includes("CAFE")) return "Café";
  return "Charging Hub";
}

// Convert GeoJSON features to strongly typed ChargingStation list
const features = (rawGeoJson as { features: GeoJsonFeature[] }).features || [];

export const chargingStations: ChargingStation[] = features.map((f, index) => {
  const p = f.properties;
  const opTime = p["Operation Time"] ? p["Operation Time"].trim() : "24/7";
  const opLower = opTime.toLowerCase();
  const is24Hours = opLower.includes("24") || opLower === "24/7" || opLower === "24hrs";

  return {
    id: `kh-ev-${index + 1}`,
    name: (p["Location Name"] || `EV Station ${index + 1}`).trim(),
    province: resolveProvince(f),
    connector: (p["Plug Types"] as ConnectorType) || "Unknown",
    operationTime: opTime,
    is24Hours,
    latitude: p.Latitude,
    longitude: p.Longitude,
    dmsLocation: p.Location,
    brand: detectBrand(p["Location Name"] || ""),
  };
});

/**
 * Haversine formula to compute great-circle distance between two points in km
 */
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

