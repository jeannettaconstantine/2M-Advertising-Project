import React, { useState, useMemo } from 'react';
import { NOTABLE_CLIENTS, CLIENT_CATEGORIES } from '../data/clients';
import { Language } from '../types';
import { Building2, Search, CheckCircle2, ShieldCheck, Sparkles, MapPin } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';

interface ClientMarqueeProps {
  lang: Language;
  onSelectClient?: (clientName: string) => void;
}

export const ClientMarquee: React.FC<ClientMarqueeProps> = ({ lang, onSelectClient }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const isId = lang === 'id';

  const filteredClients = useMemo(() => {
    return NOTABLE_CLIENTS.filter((c) => {
      const matchCategory = selectedCategory === 'all' || c.category === selectedCategory;
      const matchSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.projectScope.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="clients-section" className="py-20 bg-slate-950 border-b border-slate-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-amber-400">
            <Building2 className="w-3.5 h-3.5" />
            <span>
              <AnimatedCounter end={300} suffix="+" /> {isId ? 'Brand Nasional & Multinasional' : 'Enterprise & Global Brands'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {isId ? (
              <>
                Klien Terkemuka yang Mempercayakan{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">
                  Visibilitas Brand Mereka
                </span>
              </>
            ) : (
              <>
                Notable Clients Trusting Our{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">
                  Craftsmanship Since 2002
                </span>
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            {isId ? (
              <>
                Sejak tahun 2002 di Bandar Lampung, kami telah menyelesaikan lebih dari{' '}
                <strong className="text-white font-bold">
                  <AnimatedCounter end={10000} suffix="+" separator="." /> proyek reklame
                </strong>{' '}
                untuk korporasi perbankan, manufaktur otomotif, jaringan ritel, hingga BUMN & pemerintah daerah di Sumatera & Jawa.
              </>
            ) : (
              <>
                Since 2002 in Bandar Lampung, we have installed over{' '}
                <strong className="text-white font-bold">
                  <AnimatedCounter end={10000} suffix="+" separator="," /> signage projects
                </strong>{' '}
                for automotive manufacturers, banking networks, retail flagships, and state institutions across Sumatera & Java.
              </>
            )}
          </p>
        </div>

        {/* Continuous Horizontal Ticker / Marquee */}
        <div className="relative overflow-hidden py-4 border-y border-slate-850 bg-slate-900/40">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />
          
          <div className="flex gap-8 items-center whitespace-nowrap animate-marquee">
            {NOTABLE_CLIENTS.concat(NOTABLE_CLIENTS).map((client, idx) => (
              <div
                key={`${client.id}-${idx}`}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-200 text-xs font-semibold hover:border-amber-500/50 transition-colors cursor-default"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span className="font-bold text-white">{client.name}</span>
                <span className="text-slate-500 text-[10px]">({client.categoryLabel[lang]})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {CLIENT_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {cat.label[lang]}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isId ? 'Cari nama klien (cth: Bridgestone, PLN, KFC)...' : 'Search client (e.g. Samsung, Radisson)...'}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <div className="text-xs text-slate-500 text-left">
            {isId
              ? `Menampilkan ${filteredClients.length} dari ${NOTABLE_CLIENTS.length} klien terdaftar`
              : `Showing ${filteredClients.length} of ${NOTABLE_CLIENTS.length} verified client accounts`}
          </div>
        </div>

        {/* Client Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredClients.map((client) => {
            return (
              <div
                key={client.id}
                className="group relative rounded-xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/50 p-5 space-y-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-amber-500/5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-850 text-amber-400/90 border border-slate-800">
                      {client.categoryLabel[lang]}
                    </span>
                    {client.featured && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                        <CheckCircle2 className="w-3 h-3" />
                        {isId ? 'Mitra Utama' : 'Key Client'}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors mt-2">
                    {client.name}
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-2 mt-1 leading-relaxed">
                    {client.projectScope}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-850/80 flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-red-400 shrink-0" />
                    <span className="truncate max-w-[150px]">{client.location}</span>
                  </div>
                  <span className="text-slate-600 font-mono text-[10px]">VERIFIED</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout: Looking for customized corporate rollout? */}
        <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 p-6 flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div className="space-y-1">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              {isId ? 'Program Pengadaan Reklame Multi-Cabang Korporasi' : 'Corporate Multi-Branch Signage Rollout'}
            </h4>
            <p className="text-xs text-slate-400 max-w-2xl">
              {isId
                ? 'Kami berpengalaman menangani standarisasi fasad toko & neonbox hingga 50+ titik cabang serentak di Sumatera dengan manajemen proyek terpadu dan laporan progres berkala.'
                : 'Experienced in executing synchronized rollouts up to 50+ branch locations across Sumatera with integrated QA and weekly progress dashboards.'}
            </p>
          </div>

          <a
            href="https://wa.me/6287878952077?text=Halo%202M%20Advertising%2C%20perusahaan%20kami%20ingin%20mengajukan%20pengadaan%20reklame%20multi-cabang%20korporasi"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-lg transition-colors"
          >
            {isId ? 'Konsultasi Pengadaan Korporat' : 'Corporate Rollout Consultation'}
          </a>
        </div>

      </div>
    </section>
  );
};
