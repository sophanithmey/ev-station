import { memo } from 'react';
import { CAMBODIA_PROVINCE_PATHS } from './cambodia-map-paths';
import CambodiaWaterLayer from './cambodia-water-layer';
import CambodiaRiversLayer from './cambodia-rivers-layer';

interface Props {
  selectedProvinceId: string | null;
  onSelectProvince: (id: string) => void;
}

function CambodiaSvgMesh({ selectedProvinceId, onSelectProvince }: Props) {
  return (
    <svg
      viewBox='0 0 1200 820'
      className='w-full h-full select-none will-change-transform contain:[paint_layout]'
      preserveAspectRatio='xMidYMid meet'
      aria-label='Accurate Cambodia Province Map'
    >
      <defs>
        <linearGradient id='depth-gradient' x1='0' y1='0' x2='0' y2='1'>
          <stop offset='0%' stopColor='#94a3b8' />
          <stop offset='100%' stopColor='#475569' />
        </linearGradient>
      </defs>

      <CambodiaWaterLayer />

      {/* 1. 3D Extrusion Base Shadow Layer */}
      <g transform='translate(0, 24)' opacity='0.9' fill='url(#depth-gradient)'>
        {CAMBODIA_PROVINCE_PATHS.map((item) => (
          <path key={`base-${item.id}`} d={item.path} />
        ))}
      </g>

      {/* 2. Main Province Polygons */}
      <g stroke='#ffffff' strokeWidth='1.8' strokeLinejoin='round'>
        {CAMBODIA_PROVINCE_PATHS.map((item) => {
          const isSelected = selectedProvinceId === item.id;

          return (
            <path
              key={`prov-${item.id}`}
              d={item.path}
              fill={isSelected ? '#10b981' : item.color}
              opacity={isSelected ? 1 : 0.92}
              className='cursor-pointer transition-colors duration-150 hover:fill-emerald-400 hover:opacity-100'
              onClick={() => onSelectProvince(item.id)}
            >
              <title>{item.name}</title>
            </path>
          );
        })}
      </g>

      {/* 3. Tonle Sap Great Lake & Mekong River System */}
      <CambodiaRiversLayer />

      {/* 4. Leader Lines connecting Pins to Perimeter Labels */}
      <g pointerEvents='none'>
        {CAMBODIA_PROVINCE_PATHS.filter((item) => item.label).map((item) => {
          const isSelected = selectedProvinceId === item.id;
          const label = item.label!;
          const targetX =
            label.align === 'right'
              ? 200
              : label.align === 'left'
                ? 1000
                : label.x;
          const targetY =
            label.align === 'bottom'
              ? 75
              : label.align === 'top'
                ? 705
                : label.y;

          return (
            <line
              key={`line-${item.id}`}
              x1={item.pin.x}
              y1={item.pin.y}
              x2={targetX}
              y2={targetY}
              stroke={isSelected ? '#047857' : '#059669'}
              strokeWidth={isSelected ? '2.5' : '1.2'}
              strokeOpacity={isSelected ? '1' : '0.65'}
              strokeDasharray={isSelected ? undefined : '3 3'}
              className='transition-all duration-150'
            />
          );
        })}
      </g>

      {/* 5. Pin Markers on Provinces */}
      <g pointerEvents='none'>
        {CAMBODIA_PROVINCE_PATHS.filter((item) => item.label).map((item) => {
          const isSelected = selectedProvinceId === item.id;

          return (
            <g
              key={`pin-${item.id}`}
              transform={`translate(${item.pin.x - 7}, ${item.pin.y - 8})`}
              className='transition-transform duration-150'
            >
              <rect
                width='14'
                height='16'
                rx='3'
                fill={isSelected ? '#047857' : '#059669'}
                stroke='#ffffff'
                strokeWidth='1.2'
                className='shadow-xs'
              />
              <path
                d='M 8 3 L 5 8 L 8 8 L 6 13 L 10 7 L 7.5 7 Z'
                fill='#ffffff'
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

export default memo(CambodiaSvgMesh);
