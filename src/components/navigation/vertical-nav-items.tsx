import type { AppPage } from '../../hooks/use-app-navigation';

type Props = {
  activePage: AppPage;
  onPageChange: (page: AppPage) => void;
};

interface NavItem {
  id: AppPage;
  label: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'explorer', label: 'Explore', icon: '⚡' },
  { id: 'trip-planner', label: 'Planner', icon: '🧭' },
  { id: 'ev-catalog', label: 'EVs', icon: '🚗' },
  { id: 'compare', label: 'Compare', icon: '⚖️' },
  { id: 'savings-calculator', label: 'Savings', icon: '💰' },
  { id: 'locations', label: 'Locations', icon: '📍' },
  { id: 'eac-stats', label: 'Stats', icon: '📊' },
];

export default function VerticalNavItems({ activePage, onPageChange }: Props) {
  return (
    <div className='flex flex-col items-center justify-center gap-3.5 my-auto select-none py-2'>
      {NAV_ITEMS.map((item) => {
        const isActive = activePage === item.id;
        return (
          <button
            key={item.id}
            type='button'
            onClick={() => onPageChange(item.id)}
            className={`group relative flex flex-col items-center justify-center w-12 h-12 rounded-2xl transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-slate-900 text-white shadow-sm scale-105'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
            title={item.label}
          >
            <span className='text-base leading-none'>{item.icon}</span>
            <span
              className={`text-[9px] font-semibold mt-0.5 leading-none tracking-tight ${
                isActive ? 'text-white font-bold' : 'text-slate-500 group-hover:text-slate-800'
              }`}
            >
              {item.label}
            </span>

            {/* Active Indicator Pin */}
            {isActive && (
              <span className='absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-xs' />
            )}
          </button>
        );
      })}
    </div>
  );
}
