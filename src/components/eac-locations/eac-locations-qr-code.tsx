import { useQrCode } from '../../hooks/use-qr-code';

type Props = {
  lat: number;
  lng: number;
  size?: number;
  className?: string;
  onClick?: () => void;
};

export default function EacLocationsQrCode({
  lat,
  lng,
  size = 48,
  className = '',
  onClick,
}: Props) {
  // Direct Google Maps location search URL that QR scanners automatically open in maps
  const mapUrl = `https://maps.google.com/?q=${lat},${lng}`;
  const { svgString, isLoading } = useQrCode(mapUrl, { width: size });

  if (isLoading || !svgString) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`bg-slate-100 rounded animate-pulse flex items-center justify-center ${className}`}
      >
        <span className='text-[8px] text-slate-400'>QR...</span>
      </div>
    );
  }

  return (
    <button
      type='button'
      onClick={onClick}
      className={`relative group inline-flex items-center justify-center p-0.5 bg-white rounded-md border border-slate-200 shadow-2xs hover:shadow-xs hover:border-emerald-500 hover:scale-105 transition-all cursor-pointer ${className}`}
      title='ចុចដើម្បីមើល QR ធំ ឬបើកផែនទី (Click to zoom QR or open Google Maps)'
      aria-label={`Open QR code for coordinates ${lat}, ${lng}`}
    >
      <div
        className='w-full h-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:block'
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: svgString }}
      />
    </button>
  );
}
