type Props = {
  mobileView: 'map' | 'list';
  filteredCount: number;
  onToggleView: () => void;
};

export default function MobileViewSwitcher({
  mobileView,
  filteredCount,
  onToggleView,
}: Props) {
  return (
    <div className='fixed bottom-5 left-1/2 -translate-x-1/2 z-30 lg:hidden'>
      <button
        type='button'
        onClick={onToggleView}
        className='flex items-center gap-2 bg-slate-900/90 hover:bg-slate-900 backdrop-blur-md text-white px-5 py-2.5 rounded-full shadow-xl border border-slate-700 text-xs font-bold transition-all active:scale-95'
      >
        {mobileView === 'map' ? (
          <>
            <span>📋</span>
            <span>View List ({filteredCount})</span>
          </>
        ) : (
          <>
            <span>🗺️</span>
            <span>View Map</span>
          </>
        )}
      </button>
    </div>
  );
}
