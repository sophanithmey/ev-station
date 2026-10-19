import {
  BAR_COLORS,
  computeNiceScale,
  formatTickValue,
  type ChartItem,
} from './ev-compare-metrics';

type Props = {
  title: string;
  yAxisLabel: string;
  items: ChartItem[];
};

export default function EvCompareBarChart({ title, yAxisLabel, items }: Props) {
  const svgWidth = 460;
  const svgHeight = 210;
  const marginLeft = 48;
  const marginRight = 16;
  const marginTop = 24;
  const marginBottom = 46;
  const chartWidth = svgWidth - marginLeft - marginRight;
  const chartHeight = svgHeight - marginTop - marginBottom;

  const maxVal = Math.max(...items.map((i) => i.value), 0);
  const { max: scaleMax, ticks } = computeNiceScale(maxVal);

  const slotWidth = items.length > 0 ? chartWidth / items.length : chartWidth;
  const barWidth = Math.min(130, Math.max(48, slotWidth * 0.72));

  return (
    <div className='bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col justify-between'>
      <h3 className='text-xs sm:text-sm font-bold text-slate-900 tracking-tight'>
        {title}
      </h3>

      <div className='w-full overflow-hidden mt-1'>
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className='w-full h-auto select-none block'
          aria-label={title}
          role='img'
        >
          {/* Rotated Y-axis label */}
          <text
            transform={`rotate(-90)`}
            x={-(marginTop + chartHeight / 2)}
            y={13}
            textAnchor='middle'
            fontSize='9'
            fill='#64748b'
            fontWeight='500'
          >
            {yAxisLabel}
          </text>

          {/* Horizontal Gridlines & Y-axis Ticks */}
          {ticks.map((tick) => {
            const y = marginTop + chartHeight - (tick / scaleMax) * chartHeight;
            return (
              <g key={tick}>
                <line
                  x1={marginLeft}
                  y1={y}
                  x2={marginLeft + chartWidth}
                  y2={y}
                  stroke='#f1f5f9'
                  strokeWidth={1}
                />
                <text
                  x={marginLeft - 6}
                  y={y + 3.5}
                  textAnchor='end'
                  fontSize='9'
                  fill='#94a3b8'
                >
                  {formatTickValue(tick)}
                </text>
              </g>
            );
          })}

          {/* Baseline */}
          <line
            x1={marginLeft}
            y1={marginTop + chartHeight}
            x2={marginLeft + chartWidth}
            y2={marginTop + chartHeight}
            stroke='#e2e8f0'
            strokeWidth={1}
          />

          {/* Bars */}
          {items.map((item, index) => {
            const barX = marginLeft + index * slotWidth + (slotWidth - barWidth) / 2;
            const valRatio = scaleMax > 0 ? Math.min(1, item.value / scaleMax) : 0;
            const barH = Math.max(2, valRatio * chartHeight);
            const barY = marginTop + chartHeight - barH;
            const color = BAR_COLORS[index % BAR_COLORS.length];

            return (
              <g key={item.id}>
                {/* Rect Bar */}
                <rect
                  x={barX}
                  y={barY}
                  width={barWidth}
                  height={barH}
                  fill={color}
                  className='transition-all duration-300 hover:opacity-90'
                >
                  <title>{`${item.shortName}: ${item.displayValue}`}</title>
                </rect>

                {/* Number above bar */}
                <text
                  x={barX + barWidth / 2}
                  y={barY - 5}
                  textAnchor='middle'
                  fontSize='10'
                  fill='#475569'
                  fontWeight='500'
                >
                  {item.displayValue}
                </text>

                {/* Car Short Label below X-axis */}
                <text
                  x={barX + barWidth / 2}
                  y={marginTop + chartHeight + 15}
                  textAnchor='middle'
                  fontSize='8.5'
                  fill='#475569'
                >
                  {item.shortName}
                </text>
              </g>
            );
          })}

          {/* X-axis title label */}
          <text
            x={marginLeft + chartWidth / 2}
            y={svgHeight - 6}
            textAnchor='middle'
            fontSize='9'
            fill='#64748b'
            fontWeight='500'
          >
            Vehicle Short
          </text>
        </svg>
      </div>
    </div>
  );
}
