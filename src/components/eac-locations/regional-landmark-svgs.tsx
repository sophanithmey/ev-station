export function PhnomPenhLandmarkSvg({
  className = '',
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox='0 0 800 350'
      fill='currentColor'
      className={`pointer-events-none select-none ${className}`}
      aria-hidden='true'
    >
      {/* Sun / Sky Backdrop over Phnom Penh Riverfront */}
      <circle cx='650' cy='95' r='38' opacity='0.35' />
      {/* Royal Palace Multi-Tiered Khmer Gables & Spire (ព្រះទីនាំងទេវាវិនិច្ឆ័យ) */}
      <path
        d='M140,240 L160,215 L200,215 L220,185 L280,185 L300,150 L380,150 L395,110 L400,30 L405,110 L420,150 L500,150 L520,185 L580,185 L600,215 L640,215 L660,240 Z'
        opacity='0.8'
      />
      {/* Chofa (ជហ្វា) Roof Ridge Horns & Central Spire Parasol */}
      <path d='M396,80 L400,18 L404,80 Z M385,85 L400,85 L415,85 Z' />
      <path d='M156,215 Q150,205 142,210 Q150,218 160,215 Z' />
      <path d='M644,215 Q650,205 658,210 Q650,218 640,215 Z' />
      <path d='M216,185 Q210,175 202,180 Q210,188 220,185 Z' />
      <path d='M584,185 Q590,175 598,180 Q590,188 580,185 Z' />
      <path d='M296,150 Q290,140 282,145 Q290,153 300,150 Z' />
      <path d='M504,150 Q510,140 518,145 Q510,153 500,150 Z' />
      {/* Royal Palace Lower Terraces & Columns */}
      <rect x='160' y='240' width='480' height='20' rx='2' opacity='0.9' />
      <rect x='120' y='260' width='560' height='15' rx='2' opacity='0.95' />
      {/* Sisowath Quay Embankment */}
      <rect x='0' y='275' width='800' height='10' opacity='0.85' />
      {/* River Cruise / Dragon Boat on Tonle Chaktomuk */}
      <path d='M150,295 L220,295 L210,307 L160,307 Z' opacity='0.8' />
      <path d='M175,294 L175,283 L195,283 L195,294 Z' opacity='0.75' />
      <path d='M185,283 L185,274' stroke='currentColor' strokeWidth='2' />
      {/* Chaktomuk Confluence River Waves & Currents (ទន្លេបួនមុខ) */}
      <path
        d='M0,350 L0,295 Q100,285 200,295 T400,288 T600,295 T800,288 L800,350 Z'
        opacity='0.6'
      />
      <path
        d='M0,350 L0,315 Q120,305 240,318 T480,310 T720,318 L800,315 L800,350 Z'
        opacity='0.75'
      />
      <path
        d='M20,340 Q150,330 300,342 T600,335 T780,340'
        fill='none'
        stroke='currentColor'
        strokeWidth='3.5'
        strokeDasharray='18 8'
        opacity='0.9'
      />
    </svg>
  );
}

export function CoastalLandmarkSvg({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox='0 0 800 350'
      fill='currentColor'
      className={`pointer-events-none select-none ${className}`}
      aria-hidden='true'
    >
      {/* Tropical Sea Sun / Horizon */}
      <circle cx='620' cy='120' r='42' opacity='0.35' />
      {/* Distant Offshore Islands (Koh Rong / Koh Tonsay silhouettes) */}
      <path
        d='M60,220 Q130,175 200,210 Q260,185 340,220 L340,240 L60,240 Z'
        opacity='0.5'
      />
      <path
        d='M460,215 Q520,180 580,210 Q630,190 700,218 L700,240 L460,240 Z'
        opacity='0.45'
      />
      {/* Flying Seagulls over Sea Horizon */}
      <path
        d='M290,130 Q300,118 310,130 Q320,118 330,130'
        fill='none'
        stroke='currentColor'
        strokeWidth='2.5'
        opacity='0.7'
      />
      <path
        d='M345,115 Q353,105 361,115 Q369,105 377,115'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        opacity='0.6'
      />
      <path
        d='M410,140 Q418,130 426,140 Q434,130 442,140'
        fill='none'
        stroke='currentColor'
        strokeWidth='2.2'
        opacity='0.65'
      />
      {/* Sailboat gliding on the Ocean */}
      <path d='M225,212 L275,212 L267,224 L233,224 Z' opacity='0.85' />
      <path d='M254,210 L254,150 L273,202 Z' opacity='0.8' />
      <path d='M251,210 L251,162 L236,202 Z' opacity='0.75' />
      {/* Deep Ocean Waves - Layer 1 */}
      <path
        d='M0,350 L0,230 Q80,205 160,225 T320,215 T480,225 T640,210 T800,225 L800,350 Z'
        opacity='0.5'
      />
      {/* Rolling Ocean Surf Waves - Layer 2 */}
      <path
        d='M0,350 L0,260 Q100,235 200,255 T400,240 T600,255 T800,240 L800,350 Z'
        opacity='0.7'
      />
      {/* Crashing Shorebreak Waves - Layer 3 */}
      <path
        d='M0,350 L0,290 Q70,270 140,285 T280,270 T420,285 T560,270 T700,285 T800,275 L800,350 Z'
        opacity='0.85'
      />
      {/* Coastal Coconut Palms on Beach Edge */}
      <path
        d='M715,310 Q725,240 705,190 L713,190 Q735,240 725,310 Z'
        opacity='0.8'
      />
      <path d='M705,190 Q660,165 640,195 Q675,190 705,190 Z' opacity='0.8' />
      <path d='M705,190 Q680,145 710,135 Q715,165 705,190 Z' opacity='0.8' />
      <path d='M705,190 Q740,150 765,170 Q735,185 705,190 Z' opacity='0.8' />
      <path d='M705,190 Q750,200 760,225 Q735,215 705,190 Z' opacity='0.8' />
      {/* Sea Ripple Highlights */}
      <path
        d='M20,335 Q120,325 220,335 T420,328 T620,335 T780,330'
        fill='none'
        stroke='currentColor'
        strokeWidth='3.5'
        strokeDasharray='16 8'
        opacity='0.9'
      />
    </svg>
  );
}

export function BattambangLandmarkSvg({
  className = '',
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox='0 0 800 350'
      fill='currentColor'
      className={`pointer-events-none select-none ${className}`}
      aria-hidden='true'
    >
      {/* Phnom Sampov, Banan & Rice Fields (បាត់ដំបង, បន្ទាយមានជ័យ, ប៉ៃលិន) */}
      <path
        d='M0,350 L0,230 Q160,140 280,200 T580,120 Q690,80 800,150 L800,350 Z'
        opacity='0.7'
      />
      {/* Ancient Temple Spire of Ek Phnom / Banan */}
      <path d='M460,250 L480,160 L490,110 L500,160 L520,250 Z' />
      <rect x='440' y='250' width='100' height='30' rx='3' />
      {/* Sangker River Lines */}
      <path
        d='M0,335 Q200,320 400,335 T800,330'
        fill='none'
        stroke='currentColor'
        strokeWidth='4'
        strokeDasharray='16 8'
      />
    </svg>
  );
}

export function PreahVihearLandmarkSvg({
  className = '',
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox='0 0 800 350'
      fill='currentColor'
      className={`pointer-events-none select-none ${className}`}
      aria-hidden='true'
    >
      {/* Dangrek Mountain Cliff & Prasat Preah Vihear / Sambor Prei Kuk */}
      <path
        d='M0,350 L0,260 L240,260 L320,180 L440,180 L480,120 L540,120 L580,80 L620,80 L680,140 L800,180 L800,350 Z'
        opacity='0.75'
      />
      {/* Gopura Sanctuary Spire on Cliff Peak */}
      <path d='M580,80 L590,40 L600,20 L610,40 L620,80 Z' />
      <rect x='560' y='80' width='80' height='35' rx='3' />
      {/* Sambor Prei Kuk Octagonal Temple */}
      <path d='M160,260 L180,190 L195,150 L210,190 L230,260 Z' />
    </svg>
  );
}

export function EcotourismNortheastSvg({
  className = '',
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox='0 0 800 350'
      fill='currentColor'
      className={`pointer-events-none select-none ${className}`}
      aria-hidden='true'
    >
      {/* Bousra Waterfall, Pine Forest & Yeak Laom Lake (មណ្ឌលគិរី, រតនគិរី, ក្រចេះ, ស្ទឹងត្រែង) */}
      <path
        d='M0,350 L0,200 Q150,110 300,170 T600,90 Q700,50 800,120 L800,350 Z'
        opacity='0.6'
      />
      {/* Waterfall Cascading Tier */}
      <rect x='340' y='170' width='120' height='140' rx='6' opacity='0.8' />
      <line
        x1='360'
        y1='170'
        x2='360'
        y2='310'
        stroke='#fff'
        strokeWidth='3'
        strokeDasharray='8 4'
      />
      <line
        x1='400'
        y1='170'
        x2='400'
        y2='310'
        stroke='#fff'
        strokeWidth='3'
        strokeDasharray='8 4'
      />
      <line
        x1='440'
        y1='170'
        x2='440'
        y2='310'
        stroke='#fff'
        strokeWidth='3'
        strokeDasharray='8 4'
      />
      {/* Pine Trees on Mountain Ridge */}
      <path d='M140,240 L155,195 L170,240 Z M150,195 L155,175 L160,195 Z' />
      <path d='M620,220 L635,175 L650,220 Z M630,175 L635,155 L640,175 Z' />
    </svg>
  );
}
