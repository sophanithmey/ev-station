type LegendItem = {
  label: string;
  color: string;
};

const LEGEND_ITEMS: LegendItem[] = [
  { label: 'GB-T', color: 'bg-emerald-600' },
  { label: 'GB-T/CCS2', color: 'bg-teal-600' },
  { label: 'CCS2', color: 'bg-blue-600' },
  { label: 'CCS/SAE', color: 'bg-purple-600' },
  { label: 'Type 2', color: 'bg-amber-600' },
  { label: 'Unknown', color: 'bg-slate-500' },
];

export default function MapLegend() {
  return (
    <div className='absolute bottom-3 left-3 z-400 bg-white/95 backdrop-blur-md px-3 py-1.5 sm:py-2 rounded-xl border border-slate-200/90 shadow-sm hidden sm:flex flex-wrap items-center gap-2.5 sm:gap-3 text-[11px] font-medium text-slate-600 select-none'>
      {LEGEND_ITEMS.map((item) => (
        <div key={item.label} className='flex items-center gap-1.5'>
          <span className={`w-2.5 h-2.5 rounded-full ${item.color} shadow-2xs shrink-0`} />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
