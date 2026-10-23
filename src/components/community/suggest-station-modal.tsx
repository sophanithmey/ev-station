import { useState } from 'react';
import type { ConnectorType } from '../../types/station';
import type { NewStationSubmission } from '../../types/community';
import ConnectorMultiSelect from './connector-multi-select';
import { formatConnectorStandards } from '../../lib/connector-standards';

type Props = {
  onClose: () => void;
  onSubmit: (data: Omit<NewStationSubmission, 'id' | 'timestamp' | 'status'>) => void;
};

export default function SuggestStationModal({ onClose, onSubmit }: Props) {
  const [name, setName] = useState('');
  const [province, setProvince] = useState('Phnom Penh');
  const [lat, setLat] = useState('11.5564');
  const [lng, setLng] = useState('104.9282');
  const [selectedConnectors, setSelectedConnectors] = useState<string[]>([
    'GB-T', 'CCS2',
  ]);
  const [chargersCount, setChargersCount] = useState('2');
  const [operationTime, setOperationTime] = useState('24/7');
  const [accessNotes, setAccessNotes] = useState('');
  const [submitterContact, setSubmitterContact] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);
    if (!name.trim() || isNaN(latitude) || isNaN(longitude)) return;

    const connector = formatConnectorStandards(selectedConnectors) as ConnectorType;

    onSubmit({
      name: name.trim(),
      province,
      latitude,
      longitude,
      connector,
      chargersCount: chargersCount ? parseInt(chargersCount, 10) : undefined,
      operationTime: operationTime.trim() || '24/7',
      accessNotes: accessNotes.trim() || undefined,
      submitterContact: submitterContact.trim() || undefined,
    });
  };

  return (
    <div
      role='dialog'
      aria-modal='true'
      aria-labelledby='suggest-modal-title'
      className='fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200'
    >
      <div className='bg-white border border-slate-200/90 rounded-3xl w-full max-w-lg p-5 space-y-4 text-slate-800 shadow-2xl max-h-[92vh] overflow-y-auto'>
        <div className='flex items-start justify-between border-b border-slate-100 pb-3'>
          <div>
            <h2 id='suggest-modal-title' className='text-base font-bold text-slate-900 flex items-center gap-2'>
              <span>⚡</span>
              <span>Suggest New Charging Location</span>
            </h2>
            <p className='text-xs text-slate-500 mt-0.5'>
              Help expand Cambodia's open EV directory. New submissions remain pending review.
            </p>
          </div>
          <button type='button' onClick={onClose} className='p-1.5 text-slate-400 hover:text-slate-700 cursor-pointer'>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className='space-y-3 text-xs'>
          <div>
            <label htmlFor='sug-name' className='block text-slate-600 mb-1 font-medium'>
              Station / Location Name *
            </label>
            <input
              id='sug-name'
              type='text'
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='e.g., TotalEnergies Chroy Changvar'
              className='w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-hidden focus:border-emerald-500'
            />
          </div>

          <div>
            <label htmlFor='sug-prov' className='block text-slate-600 mb-1 font-medium'>
              Province *
            </label>
            <input
              id='sug-prov'
              type='text'
              required
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className='w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-hidden focus:border-emerald-500'
            />
          </div>

          <ConnectorMultiSelect
            selected={selectedConnectors}
            onChange={setSelectedConnectors}
          />

          <div className='grid grid-cols-2 gap-2.5'>
            <div>
              <label htmlFor='sug-lat' className='block text-slate-600 mb-1 font-medium'>Latitude (GPS)</label>
              <input
                id='sug-lat'
                type='text'
                required
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                className='w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-mono'
              />
            </div>

            <div>
              <label htmlFor='sug-lng' className='block text-slate-600 mb-1 font-medium'>Longitude (GPS)</label>
              <input
                id='sug-lng'
                type='text'
                required
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                className='w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-mono'
              />
            </div>
          </div>

          <div className='grid grid-cols-2 gap-2.5'>
            <div>
              <label htmlFor='sug-stalls' className='block text-slate-600 mb-1 font-medium'>Chargers Count</label>
              <input
                id='sug-stalls'
                type='number'
                min='1'
                value={chargersCount}
                onChange={(e) => setChargersCount(e.target.value)}
                className='w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800'
              />
            </div>

            <div>
              <label htmlFor='sug-hours' className='block text-slate-600 mb-1 font-medium'>Hours</label>
              <input
                id='sug-hours'
                type='text'
                value={operationTime}
                onChange={(e) => setOperationTime(e.target.value)}
                placeholder='24/7'
                className='w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800'
              />
            </div>
          </div>

          <div>
            <label htmlFor='sug-notes' className='block text-slate-600 mb-1 font-medium'>Access Notes & Amenities</label>
            <textarea
              id='sug-notes'
              rows={2}
              value={accessNotes}
              onChange={(e) => setAccessNotes(e.target.value)}
              placeholder='e.g., Behind convenience store, coffee shop on site...'
              className='w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 placeholder-slate-400'
            />
          </div>

          <div>
            <label htmlFor='sug-contact' className='block text-slate-600 mb-1 font-medium'>Contact / Telegram (Optional)</label>
            <input
              id='sug-contact'
              type='text'
              value={submitterContact}
              onChange={(e) => setSubmitterContact(e.target.value)}
              placeholder='@telegram or phone number'
              className='w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-800'
            />
          </div>

          <div className='flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100'>
            <button type='button' onClick={onClose} className='px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-medium cursor-pointer'>
              Cancel
            </button>
            <button type='submit' className='px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold cursor-pointer shadow-xs'>
              Submit Station
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
