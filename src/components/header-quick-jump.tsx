import { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { EAC_PROVINCE_STATS } from '../data/eac-province-stats';
import type { AppPage } from './header-nav';

type Props = {
  onPageChange: (page: AppPage) => void;
};

export default function HeaderQuickJump({ onPageChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  // Global keyboard shortcut ⌘K / Ctrl+K
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredProvinces = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return EAC_PROVINCE_STATS;
    return EAC_PROVINCE_STATS.filter(
      (p) =>
        p.nameEn.toLowerCase().includes(q) ||
        p.nameKh.includes(q) ||
        p.region.toLowerCase().includes(q),
    );
  }, [search]);

  const handleSelectProvince = (provId: string) => {
    if (provId === 'pursat' || provId === 'siem-reap') {
      onPageChange('locations');
    } else {
      onPageChange('eac-stats');
    }
    setIsOpen(false);
    setSearch('');
  };

  return (
    <>
      {/* Cockpit ⌘K Trigger Button */}
      <button
        type='button'
        onClick={() => setIsOpen(true)}
        className='inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs text-slate-700 font-semibold border border-slate-200 shadow-2xs transition-all duration-200 active:scale-95 cursor-pointer shrink-0 group'
        title='Quick Jump to Province (⌘K)'
      >
        <span className='text-xs text-emerald-600 group-hover:animate-pulse'>
          ⚡
        </span>
        <span className='hidden lg:inline font-["Kantumruy_Pro",sans-serif] text-slate-600 group-hover:text-slate-900'>
          ស្វែងរក
        </span>
        <kbd className='inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-bold bg-white text-slate-600 rounded-md border border-slate-200 shadow-2xs'>
          ⌘K
        </kbd>
      </button>

      {/* Centered Command Palette Modal via Portal */}
      {isOpen &&
        createPortal(
          <div
            role='dialog'
            aria-modal='true'
            className='fixed inset-0 z-9999 flex items-start sm:items-center justify-center p-3 sm:p-4 pt-16 sm:pt-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150'
            onClick={() => setIsOpen(false)}
          >
            <div
              className='bg-white rounded-2xl max-w-lg w-full max-h-[85vh] shadow-2xl border border-slate-200 p-3 sm:p-4 flex flex-col gap-3 animate-in zoom-in-95 duration-150'
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search Bar */}
              <div className='flex items-center gap-2.5 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-emerald-500 transition-all'>
                <span className='text-emerald-600 text-sm'>⚡</span>
                <input
                  type='text'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder='ស្វែងរកខេត្ត / Type province name...'
                  className='w-full bg-transparent text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none font-["Kantumruy_Pro",sans-serif]'
                  autoFocus
                />
                <kbd className='text-[10px] font-mono font-bold bg-white text-slate-500 px-1.5 py-0.5 rounded-md border border-slate-200'>
                  ESC
                </kbd>
              </div>

              {/* Provinces List */}
              <div className='overflow-y-auto max-h-[55vh] space-y-1 pr-1 scrollbar-thin'>
                <div className='px-2 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between'>
                  <span>
                    {search
                      ? 'លទ្ធផលស្វែងរក'
                      : 'ខេត្ត-រាជធានីទាំងអស់ (25 Provinces)'}
                  </span>
                  <span className='text-emerald-700 font-semibold'>
                    {filteredProvinces.length} ខេត្ត
                  </span>
                </div>

                {filteredProvinces.map((prov) => (
                  <button
                    key={prov.id}
                    type='button'
                    onClick={() => handleSelectProvince(prov.id)}
                    className='w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-left transition-all cursor-pointer group border border-transparent hover:border-slate-200'
                  >
                    <div>
                      <div className='text-xs sm:text-sm font-bold text-slate-800 font-["Kantumruy_Pro",sans-serif] group-hover:text-emerald-700 flex items-center gap-1.5'>
                        <span className='text-emerald-600'>📍</span>
                        <span>ខេត្ត{prov.nameKh}</span>
                        <span className='text-xs font-normal text-slate-500'>
                          ({prov.nameEn})
                        </span>
                      </div>
                      <div className='text-[11px] text-slate-500 pl-5'>
                        {prov.region} Region · {prov.chargers} ទូសាក
                      </div>
                    </div>
                    <div className='text-right'>
                      <span className='text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg'>
                        {prov.stations} ស្ថានីយ
                      </span>
                    </div>
                  </button>
                ))}

                {filteredProvinces.length === 0 && (
                  <div className='py-8 text-center text-xs text-slate-400 font-["Kantumruy_Pro",sans-serif]'>
                    រកមិនឃើញខេត្តនេះទេ
                  </div>
                )}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
