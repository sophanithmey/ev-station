import type {
  EACProvinceDirectory,
  EACStationLocation,
} from '../../data/eac-location-types';
import EacLocationsTableRow from './eac-locations-table-row';
import EacLocationsCard from './eac-locations-card';
import EacLocationsSummaryBox from './eac-locations-summary-box';

type Props = {
  directory: EACProvinceDirectory;
  stations: EACStationLocation[];
  summary: { stationsCount: number; chargersCount: number };
  onOpenQr: (station: EACStationLocation) => void;
};

const TABLE_HEADERS = [
  'ល.រ',
  'ឈ្មោះស្ថានីយ',
  'ចំនួនទូសាក',
  'ទីតាំង',
  'Location',
  'លេខទូរសព្ទ',
];

function TableHeaderRow() {
  return (
    <thead className='bg-blue-100/90 text-slate-900 border-b border-blue-200 text-[11px] sm:text-xs font-extrabold select-none sticky top-0 z-10'>
      <tr>
        <th className='py-2 px-1 text-center w-8 sm:w-10 border-r border-blue-200/80'>
          {TABLE_HEADERS[0]}
        </th>
        <th className='py-2 px-2 sm:px-2.5 text-left border-r border-blue-200/80 min-w-[110px]'>
          {TABLE_HEADERS[1]}
        </th>
        <th className='py-2 px-1 text-center w-12 sm:w-14 border-r border-blue-200/80'>
          {TABLE_HEADERS[2]}
        </th>
        <th className='py-2 px-2 text-left border-r border-blue-200/80 min-w-[160px]'>
          {TABLE_HEADERS[3]}
        </th>
        <th className='py-2 px-1 text-center w-14 sm:w-16 border-r border-blue-200/80'>
          {TABLE_HEADERS[4]}
        </th>
        <th className='py-2 px-2 text-center min-w-25'>{TABLE_HEADERS[5]}</th>
      </tr>
    </thead>
  );
}

export default function EacLocationsTable({
  directory,
  stations,
  summary,
  onOpenQr,
}: Props) {
  if (stations.length === 0) {
    return (
      <div className='bg-white rounded-2xl border border-slate-200 p-8 text-center flex flex-col items-center justify-center gap-2'>
        <span className='text-3xl'>🔍</span>
        <h4 className='text-sm font-bold text-slate-800'>
          រកមិនឃើញស្ថានីយដែលត្រូវគ្នាទេ
        </h4>
        <p className='text-xs text-slate-400'>
          សូមសាកល្បងស្វែងរកដោយពាក្យគន្លឹះផ្សេង
        </p>
      </div>
    );
  }

  const midPoint = Math.ceil(stations.length / 2);
  const leftColumnStations = stations.slice(0, midPoint);
  const rightColumnStations = stations.slice(midPoint);

  return (
    <div className='space-y-4'>
      {/* 1. Mobile Cards View (Visible on Phones < md) */}
      <div className='md:hidden flex flex-col gap-2.5'>
        {stations.map((station) => (
          <EacLocationsCard
            key={station.id}
            station={station}
            onOpenQr={onOpenQr}
          />
        ))}
      </div>

      {/* 2. Desktop Two-Column Table View (Visible on Tablets & Desktops >= md) */}
      <div className='hidden md:grid md:grid-cols-1 xl:grid-cols-2 gap-4 items-start'>
        {/* Left Column Table */}
        <div className='bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden'>
          <div className='overflow-x-auto scrollbar-thin'>
            <table className='w-full border-collapse text-left'>
              <TableHeaderRow />
              <tbody className='divide-y divide-slate-100 bg-white'>
                {leftColumnStations.map((station) => (
                  <EacLocationsTableRow
                    key={station.id}
                    station={station}
                    onOpenQr={onOpenQr}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column Table */}
        <div className='bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden'>
          {rightColumnStations.length > 0 ? (
            <div className='overflow-x-auto scrollbar-thin'>
              <table className='w-full border-collapse text-left'>
                <TableHeaderRow />
                <tbody className='divide-y divide-slate-100 bg-white'>
                  {rightColumnStations.map((station) => (
                    <EacLocationsTableRow
                      key={station.id}
                      station={station}
                      onOpenQr={onOpenQr}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className='p-6 text-center text-xs text-slate-400'>
              មិនមានស្ថានីយបន្ថែមក្នុងជួរឈរទីពីរទេ
            </div>
          )}
        </div>
      </div>

      {/* 3. Full-Width Summary Box under Both Tables */}
      <EacLocationsSummaryBox
        directory={directory}
        stationsCount={summary.stationsCount}
        chargersCount={summary.chargersCount}
      />
    </div>
  );
}
