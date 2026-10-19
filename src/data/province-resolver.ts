
export interface GeoJsonFeature {
  type: string;
  geometry: {
    type: string;
    coordinates: number[];
  };
  properties: {
    'Location Name': string;
    Location?: string;
    Latitude: number;
    Longitude: number;
    'Plug Types': string;
    'Operation Time'?: string;
  };
}

export function resolveProvince(feature: GeoJsonFeature): string {
  const p = feature.properties;
  const name = (p['Location Name'] || '').toLowerCase();

  const rawLat = p.Latitude;
  const rawLng = p.Longitude;
  // Normalize swapped lat/lng if encountered in source data
  const isSwapped = rawLat > 50 && rawLng < 25;
  const lat = isSwapped ? rawLng : rawLat;
  const lng = isSwapped ? rawLat : rawLng;

  // 1. Explicit name & landmark matches
  if (
    name.includes('siem reap') ||
    name.includes('angkor') ||
    name.includes('kralanh')
  )
    return 'Siem Reap';
  if (
    name.includes('sihanouk') ||
    name.includes('prey nob') ||
    name.includes('kampong seila') ||
    name.includes('kompong seila') ||
    (!name.includes('kirirom') && lat < 10.8 && lng < 104.0)
  )
    return 'Preah Sihanouk';
  if (
    name.includes('kampot') || name.includes('bokor') ||
    name.includes('boeng touk') || name.includes('angkor chey') ||
    name.includes('banteay meas') || name.includes('kampong trach')
  )
    return 'Kampot';
  if (
    name.includes('kep') || name.includes('kaeb') ||
    name.includes('crab market') || name.includes('ou krasar') ||
    name.includes('damnak changaeur')
  )
    return 'Kep';
  if (
    name.includes('takeo') || name.includes('tnorl boat') ||
    name.includes('tnol boat') || name.includes('ang ta saom') ||
    name.includes('angk ta saom') || name.includes('angtasoam') ||
    name.includes('tram kak')
  )
    return 'Takeo';
  if (name.includes('battambang')) return 'Battambang';
  if (
    name.includes('poi pet') || name.includes('poipet') ||
    name.includes('serey sophon') || name.includes('sisophon') ||
    name.includes('mongkol borei') || name.includes('preah netr preah')
  )
    return 'Banteay Meanchey';
  if (name.includes('pusat') || name.includes('pursat')) return 'Pursat';
  if (name.includes('pailin')) return 'Pailin';
  if (name.includes('preah vihear') || name.includes('preah vihea'))
    return 'Preah Vihear';
  if (name.includes('stung treng') || name.includes('steung treng'))
    return 'Stung Treng';
  if (name.includes('mondulkiri')) return 'Mondulkiri';
  if (
    name.includes('krong kracheh') || name.includes('kracheh') ||
    name.includes('kratie') || name.includes('snuol') || name.includes('២ធ្នូ')
  )
    return 'Kratie';
  if (
    name.includes('stueng saen') || name.includes('kampong thom') ||
    name.includes('ចម្ការតាខ្នារ') || name.includes('stoung')
  )
    return 'Kampong Thom';
  if (name.includes('koh sdach') || name.includes('srae ambel'))
    return 'Koh Kong';
  if (
    name.includes('skun') || name.includes('skoun') ||
    name.includes('kampong cham') || name.includes('tonle om') ||
    name.includes('beung ket') || name.includes('boeung ket') ||
    name.includes('stueng trang')
  )
    return 'Kampong Cham';
  if (
    name.includes('tboung khmum') || name.includes('tbong khmum') ||
    name.includes('suong') || name.includes('soung') ||
    name.includes('krek') || name.includes('ponhea kraek') ||
    name.includes('memot')
  )
    return 'Tboung Khmum';
  if (
    name.includes('svay rieng') || name.includes('bavet') ||
    name.includes('svay chrum') || name.includes('kraol kou')
  )
    return 'Svay Rieng';
  if (name.includes('prey veng') || name.includes('svay antor'))
    return 'Prey Veng';

  // Kandal explicit district & landmark names
  if (
    (name.includes('kandal') && !name.includes('dvar kandal')) ||
    name.includes('takhmao') || name.includes('ta khmau') ||
    name.includes('kandal stueng') || name.includes('ang snuol') ||
    name.includes('angk snuol') || name.includes('kien svay') ||
    name.includes('bek chan') || name.includes('arey ksat') ||
    name.includes('saang') || name.includes("sa'ang") ||
    name.includes('koh thom')
  )
    return 'Kandal';

  // 2. Primary outer province bounding boxes
  if (lat >= 13.2 && lat <= 13.8 && lng >= 103.4 && lng <= 104.4)
    return 'Siem Reap';
  if (lat >= 12.9 && lat <= 13.3 && lng >= 103.0 && lng <= 103.4)
    return 'Battambang';
  if (lat >= 13.4 && lat <= 13.8 && lng >= 102.4 && lng <= 103.3)
    return 'Banteay Meanchey';
  if (lat >= 12.7 && lat <= 12.95 && lng >= 102.4 && lng <= 102.8)
    return 'Pailin';
  if (lat >= 12.1 && lat <= 12.7 && lng >= 103.0 && lng <= 104.25)
    return 'Pursat';
  if (lat >= 12.0 && lat <= 12.4 && lng >= 104.4 && lng <= 104.8)
    return 'Kampong Chhnang';
  if (lat >= 12.4 && lat <= 13.05 && lng >= 104.45 && lng <= 105.3)
    return 'Kampong Thom';
  if (lat >= 13.5 && lat <= 14.5 && lng >= 104.5 && lng <= 105.5)
    return 'Preah Vihear';
  if (lat >= 13.1 && lat <= 14.5 && lng >= 105.6 && lng <= 106.6)
    return 'Stung Treng';
  if (lat >= 13.4 && lat <= 14.3 && lng >= 106.6 && lng <= 107.5)
    return 'Ratanakiri';
  if (lat >= 12.0 && lat <= 13.0 && lng >= 106.8 && lng <= 107.6)
    return 'Mondulkiri';
  if (lat >= 12.0 && lat <= 13.0 && lng >= 105.8 && lng <= 106.6)
    return 'Kratie';
  if (lat >= 11.6 && lat <= 12.3 && lng >= 105.55 && lng <= 106.3)
    return 'Tboung Khmum';
  if (lat >= 11.8 && lat <= 12.35 && lng >= 105.0 && lng <= 105.65)
    return 'Kampong Cham';
  if (lat >= 11.2 && lat <= 11.7 && lng >= 103.9 && lng <= 104.7)
    return 'Kampong Speu';
  if (lat >= 10.7 && lat <= 11.9 && lng >= 102.8 && lng <= 103.8)
    return 'Koh Kong';
  if (lat >= 10.4 && lat <= 10.9 && lng >= 103.4 && lng <= 104.0)
    return 'Preah Sihanouk';
  if (lat >= 10.45 && lat <= 10.58 && lng >= 104.24 && lng <= 104.38)
    return 'Kep';
  if (lat >= 10.4 && lat <= 10.8 && lng >= 104.0 && lng <= 104.4)
    return 'Kampot';
  if (lat >= 10.7 && lat <= 11.28 && lng >= 104.5 && lng <= 105.0)
    return 'Takeo';
  if (lat >= 10.9 && lat <= 11.45 && lng >= 105.6 && lng <= 106.3)
    return 'Svay Rieng';
  if (lat >= 11.2 && lat <= 11.85 && lng >= 105.2 && lng <= 105.7)
    return 'Prey Veng';

  // 3. Kandal Province bounding sectors (surrounds Phnom Penh)
  // South sector: Kandal Stueng, Takhmao, Sa'ang, Koh Thom
  if (lat >= 10.95 && lat <= 11.465 && lng >= 104.70 && lng <= 105.18)
    return 'Kandal';
  // West sector: Ang Snuol, Bek Chan (west of Kamboul)
  if (lat >= 11.45 && lat <= 11.65 && lng >= 104.60 && lng < 104.78)
    return 'Kandal';
  // North sector: Ponhea Lueu, Muk Kampoul (north of Prek Pnov)
  if (lat >= 11.685 && lat <= 11.95 && lng >= 104.72 && lng <= 105.05)
    return 'Kandal';
  // East sector: Arey Ksat, Lvea Aem, Khsach Kandal, Kien Svay (east of Mekong)
  if (lat >= 11.45 && lat <= 11.85 && lng >= 104.985 && lng <= 105.35)
    return 'Kandal';

  return 'Phnom Penh';
}
