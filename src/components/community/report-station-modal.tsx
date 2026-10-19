import { useState } from 'react';
import type { ChargingStation } from '../../types/station';
import type { StationIssueType } from '../../types/community';

type Props = {
  station: ChargingStation;
  onClose: () => void;
  onSubmit: (issueType: StationIssueType, description: string, contact?: string) => void;
};

const ISSUES: { id: StationIssueType; label: string }[] = [
  { id: 'broken_charger', label: 'Broken or Inactive Charger' },
  { id: 'incorrect_location', label: 'Incorrect GPS Location' },
  { id: 'wrong_plug', label: 'Incorrect Connector / Plug Type' },
  { id: 'closed_hours', label: 'Wrong Operating Hours' },
  { id: 'pricing_issue', label: 'Charging Tariff Dispute' },
  { id: 'other', label: 'Other Issue or Access Note' },
];

export default function ReportStationModal({
  station,
  onClose,
  onSubmit,
}: Props) {
  const [issueType, setIssueType] = useState<StationIssueType>('broken_charger');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;
    onSubmit(issueType, description.trim(), contact.trim() || undefined);
  };

  return (
    <div
      role='dialog'
      aria-modal='true'
      aria-labelledby='report-modal-title'
      className='fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200'
    >
      <div className='bg-white border border-slate-200/90 rounded-3xl w-full max-w-lg p-5 space-y-4 text-slate-800 shadow-2xl'>
        <div className='flex items-start justify-between border-b border-slate-100 pb-3'>
          <div>
            <h2 id='report-modal-title' className='text-base font-bold text-slate-900 flex items-center gap-2'>
              <span>⚠️</span>
              <span>Report Station Information</span>
            </h2>
            <p className='text-xs text-slate-500 mt-0.5 truncate'>
              {station.name} ({station.province})
            </p>
          </div>
          <button
            type='button'
            onClick={onClose}
            className='p-1.5 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer'
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className='space-y-3.5 text-xs'>
          <div>
            <label htmlFor='issue-type-select' className='block text-slate-600 mb-1 font-medium'>
              Issue Category
            </label>
            <select
              id='issue-type-select'
              value={issueType}
              onChange={(e) => setIssueType(e.target.value as StationIssueType)}
              className='w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-medium focus:outline-hidden focus:border-emerald-500'
            >
              {ISSUES.map((issue) => (
                <option key={issue.id} value={issue.id}>
                  {issue.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor='issue-desc' className='block text-slate-600 mb-1 font-medium'>
              Description / Verified Observations
            </label>
            <textarea
              id='issue-desc'
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Please specify details (e.g. only 1 of 2 plugs working, gate locked at night, etc.)...'
              className='w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-emerald-500 text-xs'
            />
          </div>

          <div>
            <label htmlFor='reporter-contact' className='block text-slate-600 mb-1 font-medium'>
              Your Contact or Telegram (Optional, for verification)
            </label>
            <input
              id='reporter-contact'
              type='text'
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder='@username or phone number'
              className='w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-emerald-500 text-xs'
            />
          </div>

          <div className='flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100'>
            <button
              type='button'
              onClick={onClose}
              className='px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-medium cursor-pointer'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xs cursor-pointer'
            >
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
