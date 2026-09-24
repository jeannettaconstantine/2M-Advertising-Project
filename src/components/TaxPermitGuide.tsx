import React, { useState, useEffect, useRef } from 'react';
import { 
  AlertTriangle, CheckCircle2, MessageCircle, 
  Ban, FileWarning, ShieldAlert
} from 'lucide-react';
import { Language } from '../types';

interface TaxPermitGuideProps {
  lang: Language;
  onOpenEstimator?: () => void;
}

interface RiskCardData {
  id: string;
  tableNumber: { id: string; en: string };
  title: { id: string; en: string };
  category: { id: string; en: string };
  badge: { id: string; en: string };
  accentColor: 'red' | 'rose' | 'amber';
  icon: React.ElementType;
  whatHappens: { id: string; en: string };
  impact: { id: string; en: string };
  solution: { id: string; en: string };
}

const RISKS: RiskCardData[] = [
  {
    id: 'stiker-merah',
    tableNumber: { id: 'RISIKO 01', en: 'RISK 01' },
    title: { id: 'Penyegelan Stiker Merah Bapenda', en: 'Municipal Red Sticker Sealing' },
    category: { id: 'Citra & Reputasi Publik', en: 'Brand Image & Public Reputation' },
    badge: { id: 'Sanksi Moral Publik', en: 'Public Moral Penalty' },
    accentColor: 'red',
    icon: Ban,
    whatHappens: {
      id: 'Petugas gabungan menempelkan stiker silang merah mencolok bertuliskan "REKLAME INI BELUM MEMBAYAR PAJAK" tepat di bagian depan fasad outlet bisnis Anda.',
      en: 'Joint municipal enforcement officers paste a prominent red crossed sticker stating "THIS SIGNAGE HAS NOT PAID TAXES" directly across your store frontage.',
    },
    impact: {
      id: 'Menjatuhkan reputasi brand di mata ribuan calon pelanggan dan mitra bisnis yang melintas setiap hari.',
      en: 'Severely damages brand credibility in front of thousands of passing daily potential customers and business partners.',
    },
    solution: {
      id: 'SKPD sah terbit langsung dari BPPRD + stiker barcode hologram resmi bukti lunas pajak.',
      en: 'Valid statutory tax decree (SKPD) issued directly by BPPRD + official holographic barcode sticker confirming tax settlement.',
    },
  },
  {
    id: 'pembongkaran',
    tableNumber: { id: 'RISIKO 02', en: 'RISK 02' },
    title: { id: 'Pembongkaran Paksa Satpol PP', en: 'Forced Demolition by Public Order Police' },
    category: { id: 'Kerusakan Aset Fisik', en: 'Physical Asset Loss' },
    badge: { id: 'Penyitaan Konstruksi', en: 'Structural Confiscation' },
    accentColor: 'rose',
    icon: AlertTriangle,
    whatHappens: {
      id: 'Penertiban di mana tiang dan rangka reklame dipotong di lokasi dengan las blender oleh aparat penegak Perda karena tanpa izin SIPR.',
      en: 'Field enforcement operations where structural posts and signage frames are cut down on-site using welding torches due to missing SIPR permits.',
    },
    impact: {
      id: 'Kerugian puluhan hingga ratusan juta rupiah modal reklame, ditambah kerusakan fasad bangunan ruko.',
      en: 'Direct financial loss of tens to hundreds of millions in signage capital, plus structural damage to the building facade.',
    },
    solution: {
      id: 'Kajian teknis sempadan jalan (GSB) & izin SIPR resmi terdaftar di Dinas Tata Ruang.',
      en: 'Technical roadside setback study (GSB) & official SIPR permit registered with the City Planning Department.',
    },
  },
  {
    id: 'denda-pajak',
    tableNumber: { id: 'RISIKO 03', en: 'RISK 03' },
    title: { id: 'Denda Pajak Berjalan 25% – 50%', en: 'Ongoing Tax Penalties of 25% – 50%' },
    category: { id: 'Sanksi Finansial Akumulatif', en: 'Cumulative Financial Penalties' },
    badge: { id: 'Bunga Keterlambatan', en: 'Overdue Interest' },
    accentColor: 'amber',
    icon: FileWarning,
    whatHappens: {
      id: 'Penetapan denda keterlambatan berjalan yang membengkak secara akumulatif setiap bulan dari dinas pendapatan daerah.',
      en: 'Compounding monthly late-payment penalties and administrative fines issued by the municipal tax authority.',
    },
    impact: {
      id: 'Tagihan mendadak tak terduga yang membebani arus kas operasional cabang usaha Anda.',
      en: 'Unexpected penalty bills that disrupt branch operational cash flows and commercial planning.',
    },
    solution: {
      id: 'Perhitungan Nilai Sewa Reklame (NSR) transparan sesuai Perda + reminder 30 hari sebelum tempo.',
      en: 'Transparent municipal rental valuation (NSR) calculation based on city bylaws + 30-day renewal reminders before expiry.',
    },
  },
];

const STEPS = [
  {
    step: '01',
    title: { id: 'Survei Koordinat & Sempadan (GSB)', en: 'Coordinates & Setback (GSB) Survey' },
    desc: {
      id: 'Memastikan titik reklame aman dari utilitas kabel PLN, marka jalan, serta jarak bebas Garis Sempadan Bangunan.',
      en: 'Ensuring the signage location clears power cables, road markers, and statutory building setback boundaries.',
    },
  },
  {
    step: '02',
    title: { id: 'Rekomendasi Teknis Dishub & Tata Ruang', en: 'Transportation & Zoning Clearances' },
    desc: {
      id: 'Pengurusan rekomendasi resmi kelaikan visual jalan dan tata kota agar bebas sengketa di masa mendatang.',
      en: 'Securing formal visual line-of-sight and municipal zoning clearances to prevent future disputes.',
    },
  },
  {
    step: '03',
    title: { id: 'Penetapan Nilai Sewa (NSR) di BPPRD', en: 'NSR Rental Valuation at BPPRD' },
    desc: {
      id: 'Perhitungan tarif pajak yang adil dan transparan berdasarkan klasifikasi jalan tanpa penggelembungan biaya.',
      en: 'Fair, statutory tax tariff calculation based on municipal road class without inflated fees.',
    },
  },
  {
    step: '04',
    title: { id: 'Penerbitan SKPD & Stiker Lunas Resmi', en: 'Issuance of SKPD & Official Seal' },
    desc: {
      id: 'Penerbitan dokumen ketetapan pajak sah (SKPD) dan pemasangan label legalitas di badan reklame.',
      en: 'Issuing the formal regional tax assessment (SKPD) and affixing official compliance stickers on the signage.',
    },
  },
  {
    step: '05',
    title: { id: 'Notifikasi Otomatis Perpanjangan', en: 'Automated Renewal Notifications' },
    desc: {
      id: 'Pengingat berkala 30 hari sebelum masa berlaku berakhir agar bisnis Anda terhindar dari denda keterlambatan.',
      en: 'Periodic reminder 30 days prior to expiration to protect your enterprise from late payment penalties.',
    },
  },
];

export const TaxPermitGuide: React.FC<TaxPermitGuideProps> = ({ lang }) => {
  const isId = lang === 'id';
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const pauseTimerRef = useRef<number | null>(null);

  // 6-second auto-cycle loop through the 3 tables
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % RISKS.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Handle manual interaction (click or hover)
  const handleSelectTable = (index: number) => {
    setActiveIndex(index);
    setIsPaused(true);

    // Reset pause after 8 seconds of inactivity
    if (pauseTimerRef.current) {
      window.clearTimeout(pauseTimerRef.current);
    }
    pauseTimerRef.current = window.setTimeout(() => {
      setIsPaused(false);
    }, 8000);
  };

  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const bannerWaUrl = isId
    ? 'https://wa.me/6287878952077?text=Halo%202M%20Advertising%2C%20saya%20ingin%20konsultasi%20bantuan%20pengurusan%20pajak%20dan%20legalitas%20reklame'
    : 'https://wa.me/6287878952077?text=Hello%202M%20Advertising%2C%20I%20would%20like%20to%20consult%20on%20advertising%20tax%20and%20signage%20permit%20compliance';

  return (
    <section 
      id="tax-guide" 
      className="py-16 sm:py-20 bg-slate-950 text-slate-100 border-b border-slate-850 relative overflow-hidden"
    >
      {/* Background ambient light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-xs font-bold text-red-400">
            <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
            <span>{isId ? 'Kepatuhan Hukum & Keamanan Reklame' : 'Legal Compliance & Signage Safety'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight uppercase">
            {isId ? 'Risiko Nyata Reklame Tanpa Izin Resmi' : 'Real Risks of Signage Without Official Permits'}
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl mx-auto">
            {isId
              ? '3 risiko di bawah nyata terjadi di lapangan pada reklame yang dipasang tanpa prosedur legalitas resmi.'
              : 'The 3 risks below frequently occur on-site for signage installed without formal statutory legalities.'}
          </p>
        </div>

        {/* 3 HORIZONTAL CARDS / TABLES ROW SIDE-BY-SIDE (ALL VISIBLE SIMULTANEOUSLY) */}
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 items-stretch py-4 max-w-6xl mx-auto"
          onMouseLeave={handleMouseLeave}
        >
          {RISKS.map((risk, index) => {
            const isFocused = activeIndex === index;
            const Icon = risk.icon;

            return (
              <div
                key={risk.id}
                onClick={() => handleSelectTable(index)}
                onMouseEnter={() => handleMouseEnter(index)}
                className={`rounded-2xl transition-all duration-700 ease-out cursor-pointer flex flex-col justify-between relative overflow-hidden p-6 sm:p-7 text-left select-none ${
                  isFocused
                    ? 'scale-[1.04] bg-slate-900 border-2 border-red-500/90 shadow-2xl shadow-red-500/20 z-20 opacity-100 ring-1 ring-red-400/40'
                    : 'scale-100 bg-slate-900/60 border border-slate-800 hover:border-slate-700 z-10 opacity-70 hover:opacity-90'
                }`}
              >
                {/* Active Top Highlight Stripe with 6s Timer Animation */}
                {isFocused && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-amber-400 to-blue-500">
                    {!isPaused && (
                      <div 
                        className="h-full bg-white/40 animate-[pulse_2s_infinite]" 
                      />
                    )}
                  </div>
                )}

                <div className="space-y-4">
                  {/* Table Header & Status Badge */}
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                    <span className={`text-[11px] font-mono font-bold tracking-wider uppercase ${
                      isFocused ? 'text-red-400' : 'text-slate-500'
                    }`}>
                      {isId ? risk.tableNumber.id : risk.tableNumber.en}
                    </span>
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase ${
                      isFocused 
                        ? 'bg-red-500/20 text-red-300 border border-red-500/30' 
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {isId ? risk.badge.id : risk.badge.en}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="space-y-2">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-500 ${
                      isFocused ? 'bg-red-500/20 text-red-400' : 'bg-slate-800 text-slate-400'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <h3 className={`text-base font-black tracking-tight leading-snug transition-colors duration-500 ${
                      isFocused ? 'text-white' : 'text-slate-300'
                    }`}>
                      {isId ? risk.title.id : risk.title.en}
                    </h3>
                    <p className="text-xs font-medium text-slate-400">
                      {isId ? risk.category.id : risk.category.en}
                    </p>
                  </div>

                  {/* Section: Apa yang Terjadi */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                      {isId ? 'Apa yang Terjadi:' : 'What Happens:'}
                    </span>
                    <p className={`text-xs leading-relaxed transition-colors duration-500 ${
                      isFocused ? 'text-slate-200' : 'text-slate-400'
                    }`}>
                      {isId ? risk.whatHappens.id : risk.whatHappens.en}
                    </p>
                  </div>

                  {/* Section: Dampak Nyata */}
                  <div className={`p-3.5 rounded-xl border text-xs leading-relaxed transition-all duration-500 ${
                    isFocused 
                      ? 'bg-red-950/40 border-red-900/50 text-red-200' 
                      : 'bg-slate-950/40 border-slate-850 text-slate-400'
                  }`}>
                    <span className="font-bold text-red-400 block mb-1">
                      {isId ? 'Dampak Bisnis:' : 'Business Impact:'}
                    </span>
                    {isId ? risk.impact.id : risk.impact.en}
                  </div>
                </div>

                {/* Section: Solusi 2M Advertising */}
                <div className={`mt-5 pt-4 border-t transition-all duration-500 ${
                  isFocused ? 'border-slate-800' : 'border-slate-850/60'
                }`}>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${
                      isFocused ? 'text-emerald-400' : 'text-slate-500'
                    }`} />
                    <div className="space-y-0.5">
                      <span className={`text-[11px] font-bold block ${
                        isFocused ? 'text-emerald-400' : 'text-slate-400'
                      }`}>
                        {isId ? 'Solusi 2M Advertising:' : '2M Advertising Solution:'}
                      </span>
                      <p className={`text-xs leading-relaxed ${
                        isFocused ? 'text-slate-200' : 'text-slate-400'
                      }`}>
                        {isId ? risk.solution.id : risk.solution.en}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3 Focus Progress Indicators (6s cycle) */}
        <div className="flex items-center justify-center gap-2 pt-1">
          {RISKS.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectTable(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                activeIndex === idx 
                  ? 'w-10 bg-red-500 shadow-sm shadow-red-500/50' 
                  : 'w-2.5 bg-slate-800 hover:bg-slate-700'
              }`}
              aria-label={isId ? `Fokus Tabel ${idx + 1}` : `Focus Table ${idx + 1}`}
            />
          ))}
        </div>

        {/* Direct WhatsApp Callout Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950/80 border border-slate-800 p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left max-w-6xl mx-auto">
          <div className="space-y-1">
            <h4 className="text-base sm:text-lg font-bold text-white">
              {isId
                ? 'Khawatir dengan Status Izin & Pajak Reklame Anda Saat Ini?'
                : 'Concerned About Your Signage Permit & Tax Status?'}
            </h4>
            <p className="text-xs text-slate-400 max-w-xl">
              {isId
                ? 'Konsultasikan titik reklame Anda sekarang. Kami periksa kelengkapan berkas SIPR, sempadan jalan, dan penetapan NSR agar usaha Anda aman beroperasi.'
                : 'Consult your signage location with us now. We inspect your SIPR documentation, road setbacks, and official NSR valuations so your business operates safely.'}
            </p>
          </div>

          <a
            href={bannerWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-950/50 transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>{isId ? 'Konsultasi Legalitas via WhatsApp' : 'Consult Permits via WhatsApp'}</span>
          </a>
        </div>

        {/* 5-STEP OFFICIAL WORKFLOW */}
        <div className="pt-8 border-t border-slate-850 space-y-6 max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
              {isId ? 'ALUR KERJA RESMI 2M ADVERTISING' : 'OFFICIAL 2M ADVERTISING WORKFLOW'}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {isId ? '5 Tahap Pengurusan Izin Reklame' : '5 Stages of Signage Permit Processing'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {STEPS.map((s) => (
              <div
                key={s.step}
                className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <span className="text-xs font-mono font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded inline-block">
                    {isId ? `Tahap ${s.step}` : `Stage ${s.step}`}
                  </span>
                  <h4 className="text-xs font-bold text-white leading-snug">
                    {isId ? s.title.id : s.title.en}
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {isId ? s.desc.id : s.desc.en}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
