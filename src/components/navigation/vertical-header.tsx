import type { AppPage } from '../../hooks/use-app-navigation';
import VerticalBrandLogo from './vertical-brand-logo';
import VerticalNavItems from './vertical-nav-items';
import VerticalNavActions from './vertical-nav-actions';
import MobileFriendlyHeader from './mobile-friendly-header';

type Props = {
  activePage: AppPage;
  onPageChange: (page: AppPage) => void;
  onOpenDonate: () => void;
  onOpenDisclaimer: () => void;
};

export default function VerticalHeader({
  activePage,
  onPageChange,
  onOpenDonate,
  onOpenDisclaimer,
}: Props) {
  return (
    <>
      {/* 1. Desktop Vertical Left-Rail Navigation (md+) */}
      <aside
        aria-label='Sidebar Navigation'
        className='hidden md:flex flex-col items-center justify-between w-16 sm:w-20 shrink-0 h-full py-5 border-r border-slate-200/80 bg-white/90 backdrop-blur-md z-20 select-none'
      >
        <VerticalBrandLogo onClick={() => onPageChange('explorer')} />
        <VerticalNavItems activePage={activePage} onPageChange={onPageChange} />
        <VerticalNavActions
          onPageChange={onPageChange}
          onOpenDonate={onOpenDonate}
          onOpenDisclaimer={onOpenDisclaimer}
        />
      </aside>

      {/* 2. Touch-Friendly Mobile Header (< md) */}
      <MobileFriendlyHeader
        activePage={activePage}
        onPageChange={onPageChange}
        onOpenDonate={onOpenDonate}
        onOpenDisclaimer={onOpenDisclaimer}
      />
    </>
  );
}
