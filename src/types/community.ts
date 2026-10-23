import type { ConnectorType } from './station';

export type StationIssueType =
  | 'incorrect_location'
  | 'broken_charger'
  | 'closed_hours'
  | 'wrong_plug'
  | 'pricing_issue'
  | 'other';

export interface StationReport {
  id: string;
  stationId: string;
  stationName: string;
  issueType: StationIssueType;
  description: string;
  contactInfo?: string;
  timestamp: string;
}

export type SubmissionStatus = 'pending' | 'approved' | 'rejected';

export interface NewStationSubmission {
  id: string;
  stationSlug?: string;
  name: string;
  province: string;
  latitude: number;
  longitude: number;
  connector: ConnectorType;
  chargersCount?: number;
  operationTime?: string;
  photoUrl?: string;
  accessNotes?: string;
  submitterContact?: string;
  timestamp: string;
  status: SubmissionStatus;
}

export interface StationSubmissionRepository {
  getReports(): Promise<StationReport[]>;
  submitReport(
    report: Omit<StationReport, 'id' | 'timestamp'>,
  ): Promise<StationReport>;
  getSubmissions(): Promise<NewStationSubmission[]>;
  submitNewStation(
    sub: Omit<NewStationSubmission, 'id' | 'timestamp' | 'status'>,
  ): Promise<NewStationSubmission>;
  updateSubmissionStatus(
    id: string,
    status: SubmissionStatus,
    passkey?: string | null,
  ): Promise<void>;
  exportJson(): Promise<string>;
}
