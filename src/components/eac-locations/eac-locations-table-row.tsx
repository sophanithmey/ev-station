import type { EACStationLocation } from '../../data/eac-location-types';
import EacLocationsQrCode from './eac-locations-qr-code';

type Props = {
  station: EACStationLocation;
  onOpenQr: (station: EACStationLocation) => void;
};

export default function EacLocationsTableRow({ station, onOpenQr }: Props) {
  return (
    <tr className='border-b border-slate-200 hover:bg-blue-50/60 transition-colors text-[11px] sm:text-xs leading-normal'>
      {/* 1. ល.រ (No) */}
      <td className='py-2 px-1 sm:px-2 text-center font-bold text-slate-800 border-r border-slate-200/80 w-8 sm:w-10'>
        {station.no}
      </td>

      {/* 2. ឈ្មោះស្ថានីយ (Name) */}
      <td className='py-2 px-2 sm:px-2.5 font-bold text-slate-900 border-r border-slate-200/80 min-w-[110px] sm:min-w-[130px]'>
        <div className='flex flex-col'>
          <span className='font-["Kantumruy_Pro",sans-serif]'>{station.nameKh}</span>
          {station.nameEn && (
            <span className='text-[10px] text-slate-400 font-normal hidden lg:block'>
              {station.nameEn}
            </span>
          )}
        </div>
      </td>

      {/* 3. ចំនួនទូសាក (Charger Count) */}
      <td className='py-2 px-1 sm:px-2 text-center font-extrabold text-blue-900 border-r border-slate-200/80 w-12 sm:w-14'>
        <span className='inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-blue-100 text-blue-800 text-[11px]'>
          {station.chargersCount}
        </span>
      </td>

      {/* 4. ទីតាំង (Address / Location) */}
      <td className='py-2 px-2 sm:px-2.5 text-slate-700 border-r border-slate-200/80 leading-relaxed min-w-[160px]'>
        <span className='font-["Kantumruy_Pro",sans-serif]'>{station.addressKh}</span>
      </td>

      {/* 5. Location (QR Code) */}
      <td className='py-1.5 px-1 sm:px-2 text-center border-r border-slate-200/80 w-14 sm:w-16'>
        <div className='flex justify-center items-center'>
          <EacLocationsQrCode
            lat={station.latitude}
            lng={station.longitude}
            size={40}
            onClick={() => onOpenQr(station)}
          />
        </div>
      </td>

      {/* 6. លេខទូរសព្ទ (Phone Number) */}
      <td className='py-2 px-2 text-center font-mono font-bold text-slate-800 whitespace-nowrap min-w-[100px] sm:min-w-[115px]'>
        <a
          href={`tel:${station.phone.replace(/\s+/g, '')}`}
          className='inline-flex items-center gap-1 text-blue-700 hover:text-blue-900 hover:underline'
          title={`Call ${station.phone}`}
        >
          <span>{station.phone}</span>
        </a>
      </td>
    </tr>
  );
}
