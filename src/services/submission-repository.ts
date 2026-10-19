import type {
  NewStationSubmission,
  StationReport,
  StationSubmissionRepository,
  SubmissionStatus,
} from '../types/community';

const REPORTS_KEY = 'evkh_station_reports';
const SUBMISSIONS_KEY = 'evkh_station_submissions';

export class LocalStationSubmissionRepository
  implements StationSubmissionRepository
{
  async getReports(): Promise<StationReport[]> {
    try {
      const raw = localStorage.getItem(REPORTS_KEY);
      return raw ? (JSON.parse(raw) as StationReport[]) : [];
    } catch {
      return [];
    }
  }

  async submitReport(
    report: Omit<StationReport, 'id' | 'timestamp'>,
  ): Promise<StationReport> {
    const existing = await this.getReports();
    const newReport: StationReport = {
      ...report,
      id: `rep-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      timestamp: new Date().toISOString(),
    };
    const updated = [newReport, ...existing];
    try {
      localStorage.setItem(REPORTS_KEY, JSON.stringify(updated));
    } catch {
      // ignore storage full
    }
    return newReport;
  }

  async getSubmissions(): Promise<NewStationSubmission[]> {
    try {
      const raw = localStorage.getItem(SUBMISSIONS_KEY);
      return raw ? (JSON.parse(raw) as NewStationSubmission[]) : [];
    } catch {
      return [];
    }
  }

  async submitNewStation(
    sub: Omit<NewStationSubmission, 'id' | 'timestamp' | 'status'>,
  ): Promise<NewStationSubmission> {
    const existing = await this.getSubmissions();
    const newSub: NewStationSubmission = {
      ...sub,
      id: `sub-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      timestamp: new Date().toISOString(),
      status: 'pending',
    };
    const updated = [newSub, ...existing];
    try {
      localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(updated));
    } catch {
      // ignore storage full
    }
    return newSub;
  }

  async updateSubmissionStatus(
    id: string,
    status: SubmissionStatus,
  ): Promise<void> {
    const existing = await this.getSubmissions();
    const updated = existing.map((s) => (s.id === id ? { ...s, status } : s));
    try {
      localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  }

  async exportJson(): Promise<string> {
    const reports = await this.getReports();
    const submissions = await this.getSubmissions();
    return JSON.stringify({ reports, submissions }, null, 2);
  }
}

export const submissionRepository: StationSubmissionRepository =
  new LocalStationSubmissionRepository();
