import React, { useState } from 'react';
import { Sparkles, TrendingUp, Target, Palette, CheckCircle2, MessageCircle, ArrowRight, Bell } from 'lucide-react';
import { Language } from '../types';

interface DigitalStrategyPreviewProps {
  lang: Language;
}

export const DigitalStrategyPreview: React.FC<DigitalStrategyPreviewProps> = ({ lang }) => {
  const isId = lang === 'id';
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrPhone) return;
    setSubmitted(true);
  };

  const pillars = [
    {
      icon: <Palette className="w-5 h-5 text-purple-400" />,
      title: isId ? 'Brand Guidelines & Visual Playbook' : 'Brand Guidelines & Visual Playbook',
      desc: isId
        ? 'Buku pedoman identitas visual lengkap (logomark, tipografi, warna pantone korporat, aturan pemakaian fasad toko & digital asset).'
        : 'Comprehensive brand standards deck covering typography, color hierarchies, signage aesthetics, and digital assets.',
    },
    {
      icon: <Target className="w-5 h-5 text-purple-400" />,
      title: isId ? 'Brand Positioning & Market Strategy' : 'Brand Positioning & Market Strategy',
      desc: isId
        ? 'Menentukan diferensiasi bisnis Anda di pasar lokal Lampung dan Sumatera agar tidak terjebak perang harga komoditas.'
        : 'Clear market differentiation and consumer messaging strategies to escape destructive commodity price wars.',
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-purple-400" />,
      title: isId ? 'Performance Marketing (Meta Ads & Instagram)' : 'Performance Marketing (Meta Ads & Instagram)',
      desc: isId
        ? 'Kampanye iklan berbayar terukur di Instagram & Facebook dengan target geolokasi presisi (radius toko / kota) untuk mendatangkan lead & omset.'
        : 'High-ROI geo-targeted paid acquisition funnels driving real-world foot traffic and online inquiries.',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950 border-b border-slate-850 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-600/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/70 border border-purple-500/40 text-xs font-bold text-purple-300">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>{isId ? 'Layanan Baru • Segera Diluncurkan' : 'New Division • Launching Soon'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {isId ? (
              <>
                Ekspansi Masa Depan:{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300">
                  Digital Ads & Strategy Consultancy
                </span>
              </>
            ) : (
              <>
                The Future of Growth:{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300">
                  Digital Ads & Strategy Consultancy
                </span>
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {isId
              ? 'Menghubungkan kekuatan fisik reklame luar ruang (OOH) dengan akselerasi digital online. Kami membantu bisnis legacy di Sumatera naik kelas mendominasi pasar modern melalui strategi brand menyeluruh dan iklan digital tertarget.'
              : 'Connecting the sheer authority of street-level OOH visibility with hyper-targeted digital performance marketing to scale top-line enterprise revenue.'}
          </p>
        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-slate-900/80 border border-purple-900/40 p-6 space-y-3 hover:border-purple-500/60 transition-colors shadow-lg"
            >
              <div className="p-3 rounded-xl bg-purple-950/50 border border-purple-800/40 w-fit">
                {p.icon}
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">{p.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Waitlist / Early Discovery Box */}
        <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 border border-purple-500/30 p-8 sm:p-10 max-w-3xl mx-auto text-center space-y-6 shadow-2xl">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">
              {isId ? 'Jadilah yang Pertama Mendapatkan Akses Konsultasi Perdana' : 'Be First in Line for Priority Strategy Access'}
            </h3>
            <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
              {isId
                ? 'Kami membuka 10 slot eksklusif perdana untuk mitra bisnis terpilih yang ingin mengaudit identitas brand dan merancang kampanye Meta Ads pertama mereka.'
                : 'Opening 10 exclusive beta consultation slots for brands eager to audit their identity and launch high-impact regional Meta ad campaigns.'}
            </p>
          </div>

          {submitted ? (
            <div className="p-4 rounded-xl bg-purple-950/60 border border-purple-500/50 text-purple-200 text-xs flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>
                {isId
                  ? 'Terima kasih! Tim konsultan kami akan menghubungi Anda saat pendaftaran resmi batch 1 dibuka.'
                  : 'Thank you! Our advisory team will reach out as soon as Batch 1 officially opens.'}
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <input
                type="text"
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder={isId ? 'Nama Bisnis / Brand Anda' : 'Your Business / Brand'}
                className="w-full sm:w-1/2 px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
              <input
                type="text"
                required
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder={isId ? 'WhatsApp / Email Anda' : 'WhatsApp / Email'}
                className="w-full sm:w-1/2 px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
              <button
                type="submit"
                className="shrink-0 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-950/50 flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Bell className="w-4 h-4" />
                <span>{isId ? 'Daftar Antrean' : 'Join Waitlist'}</span>
              </button>
            </form>
          )}

          <div className="text-[11px] text-slate-400 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
            <span>{isId ? 'Prioritas khusus untuk 300+ klien setia 2M Advertising sejak 2002' : 'Special priority reserved for clients of 2M Advertising since 2002'}</span>
          </div>
        </div>

      </div>
    </section>
  );
};
