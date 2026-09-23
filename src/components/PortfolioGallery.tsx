import React, { useState } from 'react';
import { PORTFOLIO_PROJECTS } from '../data/portfolio';
import { PortfolioProject, Language } from '../types';
import { 
  Building2, MapPin, Calendar, CheckCircle2, 
  ExternalLink, Sparkles, Layers, ArrowRight, ShieldCheck 
} from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';

interface PortfolioGalleryProps {
  lang: Language;
  onSelectProjectForConsultation?: (projectTitle: string) => void;
}

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({
  lang,
  onSelectProjectForConsultation,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'ooh' | 'pylon' | 'lettering' | 'indoor'>('all');
  const [activeModalProject, setActiveModalProject] = useState<PortfolioProject | null>(null);

  const isId = lang === 'id';

  const filterTabs = [
    { id: 'all', label: isId ? 'Semua Proyek Unggulan' : 'All Featured Projects' },
    { id: 'ooh', label: isId ? 'Outdoor (OOH)' : 'Outdoor (OOH)' },
    { id: 'pylon', label: isId ? 'Pylon & Landmark' : 'Pylon & Landmark' },
    { id: 'lettering', label: isId ? 'Huruf Timbul 3D' : '3D Lettering' },
    { id: 'indoor', label: isId ? 'Indoor & Retail Booth' : 'Indoor & Retail Fixtures' },
  ];

  const filteredProjects = selectedFilter === 'all'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter((p) => {
        if (selectedFilter === 'ooh') return p.category === 'ooh';
        if (selectedFilter === 'pylon') return p.category === 'pylon';
        if (selectedFilter === 'lettering') return p.category === 'lettering';
        if (selectedFilter === 'indoor') return p.category === 'indoor';
        return true;
      });

  return (
    <section id="portfolio-section" className="py-20 bg-slate-950 border-b border-slate-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              <AnimatedCounter end={10000} suffix="+" separator={isId ? '.' : ','} /> {isId ? 'Proyek Terpasang Sejak 2002' : 'Completed Installations'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {isId ? (
              <>
                Karya Nyata &{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
                  Studi Kasus Klien
                </span>
              </>
            ) : (
              <>
                Real Installations &{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
                  Case Studies
                </span>
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            {isId
              ? 'Mulai dari hotel bintang lima bertaraf internasional, kantor wilayah BUMN kelistrikan, fasia jaringan bank daerah, hingga outlet resmi manufaktur ban dunia.'
              : 'From 5-star international luxury hotel towers and national electric utility headquarters to regional banking networks and global tire dealerships.'}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {filterTabs.map((tab) => {
            const isActive = selectedFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Portfolio Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            return (
              <div
                key={project.id}
                className="group rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/50 p-6 flex flex-col justify-between space-y-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-500/5 cursor-pointer"
                onClick={() => setActiveModalProject(project)}
              >
                <div className="space-y-4">
                  {/* Real Installation Image Preview */}
                  {project.imageUrl && (
                    <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-slate-950 border border-slate-850 -mx-2 -mt-2 mb-2 group">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-slate-950/85 backdrop-blur-md border border-slate-750 text-[9px] font-mono text-emerald-400 font-bold flex items-center gap-1 shadow">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{isId ? 'Terpasang Asli' : 'Verified Install'}</span>
                      </div>
                    </div>
                  )}

                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-950 text-amber-400 border border-slate-800">
                      {project.categoryLabel[lang]}
                    </span>
                    <div className="flex items-center gap-1 text-slate-500 text-xs">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{project.year}</span>
                    </div>
                  </div>

                  {/* Client Name & Project Title */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      {project.client}
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors mt-1">
                      {project.title}
                    </h3>
                  </div>

                  {/* Project Description */}
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {project.description[lang]}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-850">
                    {project.highlights.slice(0, 2).map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Materials Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.materials.slice(0, 3).map((mat, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Footer */}
                <div className="pt-4 border-t border-slate-850/80 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-1 truncate max-w-[200px]">
                    <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    <span className="truncate">{project.location}</span>
                  </div>
                  <span className="font-bold text-amber-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    <span>{isId ? 'Detail' : 'Specs'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Project Detail Modal */}
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
            <div className="relative w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
              
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {activeModalProject.categoryLabel[lang]}
                    </span>
                    <span className="text-xs text-slate-400">
                      {activeModalProject.industry} • {activeModalProject.year}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mt-1.5">
                    {activeModalProject.title}
                  </h3>
                  <div className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-red-400" />
                    <span>{activeModalProject.location}</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveModalProject(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  ✕
                </button>
              </div>

              {/* Modal Body */}
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                {activeModalProject.imageUrl && (
                  <div className="relative rounded-xl overflow-hidden aspect-[16/9] bg-slate-950 border border-slate-800 shadow-xl">
                    <img
                      src={activeModalProject.imageUrl}
                      alt={activeModalProject.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/85 backdrop-blur-md border border-slate-750 text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1.5 shadow">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{isId ? 'Dokumentasi Asli CV. 2M' : 'Original 2M Installation'}</span>
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-bold text-white uppercase text-xs tracking-wider mb-1">
                    {isId ? 'Deskripsi Proyek:' : 'Project Overview:'}
                  </h4>
                  <p className="leading-relaxed">{activeModalProject.description[lang]}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-white">
                    {isId ? 'Dimensi & Skala Konstruksi:' : 'Scale & Dimensions:'}
                  </div>
                  <div className="font-mono text-xs text-amber-400">
                    {activeModalProject.dimensions}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-white uppercase text-xs tracking-wider mb-2">
                    {isId ? 'Material & Spesifikasi Fabrikasi:' : 'Materials & Fabrication Specs:'}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeModalProject.materials.map((mat, i) => (
                      <div key={i} className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{mat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-white uppercase text-xs tracking-wider mb-2">
                    {isId ? 'Keunggulan & Hasil Pekerjaan:' : 'Key Engineering Highlights:'}
                  </h4>
                  <ul className="space-y-1.5">
                    {activeModalProject.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  {isId ? 'Tutup' : 'Close'}
                </button>

                <a
                  href={`https://wa.me/62811721596?text=Halo%202M%20Advertising%2C%20saya%20tertarik%20dengan%20proyek%20seperti%20*${encodeURIComponent(activeModalProject.title)}*%20untuk%20klien%20${encodeURIComponent(activeModalProject.client)}.%20Mohon%20info%20konsultasi%20dan%20penawaran`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-2 shadow-lg"
                >
                  <span>{isId ? 'Konsultasi Proyek Serupa via WhatsApp' : 'Inquire Similar Project on WhatsApp'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
