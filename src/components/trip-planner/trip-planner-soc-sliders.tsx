type Props = {
  startSoc: number;
  reserveSoc: number;
  onStartSocChange: (val: number) => void;
  onReserveSocChange: (val: number) => void;
};

export default function TripPlannerSocSliders({
  startSoc,
  reserveSoc,
  onStartSocChange,
  onReserveSocChange,
}: Props) {
  return (
    <div className='grid grid-cols-2 gap-3 bg-slate-50/70 p-3 rounded-xl border border-slate-200/70'>
      <div>
        <div className='flex justify-between text-[11px] mb-1'>
          <span className='text-slate-600'>Starting SoC:</span>
          <span className='font-bold text-emerald-700'>{startSoc}%</span>
        </div>
        <input
          type='range'
          min='20'
          max='100'
          step='5'
          value={startSoc}
          onChange={(e) => onStartSocChange(Number(e.target.value))}
          className='w-full accent-emerald-600 cursor-pointer'
        />
      </div>

      <div>
        <div className='flex justify-between text-[11px] mb-1'>
          <span className='text-slate-600'>Safety Reserve:</span>
          <span className='font-bold text-amber-700'>{reserveSoc}%</span>
        </div>
        <input
          type='range'
          min='5'
          max='30'
          step='5'
          value={reserveSoc}
          onChange={(e) => onReserveSocChange(Number(e.target.value))}
          className='w-full accent-amber-600 cursor-pointer'
        />
      </div>
    </div>
  );
}
