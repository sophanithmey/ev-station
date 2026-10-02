export interface EACProvinceStat {
  id: string;
  nameKh: string;
  nameEn: string;
  stations: number;
  chargers: number;
  /** Position on SVG map canvas in percentage (0 to 100) */
  mapX: number;
  mapY: number;
  labelPosition?: 'top' | 'bottom' | 'left' | 'right' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  region: 'Capital' | 'North' | 'Northwest' | 'Northeast' | 'South' | 'Southwest' | 'East' | 'Central';
  color: string;
}

export interface EACMetadata {
  titleKh: string;
  titleEn: string;
  asOfKh: string;
  asOfEn: string;
  totalStations: number;
  totalChargers: number;
  authorityKh: string;
  authorityEn: string;
  contact: {
    phones: string[];
    email: string;
    facebook: string;
    telegram: string;
    website: string;
    addressKh: string;
    addressEn: string;
  };
}

export const EAC_METADATA: EACMetadata = {
  titleKh: 'ស្ថានីយបញ្ចូលថាមពលយានយន្តអគ្គិសនីស្របច្បាប់នៅកម្ពុជា',
  titleEn: 'Authorized Electric Vehicle Charging Stations in Cambodia',
  asOfKh: 'គិតត្រឹមខែកញ្ញា ឆ្នាំ2026',
  asOfEn: 'As of September 2026',
  totalStations: 234,
  totalChargers: 421,
  authorityKh: 'អាជ្ញាធរអគ្គិសនីកម្ពុជា',
  authorityEn: 'Electricity Authority of Cambodia (EAC)',
  contact: {
    phones: ['(855-23) 217 654', '987 898'],
    email: 'admin@eac.gov.kh',
    facebook: 'https://facebook.com/eac.gov.kh',
    telegram: 'https://t.me/EACCambodia',
    website: 'https://www.eac.gov.kh',
    addressKh: 'អគារលេខ២០២ មហាវិថីព្រះមុនីវង្ស (លេខ៩៣) ភូមិ១ សង្កាត់ស្រះចក ខណ្ឌដូនពេញ រាជធានីភ្នំពេញ',
    addressEn: 'Building 202, Preah Monivong Blvd (No. 93), Phum 1, Srah Chork, Daun Penh, Phnom Penh',
  },
};

export interface EACModalImageInfo {
  src: string;
  title: string;
  subtitle?: string;
  downloadName?: string;
}

export const PROVINCE_IMAGES: Record<string, EACModalImageInfo> = {
  pursat: {
    src: '/pursat.jpeg',
    title: 'រូបភាពផ្លូវការ៖ ស្ថានីយសាក EV ខេត្តពោធិ៍សាត់',
    subtitle: 'Pursat EV Charging Stations (Official EAC)',
    downloadName: 'pursat-ev-stations.jpeg',
  },
  'siem-reap': {
    src: '/siemreap.jpeg',
    title: 'រូបភាពផ្លូវការ៖ ស្ថានីយសាក EV ខេត្តសៀមរាប',
    subtitle: 'Siem Reap EV Charging Stations (Official EAC)',
    downloadName: 'siemreap-ev-stations.jpeg',
  },
};

export const DEFAULT_EAC_IMAGE: EACModalImageInfo = {
  src: '/eac.jpeg',
  title: 'រូបភាពដើម៖ ស្ថានីយបញ្ចូលថាមពលយានយន្តអគ្គិសនីស្របច្បាប់នៅកម្ពុជា (EAC)',
  subtitle: 'Authorized Electric Vehicle Charging Stations in Cambodia (EAC)',
  downloadName: 'eac-ev-stations-cambodia-2026.jpeg',
};

