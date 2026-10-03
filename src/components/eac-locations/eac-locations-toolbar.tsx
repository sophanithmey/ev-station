import type { ProvinceOption, EACProvinceDirectory } from '../../data/eac-locations-index';

type Props = {
  directory: EACProvinceDirectory;
  provinces: ProvinceOption[];
  selectedProvinceId: string;
  search: string;
  summary: { stationsCount: number; chargersCount: number };
  onSelectProvince: (id: string) => void;
  onSearchChange: (search: string) => void;
  onOpenOriginalImage?: () => void;
};

export default function EacLocationsToolbar({
  directory,
  provinces,
  selectedProvinceId,
  search,
  summary,
  onSelectProvince,
  onSearchChange,
  onOpenOriginalImage,
}: Props) {
  const verifiedProvinces = provinces.filter((p) => p.isOfficialVerified);
  const otherProvinces = provinces.filter((p) => !p.isOfficialVerified);

  return (
    <div className='bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 shadow-2xs p-2.5 sm:p-3.5 flex flex-col gap-2.5'>
      {/* Top Bar: Province Selection Pills & Stats Badge */}
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-0.5 w-full sm:w-auto'>
          {verifiedProvinces.map((p) => {
            const isActive = p.id === selectedProvinceId;
            return (
              <button
                key={p.id}
                type='button'
                onClick={() => onSelectProvince(p.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <span>📍</span>
                <span>ខេត្ត{p.nameKh}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive
                      ? 'bg-blue-700 text-blue-100'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {p.stations}
                </span>
              </button>
            );
          })}

          {/* Remaining Provinces Dropdown */}
          <div className='relative'>
            <select
              value={
                verifiedProvinces.some((p) => p.id === selectedProvinceId)
                  ? ''
                  : selectedProvinceId
              }
              onChange={(e) => {
                if (e.target.value) onSelectProvince(e.target.value);
              }}
              className='text-xs font-bold py-1.5 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 cursor-pointer outline-none focus:ring-2 focus:ring-blue-500'
              aria-label='Select other provinces'
            >
              <option value=''>ខេត្តផ្សេងទៀត ({otherProvinces.length})...</option>
              {otherProvinces.map((p) => (
                <option key={p.id} value={p.id}>
                  ខេត្ត{p.nameKh} ({p.stations} ស្ថានីយ)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Summary Pill & Poster Trigger */}
        <div className='flex items-center gap-2 shrink-0'>
          <div className='inline-flex items-center gap-2 px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs font-bold'>
            <span>{summary.stationsCount} ស្ថានីយ</span>
            <span className='text-emerald-300'>•</span>
            <span>{summary.chargersCount} ទូសាក</span>
          </div>

          {directory.imageSrc && (
            <button
              type='button'
              onClick={onOpenOriginalImage}
              className='inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-semibold transition-all cursor-pointer'
              title='មើលរូបភាពផ្លូវការ (View Official Image)'
            >
              <span>🖼️</span>
              <span className='hidden sm:inline font-["Kantumruy_Pro",sans-serif]'>រូបភាពផ្លូវការ</span>
            </button>
          )}
        </div>
      </div>

      {/* Bottom Bar: Search Input */}
      <div className='relative w-full'>
        <input
          type='text'
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={`ស្វែងរកស្ថានីយក្នុងខេត្ត${directory.provinceKh} (ឈ្មោះ, ទីតាំង, លេខទូរសព្ទ)...`}
          className='w-full text-xs py-2 pl-8.5 pr-8 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all'
        />
        <span className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none'>
          🔍
        </span>
        {search && (
          <button
            type='button'
            onClick={() => onSearchChange('')}
            className='absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs cursor-pointer p-1'
            aria-label='Clear search'
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
