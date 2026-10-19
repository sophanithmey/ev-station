import { useState, useCallback, useEffect } from 'react';
import type { ChargingStation } from '../types/station';
import type {
  NewStationSubmission,
  StationIssueType,
  StationReport,
} from '../types/community';
import { submissionRepository } from '../services/submission-repository';

export function useCommunitySubmissions() {
  const [reportingStation, setReportingStation] =
    useState<ChargingStation | null>(null);
  const [isSuggestOpen, setIsSuggestOpen] = useState(false);
  const [isAdminDrawerOpen, setIsAdminDrawerOpen] = useState(false);

  const [reports, setReports] = useState<StationReport[]>([]);
  const [submissions, setSubmissions] = useState<NewStationSubmission[]>([]);

  const loadData = useCallback(async () => {
    const [reps, subs] = await Promise.all([
      submissionRepository.getReports(),
      submissionRepository.getSubmissions(),
    ]);
    setReports(reps);
    setSubmissions(subs);
  }, []);

  useEffect(() => {
    let isMounted = true;
    submissionRepository.getReports().then((reps) => {
      if (isMounted) setReports(reps);
    });
    submissionRepository.getSubmissions().then((subs) => {
      if (isMounted) setSubmissions(subs);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleReportStation = useCallback((station: ChargingStation) => {
    setReportingStation(station);
  }, []);

  const handleCloseReport = useCallback(() => {
    setReportingStation(null);
  }, []);

  const handleSubmitReport = useCallback(
    async (
      issueType: StationIssueType,
      description: string,
      contactInfo?: string,
    ) => {
      if (!reportingStation) return;
      await submissionRepository.submitReport({
        stationId: reportingStation.id,
        stationName: reportingStation.name,
        issueType,
        description,
        contactInfo,
      });
      await loadData();
      setReportingStation(null);
    },
    [reportingStation, loadData],
  );

  const handleSubmitNewStation = useCallback(
    async (data: Omit<NewStationSubmission, 'id' | 'timestamp' | 'status'>) => {
      await submissionRepository.submitNewStation(data);
      await loadData();
      setIsSuggestOpen(false);
    },
    [loadData],
  );

  const handleUpdateStatus = useCallback(
    async (id: string, status: 'approved' | 'rejected') => {
      await submissionRepository.updateSubmissionStatus(id, status);
      await loadData();
    },
    [loadData],
  );

  const handleExportJson = useCallback(async () => {
    const json = await submissionRepository.exportJson();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `evkh-community-submissions-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  return {
    reportingStation,
    isSuggestOpen,
    isAdminDrawerOpen,
    reports,
    submissions,
    openSuggest: () => setIsSuggestOpen(true),
    closeSuggest: () => setIsSuggestOpen(false),
    openAdminDrawer: () => setIsAdminDrawerOpen(true),
    closeAdminDrawer: () => setIsAdminDrawerOpen(false),
    handleReportStation,
    handleCloseReport,
    handleSubmitReport,
    handleSubmitNewStation,
    handleUpdateStatus,
    handleExportJson,
  };
}
