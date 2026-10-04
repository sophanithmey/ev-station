import { useState } from 'react';
import type { AppPage } from '../../hooks/use-app-navigation';
import HeaderQuickJump from '../header-quick-jump';

type Props = {
  activePage: AppPage;
  onPageChange: (page: AppPage) => void;
  onOpenDonate: () => void;
  onOpenDisclaimer: () => void;
};

interface MobileNavTab {
  id: AppPage;
  icon: string;
  label: string;
  badge?: string;
  desc: string;
}

const TABS: MobileNavTab[] = [
  { id: 'explorer', icon: '⚡', label: 'Explore', badge: '146', desc: 'Live Map & Stations' },
  { id: 'locations', icon: '📍', label: 'Locations', badge: '45 QR', desc: 'EAC Official Directory' },
  { id: 'eac-stats', icon: '📊', label: 'Stats', desc: 'National Analytics' },
];

export default function MobileFriendlyHeader({
  activePage,
  onPageChange,
  onOpenDonate,
  onOpenDisclaimer,
}: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSelectTab = (id: AppPage) => {
    onPageChange(id);
    setIsMenuOpen(false);
  };

  return (
    <header className='md:hidden flex flex-col bg-white/95 backdrop-blur-xl border-b border-slate-200/90 sticky top-0 z-30 shadow-xs select-none'>
      {/* 1. Main Header Bar: Brand + Quick Actions + Menu Toggle */}
      <div className='flex items-center justify-between px-3 py-2'>
        <button
          type='button'
          onClick={() => handleSelectTab('explorer')}
          className='flex items-center gap-2 cursor-pointer text-left'
          aria-label='Cambodia EV Explore'
        >
          <div className='relative w-7 h-7 rounded-lg bg-linear-to-br from-emerald-500 via-emerald-600 to-teal-700 rotate-45 flex items-center justify-center shadow-md shrink-0 ml-1'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='w-4 h-4 text-amber-300 -rotate-45 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M13 2L3 14h9l-1 8 10-12h-9l1-8z'
              />
            </svg>
          </div>
          <div className='flex flex-col leading-none ml-1'>
            <span className='font-bold text-sm text-slate-900 font-["Bricolage_Grotesque",sans-serif] flex items-center gap-1.5'>
              Cambodia EV
              <span className='w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse' />
            </span>
            <span className='text-[10px] text-slate-400 font-medium font-["Kantumruy_Pro",sans-serif] mt-0.5'>
              ស្ថានីយសាករថយន្តអគ្គិសនី
            </span>
          </div>
        </button>

        {/* Right Action Icons */}
        <div className='flex items-center gap-1.5'>
          {/* Quick Search */}
          <HeaderQuickJump onPageChange={handleSelectTab} />

          {/* Coffee Support */}
          <button
            type='button'
            onClick={onOpenDonate}
            className='w-8 h-8 rounded-xl bg-amber-50 hover:bg-amber-100 text-slate-800 border border-amber-200/80 flex items-center justify-center text-xs active:scale-95 transition-all cursor-pointer'
            title='Buy Me a Coffee'
            aria-label='Support developer'
          >
            ☕
          </button>

          {/* Menu Drawer Toggle */}
          <button
            type='button'
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className='w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-sm font-bold active:scale-95 transition-all cursor-pointer'
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* 2. Horizontal Quick-Pill Navigation Track */}
      <nav
        aria-label='Quick Navigation'
        className='flex items-center gap-1 px-3 pb-2 pt-0.5 overflow-x-auto scrollbar-none'
      >
        {TABS.map((tab) => {
          const isActive = activePage === tab.id;
          return (
            <button
              key={tab.id}
              type='button'
              onClick={() => handleSelectTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all active:scale-95 cursor-pointer ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100/90 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              <span className='text-xs leading-none'>{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded-md font-bold ${
                    isActive ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* 3. Friendly Slide-Down Navigation Drawer (when opened) */}
      {isMenuOpen && (
        <div className='border-t border-slate-100 bg-white/98 backdrop-blur-2xl px-3 py-3 space-y-2 shadow-xl animate-in slide-in-from-top-2 duration-150'>
          <div className='grid grid-cols-2 gap-2'>
            {TABS.map((tab) => {
              const isActive = activePage === tab.id;
              return (
                <button
                  key={tab.id}
                  type='button'
                  onClick={() => handleSelectTab(tab.id)}
                  className={`flex flex-col items-start p-2.5 rounded-2xl border text-left transition-all active:scale-98 cursor-pointer ${
                    isActive
                      ? 'border-emerald-500 bg-emerald-50/50 shadow-xs'
                      : 'border-slate-200/80 bg-slate-50/60 hover:bg-slate-100'
                  }`}
                >
                  <div className='flex items-center justify-between w-full mb-1'>
                    <span className='text-base'>{tab.icon}</span>
                    {tab.badge && (
                      <span className='text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800'>
                        {tab.badge}
                      </span>
                    )}
                  </div>
                  <span className='font-bold text-xs text-slate-900'>{tab.label}</span>
                  <span className='text-[10px] text-slate-500 line-clamp-1 mt-0.5'>{tab.desc}</span>
                </button>
              );
            })}
          </div>

          <div className='pt-2 border-t border-slate-100 flex items-center justify-between text-xs'>
            <button
              type='button'
              onClick={() => {
                onOpenDisclaimer();
                setIsMenuOpen(false);
              }}
              className='text-slate-500 hover:text-slate-800 flex items-center gap-1 font-medium cursor-pointer py-1'
            >
              <span>⚠️</span>
              <span>Data Disclaimer</span>
            </button>

            <button
              type='button'
              onClick={() => {
                onOpenDonate();
                setIsMenuOpen(false);
              }}
              className='text-emerald-700 font-bold hover:text-emerald-800 flex items-center gap-1 cursor-pointer py-1'
            >
              <span>☕</span>
              <span>Support Project</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
