type Props = {
  onClick?: () => void;
};

export default function VerticalBrandLogo({ onClick }: Props) {
  return (
    <button
      type='button'
      onClick={onClick}
      className='relative flex items-center justify-center p-2 group cursor-pointer select-none'
      aria-label='Cambodia EV'
      title='Cambodia EV'
    >
      {/* Diamond / Rhombus with Electricity Bolt Icon */}
      <div className='w-8 h-8 rounded-lg bg-linear-to-br from-emerald-500 via-emerald-600 to-teal-700 rotate-45 flex items-center justify-center shadow-md transition-transform duration-200 group-hover:scale-105'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='w-4.5 h-4.5 text-amber-300 -rotate-45 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M13 2L3 14h9l-1 8 10-12h-9l1-8z'
          />
        </svg>
      </div>

      {/* Subtle floating dot accent */}
      <span className='absolute -bottom-1 right-1 w-1.5 h-1.5 rounded-full bg-cyan-400 opacity-80' />
    </button>
  );
}
