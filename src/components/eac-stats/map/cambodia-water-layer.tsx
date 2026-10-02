export default function CambodiaWaterLayer() {
  return (
    <>
      <defs>
        {/* Soft Organic Ocean Gradient - seamlessly dissolves outward with zero hard borders */}
        <radialGradient id='sea-gradient' cx='35%' cy='72%' r='65%'>
          <stop offset='0%' stopColor='#38bdf8' stopOpacity='0.65' />
          <stop offset='35%' stopColor='#0ea5e9' stopOpacity='0.45' />
          <stop offset='65%' stopColor='#0284c7' stopOpacity='0.25' />
          <stop offset='90%' stopColor='#0369a1' stopOpacity='0.08' />
          <stop offset='100%' stopColor='#0284c7' stopOpacity='0' />
        </radialGradient>

        {/* Coastal Shelf Aqua Water Flow */}
        <radialGradient id='coast-shimmer' cx='42%' cy='68%' r='50%'>
          <stop offset='0%' stopColor='#67e8f9' stopOpacity='0.7' />
          <stop offset='50%' stopColor='#38bdf8' stopOpacity='0.35' />
          <stop offset='100%' stopColor='#0284c7' stopOpacity='0' />
        </radialGradient>

        {/* Tonle Sap Lake Gradient */}
        <radialGradient id='tonle-sap-grad' cx='50%' cy='50%' r='50%'>
          <stop offset='0%' stopColor='#bae6fd' />
          <stop offset='50%' stopColor='#38bdf8' />
          <stop offset='100%' stopColor='#0284c7' />
        </radialGradient>

        {/* Soft Island Drop Shadow */}
        <filter id='island-shadow' x='-30%' y='-30%' width='160%' height='160%'>
          <feDropShadow dx='0' dy='2' stdDeviation='2' floodColor='#0f172a' floodOpacity='0.25' />
        </filter>
      </defs>

      {/* 0. Coastal Sea (Gulf of Thailand) - Pure Smooth Organic Splines, Zero Straight Cuts */}
      <g pointerEvents='none'>
        {/* Deep Ocean Basin - Fluid organic sweep with 100% transparent fade */}
        <path
          d='M 180,430 C 130,520 140,660 220,740 C 310,820 450,810 560,740 C 510,700 440,660 380,630 C 310,590 250,530 190,440 Z'
          fill='url(#sea-gradient)'
        />

        {/* Inner Coastal Shelf Surf Shimmer */}
        <path
          d='M 210,470 C 190,560 240,660 330,715 C 410,750 490,735 540,710 C 470,685 410,650 360,610 C 290,560 250,510 215,470 Z'
          fill='url(#coast-shimmer)'
          className='animate-sea-surf'
        />

        {/* Primary Rolling Ocean Swell Waves - naturally curved arcs */}
        <g className='animate-sea-wave' stroke='#bae6fd' strokeWidth='1.8' fill='none' strokeLinecap='round'>
          <path d='M 170,510 C 185,600 270,710 460,755' strokeDasharray='18 14' />
          <path d='M 195,545 C 220,630 300,720 430,745' strokeDasharray='22 16' />
          <path d='M 225,580 C 255,650 340,720 400,735' strokeDasharray='16 14' />
        </g>

        {/* Secondary Delicate Surf Foam Ripples */}
        <g className='animate-sea-surf' stroke='#e0f2fe' strokeWidth='1.2' fill='none' strokeLinecap='round' opacity='0.75'>
          <path d='M 240,520 C 270,590 350,660 450,695' strokeDasharray='10 16' />
          <path d='M 265,555 C 300,625 380,680 470,705' strokeDasharray='12 18' />
        </g>

        {/* Real Cambodian Island Archipelagos */}
        <g filter='url(#island-shadow)'>
          {/* Koh Kong Krao */}
          <g transform='translate(235, 505) rotate(-25)'>
            <ellipse cx='0' cy='0' rx='5.5' ry='15' fill='#15803d' stroke='#fef08a' strokeWidth='0.9' />
          </g>

          {/* Koh Sdach */}
          <g transform='translate(275, 555) rotate(-15)'>
            <ellipse cx='0' cy='0' rx='4' ry='7' fill='#16a34a' stroke='#fef08a' strokeWidth='0.8' />
          </g>

          {/* Koh Rong (Major Tropical Island) */}
          <g transform='translate(310, 615) rotate(-20)'>
            <ellipse cx='0' cy='0' rx='11' ry='16' fill='#16a34a' stroke='#fef08a' strokeWidth='1.1' />
            <circle cx='-1' cy='-2' r='4.5' fill='#15803d' opacity='0.8' />
          </g>

          {/* Koh Rong Sanloem */}
          <g transform='translate(330, 650) rotate(-15)'>
            <ellipse cx='0' cy='0' rx='7' ry='12' fill='#15803d' stroke='#fef08a' strokeWidth='1' />
          </g>

          {/* Koh Ta Kiev */}
          <g transform='translate(390, 672) rotate(-8)'>
            <ellipse cx='0' cy='0' rx='6' ry='5' fill='#16a34a' stroke='#fef08a' strokeWidth='0.8' />
          </g>

          {/* Koh Thmei */}
          <g transform='translate(435, 688) rotate(-5)'>
            <ellipse cx='0' cy='0' rx='8.5' ry='6' fill='#15803d' stroke='#fef08a' strokeWidth='0.9' />
          </g>

          {/* Koh Seh (Kep Archipelago) */}
          <g transform='translate(495, 715) rotate(-10)'>
            <ellipse cx='0' cy='0' rx='4.5' ry='4' fill='#16a34a' stroke='#fef08a' strokeWidth='0.8' />
          </g>
        </g>

      </g>
    </>
  );
}
