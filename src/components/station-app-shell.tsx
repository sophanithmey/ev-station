import type { ReactNode } from 'react';
import type { AppPage } from '../hooks/use-app-navigation';
import VerticalHeader from './navigation/vertical-header';
import AppFooter from './app-footer';

type Props = {
  activePage: AppPage;
  mobileView: 'map' | 'list';
  onPageChange: (page: AppPage) => void;
  onOpenDonate: () => void;
  onOpenDisclaimer: () => void;
  children: ReactNode;
  overlays?: ReactNode;
};

export default function StationAppShell({
  activePage,
  mobileView,
  onPageChange,
  onOpenDonate,
  onOpenDisclaimer,
  children,
  overlays,
}: Props) {
  const isExplorer = activePage === 'explorer';
  const isMobileMap = isExplorer && mobileView === 'map';

  return (
    <div
      className={`w-full min-h-screen ${
        isMobileMap ? 'h-dvh max-h-dvh overflow-hidden' : ''
      } p-2 sm:p-4 md:p-6 lg:p-8 bg-[#b8d4e9]/40 flex flex-col items-stretch justify-center`}
    >
      {/* Framed White Canvas Container Inspired by Reference */}
      <div
        className={`relative w-full ${
          isMobileMap ? 'h-full' : 'min-h-[calc(100dvh-1rem)] md:min-h-0'
        } md:h-[calc(100dvh-2rem)] lg:h-[calc(100dvh-3rem)] rounded-2xl sm:rounded-3xl md:rounded-[28px] overflow-hidden border border-slate-200/90 shadow-2xl bg-white flex flex-col md:flex-row`}
      >
        {/* 1. Left Vertical Header (Rotated Navigation Rail) */}
        <VerticalHeader
          activePage={activePage}
          onPageChange={onPageChange}
          onOpenDonate={onOpenDonate}
          onOpenDisclaimer={onOpenDisclaimer}
        />

        {/* 2. Main Workspace / Page Area */}
        <div className='flex-1 min-w-0 flex flex-col h-full overflow-hidden bg-slate-50/50'>
          <main
            className={`flex-1 min-h-0 w-full p-2.5 sm:p-4 md:p-5 flex flex-col gap-2.5 ${
              isExplorer
                ? 'overflow-hidden'
                : 'overflow-y-auto overscroll-contain scroll-smooth touch-pan-y'
            }`}
          >
            {children}
          </main>

          {/* App Footer at bottom */}
          <AppFooter />
        </div>

        {overlays}
      </div>
    </div>
  );
}
