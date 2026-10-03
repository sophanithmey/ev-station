import {
  PhnomPenhLandmarkSvg,
  CoastalLandmarkSvg,
  BattambangLandmarkSvg,
  PreahVihearLandmarkSvg,
  EcotourismNortheastSvg,
} from './regional-landmark-svgs';

type Props = {
  provinceId: string;
  className?: string;
};

export function AngkorWatLandmarkSvg({ className = '' }: { className?: string }) {
  return (
    <svg viewBox='0 0 800 350' fill='currentColor' className={`pointer-events-none select-none ${className}`} aria-hidden='true'>
      <path d='M0,350 L800,350 L800,310 L760,310 L760,290 L740,290 L740,270 L710,270 L710,250 L680,250 L680,230 L660,230 L660,210 L640,210 L630,190 L620,190 L620,160 L610,160 L610,130 L600,100 L595,70 L590,70 L585,100 L575,130 L575,160 L565,160 L565,190 L555,190 L545,210 L525,210 L525,180 L515,150 L505,110 L498,60 L495,20 L490,20 L487,60 L480,110 L470,150 L460,180 L460,210 L440,210 L430,190 L420,190 L420,160 L410,160 L410,130 L400,100 L395,70 L390,70 L385,100 L375,130 L375,160 L365,160 L365,190 L355,190 L345,210 L325,210 L325,230 L305,230 L305,250 L275,250 L275,270 L245,270 L245,290 L225,290 L225,310 L185,310 L185,350 Z' />
      <path d='M480,180 L505,70 L495,10 L485,70 L510,180 Z' />
      <rect x='100' y='310' width='600' height='40' rx='4' />
      <rect x='180' y='275' width='440' height='35' rx='3' />
      <rect x='260' y='235' width='280' height='40' rx='2' />
      <line x1='50' y1='340' x2='750' y2='340' stroke='currentColor' strokeWidth='3' strokeDasharray='16 8' />
    </svg>
  );
}

export function PursatPhnom1500LandmarkSvg({ className = '' }: { className?: string }) {
  return (
    <svg viewBox='0 0 800 350' fill='currentColor' className={`pointer-events-none select-none ${className}`} aria-hidden='true'>
      <path d='M0,350 L0,220 Q120,130 220,190 T420,90 Q540,40 640,140 T800,160 L800,350 Z' opacity='0.6' />
      <path d='M0,350 L0,260 Q160,180 280,240 T560,170 Q680,120 800,210 L800,350 Z' opacity='0.8' />
      <path d='M50,350 Q160,330 260,310 T460,270 Q560,230 640,190 T750,150' fill='none' stroke='currentColor' strokeWidth='10' strokeDasharray='14 6' opacity='0.9' />
      <path d='M160,290 L180,260 L200,290 Z M175,260 L180,240 L185,260 Z' />
      <path d='M680,270 L700,230 L720,270 Z M695,230 L700,205 L705,230 Z' />
      <path d='M730,285 L745,250 L760,285 Z' />
      <circle cx='340' cy='80' r='38' opacity='0.4' />
    </svg>
  );
}

export default function ProvinceLandmarkSvg({ provinceId, className = '' }: Props) {
  switch (provinceId) {
    case 'siem-reap':
      return <AngkorWatLandmarkSvg className={className} />;
    case 'pursat':
      return <PursatPhnom1500LandmarkSvg className={className} />;
    case 'phnom-penh':
    case 'kandal':
      return <PhnomPenhLandmarkSvg className={className} />;
    case 'preah-sihanouk':
    case 'kampot':
    case 'kep':
    case 'koh-kong':
      return <CoastalLandmarkSvg className={className} />;
    case 'battambang':
    case 'banteay-meanchey':
    case 'pailin':
      return <BattambangLandmarkSvg className={className} />;
    case 'preah-vihear':
    case 'kampong-thom':
      return <PreahVihearLandmarkSvg className={className} />;
    case 'mondulkiri':
    case 'ratanakiri':
    case 'kratie':
    case 'stung-treng':
      return <EcotourismNortheastSvg className={className} />;
    default:
      return <PhnomPenhLandmarkSvg className={className} />;
  }
}
