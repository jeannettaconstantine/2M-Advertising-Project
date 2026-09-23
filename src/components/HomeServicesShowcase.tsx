import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';
import { AmbientBackground } from './AmbientBackground';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  FileCheck, 
  TrendingUp, 
  Compass, 
  ExternalLink,
  MessageCircle
} from 'lucide-react';

interface HomeServicesShowcaseProps {
  lang: Language;
  onOpenServicesPage: (category?: string) => void;
  onSelectCategoryForEstimate?: (category: string) => void;
}

export interface ShowcaseCategory {
  id: string;
  badge: string;
  title: { id: string; en: string };
  deliverables: { id: string[]; en: string[] };
  description: { id: string; en: string };
  image: string;
  itemCount: { id: string; en: string };
  accentColor: string;
}

export const SHOWCASE_CATEGORIES: ShowcaseCategory[] = [
  {
    id: 'ooh',
    badge: 'Outdoor (OOH)',
    title: {
      id: 'Outdoor (OOH) & Fasad Komersial',
      en: 'Outdoor (OOH) & Commercial Facades',
    },
    deliverables: {
      id: [
        'Signboard & Papan Nama Toko',
        'Neonbox Acrylic & Backlit',
        'Pylon Sign & Totem Tower (4m - 12m)',
        'Huruf Timbul 3D (Stainless & Akrilik)',
        'Billboard & Baliho Jalan Raya',
        'Fasad ACP & Cladding Komersial',
      ],
      en: [
        'Signboard & Retail Storefront',
        'Neonbox Acrylic & Backlit',
        'Pylon Sign & Totem Tower (4m - 12m)',
        '3D Lettering (Stainless & Acrylic)',
        'Highway Billboards & Unipoles',
        'ACP Facade & Commercial Cladding',
      ],
    },
    description: {
      id: 'Solusi reklame luar ruang berdampak tinggi 24 jam dengan rangka hollow galvanis anti-karat, modul LED Samsung bergaransi, dan uji beban angin BMKG.',
      en: 'High-impact 24/7 exterior signage engineered with rust-resistant galvanized frames, warranted Samsung LED modules, and BMKG wind-load compliance.',
    },
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    itemCount: { id: '6 Spesifikasi', en: '6 Core Specs' },
    accentColor: 'blue',
  },
  {
    id: 'indoor',
    badge: 'Indoor Signage',
    title: {
      id: 'Indoor Signage & Retail Fixtures',
      en: 'Indoor Signage & Retail Fixtures',
    },
    deliverables: {
      id: [
        'Wayfinding & Signage Penunjuk Arah',
        'Custom LED Neon Flex (Instagrammable)',
        '3D Lettering Resepsionis & Lobi Kantor',
        'Store Branding & Island Booth Mall',
        'Plakat Akrilik Bevel & Pen Stainless',
      ],
      en: [
        'Wayfinding & Directional Systems',
        'Custom LED Neon Flex Glow',
        'Reception & Lobby 3D Lettering',
        'Store Branding & Mall Island Booths',
        'Beveled Acrylic & Architectural Plaques',
      ],
    },
    description: {
      id: 'Menciptakan kesan korporat prestisius di lobi kantor, interior ritel mall, hingga penunjuk arah rumah sakit yang rapi, ergonomis, dan tahan lama.',
      en: 'Crafting prestigious corporate first impressions for reception lobbies, mall retail fixtures, and hospital directional wayfinding.',
    },
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    itemCount: { id: '5 Spesifikasi', en: '5 Core Specs' },
    accentColor: 'indigo',
  },
  {
    id: 'tax',
    badge: 'Tax & Permitting',
    title: {
      id: 'Pengurusan Pajak & Izin Reklame',
      en: 'Tax & Municipal Permitting',
    },
    deliverables: {
      id: [
        'Izin Penyelenggaraan Reklame (SIPR)',
        'Penetapan Nilai Sewa Reklame (NSR)',
        'Rekomendasi Dishub & Dinas Tata Ruang',
        'Stiker Lunas Pajak Resmi BPPRD',
        '100% Legal & Bebas Razia Satpol PP',
      ],
      en: [
        'Official SIPR Municipal Permits',
        'NSR Advertising Rent Assessments',
        'Department of Transportation Clearance',
        'Official BPPRD Paid Tax Decals',
        '100% Legal Protection vs Enforcement',
      ],
    },
    description: {
      id: 'Layanan legalitas dan birokrasi terpadu bersama BPPRD Lampung. Reklame Anda dipastikan berizin resmi, taat zonasi, dan bebas risiko pembongkaran.',
      en: 'Full municipal compliance and official SIPR zoning permits in Lampung, safeguarding your signage investment from sudden penalties.',
    },
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    itemCount: { id: 'Resmi BPPRD', en: 'Official BPPRD' },
    accentColor: 'emerald',
  },
  {
    id: 'digital',
    badge: 'Digital Ads & Strategy Consultancy',
    title: {
      id: 'Digital Ads & Strategy Consultancy',
      en: 'Digital Ads & Strategy Consultancy',
    },
    deliverables: {
      id: [
        'Brand Guidelines & Visual Playbook',
        'Omnichannel OOH-to-Online Funnel',
        'Meta Ads (Instagram & FB) Regional',
        'Dynamic QR Tracking & Retargeting',
        'Audit Identitas Brand & Early Access',
      ],
      en: [
        'Brand Guidelines & Visual Playbook',
        'Omnichannel OOH-to-Online Funnel',
        'Meta Ads (Instagram & FB) Regional',
        'Dynamic QR Tracking & Retargeting',
        'Brand Identity Audit & Early Access',
      ],
    },
    description: {
      id: 'Menjembatani impresi fisik di jalan raya dengan konversi online. Bangun ekosistem brand menyeluruh dari billboard hingga layar smartphone calon pelanggan.',
      en: 'Bridging physical street impressions with online digital conversions. Unifying outdoor billboard reach with targeted Meta conversion funnels.',
    },
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    itemCount: { id: 'Early Access', en: 'Early Access' },
    accentColor: 'purple',
  },
];

export const HomeServicesShowcase: React.FC<HomeServicesShowcaseProps> = ({
  lang,
  onOpenServicesPage,
  onSelectCategoryForEstimate,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isId = lang === 'id';

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % SHOWCASE_CATEGORIES.length;
    setActiveIndex(nextIdx);
    scrollToCard(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (activeIndex - 1 + SHOWCASE_CATEGORIES.length) % SHOWCASE_CATEGORIES.length;
    setActiveIndex(prevIdx);
    scrollToCard(prevIdx);
  };

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    scrollToCard(index);
  };

  const scrollToCard = (index: number) => {
    if (scrollContainerRef.current) {
      const cards = scrollContainerRef.current.querySelectorAll('.showcase-card');
      if (cards[index]) {
        cards[index].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  };

  return (
    <section 
      id="services-showcase" 
      className="py-16 sm:py-20 bg-gradient-to-b from-slate-100 via-[#f8fafc] to-slate-100 border-y border-slate-200/80 relative text-slate-900 overflow-hidden"
    >
      {/* Light silver ambient dynamic transitions */}
      <AmbientBackground intensity="subtle" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-9">
        
        {/* Top Header Row with Light Silver Styling */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
          <div className="space-y-2.5 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-semibold text-blue-600">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>{isId ? '4 Kategori Layanan Utama' : '4 Core Service Categories'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight uppercase">
              {isId ? (
                <>
                  Layanan Reklame &{' '}
                  <span className="text-blue-600">Fabrikasi 2M</span>
                </>
              ) : (
                <>
                  Signage Services &{' '}
                  <span className="text-blue-600">Manufacturing</span>
                </>
              )}
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {isId
                ? 'Fabrikasi terpadu di workshop sendiri dengan legalitas resmi. Klik salah satu kategori untuk membaca spesifikasi teknis lengkap di halaman Layanan.'
                : 'Direct in-house manufacturing backed by official permits. Select any category below to explore technical blueprints and specs.'}
            </p>
          </div>

          {/* Action buttons & slider arrows */}
          <div className="flex items-center gap-3 self-start md:self-auto flex-wrap">
            <button
              onClick={() => onOpenServicesPage()}
              className="px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-850 text-white text-xs sm:text-sm font-bold shadow-md shadow-slate-950/15 flex items-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
            >
              <span>{isId ? 'Lihat Semua Spesifikasi Detail' : 'View Full Technical Specs'}</span>
              <ArrowRight className="w-4 h-4 text-blue-400" />
            </button>

            {/* Prev / Next controls */}
            <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
              <button
                onClick={handlePrev}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:text-slate-950 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Sebelumnya"
                aria-label="Previous service"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 hover:text-slate-950 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Berikutnya"
                aria-label="Next service"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* SEJALAN-INSPIRED CAROUSEL SHOWCASE */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-5 sm:gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {SHOWCASE_CATEGORIES.map((cat, idx) => {
            const isSelected = activeIndex === idx;
            const deliverables = isId ? cat.deliverables.id : cat.deliverables.en;

            return (
              <motion.div
                key={cat.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                onClick={() => {
                  setActiveIndex(idx);
                  onOpenServicesPage(cat.id);
                }}
                className={`showcase-card flex-none w-[82vw] sm:w-[380px] lg:w-[400px] h-[520px] sm:h-[540px] rounded-3xl overflow-hidden relative border cursor-pointer select-none snap-center group shadow-xl transition-all duration-300 ${
                  isSelected
                    ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-2xl shadow-blue-900/20'
                    : 'border-slate-800/80 shadow-slate-400/20 hover:border-slate-700'
                }`}
              >
                {/* Background Image with Mask & Gentle Zoom on Hover */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-106"
                  style={{ backgroundImage: `url(${cat.image})` }}
                />

                {/* Dark Contrast Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/80 transition-opacity duration-500 group-hover:opacity-90" />

                {/* Ambient Color Flare */}
                <div 
                  className={`absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl opacity-30 transition-opacity duration-500 group-hover:opacity-60 pointer-events-none ${
                    cat.accentColor === 'blue'
                      ? 'bg-blue-600'
                      : cat.accentColor === 'indigo'
                      ? 'bg-indigo-600'
                      : cat.accentColor === 'emerald'
                      ? 'bg-emerald-600'
                      : 'bg-purple-600'
                  }`}
                />

                {/* Content Layout inside Card */}
                <div className="relative z-10 h-full p-6 sm:p-7 flex flex-col justify-between text-left">
                  
                  {/* TOP: Crisp Deliverables List (matching Sejalan reference photo) */}
                  <div className="space-y-4">
                    {/* Header item badge */}
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono tracking-wider uppercase text-slate-300 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                        {isId ? cat.itemCount.id : cat.itemCount.en}
                      </span>
                      <span className="text-white/60 group-hover:text-white transition-colors flex items-center gap-1 text-xs font-semibold">
                        <span>{isId ? 'Lihat Spesifikasi' : 'View Specs'}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>

                    {/* Bullet List of Deliverables / Services */}
                    <ul className="space-y-2 pt-2">
                      {deliverables.map((item, itemIdx) => (
                        <li 
                          key={itemIdx}
                          className="flex items-start gap-2.5 text-white/95 text-xs sm:text-[13px] font-medium leading-snug drop-shadow-sm"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* BOTTOM: Category Pill Badge & Concise Description (matching Sejalan reference photo) */}
                  <div className="space-y-3 pt-4 border-t border-white/10">
                    
                    {/* Pill Category Badge (Live Shopping / KOL Management style) */}
                    <div>
                      <span 
                        className={`inline-block px-3.5 py-1.5 rounded-xl font-bold text-xs tracking-wide text-white shadow-lg ${
                          cat.accentColor === 'blue'
                            ? 'bg-blue-600 shadow-blue-600/30'
                            : cat.accentColor === 'indigo'
                            ? 'bg-indigo-600 shadow-indigo-600/30'
                            : cat.accentColor === 'emerald'
                            ? 'bg-emerald-600 shadow-emerald-600/30'
                            : 'bg-purple-600 shadow-purple-600/30'
                        }`}
                      >
                        {cat.badge}
                      </span>
                    </div>

                    {/* Short 2-line Description */}
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed line-clamp-3 font-normal">
                      {isId ? cat.description.id : cat.description.en}
                    </p>

                    {/* Bottom CTA Row */}
                    <div className="pt-1 flex items-center justify-between text-xs">
                      <span className="text-blue-300 font-semibold group-hover:underline inline-flex items-center gap-1">
                        <span>{isId ? 'Detail Bahan, LED & Biaya' : 'Materials, LED & Pricing'}</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {isId ? 'Fabrikasi Sendiri' : 'In-House Build'}
                      </span>
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CAROUSEL PAGINATION DOTS (matching Sejalan screenshot reference) */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {SHOWCASE_CATEGORIES.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => handleDotClick(dotIdx)}
              aria-label={`Go to category ${dotIdx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === dotIdx
                  ? 'w-7 bg-blue-600 shadow-sm'
                  : 'w-2.5 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>

        {/* Bottom Banner: Konsultasi Sekarang via WhatsApp */}
        <div className="mt-8 rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div className="space-y-1">
            <h4 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-emerald-500" />
              <span>{isId ? 'Konsultasi Sekarang via Whatsapp' : 'Consult Now via WhatsApp'}</span>
            </h4>
            <p className="text-xs text-slate-500">
              {isId
                ? 'Diskusikan kebutuhan reklame, spesifikasi teknis material, estimasi anggaran, atau jadwal survei lokasi gratis langsung dengan tim teknis kami.'
                : 'Discuss your signage requirements, material specifications, budget estimates, or schedule a free site survey directly with our engineering team.'}
            </p>
          </div>

          <a
            href="https://wa.me/62811721596?text=Halo%202M%20Advertising%2C%20saya%20ingin%20konsultasi%20layanan%20reklame%20dan%20estimasi%20biaya"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 flex items-center gap-2 transition-transform hover:scale-[1.02] cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{isId ? 'Konsultasi Sekarang via Whatsapp' : 'Consult Now via WhatsApp'}</span>
          </a>
        </div>

      </div>
    </section>
  );
};
