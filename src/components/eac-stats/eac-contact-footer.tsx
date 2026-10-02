import { memo } from 'react';
import type { EACMetadata } from '../../data/eac-province-stats';

interface Props {
  contact: EACMetadata['contact'];
}

function EacContactFooter({ contact }: Props) {
  return (
    <section className='bg-linear-to-r from-slate-900 via-slate-850 to-slate-900 text-white rounded-2xl p-4 sm:p-6 border border-slate-800 shadow-md space-y-4 [contain:paint]'>
      <div className='flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4'>
        {/* Left: Authority & Address */}
        <div className='space-y-1.5 max-w-xl'>
          <div className='flex items-center gap-2'>
            <span className='px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-300 text-[10px] font-bold border border-amber-400/30'>
              OFFICIAL CONTACT
            </span>
            <span className='text-xs text-slate-300 font-medium font-["Kantumruy_Pro",sans-serif]'>
              អាជ្ញាធរអគ្គិសនីកម្ពុជា (EAC)
            </span>
          </div>

          <p className='text-xs text-slate-300 font-["Kantumruy_Pro",sans-serif] leading-relaxed'>
            📍 {contact.addressKh}
          </p>
        </div>

        {/* Right: Quick Links / Socials */}
        <div className='flex items-center gap-2 flex-wrap text-xs'>
          <a
            href={`tel:${contact.phones[0].replace(/[^0-9+]/g, '')}`}
            className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all font-medium'
          >
            📞 <span>{contact.phones[0]}</span>
          </a>

          <a
            href={contact.telegram}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-600/30 hover:bg-sky-600/40 text-sky-300 border border-sky-500/40 transition-all font-medium'
          >
            ✈️ <span>Telegram</span>
          </a>

          <a
            href={contact.facebook}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/30 hover:bg-blue-600/40 text-blue-300 border border-blue-500/40 transition-all font-medium'
          >
            📘 <span>Facebook</span>
          </a>

          <a
            href={contact.website}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/40 transition-all font-medium'
          >
            🌐 <span>Website</span>
          </a>
        </div>
      </div>

      {/* App Download Info Note */}
      <div className='pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-slate-400'>
        <div className='flex items-center gap-2'>
          <span className='font-bold text-slate-300 font-["Kantumruy_Pro",sans-serif]'>
            📱 ស្កេនទាញយក APP ជាតិ &amp; UNIFYCHARGE
          </span>
          <span className='hidden sm:inline'>·</span>
          <span>ផ្ទៀងផ្ទាត់ និងប្រើប្រាស់ស្ថានីយសាកថាមពលអគ្គិសនីស្របច្បាប់</span>
        </div>

        <a
          href={`mailto:${contact.email}`}
          className='text-emerald-400 hover:text-emerald-300 underline font-medium'
        >
          {contact.email}
        </a>
      </div>
    </section>
  );
}

export default memo(EacContactFooter);
