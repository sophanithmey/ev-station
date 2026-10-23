import { useState, type FormEvent } from 'react';
import type { useAdminAuth } from '../../hooks/use-admin-auth';

type Props = {
  adminAuth: ReturnType<typeof useAdminAuth>;
};

export default function AdminAuthBar({ adminAuth }: Props) {
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [pin, setPin] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleUnlock = (e: FormEvent) => {
    e.preventDefault();
    const res = adminAuth.unlock(pin);
    if (res.success) {
      setPin('');
      setErrorMsg(null);
      setIsPromptOpen(false);
    } else {
      setErrorMsg(res.error || 'Invalid PIN');
    }
  };

  if (adminAuth.isAdmin) {
    return (
      <div className='flex items-center justify-between px-3 py-2 bg-emerald-50 border border-emerald-200/80 rounded-xl text-emerald-900'>
        <div className='flex items-center gap-1.5'>
          <span className='w-2 h-2 rounded-full bg-emerald-500 animate-pulse' />
          <span className='font-bold text-[11px]'>Admin Mode Active</span>
          <span className='text-[10px] text-emerald-700'>(Actions Enabled)</span>
        </div>
        <button
          type='button'
          onClick={adminAuth.lock}
          className='px-2 py-0.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-[10px] font-semibold cursor-pointer transition-colors'
        >
          Lock / Exit Admin
        </button>
      </div>
    );
  }

  return (
    <div className='space-y-1.5'>
      <div className='flex items-center justify-between px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-slate-700'>
        <div className='flex items-center gap-1.5'>
          <span className='w-2 h-2 rounded-full bg-slate-400' />
          <span className='font-medium text-[11px]'>Visitor Mode (Read-only)</span>
        </div>
        <button
          type='button'
          onClick={() => {
            setIsPromptOpen((prev) => !prev);
            setErrorMsg(null);
          }}
          className='px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-[10px] font-semibold cursor-pointer transition-colors flex items-center gap-1'
        >
          <span>🔑</span>
          <span>Admin Unlock</span>
        </button>
      </div>

      {isPromptOpen && (
        <form
          onSubmit={handleUnlock}
          className='p-2.5 bg-amber-50/70 border border-amber-200/90 rounded-xl space-y-2 animate-in fade-in duration-150'
        >
          <div className='flex items-center justify-between'>
            <label
              htmlFor='admin-pin-input'
              className='text-[10px] font-bold text-amber-900 uppercase tracking-wider'
            >
              Enter Admin Passkey
            </label>
            <button
              type='button'
              onClick={() => setIsPromptOpen(false)}
              className='text-[10px] text-slate-500 hover:text-slate-800 cursor-pointer'
            >
              Cancel
            </button>
          </div>
          <div className='flex gap-1.5'>
            <input
              id='admin-pin-input'
              type='password'
              autoFocus
              placeholder='Enter PIN...'
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                if (errorMsg) setErrorMsg(null);
              }}
              className='flex-1 bg-white border border-amber-300 rounded-lg px-2.5 py-1 text-slate-800 text-xs focus:outline-hidden focus:border-amber-500'
            />
            <button
              type='submit'
              className='px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-xs cursor-pointer transition-colors shadow-2xs'
            >
              Unlock
            </button>
          </div>
          {errorMsg && (
            <p className='text-[10px] text-rose-600 font-medium'>{errorMsg}</p>
          )}
        </form>
      )}
    </div>
  );
}
