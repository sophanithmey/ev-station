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

  it('filters dual-standard stations when searching by GB-T, CCS2, or dual', () => {
    const dualStation: ChargingStation = {
      ...sampleStations[0]!,
      id: 'kh-dual',
      connector: 'GB-T/CCS2',
    };
    const testList = [dualStation, sampleStations[1]!];

    const matchGbt = testList.filter((s) => s.connector.includes('GB'));
    expect(matchGbt.length).toBe(1);
    expect(matchGbt[0]?.id).toBe('kh-dual');

    const matchCcs = testList.filter((s) => s.connector.includes('CCS'));
    expect(matchCcs.length).toBe(1);
    expect(matchCcs[0]?.id).toBe('kh-dual');
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
    expect(open24h[0]?.id).toBe('kh-1');
  });

  it('excludes stations marked as rejected', () => {
    const mixedStations: ChargingStation[] = [
      ...sampleStations,
      {
        id: 'kh-rejected',
        name: 'Rejected Station',
        province: 'Kandal',
        connector: 'GB/T',
        speedCategory: 'dc_fast',
        operationTime: '24/7',
        is24Hours: true,
        latitude: 11.45,
        longitude: 104.95,
        source: 'User',
        verifiedDate: 'Feb 2025',
        status: 'rejected',
      },
    ];

    const activeStations = mixedStations.filter((s) => s.status !== 'rejected');
    expect(activeStations.length).toBe(2);
    expect(activeStations.some((s) => s.id === 'kh-rejected')).toBe(false);
  });

  it('excludes stations marked as pending until approved by admin', () => {
    const mixedStations: ChargingStation[] = [
      ...sampleStations,
      {
        id: 'kh-pending',
        name: 'Pending Community Station',
        province: 'Siem Reap',
        connector: 'CCS2',
        speedCategory: 'dc_fast',
        operationTime: '24/7',
        is24Hours: true,
        latitude: 13.36,
        longitude: 103.85,
        source: 'Community Submission',
        verifiedDate: 'Oct 2026',
        status: 'pending',
      },
    ];

    const approvedOnly = mixedStations.filter(
      (s) => s.status !== 'rejected' && s.status !== 'pending',
    );
    expect(approvedOnly.length).toBe(2);
    expect(approvedOnly.some((s) => s.id === 'kh-pending')).toBe(false);
  });

  it('includes approved community stations and makes them available for search and filters', () => {
    const approvedStation: ChargingStation = {
      id: 'sub-approved-1',
      name: 'Battambang Fast Charger',
      province: 'Battambang',
      connector: 'CCS2',
      speedCategory: 'dc_fast',
      operationTime: '24/7',
      is24Hours: true,
      latitude: 13.095,
      longitude: 103.202,
      source: 'Community Submission',
      verifiedDate: '2026-10-23',
      status: 'approved',
    };

    const combined = [...sampleStations, approvedStation];
    const visible = combined.filter(
      (s) => s.status !== 'rejected' && s.status !== 'pending',
    );
    expect(visible.length).toBe(3);
    expect(visible.some((s) => s.id === 'sub-approved-1')).toBe(true);

    const btbSearch = visible.filter((s) =>
      s.province.toLowerCase().includes('battambang'),
    );
    expect(btbSearch.length).toBe(1);
    expect(btbSearch[0]?.name).toBe('Battambang Fast Charger');
  });
});


