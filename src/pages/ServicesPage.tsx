import React, { useEffect } from 'react';
import { Language } from '../types';
import { ProductAnimatedShowcase } from '../components/ProductAnimatedShowcase';
import { AmbientBackground } from '../components/AmbientBackground';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Wrench,
  ShieldCheck,
  Sparkles,
  Layers,
  MessageCircle,
  FileCheck,
  Building,
  Award,
  CheckCircle2,
  Zap,
  Flame,
  Cpu
} from 'lucide-react';

interface ServicesPageProps {
  lang: Language;
  onBackToHome: () => void;
  onNavigateToTax: () => void;
  onSelectServiceForEstimate?: (serviceId: string) => void;
  initialCategory?: 'all' | 'ooh' | 'indoor' | 'tax' | 'digital';
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  lang,
  onBackToHome,
  onNavigateToTax,
  onSelectServiceForEstimate,
}) => {
  const isId = lang === 'id';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Material quality guarantees mentioning only technical GRADES (no brands)
  const materialGuarantees = [
    {
      title: isId ? 'Lampu Grade A Kualitas Terbaik' : 'Grade A Lighting - Best Quality',
      desc: isId
        ? 'Menggunakan Lampu LED modul/TL dengan kualitas pencahayaan terbaik & weatherproof yang tahan hujan & panas, efisiensi konsumsi daya yang sangat cocok untuk meningkatkan daya tarik reklame Anda.'
        : 'Using premium quality LED module/fluorescent lights with optimal illumination and weatherproof durability against rain and heat, with energy efficiency perfectly suited to enhance the appeal of your signage.',
      badge: isId ? 'Lampu Grade A' : 'Grade A Lighting',
      colorClass: 'border-blue-300/80 bg-gradient-to-br from-blue-50/80 via-white to-sky-50/60 hover:border-blue-500 shadow-blue-500/5',
      badgeClass: 'bg-blue-600 text-white border-blue-600',
      iconClass: 'text-blue-600 bg-blue-100/80 border-blue-200',
      icon: Zap,
    },
    {
      title: isId ? 'Akrilik Lembaran Grade A (Cast Acrylic)' : 'Grade-A Optical Cast Acrylic Sheets',
      desc: isId
        ? 'Sheet akrilik optik Grade A 100% virgin MMA anti-menguning hingga bertahun-tahun, transmisi cahaya tinggi merata, dan tahan radiasi sinar UV tropis.'
        : 'Grade-A 100% virgin MMA optical cast acrylic with multi-year anti-yellowing and uniform light diffusion under tropical UV.',
      badge: isId ? 'Grade A Cast Acrylic' : 'Grade A Cast Acrylic',
      colorClass: 'border-teal-300/80 bg-gradient-to-br from-teal-50/80 via-white to-emerald-50/60 hover:border-teal-500 shadow-teal-500/5',
      badgeClass: 'bg-teal-600 text-white border-teal-600',
      iconClass: 'text-teal-600 bg-teal-100/80 border-teal-200',
      icon: Sparkles,
    },
    {
      title: isId ? 'Baja & Hollow Galvanis Standar SNI' : 'SNI Standard Galvanized Steel Structure',
      desc: isId
        ? 'Rangka hollow galvanis tebal dan pipa baja anti-karat dengan perhitungan beban angin (wind load) terverifikasi untuk ketahanan jangka panjang.'
        : 'Heavy-gauge galvanized steel framing and pipes engineered for high wind load tolerance and coastal rust resistance.',
      badge: isId ? 'Standar SNI' : 'SNI Standard',
      colorClass: 'border-amber-300/80 bg-gradient-to-br from-amber-50/80 via-white to-orange-50/60 hover:border-amber-500 shadow-amber-500/5',
      badgeClass: 'bg-amber-600 text-white border-amber-600',
      iconClass: 'text-amber-600 bg-amber-100/80 border-amber-200',
      icon: Flame,
    },
    {
      title: isId ? 'Stainless Steel Grade 304 & Plat ACP Eksterior' : 'Grade 304 Stainless Steel & Exterior ACP',
      desc: isId
        ? 'Plat stainless steel Grade 304 tahan korosi pesisir serta Aluminium Composite Panel (ACP) coating PVDF khusus eksterior tahan cuaca ekstrem.'
        : 'Corrosion-resistant marine Grade 304 stainless steel and exterior PVDF-coated Aluminum Composite Panels (ACP).',
      badge: isId ? 'Grade 304 & PVDF' : 'Grade 304 & PVDF',
      colorClass: 'border-purple-300/80 bg-gradient-to-br from-purple-50/80 via-white to-indigo-50/60 hover:border-purple-500 shadow-purple-500/5',
      badgeClass: 'bg-purple-600 text-white border-purple-600',
      iconClass: 'text-purple-600 bg-purple-100/80 border-purple-200',
      icon: Cpu,
    },
  ];

  const comparisonData = [
    {
      type: isId ? 'Neon Box Acrylic' : 'Acrylic Neon Box',
      bestFor: isId ? 'Toko retail, apotek, ruko, klinik' : 'Retail stores, clinics, pharmacy',
      durability: '5 - 7 Tahun',
      maintenance: isId ? 'Sangat Rendah' : 'Very Low',
      visibility: isId ? 'Tinggi (Sepanjang Hari)' : 'High (All Day)',
      colorPill: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      type: isId ? 'Huruf Timbul 3D (Stainless / Acrylic)' : '3D Channel Lettering',
      bestFor: isId ? 'Fasad kantor, lobi hotel, bank, instansi' : 'Corporate facades, lobbies, banks',
      durability: '7 - 10 Tahun',
      maintenance: isId ? 'Sangat Rendah' : 'Very Low',
      visibility: isId ? 'Elegan & Prestisius' : 'Prestigious & Crisp',
      colorPill: 'bg-purple-50 text-purple-700 border-purple-200',
    },
    {
      type: isId ? 'Pylon Sign / Totem' : 'Pylon Sign / Totem Pillar',
      bestFor: isId ? 'SPBU, dealer mobil, rumah sakit, mall' : 'Gas stations, dealerships, hospitals',
      durability: '10+ Tahun',
      maintenance: isId ? 'Rendah' : 'Low',
      visibility: isId ? 'Maksimal (Jarak Jauh)' : 'Maximum (Long Range)',
      colorPill: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      type: isId ? 'Billboard Unipole' : 'Unipole Billboard',
      bestFor: isId ? 'Branding jalan protokol & persimpangan' : 'Highway branding & major intersections',
      durability: '10+ Tahun',
      maintenance: isId ? 'Periodik Visual' : 'Periodic Vinyl Swap',
      visibility: isId ? 'Audiens Luas' : 'Mass Audience',
      colorPill: 'bg-amber-50 text-amber-700 border-amber-200',
    },
  ];

  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-50 to-slate-100 text-slate-900 min-h-screen relative overflow-hidden">
      {/* Dynamic ambient background tints */}
      <AmbientBackground intensity="subtle" theme="light" />

      {/* TOP BREADCRUMB / NAV BAR (Clean, non-overlapping header) */}
      <nav aria-label="Breadcrumb" className="relative z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white font-bold text-xs sm:text-sm transition-all border border-slate-700 hover:border-blue-500 cursor-pointer shadow-xs group"
            >
              <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:-translate-x-0.5 transition-transform" />
              <span>{isId ? 'Kembali ke Beranda Utama' : 'Back to Home'}</span>
            </button>

            <span className="hidden md:inline-flex text-xs text-slate-400 font-medium">
              / <span className="text-blue-400 font-semibold">{isId ? 'Katalog Produk Reklame & Fabrikasi' : 'Signage Products & Fabrication'}</span>
            </span>
          </div>

          <div className="flex items-center gap-2.5 text-xs">
            <button
              onClick={onNavigateToTax}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold hidden sm:inline-flex items-center gap-1.5 transition-colors border border-slate-700 cursor-pointer"
            >
              <FileCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>{isId ? 'Kalkulator Pajak & Izin' : 'Tax & Permit Guide'}</span>
            </button>
            <a
              href="https://wa.me/6287878952077?text=Halo%202M%20Advertising%2C%20saya%20ingin%20konsultasi%20layanan%20reklame"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold inline-flex items-center gap-1.5 shadow-md shadow-emerald-900/30 transition-all hover:scale-105"
            >
              <MessageCircle className="w-3.5 h-3.5 text-white" />
              <span>{isId ? 'Konsultasi WhatsApp' : 'WhatsApp Inquiries'}</span>
            </a>
          </div>
        </div>
      </nav>

      {/* RICH DUAL-TONE HERO BANNER */}
      <section className="relative py-12 sm:py-16 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white border-b border-blue-900/40 overflow-hidden shadow-xl">
        {/* Glow ambient meshes */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/40 text-xs font-semibold text-blue-200 shadow-inner backdrop-blur-md">
            <Wrench className="w-4 h-4 text-blue-400" />
            <span>{isId ? 'Workshop Fabrikasi Langsung & Layanan Terpadu' : 'Direct Manufacturing Workshop & Turnkey Signage'}</span>
          </div>

          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              OUR SERVICES
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              2M Advertising menyediakan layanan reklame terpadu: dari konsultasi desain, gambar kerja, fabrikasi, pemasangan, hingga legalitas izin dan pajak reklame resmi.
            </p>
          </div>

          {/* 4 STAT HIGHLIGHT CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 pt-2">
            
            {/* Card 1: Electric Blue */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-blue-500/40 flex items-center gap-3 shadow-lg shadow-blue-950/40 backdrop-blur-sm hover:border-blue-400 transition-colors">
              <div className="p-2.5 rounded-xl bg-blue-500/20 border border-blue-400/40 text-blue-400">
                <Award className="w-5 h-5 shrink-0" />
              </div>
              <div>
                <div className="text-sm font-black text-white">22+ {isId ? 'Tahun' : 'Years'}</div>
                <div className="text-[11px] text-blue-300 font-medium">{isId ? 'Pengalaman Sejak 2002' : 'Established 2002'}</div>
              </div>
            </div>

            {/* Card 2: Warm Amber */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-amber-500/40 flex items-center gap-3 shadow-lg shadow-amber-950/40 backdrop-blur-sm hover:border-amber-400 transition-colors">
              <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-400">
                <Building className="w-5 h-5 shrink-0" />
              </div>
              <div>
                <div className="text-sm font-black text-white">{isId ? 'Workshop Sendiri' : 'In-House Factory'}</div>
                <div className="text-[11px] text-amber-300 font-medium">{isId ? 'Bukan Calo / Makelar' : 'Direct Workshop Price'}</div>
              </div>
            </div>

            {/* Card 3: Emerald Jade */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-500/40 flex items-center gap-3 shadow-lg shadow-emerald-950/40 backdrop-blur-sm hover:border-emerald-400 transition-colors">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-400">
                <ShieldCheck className="w-5 h-5 shrink-0" />
              </div>
              <div>
                <div className="text-sm font-black text-white">{isId ? 'Garansi Resmi' : 'Official Warranty'}</div>
                <div className="text-[11px] text-emerald-300 font-medium">{isId ? 'Struktur & Lampu LED' : 'Lighting & Structure'}</div>
              </div>
            </div>

            {/* Card 4: Purple Amethyst */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-purple-500/40 flex items-center gap-3 shadow-lg shadow-purple-950/40 backdrop-blur-sm hover:border-purple-400 transition-colors">
              <div className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-400/40 text-purple-400">
                <FileCheck className="w-5 h-5 shrink-0" />
              </div>
              <div>
                <div className="text-sm font-black text-white">{isId ? 'Pajak & Izin' : '100% Legal Permit'}</div>
                <div className="text-[11px] text-purple-300 font-medium">{isId ? 'Pengurusan Resmi BPPRD' : 'Municipal Compliance'}</div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ANIMATED 1-BY-1 PRODUCT SHOWCASE (OOH, Indoor, Digital Ads & Consultancy) */}
      <ProductAnimatedShowcase
        lang={lang}
        onSelectServiceForEstimate={onSelectServiceForEstimate}
        onNavigateToTax={onNavigateToTax}
      />

      {/* MATERIALS & QUALITY STANDARDS SECTION (Colorful Grade Cards with 3D Tilt Hover) */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-slate-100 via-white to-slate-100 border-b border-slate-200 relative text-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-200 text-xs font-semibold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>{isId ? 'Standar & Spesifikasi Material' : 'Material Specifications & Standards'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 tracking-tight uppercase">
              {isId ? 'Jaminan Mutu Material Reklame' : 'Signage Material Quality Guarantees'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              {isId
                ? 'Kami mengutamakan material berkualitas tinggi berstandar industri dengan sertifikasi grade teruji agar signage tetap kokoh, terang merata, dan tahan lama.'
                : 'We prioritize tested industrial-grade materials with verified ratings so your signage remains sturdy, brightly diffused, and durable over time.'}
            </p>
          </div>

          {/* 4 DIVERSE COLOR CARDS: Grade Only (No Brands) with 3D Hover Lift */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 [perspective:1000px]">
            {materialGuarantees.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`rounded-2xl border p-5 space-y-4 transition-all shadow-md flex flex-col justify-between ${item.colorClass}`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`p-2.5 rounded-xl border ${item.iconClass}`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border shadow-xs ${item.badgeClass}`}>
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-950 leading-snug">{item.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-semibold text-slate-700">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 font-bold" />
                      <span>{isId ? 'Teruji di Iklim Tropis' : 'Tropical Weather Tested'}</span>
                    </span>
                    <span className="font-mono text-[10px] text-slate-500">QC PASSED</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* SIGNAGE SELECTION COMPARISON MATRIX */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-4 shadow-md">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-base font-bold text-slate-950 flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600" />
                <span>{isId ? 'Panduan Memilih Jenis Reklame Sesuai Kebutuhan Bisnis' : 'Signage Type Selection Guide by Business Need'}</span>
              </h3>
              <span className="text-xs font-mono text-slate-500">2M WORKSHOP ADVISORY</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-600 bg-slate-50">
                    <th className="p-3 font-bold uppercase tracking-wider text-[11px] rounded-l-lg">{isId ? 'Jenis Reklame' : 'Signage Type'}</th>
                    <th className="p-3 font-bold uppercase tracking-wider text-[11px]">{isId ? 'Aplikasi Terbaik' : 'Best Application'}</th>
                    <th className="p-3 font-bold uppercase tracking-wider text-[11px]">{isId ? 'Daya Tahan' : 'Lifespan'}</th>
                    <th className="p-3 font-bold uppercase tracking-wider text-[11px] rounded-r-lg">{isId ? 'Visibilitas' : 'Visibility'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {comparisonData.map((row, i) => (
                    <tr key={i} className="hover:bg-blue-50/40 transition-colors">
                      <td className="p-3 font-bold text-slate-950">
                        <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold border mr-2 ${row.colorPill}`}>
                          {row.type}
                        </span>
                      </td>
                      <td className="p-3 text-slate-600">{row.bestFor}</td>
                      <td className="p-3 text-emerald-700 font-mono font-bold">{row.durability}</td>
                      <td className="p-3 text-blue-700 font-semibold">{row.visibility}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* BOTTOM CONSULTATION CTA */}
          <div className="rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-950 border border-blue-800 p-8 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-2 text-center lg:text-left relative z-10">
              <h4 className="text-xl sm:text-2xl font-black text-white">
                {isId ? 'Belum Tahu Jenis Reklame Mana yang Pas untuk Lokasi Anda?' : 'Not Sure Which Signage Fits Your Storefront?'}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                {isId
                  ? 'Tim teknis kami siap melakukan survei lokasi gratis, pengukuran dimensi fasad, dan memberikan simulasi mock-up 3D visual sebelum proses produksi dimulai.'
                  : 'Our engineering team offers free on-site surveys, facade dimension measurements, and 3D visual mock-ups before manufacturing begins.'}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 flex-wrap justify-center relative z-10">
              <button
                onClick={onNavigateToTax}
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                {isId ? 'Cek Izin & Pajak Resmi' : 'Check Tax & Legal'}
              </button>
              <a
                href="https://wa.me/6287878952077?text=Halo%202M%20Advertising%2C%20saya%20ingin%20jadwalkan%20survei%20lokasi%20gratis%20untuk%20reklame%20saya"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 text-xs font-black shadow-lg shadow-amber-500/25 transition-all flex items-center gap-2 hover:scale-105 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-slate-950" />
                <span>{isId ? 'Jadwalkan Survei Gratis' : 'Book Free Survey'}</span>
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
