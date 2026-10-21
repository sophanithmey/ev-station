import type { AppPage } from '../../hooks/use-app-navigation';
// import HeaderQuickJump from '../header-quick-jump';

type Props = {
  onPageChange: (page: AppPage) => void;
  onOpenDonate: () => void;
  onOpenDisclaimer: () => void;
  onOpenSuggest?: () => void;
  onOpenAdmin?: () => void;
};

export default function VerticalNavActions({
  // onPageChange,
  onOpenDonate,
  onOpenDisclaimer,
  onOpenSuggest,
  onOpenAdmin,
}: Props) {
  return (
    <div className='flex flex-col items-center gap-2 pb-2'>
      {/* ⌘K Command Palette Quick Jump */}
      {/* <HeaderQuickJump onPageChange={onPageChange} /> */}

      {/* Suggest New Station */}
      {onOpenSuggest && (
        <button
          type='button'
          onClick={onOpenSuggest}
          className='w-8 h-8 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/80 flex items-center justify-center text-xs shadow-2xs transition-all active:scale-95 cursor-pointer'
          title='Suggest a New Station'
          aria-label='Suggest a New Station'
        >
          ➕
        </button>
      )}

      {/* Submissions Admin Drawer */}
      {onOpenAdmin && (
        <button
          type='button'
          onClick={onOpenAdmin}
          className='w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 flex items-center justify-center text-xs shadow-2xs transition-all active:scale-95 cursor-pointer'
          title='Review Submissions'
          aria-label='Review Submissions'
        >
          📋
        </button>
      )}

      {/* Coffee Support Button */}
      <button
        type='button'
        onClick={onOpenDonate}
        className='w-8 h-8 rounded-full bg-amber-50 hover:bg-amber-100 text-slate-800 border border-amber-200/80 flex items-center justify-center text-xs shadow-2xs transition-all active:scale-95 cursor-pointer'
        title='Buy Me a Coffee (Bakong KHQR)'
        aria-label='Support developer'
      >
        ☕
      </button>

      {/* Disclaimer Modal Trigger */}
      <button
        type='button'
        onClick={onOpenDisclaimer}
        className='w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 flex items-center justify-center text-xs shadow-2xs transition-all active:scale-95 cursor-pointer'
        title='Data Sources & Disclaimer'
        aria-label='Disclaimer'
      >
        ⚠️
      </button>
    </div>
  );
}
