type Props = {
  error: string | null;
  onClear: () => void;
};

export default function LocationErrorAlert({ error, onClear }: Props) {
  if (!error) return null;

  return (
    <div className='bg-amber-50 border border-amber-200 text-amber-800 px-4 py-2 rounded-xl text-xs flex items-center justify-between shrink-0'>
      <span className='flex items-center gap-2'>
        <span>⚠️</span>
        <span>{error}</span>
      </span>
      <button
        type='button'
        onClick={onClear}
        className='text-amber-900 font-bold hover:underline'
        aria-label='Dismiss location error'
      >
        ✕
      </button>
    </div>
  );
}
