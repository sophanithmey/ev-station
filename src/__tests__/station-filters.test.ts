import { describe, it, expect } from 'vitest';
import type { ChargingStation } from '../types/station';

describe('Station Filtering Logic', () => {
  const sampleStations: ChargingStation[] = [
    {
      id: 'kh-1',
      name: 'Sala Khum Pursat & Chan Muler',
      nameKhmer: 'សាលាឃុំ ពោធិ៍សាត់',
      province: 'Pursat',
      connector: 'GB/T',
      speedCategory: 'dc_fast',
      operationTime: '24/7',
      is24Hours: true,
      latitude: 12.534,
      longitude: 103.914,
      address: 'Prey Nhi, Pursat',
      brand: 'Charging Hub',
      source: 'EAC',
      verifiedDate: 'Feb 2025',
    },
    {
      id: 'kh-2',
      name: 'Caltex Bokor AC Charger',
      nameKhmer: 'ស្ថានីយ៍ កាល់តិច បូកគោ',
      province: 'Kampot',
      connector: 'Type 2',
      speedCategory: 'ac_standard',
      operationTime: '06:00 - 22:00',
      is24Hours: false,
      latitude: 10.612,
      longitude: 104.182,
      brand: 'Caltex',
      source: 'PlugShare',
      verifiedDate: 'Feb 2025',
    },
  ];

  it('filters stations by Khmer name and English search query', () => {
    const queryKhmer = 'ពោធិ៍សាត់';
    const matchKhmer = sampleStations.filter(
      (s) =>
        s.name.toLowerCase().includes(queryKhmer) ||
        (s.nameKhmer && s.nameKhmer.includes(queryKhmer)),
    );
    expect(matchKhmer.length).toBe(1);
    expect(matchKhmer[0].id).toBe('kh-1');

    const queryEn = 'Caltex';
    const matchEn = sampleStations.filter((s) =>
      s.name.toLowerCase().includes(queryEn.toLowerCase()),
    );
    expect(matchEn.length).toBe(1);
    expect(matchEn[0].id).toBe('kh-2');
  });

  it('filters stations by connector type', () => {
    const dcStations = sampleStations.filter(
      (s) => s.connector === 'GB/T',
    );
    expect(dcStations.length).toBe(1);
    expect(dcStations[0].connector).toBe('GB/T');
  });

  it('filters stations by speed category', () => {
    const fastOnly = sampleStations.filter((s) => s.speedCategory === 'dc_fast');
    expect(fastOnly.length).toBe(1);
    expect(fastOnly[0].id).toBe('kh-1');

    const acOnly = sampleStations.filter((s) => s.speedCategory === 'ac_standard');
    expect(acOnly.length).toBe(1);
    expect(acOnly[0].id).toBe('kh-2');
  });

  it('filters stations by 24/7 operating hours', () => {
    const open24h = sampleStations.filter((s) => s.is24Hours);
    expect(open24h.length).toBe(1);
    expect(open24h[0].id).toBe('kh-1');
  });
});
