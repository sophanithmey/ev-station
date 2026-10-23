import { CONNECTOR_STANDARDS } from '../../lib/connector-standards';

type Props = {
  selected: string[];
  onChange: (standards: string[]) => void;
};

export default function ConnectorMultiSelect({ selected, onChange }: Props) {
  const toggleStandard = (id: string) => {
    if (selected.includes(id)) {
      if (selected.length > 1) {
        onChange(selected.filter((item) => item !== id));
      }
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <div className='space-y-2'>
      <div className='flex items-center justify-between'>
        <label className='block text-slate-700 font-semibold text-xs'>
          Connector Standards *
          <span className='text-slate-400 font-normal ml-1.5'>
            (Select multiple if dual-gun)
          </span>
        </label>
        <div className='flex items-center gap-1.5'>
          <button
            type='button'
            onClick={() => onChange(['GB/T', 'CCS2'])}
            className='text-[10px] font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100/80 px-2 py-0.5 rounded-md border border-emerald-200/60 transition-colors cursor-pointer'
          >
            + Dual GB/CCS
          </button>
          <button
            type='button'
            onClick={() => onChange(['GB/T', 'CCS2', 'Type 2'])}
            className='text-[10px] font-medium text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-1.5 py-0.5 rounded-md transition-colors cursor-pointer'
          >
            All 3
          </button>
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-3 gap-2'>
        {CONNECTOR_STANDARDS.map((opt) => {
          const isSelected = selected.includes(opt.id);
          return (
            <button
              key={opt.id}
              type='button'
              onClick={() => toggleStandard(opt.id)}
              aria-pressed={isSelected}
              className={`p-2.5 rounded-xl border text-left transition-all duration-150 cursor-pointer flex flex-col justify-between gap-1.5 ${
                isSelected
                  ? 'border-emerald-500 bg-emerald-50/60 shadow-2xs ring-1 ring-emerald-500/30'
                  : 'border-slate-200 bg-slate-50 hover:bg-slate-100/80 text-slate-700'
              }`}
            >
              <div className='flex items-center justify-between gap-1'>
                <span className='font-bold text-xs text-slate-900'>
                  {opt.name}
                </span>
                <span
                  className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-md border ${opt.tagClass}`}
                >
                  {opt.tag}
                </span>
              </div>
              <p className='text-[10px] text-slate-500 leading-tight'>
                {opt.subtitle}
              </p>
              <div className='flex items-center gap-1 pt-1 border-t border-slate-200/50 text-[10px]'>
                <span
                  className={`w-3.5 h-3.5 rounded-md flex items-center justify-center text-[9px] font-bold ${
                    isSelected
                      ? 'bg-emerald-600 text-white'
                      : 'border border-slate-300 bg-white text-transparent'
                  }`}
                >
                  ✓
                </span>
                <span className={isSelected ? 'text-emerald-700 font-semibold' : 'text-slate-400'}>
                  {isSelected ? 'Selected' : 'Click to add'}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
