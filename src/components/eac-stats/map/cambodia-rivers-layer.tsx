export default function CambodiaRiversLayer() {
  return (
    <g pointerEvents='none'>
      {/* Tonle Sap Great Lake Organic Shape */}
      <path
        d='M 410,365 C 440,330 510,370 545,430 C 525,455 465,455 435,420 Z'
        fill='url(#tonle-sap-grad)'
        stroke='#ffffff'
        strokeWidth='1.5'
      />
      {/* Lake Water Ripple Texture */}
      <g stroke='#ffffff' strokeWidth='1' fill='none' opacity='0.7' className='animate-sea-surf'>
        <path d='M 440,385 Q 470,375 500,400' />
        <path d='M 455,410 Q 480,400 515,425' />
      </g>

      {/* Riverbed Base Lines */}
      <g stroke='#0284c7' fill='none' strokeLinecap='round' opacity='0.4'>
        <path d='M 745,140 Q 770,220 740,310 Q 710,380 655,435 Q 610,480 587,498' strokeWidth='6' />
        <path d='M 515,430 Q 550,470 587,498' strokeWidth='4.5' />
        <path d='M 587,498 Q 610,540 640,620 Q 660,680 675,730' strokeWidth='5.5' />
        <path d='M 587,498 Q 575,550 580,630 Q 585,680 595,730' strokeWidth='4' />
      </g>

      {/* Animated Water Current Streams */}
      <g stroke='#7dd3fc' fill='none' strokeLinecap='round' className='animate-river-flow'>
        {/* Upper Mekong (Stung Treng -> Kratie -> Kampong Cham -> Chaktomuk) */}
        <path d='M 745,140 Q 770,220 740,310 Q 710,380 655,435 Q 610,480 587,498' strokeWidth='3.2' />
        {/* Tonle Sap River (Lake -> Chaktomuk Phnom Penh) */}
        <path d='M 515,430 Q 550,470 587,498' strokeWidth='2.6' />
        {/* Lower Mekong (Chaktomuk -> Prey Veng -> Vietnam) */}
        <path d='M 587,498 Q 610,540 640,620 Q 660,680 675,730' strokeWidth='3' />
        {/* Bassac River (Chaktomuk -> Kandal -> Takeo -> Vietnam) */}
        <path d='M 587,498 Q 575,550 580,630 Q 585,680 595,730' strokeWidth='2.2' />
      </g>
    </g>
  );
}
