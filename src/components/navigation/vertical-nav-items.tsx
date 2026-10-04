import type { AppPage } from '../../hooks/use-app-navigation';

type Props = {
  activePage: AppPage;
  onPageChange: (page: AppPage) => void;
};

interface NavItem {
  id: AppPage;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'explorer', label: 'Explore' },
  { id: 'locations', label: 'Locations' },
  { id: 'eac-stats', label: 'Statistics' },
];

export default function VerticalNavItems({ activePage, onPageChange }: Props) {
  return (
    <div className='flex flex-col items-center justify-center gap-12 my-auto select-none'>
      {NAV_ITEMS.map((item) => {
        const isActive = activePage === item.id;
        return (
          <div key={item.id} className='relative w-10 h-16 flex items-center justify-center'>
            <button
              type='button'
              onClick={() => onPageChange(item.id)}
              className={`-rotate-90 whitespace-nowrap text-xs sm:text-[13px] tracking-wide transition-all duration-200 cursor-pointer py-1 px-2.5 rounded-full ${
                isActive
                  ? 'font-bold text-slate-950 scale-105'
                  : 'font-medium text-slate-400 hover:text-slate-800'
              }`}
            >
              {item.label}
            </button>

            {/* Active Indicator Accent */}
            {isActive && (
              <span className='absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-xs' />
            )}
          </div>
        );
      })}

      {/* Playful Floating Geometric Accents from Reference Image */}
      <div className='flex flex-col items-center gap-3 mt-2 pointer-events-none opacity-80'>
        <span className='w-2 h-2 rounded-full bg-cyan-400' />
        <span className='w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-b-[6px] border-b-amber-400' />
      </div>
    </div>
  );
}
