export interface KhqrConfig {
  accountName: string;
  accountNumber: string;
  bankName: string;
  currency: string;
  note: string;
  qrImageUrl: string;
  qrPayload?: string;
}

export const DONATION_CONFIG = {
  khqr: {
    accountName: 'SOPHANITH MEY',
    accountNumber: '000 382 681',
    bankName: 'ABA Bank',
    currency: 'USD / KHR',
    note: 'Scan with ABA Mobile, Bakong, Wing, ACLEDA, or any Cambodian bank app',
    qrImageUrl: '/khqr.svg',
    qrPayload:
      '00020101021129450016abaakhppxxx@abaa01090032374400208ABA Bank40600006abaP2P011279C1474AB138020900323744003090003826810404Dual5204000053031165802KH5913SOPHANITH MEY6010Phnom Penh6304C9A5',
  } as KhqrConfig,
};
