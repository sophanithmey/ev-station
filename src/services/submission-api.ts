import { supabase } from '../lib/supabase-client';
import type { ConnectorType } from '../types/station';
import type {
  NewStationSubmission,
  StationIssueType,
  StationReport,
  SubmissionStatus,
} from '../types/community';
import type { StationSubmissionInsert } from '../types/database';

function requireClient() {
  if (!supabase) throw new Error('Supabase is not configured');
  return supabase;
}

export interface SubmitStationParams {
  name: string;
  province: string;
  latitude: number;
  longitude: number;
  connector: string;
  chargersCount?: number;
  operationTime?: string;
  accessNotes?: string;
  submitterContact?: string;
}

export async function insertSubmission(
  submission: StationSubmissionInsert,
): Promise<void> {
  const { error } = await requireClient()
    .from('station_submissions')
    .insert(submission);

  if (error) throw new Error(error.message);
}

export async function submitNewStation(
  params: SubmitStationParams,
): Promise<{ slug?: string }> {
  const client = requireClient();
  const { data, error } = await client.rpc('submit_new_station', {
    name: params.name,
    province: params.province,
    latitude: params.latitude,
    longitude: params.longitude,
    connector: params.connector,
    chargers_count: params.chargersCount ?? 1,
    operation_time: params.operationTime ?? '24/7',
    access_notes: params.accessNotes ?? null,
    contact: params.submitterContact ?? null,
  });

  if (!error) return (data as { slug: string }) ?? {};

  await insertSubmission({
    kind: 'new_station',
    station_slug: null,
    payload: { ...params },
  });
  return {};
}

interface RawSubmissionRow {
  id: string;
  kind: 'report' | 'new_station';
  station_slug: string | null;
  payload: Record<string, unknown>;
  status: SubmissionStatus;
  created_at: string;
}

export async function fetchSubmissions(): Promise<{
  reports: StationReport[];
  submissions: NewStationSubmission[];
}> {
  if (!supabase) return { reports: [], submissions: [] };
  const { data, error } = await supabase
    .from('station_submissions')
    .select('id, kind, station_slug, payload, status, created_at')
    .order('created_at', { ascending: false });

  if (error || !data) return { reports: [], submissions: [] };

  const rawRows = data as unknown as RawSubmissionRow[];
  const reports: StationReport[] = [];
  const submissions: NewStationSubmission[] = [];

  for (const row of rawRows) {
    const p = row.payload || {};
    if (row.kind === 'report') {
      reports.push({
        id: row.id,
        stationId: (p.stationId as string) || row.station_slug || '',
        stationName: (p.stationName as string) || 'Station',
        issueType: (p.issueType as StationIssueType) || 'other',
        description: (p.description as string) || '',
        contactInfo: (p.contactInfo as string) || undefined,
        timestamp: row.created_at,
      });
    } else {
      submissions.push({
        id: row.id,
        stationSlug: row.station_slug || undefined,
        name: (p.name as string) || 'New Station',
        province: (p.province as string) || 'Unknown',
        latitude: Number(p.latitude) || 0,
        longitude: Number(p.longitude) || 0,
        connector:
          p.connector === 'GB-T'
            ? 'GB/T'
            : (p.connector as ConnectorType) || 'GB/T',
        chargersCount: p.chargersCount ? Number(p.chargersCount) : undefined,
        operationTime: (p.operationTime as string) || '24/7',
        accessNotes: (p.accessNotes as string) || undefined,
        submitterContact: (p.submitterContact as string) || undefined,
        timestamp: row.created_at,
        status: row.status || 'pending',
      });
    }
  }

  return { reports, submissions };
}

export async function updateRemoteSubmissionStatus(
  id: string,
  status: SubmissionStatus,
  passkey?: string | null,
): Promise<void> {
  if (!supabase) return;

  const { error: rpcErr } = await supabase.rpc('moderate_submission', {
    submission_id: id,
    new_status: status,
    passkey: passkey || null,
  });

  if (!rpcErr) return;

  const { data, error } = await supabase
    .from('station_submissions')
    .update({ status })
    .eq('id', id)
    .select('station_slug, payload')
    .maybeSingle();

  if (error) throw new Error(error.message);

  const slug = data?.station_slug;
  const name = (data?.payload as { name?: string } | null)?.name;
  const isActive = status === 'approved';

  if (slug) {
    await supabase.from('stations').update({ is_active: isActive }).eq('slug', slug);
  } else if (name) {
    await supabase.from('stations').update({ is_active: isActive }).eq('name', name);
  }
}
