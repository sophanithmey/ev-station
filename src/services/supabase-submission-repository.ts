import { isSupabaseConfigured } from '../lib/supabase-client';
import {
  fetchSubmissions,
  insertSubmission,
  submitNewStation,
  updateRemoteSubmissionStatus,
} from './submission-api';
import { LocalStationSubmissionRepository } from './submission-repository';
import type {
  NewStationSubmission,
  StationReport,
  StationSubmissionRepository,
  SubmissionStatus,
} from '../types/community';

export class SupabaseStationSubmissionRepository
  implements StationSubmissionRepository
{
  private readonly local = new LocalStationSubmissionRepository();

  async getReports(): Promise<StationReport[]> {
    try {
      const { reports } = await fetchSubmissions();
      if (reports.length > 0) return reports;
    } catch {
      // fallback
    }
    return this.local.getReports();
  }

  async submitReport(
    report: Omit<StationReport, 'id' | 'timestamp'>,
  ): Promise<StationReport> {
    const saved = await this.local.submitReport(report);
    await insertSubmission({
      kind: 'report',
      station_slug: report.stationId.startsWith('kh-ev-') ? null : report.stationId,
      payload: { ...report },
    });
    return saved;
  }

  async getSubmissions(): Promise<NewStationSubmission[]> {
    try {
      const { submissions } = await fetchSubmissions();
      if (submissions.length > 0) return submissions;
    } catch {
      // fallback
    }
    return this.local.getSubmissions();
  }

  async submitNewStation(
    sub: Omit<NewStationSubmission, 'id' | 'timestamp' | 'status'>,
  ): Promise<NewStationSubmission> {
    const saved = await this.local.submitNewStation(sub);
    await submitNewStation({
      name: sub.name,
      province: sub.province,
      latitude: sub.latitude,
      longitude: sub.longitude,
      connector: sub.connector,
      chargersCount: sub.chargersCount,
      operationTime: sub.operationTime,
      accessNotes: sub.accessNotes,
      submitterContact: sub.submitterContact,
    });
    return saved;
  }

  async updateSubmissionStatus(
    id: string,
    status: SubmissionStatus,
    passkey?: string | null,
  ): Promise<void> {
    await this.local.updateSubmissionStatus(id, status, passkey);
    try {
      await updateRemoteSubmissionStatus(id, status, passkey);
    } catch {
      // fallback
    }
  }

  exportJson(): Promise<string> {
    return this.local.exportJson();
  }
}

export function createSubmissionRepository(): StationSubmissionRepository {
  return isSupabaseConfigured
    ? new SupabaseStationSubmissionRepository()
    : new LocalStationSubmissionRepository();
}
