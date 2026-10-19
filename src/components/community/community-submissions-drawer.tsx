import type { NewStationSubmission, StationReport } from '../../types/community';

type Props = {
  isOpen: boolean;
  reports: StationReport[];
  submissions: NewStationSubmission[];
  onClose: () => void;
  onUpdateStatus: (id: string, status: 'approved' | 'rejected') => void;
  onExportJson: () => void;
};

export default function CommunitySubmissionsDrawer({
  isOpen,
  reports,
  submissions,
  onClose,
  onUpdateStatus,
  onExportJson,
}: Props) {
  if (!isOpen) return null;

  return (
    <div
      role='dialog'
      aria-modal='true'
      aria-labelledby='admin-drawer-title'
      className='fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200'
    >
      <div className='w-full max-w-md bg-white border-l border-slate-200/90 h-full flex flex-col text-slate-800 shadow-2xl'>
        {/* Header */}
        <div className='flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50/80'>
          <div>
            <h2 id='admin-drawer-title' className='font-bold text-slate-900 text-sm'>
              Community Contributions Review
            </h2>
            <p className='text-[11px] text-slate-500'>
              {reports.length} report(s) • {submissions.length} station suggestion(s)
            </p>
          </div>
          <button
            type='button'
            onClick={onClose}
            className='p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer'
          >
            ✕
          </button>
        </div>

        {/* Content Tabs / List */}
        <div className='flex-1 min-h-0 overflow-y-auto p-4 space-y-4 text-xs'>
          {/* Reports Section */}
          <div className='space-y-2'>
            <h3 className='font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center justify-between'>
              <span>User Problem Reports ({reports.length})</span>
            </h3>
            {reports.length === 0 ? (
              <p className='text-slate-500 text-[11px] italic bg-slate-50 p-3 rounded-xl border border-slate-200'>
                No problem reports logged yet.
              </p>
            ) : (
              <div className='space-y-2'>
                {reports.map((r) => (
                  <div key={r.id} className='bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1'>
                    <div className='flex justify-between items-start'>
                      <span className='font-bold text-slate-900'>{r.stationName}</span>
                      <span className='text-[10px] bg-rose-50 text-rose-700 px-1.5 py-0.5 rounded border border-rose-200 font-semibold'>
                        {r.issueType.replace('_', ' ')}
                      </span>
                    </div>
                    <p className='text-slate-700 text-[11px] leading-relaxed'>{r.description}</p>
                    {r.contactInfo && (
                      <p className='text-slate-500 text-[10px]'>Contact: {r.contactInfo}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submissions Section */}
          <div className='space-y-2 pt-2 border-t border-slate-100'>
            <h3 className='font-bold text-slate-800 uppercase tracking-wider text-[11px]'>
              Suggested Stations ({submissions.length})
            </h3>
            {submissions.length === 0 ? (
              <p className='text-slate-500 text-[11px] italic bg-slate-50 p-3 rounded-xl border border-slate-200'>
                No new stations suggested yet.
              </p>
            ) : (
              <div className='space-y-2'>
                {submissions.map((s) => (
                  <div key={s.id} className='bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5'>
                    <div className='flex justify-between items-start'>
                      <div>
                        <span className='font-bold text-slate-900 block'>{s.name}</span>
                        <span className='text-[10px] text-slate-500'>{s.province} • {s.connector}</span>
                      </div>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                          s.status === 'approved'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : s.status === 'rejected'
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {s.status}
                      </span>
                    </div>
                    <div className='font-mono text-[10px] text-slate-500'>
                      GPS: {s.latitude.toFixed(5)}, {s.longitude.toFixed(5)}
                    </div>
                    {s.accessNotes && (
                      <p className='text-slate-700 text-[11px]'>{s.accessNotes}</p>
                    )}
                    {s.status === 'pending' && (
                      <div className='flex gap-2 pt-1'>
                        <button
                          type='button'
                          onClick={() => onUpdateStatus(s.id, 'approved')}
                          className='px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] cursor-pointer'
                        >
                          Approve
                        </button>
                        <button
                          type='button'
                          onClick={() => onUpdateStatus(s.id, 'rejected')}
                          className='px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-rose-600 border border-slate-200 text-[10px] cursor-pointer'
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className='p-4 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between'>
          <button
            type='button'
            onClick={onExportJson}
            className='py-2 px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer'
          >
            <span>📥</span>
            <span>Export Submissions JSON</span>
          </button>
          <button
            type='button'
            onClick={onClose}
            className='py-2 px-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-medium cursor-pointer'
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
