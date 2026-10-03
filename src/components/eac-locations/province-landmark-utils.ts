export type ProvinceLandmarkMeta = {
  label: string;
  nameEn: string;
};

export function getProvinceLandmarkInfo(
  provinceId: string,
): ProvinceLandmarkMeta {
  switch (provinceId) {
    case 'siem-reap':
      return { label: 'ប្រាសាទអង្គរវត្ត', nameEn: 'Angkor Wat Temple' };
    case 'pursat':
      return {
        label: 'ភ្នំ១៥០០ & ជួរភ្នំក្រវាញ',
        nameEn: 'Phnom 1500 & Cardamom Mts',
      };
    case 'phnom-penh':
    case 'kandal':
      return {
        label: 'ព្រះបរមរាជវាំង & មាត់ទន្លេចតុមុខ',
        nameEn: 'Royal Palace & Chaktomuk River',
      };
    case 'preah-sihanouk':
      return {
        label: 'ឆ្នេរសមុទ្រក្រុងព្រះសីហនុ & កោះរ៉ុង',
        nameEn: 'Sihanoukville Coastal Sea & Koh Rong',
      };
    case 'kampot':
      return {
        label: 'ឆ្នេរសមុទ្រកំពត & ភ្នំបូកគោ',
        nameEn: 'Kampot Coastal Sea & Bokor Mt',
      };
    case 'kep':
      return {
        label: 'ឆ្នេរសមុទ្រកែប & កោះទន្សាយ',
        nameEn: 'Kep Coastal Sea & Rabbit Island',
      };
    case 'koh-kong':
      return {
        label: 'ឆ្នេរសមុទ្រកោះកុង & កោះស្តេច',
        nameEn: 'Koh Kong Coastal Sea & Koh Sdach',
      };
    case 'battambang':
    case 'banteay-meanchey':
    case 'pailin':
      return {
        label: 'ប្រាសាទបាណន់ & ភ្នំសំពៅ',
        nameEn: 'Banan Temple & Phnom Sampov',
      };
    case 'preah-vihear':
    case 'kampong-thom':
      return {
        label: 'ប្រាសាទព្រះវិហារ & សំបូរព្រៃគុក',
        nameEn: 'Preah Vihear & Sambor Prei Kuk',
      };
    case 'mondulkiri':
    case 'ratanakiri':
    case 'kratie':
    case 'stung-treng':
      return {
        label: 'ទឹកជ្រោះប៊ូស្រា & បឹងយក្សឡោម',
        nameEn: 'Bousra Waterfall & Yeak Laom Lake',
      };
    case 'kampong-cham':
    case 'tboung-khmum':
    case 'prey-veng':
    case 'svay-rieng':
    case 'takeo':
    case 'kampong-speu':
    case 'kampong-chhnang':
      return {
        label: 'ស្ពានគីហ្សូណា',
        nameEn: 'Kizuna Bridge',
      };
    default:
      return {
        label: 'បេតិកភណ្ឌកម្ពុជា',
        nameEn: 'Cambodia Heritage Landmark',
      };
  }
}
