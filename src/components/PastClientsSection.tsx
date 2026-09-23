import React, { useState } from 'react';
import { NOTABLE_CLIENTS } from '../data/clients';
import { Language } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { AmbientBackground } from './AmbientBackground';
import { ClientLogo } from './ClientLogo';
import {
  Building2,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  MessageCircle,
} from 'lucide-react';

interface PastClientsSectionProps {
  lang: Language;
}

export const PastClientsSection: React.FC<PastClientsSectionProps> = ({ lang }) => {
  const isId = lang === 'id';
  const [showAll, setShowAll] = useState(false);

  // Initial display: 8 clients. Clicking 'Lihat Klien Lainnya' reveals all 16
  const displayedClients = showAll ? NOTABLE_CLIENTS : NOTABLE_CLIENTS.slice(0, 8);

  return (
    <section id="clients-section" className="py-16 sm:py-20 bg-slate-100/70 border-b border-slate-200/80 relative overflow-hidden">
      <AmbientBackground variant="subtle" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-300 text-xs font-semibold text-blue-600 shadow-sm">
            <Building2 className="w-3.5 h-3.5" />
            <span>{isId ? 'Rekam Jejak 22+ Tahun • Sejak 2002' : '22+ Years Proven Track Record • Est. 2002'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight uppercase">
            {isId ? (
              <>
                Klien <span className="text-blue-600">Kami</span>
              </>
            ) : (
              <>
                Our <span className="text-blue-600">Clients</span>
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base font-semibold text-blue-600 uppercase tracking-wider">
            Client Portfolio
          </p>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {isId
              ? 'Telah dipercaya oleh ratusan korporasi, BUMN, perbankan, instansi pemerintah, dan brand ritel terkemuka di Sumatera & Jawa.'
              : 'Trusted by hundreds of leading corporations, state-owned enterprises, banks, government institutions, and retail brands.'}
          </p>
        </div>

        {/* 16 Client Logos Grid with Clean Cards */}
        <div className="space-y-6">
          <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 sm:gap-4">
            <AnimatePresence>
              {displayedClients.map((client, idx) => (
                <motion.div
                  key={client.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 12 }}
                  transition={{
                    duration: 0.3,
                    delay: idx < 8 ? 0 : (idx - 8) * 0.03,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="rounded-2xl p-4 sm:p-5 bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-400 transition-all flex flex-col items-center justify-center text-center group"
                >
                  <div className="w-full h-20 sm:h-22 p-2 rounded-xl bg-slate-50/80 group-hover:bg-white flex items-center justify-center transition-all overflow-hidden">
                    <ClientLogo
                      clientId={client.id}
                      size="md"
                      className="h-11 sm:h-13 w-auto max-w-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="mt-3 text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate max-w-full">
                    {client.name}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Action Row: One-Click Expand/Collapse & "...and many more" */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold shadow-xs hover:border-blue-400 hover:text-blue-600 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>
                {showAll
                  ? (isId ? 'Tampilkan Lebih Sedikit' : 'Show Less')
                  : (isId ? 'Lihat Klien Lainnya (+8 Brand)' : 'View More Clients (+8 Brands)')}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${
                  showAll ? 'rotate-180' : ''
                }`}
              />
            </button>

            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-xs sm:text-sm font-semibold text-slate-600 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>{isId ? '...dan ratusan brand lainnya' : '...and hundreds more'}</span>
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PENGADAAN REKLAME MULTI-CABANG (GO STRAIGHT HERE)                         */}
        {/* ========================================================================= */}
        <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-sm sm:text-base font-bold text-slate-950 flex items-center justify-center sm:justify-start gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>{isId ? 'Butuh Pengadaan Reklame Multi-Cabang / Korporasi?' : 'Need Multi-Branch Corporate Signage Procurement?'}</span>
            </h3>
            <p className="text-xs text-slate-600 max-w-2xl">
              {isId
                ? 'Kami berpengalaman menangani standarisasi fasad & signage jaringan perbankan, ritel nasional, dan waralaba dengan SLA tepat waktu & laporan berkala.'
                : 'Experienced in handling facade standardization & signage networks for banking, national retail, and franchises with on-time SLA.'}
            </p>
          </div>

          <a
            href="https://wa.me/62811721596?text=Halo%202M%20Advertising%2C%20perusahaan%20kami%20ingin%20mengajukan%20pengadaan%20reklame%20multi-cabang%20korporasi"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{isId ? 'Konsultasi Vendor Korporasi' : 'Corporate Inquiry'}</span>
          </a>
        </div>

      </div>
    </section>
  );
};
