export default function MapLegend() {
  return (
    <div className='absolute bottom-3 left-3 z-400 bg-white/90 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-200 shadow-sm hidden sm:flex items-center gap-3 text-[11px] text-slate-600'>
      <div className='flex items-center gap-1.5'>
        <span className='w-2.5 h-2.5 rounded-full bg-emerald-600'></span>
        <span>GB-T</span>
      </div>
      <div className='flex items-center gap-1.5'>
        <span className='w-2.5 h-2.5 rounded-full bg-teal-600'></span>
        <span>GB-T/CCS2</span>
      </div>
      <div className='flex items-center gap-1.5'>
        <span className='w-2.5 h-2.5 rounded-full bg-blue-600'></span>
        <span>CCS2</span>
      </div>
      <div className='flex items-center gap-1.5'>
        <span className='w-2.5 h-2.5 rounded-full bg-purple-600'></span>
        <span>CCS/SAE</span>
      </div>
    </div>
  );
}
