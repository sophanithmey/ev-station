import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { ChargingStation } from '../types/station';
import type {
  NewStationSubmission,
  StationIssueType,
  StationReport,
  SubmissionStatus,
} from '../types/community';
import { createSubmissionRepository } from '../services/supabase-submission-repository';
import { queryKeys } from '../lib/query-client';
import { useAdminAuth } from './use-admin-auth';

const submissionRepository = createSubmissionRepository();

export function useCommunitySubmissions() {
  const queryClient = useQueryClient();
  const adminAuth = useAdminAuth();
  const [reportingStation, setReportingStation] =
    useState<ChargingStation | null>(null);
  const [isSuggestOpen, setIsSuggestOpen] = useState(false);
  const [isAdminDrawerOpen, setIsAdminDrawerOpen] = useState(false);

  const { data: reports = [] } = useQuery<StationReport[]>({
    queryKey: queryKeys.community.reports(),
    queryFn: () => submissionRepository.getReports(),
  });

  const { data: submissions = [] } = useQuery<NewStationSubmission[]>({
    queryKey: queryKeys.community.submissions(),
    queryFn: () => submissionRepository.getSubmissions(),
  });

  const reportMutation = useMutation({
    mutationFn: (report: Omit<StationReport, 'id' | 'timestamp'>) =>
      submissionRepository.submitReport(report),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.community.reports(),
      });
    },
  });

  const newStationMutation = useMutation({
    mutationFn: (
      sub: Omit<NewStationSubmission, 'id' | 'timestamp' | 'status'>,
    ) => submissionRepository.submitNewStation(sub),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.community.submissions(),
      });
      void queryClient.invalidateQueries({
        queryKey: queryKeys.stations.all,
      });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({
      id,
      status,
      passkey,
    }: {
      id: string;
      status: SubmissionStatus;
      passkey?: string | null;
    }) => submissionRepository.updateSubmissionStatus(id, status, passkey),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.community.submissions(),
      });
      void queryClient.invalidateQueries({
        queryKey: queryKeys.stations.all,
      });
    },
  });

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
      await reportMutation.mutateAsync({
        stationId: reportingStation.id,
        stationName: reportingStation.name,
        issueType,
        description,
        contactInfo,
      });
      setReportingStation(null);
    },
    [reportingStation, reportMutation],
  );

  const handleSubmitNewStation = useCallback(
    async (data: Omit<NewStationSubmission, 'id' | 'timestamp' | 'status'>) => {
      await newStationMutation.mutateAsync(data);
      setIsSuggestOpen(false);
    },
    [newStationMutation],
  );

  const handleUpdateStatus = useCallback(
    async (id: string, status: SubmissionStatus) => {
      if (!adminAuth.isAdmin) {
        throw new Error('Unauthorized: Admin passkey required');
      }
      await updateStatusMutation.mutateAsync({
        id,
        status,
        passkey: adminAuth.adminPasskey,
      });
    },
    [adminAuth.isAdmin, adminAuth.adminPasskey, updateStatusMutation],
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
    adminAuth,
    isSubmitting:
      reportMutation.isPending ||
      newStationMutation.isPending ||
      updateStatusMutation.isPending,
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
