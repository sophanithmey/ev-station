import type { NewStationSubmission } from '../../types/community';

type Props = {
  submission: NewStationSubmission;
  isAdmin: boolean;
  onUpdateStatus: (id: string, status: 'approved' | 'rejected') => void;
};

export default function SubmissionCard({
  submission: s,
  isAdmin,
  onUpdateStatus,
}: Props) {
  return (
    <div className='bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5'>
      <div className='flex justify-between items-start gap-2'>
        <div>
          <span className='font-bold text-slate-900 block'>{s.name}</span>
          <span className='text-[10px] text-slate-500'>
            {s.province} • {s.connector}
          </span>
        </div>
        <span
          className={`text-[10px] px-1.5 py-0.5 rounded font-bold shrink-0 ${
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
        <p className='text-slate-700 text-[11px] leading-relaxed'>
          {s.accessNotes}
        </p>
      )}

      {/* Only authenticated Admins can see and perform Approve/Reject actions */}
      {isAdmin && s.status === 'pending' && (
        <div className='flex gap-2 pt-1 border-t border-slate-200/60'>
          <button
            type='button'
            onClick={() => onUpdateStatus(s.id, 'approved')}
            className='px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] cursor-pointer transition-colors shadow-2xs'
          >
            ✓ Approve
          </button>
          <button
            type='button'
            onClick={() => onUpdateStatus(s.id, 'rejected')}
            className='px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-rose-600 border border-slate-200 text-[10px] font-semibold cursor-pointer transition-colors'
          >
            ✕ Reject
          </button>
        </div>
      )}
    </div>
  );
}
