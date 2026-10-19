import { memo } from 'react';
import type { EACProvinceStat } from '../../data/eac-province-stats';
import type { EACModalImageInfo } from '../../data/eac-types';
import { useMapScroll } from '../../hooks/use-map-scroll';
import { PROVINCE_PATH_MAP } from './map/cambodia-map-paths';
import CambodiaSvgMesh from './map/cambodia-svg-mesh';
import EacMapCallout from './map/eac-map-callout';
import EacMapToolbar from './map/eac-map-toolbar';
import EacMapSelectedCard from './map/eac-map-selected-card';
import EacMapNavButtons from './map/eac-map-nav-buttons';

interface Props {
  provinces: EACProvinceStat[];
  selectedProvince: EACProvinceStat | null;
  onSelectProvince: (id: string) => void;
  onClearSelected: () => void;
  onOpenImage: (image?: EACModalImageInfo) => void;
}

function EacCambodiaMap({
  provinces,
  selectedProvince,
  onSelectProvince,
  onClearSelected,
  onOpenImage,
}: Props) {
  const {
    containerRef,
    canScrollLeft,
    canScrollRight,
    isScrollable,
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    handleClickCapture,
    scrollLeft,
    scrollRight,
  } = useMapScroll();

  return (
    <div className='relative w-full rounded-2xl bg-linear-to-b from-sky-50/70 via-emerald-50/30 to-slate-100/70 border border-slate-200/90 shadow-sm overflow-hidden p-3 sm:p-5 flex flex-col items-center justify-center min-h-[420px] sm:min-h-[580px] lg:min-h-[640px]'>
      {/* Top Map Action Bar */}
      <EacMapToolbar onOpenImage={onOpenImage} />

      {/* Floating Scroll Navigation Arrows */}
      <EacMapNavButtons
        canScrollLeft={canScrollLeft}
        canScrollRight={canScrollRight}
        onScrollLeft={scrollLeft}
        onScrollRight={scrollRight}
      />

      {/* Main SVG Vector Canvas Stage */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onClickCapture={handleClickCapture}
        className={`w-full overflow-x-auto overflow-y-hidden py-1.5 touch-auto overscroll-x-contain overscroll-y-auto ${
          isScrollable
            ? isDragging
              ? 'cursor-grabbing select-none'
              : 'cursor-grab'
            : ''
        }`}
      >
        <div className='relative min-w-190 sm:min-w-215 lg:min-w-0 w-full max-w-5xl aspect-12/8 mx-auto flex items-center justify-center select-none px-3 sm:px-4 lg:px-0'>
          <div className='absolute inset-0 flex items-center justify-center pointer-events-auto'>
            <CambodiaSvgMesh
              selectedProvinceId={selectedProvince?.id || null}
              onSelectProvince={onSelectProvince}
            />
          </div>

          {provinces.map((prov) => (
            <EacMapCallout
              key={prov.id}
              province={prov}
              pathData={PROVINCE_PATH_MAP.get(prov.id)}
              isSelected={selectedProvince?.id === prov.id}
              onSelect={onSelectProvince}
            />
          ))}
        </div>
      </div>

      {/* Mobile Swipe / Drag Helper Hint */}
      {isScrollable && (
        <div className='sm:hidden flex items-center justify-center gap-1.5 text-[11px] text-slate-500 mt-1 font-medium bg-white/80 px-3 py-1 rounded-full border border-slate-200 shadow-2xs'>
          <span className='font-["Kantumruy_Pro",sans-serif]'>
            👈 អូសទៅស្តាំដើម្បីមើលខេត្តភាគខាងកើត (Swipe to view all provinces)
            👉
          </span>
        </div>
      )}

      {/* Selected Province Floating Quick Card */}
      {selectedProvince && (
        <EacMapSelectedCard
          selectedProvince={selectedProvince}
          onClearSelected={onClearSelected}
          onOpenImage={onOpenImage}
        />
      )}
    </div>
  );
}

export default memo(EacCambodiaMap);
