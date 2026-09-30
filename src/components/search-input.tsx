type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchInput({ value, onChange }: Props) {
  return (
    <div className='relative'>
      <span className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='w-4 h-4'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
          />
        </svg>
      </span>

      <input
        id='search-input'
        type='search'
        placeholder='Search stations...'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='w-full pl-9 pr-9 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-400 transition placeholder-slate-400'
      />

      {value && (
        <button
          type='button'
          onClick={() => onChange('')}
          className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition'
          aria-label='Clear search'
        >
          <svg className='w-3.5 h-3.5' fill='currentColor' viewBox='0 0 20 20'>
            <path
              fillRule='evenodd'
              d='M10 8.586l3.293-3.293a1 1 0 011.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 011.414-1.414L10 8.586z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      )}
    </div>
  );
}
