import React from 'react';
import { ShieldCheck, ArrowUp, Phone, MapPin } from 'lucide-react';
import { Language } from '../types';
import { BrandLogo } from './BrandLogo';
import { AnimatedCounter } from './AnimatedCounter';

interface FooterProps {
  lang: Language;
  onNavigate?: (page: 'home' | 'services' | 'tax') => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onNavigate }) => {
  const isId = lang === 'id';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1 & 2: Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="md" />

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Advertising Specialists for your outdoor (OOH), indoor signage, tax & permitting, and consultancy for Sumatera & Jawa area
            </p>

            <div className="flex items-center gap-3 pt-2 text-[11px] text-slate-300">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  <AnimatedCounter end={10000} suffix="+" separator="." /> Proyek
                </span>
              </span>
              <span>•</span>
              <span>
                <AnimatedCounter end={300} suffix="+" /> Brand Nasional
              </span>
              <span>•</span>
              <span>Est. 2002</span>
            </div>
          </div>

          {/* Col 3: Layanan OOH & Indoor */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {isId ? 'Layanan Advertising' : 'Our Signage Services'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate ? onNavigate('services') : window.location.hash = 'services'}
                  className="hover:text-blue-400 transition-colors text-left cursor-pointer"
                >
                  Signboard Toko & Ruko
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate ? onNavigate('services') : window.location.hash = 'services'}
                  className="hover:text-blue-400 transition-colors text-left cursor-pointer"
                >
                  Neonbox Acrylic & Backlit
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate ? onNavigate('services') : window.location.hash = 'services'}
                  className="hover:text-blue-400 transition-colors text-left cursor-pointer"
                >
                  Pylon Sign & Totem Tower
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate ? onNavigate('services') : window.location.hash = 'services'}
                  className="hover:text-blue-400 transition-colors text-left cursor-pointer"
                >
                  Huruf Timbul 3D Stainless
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate ? onNavigate('services') : window.location.hash = 'services'}
                  className="hover:text-blue-400 transition-colors text-left cursor-pointer"
                >
                  Billboard Unipole Highway
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate ? onNavigate('services') : window.location.hash = 'services'}
                  className="hover:text-blue-400 transition-colors text-left cursor-pointer"
                >
                  Wayfinding & Navigasi Gedung
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate ? onNavigate('services') : window.location.hash = 'services'}
                  className="hover:text-blue-400 transition-colors text-left cursor-pointer"
                >
                  Custom LED Neon Flex
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate ? onNavigate('services') : window.location.hash = 'services'}
                  className="hover:text-blue-400 transition-colors text-left cursor-pointer"
                >
                  Store Branding & Booth Ritel
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Pajak & Legalitas */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {isId ? 'Legalitas & Pajak' : 'Permits & Taxation'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('tax')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Pengurusan Pajak Reklame BPPRD
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('tax')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Izin Penyelenggaraan Reklame (SIPR)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('tax')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Perhitungan Nilai Sewa Reklame (NSR)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('tax')}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Kalkulator Pajak & Biaya
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('home')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Garansi Konstruksi 1 Tahun
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Kontak & Workshop */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {isId ? 'Workshop & Hotline' : 'Direct Contacts'}
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                <span>Jl. Arif Rahman Hakim No.25A, Tj. Baru, Kec. Kedamaian, Kota Bandar Lampung, Lampung 35122</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href="https://wa.me/6287878952077" className="text-emerald-400 font-bold hover:underline">
                  +62878-7895-2077 (WhatsApp)
                </a>
              </p>
              <p className="text-[11px] text-slate-500">
                {isId ? 'Senin - Sabtu: 08:00 - 17:00 WIB' : 'Mon - Sat: 08:00 - 17:00 WIB'}
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2002 – 2026 2M Advertising Bandar Lampung. {isId ? 'Hak Cipta Dilindungi.' : 'All rights reserved.'}
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
          >
            <span>{isId ? 'Kembali ke Atas' : 'Back to top'}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
