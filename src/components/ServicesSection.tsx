import React, { useState, useEffect } from 'react';
import { SERVICES } from '../data/services';
import { ServiceItem, Language } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Signpost, Box, TowerControl, Type, Maximize, Layers, 
  Compass, Sparkles, Award, Store, FileCheck, TrendingUp, 
  Check, ArrowRight, ArrowLeft, Clock, Hammer, 
  MessageCircle, ChevronRight, ChevronLeft, LayoutGrid, Sliders
} from 'lucide-react';

interface ServicesSectionProps {
  lang: Language;
  onSelectServiceForEstimate: (serviceId: string) => void;
  onNavigateToTax?: () => void;
  onOpenServicesPage?: () => void;
  initialCategory?: 'all' | 'ooh' | 'indoor' | 'tax' | 'digital';
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  lang,
  onSelectServiceForEstimate,
  onNavigateToTax,
  onOpenServicesPage,
  initialCategory = 'all',
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'ooh' | 'indoor' | 'tax' | 'digital'>(initialCategory);
  const [selectedServiceId, setSelectedServiceId] = useState<string>(SERVICES[0].id);
  const [viewMode, setViewMode] = useState<'interactive' | 'grid'>('interactive');
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<ServiceItem | null>(null);

  useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory);
      const firstOfCat = initialCategory === 'all' 
        ? SERVICES[0].id 
        : (SERVICES.find(s => s.category === initialCategory)?.id || SERVICES[0].id);
      setSelectedServiceId(firstOfCat);
    }
  }, [initialCategory]);

  const isId = lang === 'id';

  const tabs = [
    { id: 'all', label: isId ? 'Semua Layanan' : 'All Services', count: SERVICES.length },
    { id: 'ooh', label: isId ? 'Outdoor (OOH)' : 'Outdoor (OOH)', count: SERVICES.filter(s => s.category === 'ooh').length },
    { id: 'indoor', label: isId ? 'Indoor Signage' : 'Indoor Signage', count: SERVICES.filter(s => s.category === 'indoor').length },
    { id: 'tax', label: isId ? 'Pajak & Izin' : 'Tax & Permitting', count: SERVICES.filter(s => s.category === 'tax').length },
    { id: 'digital', label: isId ? 'Digital Strategy' : 'Digital Strategy', count: SERVICES.filter(s => s.category === 'digital').length },
  ];

  const filteredServices = activeCategory === 'all' 
    ? SERVICES 
    : SERVICES.filter(s => s.category === activeCategory);

  // Ensure current active service is in filtered list, otherwise fallback to first
  const activeService = filteredServices.find(s => s.id === selectedServiceId) || filteredServices[0] || SERVICES[0];

  const activeIndex = filteredServices.findIndex(s => s.id === activeService.id);

  const handleNextService = () => {
    if (filteredServices.length === 0) return;
    const nextIdx = (activeIndex + 1) % filteredServices.length;
    setSelectedServiceId(filteredServices[nextIdx].id);
  };

  const handlePrevService = () => {
    if (filteredServices.length === 0) return;
    const prevIdx = (activeIndex - 1 + filteredServices.length) % filteredServices.length;
    setSelectedServiceId(filteredServices[prevIdx].id);
  };

  const getServiceIcon = (iconName: string, className = "w-5 h-5") => {
    switch (iconName) {
      case 'Signpost': return <Signpost className={`${className} text-blue-600`} />;
      case 'Box': return <Box className={`${className} text-red-600`} />;
      case 'TowerControl': return <TowerControl className={`${className} text-blue-600`} />;
      case 'Type': return <Type className={`${className} text-sky-600`} />;
      case 'Maximize': return <Maximize className={`${className} text-red-600`} />;
      case 'Layers': return <Layers className={`${className} text-blue-600`} />;
      case 'Compass': return <Compass className={`${className} text-sky-600`} />;
      case 'Sparkles': return <Sparkles className={`${className} text-blue-600`} />;
      case 'Award': return <Award className={`${className} text-red-600`} />;
      case 'Store': return <Store className={`${className} text-sky-600`} />;
      case 'FileCheck': return <FileCheck className={`${className} text-emerald-600`} />;
      case 'TrendingUp': return <TrendingUp className={`${className} text-purple-600`} />;
      default: return <Hammer className={`${className} text-blue-600`} />;
    }
  };

  return (
    <section id="services-section" className="py-14 sm:py-16 bg-gradient-to-b from-slate-100 via-[#f8fafc] to-slate-100 border-b border-slate-200 relative text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight uppercase">
              {isId ? (
                <>
                  Pilihan Layanan &{' '}
                  <span className="text-blue-600">
                    Spesifikasi Reklame
                  </span>
                </>
              ) : (
                <>
                  Signage Services &{' '}
                  <span className="text-blue-600">
                    Manufacturing Specs
                  </span>
                </>
              )}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {isId
                ? 'Klik salah satu layanan untuk memeriksa detail material, spesifikasi modul LED grade outdoor, dan estimasi waktu pengerjaan.'
                : 'Click any service below to explore specifications, materials, warranty, and turnaround times in real-time.'}
            </p>
          </div>

          {/* View Mode Toggle & Optional Services Page Link */}
          <div className="flex items-center gap-2.5 self-start md:self-auto flex-wrap">
            {onOpenServicesPage && (
              <button
                onClick={onOpenServicesPage}
                className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>{isId ? 'Buka Halaman Layanan' : 'Open Services Page'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            <div className="inline-flex p-1 rounded-xl bg-white border border-slate-200 text-xs font-semibold shadow-xs">
              <button
                onClick={() => setViewMode('interactive')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'interactive'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>{isId ? 'Mode Interaktif' : 'Interactive'}</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>{isId ? 'Lihat Semua' : 'All Cards'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Category Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {tabs.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                id={`service-category-${tab.id}`}
                onClick={() => {
                  setActiveCategory(tab.id as any);
                  const firstOfCat = tab.id === 'all' 
                    ? SERVICES[0].id 
                    : (SERVICES.find(s => s.category === tab.id)?.id || SERVICES[0].id);
                  setSelectedServiceId(firstOfCat);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? tab.id === 'indoor'
                      ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                      : tab.id === 'tax'
                      ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                      : tab.id === 'digital'
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                      : 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-white text-slate-700 hover:text-slate-950 border border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  isActive 
                    ? 'bg-black/20 text-white' 
                    : 'bg-slate-100 text-slate-600'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE CLICKABLE MASTER-DETAIL VIEW (Default - Compact & Ergonomic) */}
        {/* ========================================================================= */}
        {viewMode === 'interactive' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Col: Clickable Service Buttons List (5 cols) */}
            <div className="lg:col-span-5 space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold px-1 flex items-center justify-between">
                <span>{isId ? 'Pilih Jenis Reklame' : 'Select Signage Category'}</span>
                <span className="text-slate-400">{activeIndex + 1} / {filteredServices.length}</span>
              </div>

              <div className="space-y-1.5 max-h-[460px] overflow-y-auto pr-1">
                {filteredServices.map((service) => {
                  const isSelected = service.id === activeService.id;
                  return (
                    <button
                      key={service.id}
                      onClick={() => setSelectedServiceId(service.id)}
                      className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer group ${
                        isSelected
                          ? 'bg-blue-50/80 border-blue-500 shadow-sm text-blue-950'
                          : 'bg-white border-slate-200/90 hover:bg-slate-50 hover:border-slate-300 text-slate-800 shadow-xs'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`p-2 rounded-lg border shrink-0 transition-colors ${
                          isSelected ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}>
                          {getServiceIcon(service.iconName, `w-4 h-4 ${isSelected ? '!text-white' : ''}`)}
                        </div>
                        <div className="min-w-0">
                          <div className={`text-xs font-bold truncate ${isSelected ? 'text-blue-900' : 'text-slate-900 group-hover:text-blue-600'}`}>
                            {service.title[lang]}
                          </div>
                          <div className="text-[10px] text-slate-500 truncate">
                            {service.subtitle[lang]}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {service.badge && (
                          <span className="hidden sm:inline text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                            {service.badge}
                          </span>
                        )}
                        <ChevronRight className={`w-4 h-4 transition-transform ${
                          isSelected ? 'text-blue-600 translate-x-0.5' : 'text-slate-400 group-hover:text-slate-600'
                        }`} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Col: Active Service Detail Inspector (7 cols) */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-2xl border border-slate-200 p-6 sm:p-7 space-y-6 bg-gradient-to-br from-white via-white to-blue-50/30 shadow-lg shadow-blue-900/5 text-slate-900 relative overflow-hidden"
                >
                  {/* Category Accent Line */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${
                    activeService.category === 'tax'
                      ? 'from-red-500 to-rose-600'
                      : activeService.category === 'indoor'
                      ? 'from-amber-500 to-orange-500'
                      : activeService.category === 'digital'
                      ? 'from-purple-500 to-indigo-600'
                      : 'from-blue-600 via-sky-500 to-indigo-600'
                  }`} />
                  {/* Header info */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${
                          activeService.isUpcoming
                            ? 'bg-purple-50 text-purple-700 border-purple-200'
                            : activeService.category === 'tax'
                            ? 'bg-red-50 text-red-700 border-red-200'
                            : 'bg-blue-50 text-blue-700 border-blue-200'
                        }`}>
                          {activeService.badge || activeService.category.toUpperCase()}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1 font-semibold">
                          <Clock className="w-3 h-3 text-blue-600" />
                          <span>{activeService.leadTime || '7-14 Hari'}</span>
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                        {activeService.title[lang]}
                      </h3>
                      <p className="text-xs text-blue-700 font-semibold">
                        {activeService.subtitle[lang]}
                      </p>
                    </div>

                    {/* Quick navigation arrows */}
                    <div className="flex items-center gap-1 shrink-0 bg-slate-50 p-1 rounded-xl border border-slate-200">
                      <button
                        onClick={handlePrevService}
                        className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                        title={isId ? 'Sebelumnya' : 'Previous'}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleNextService}
                        className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                        title={isId ? 'Berikutnya' : 'Next'}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {activeService.description[lang]}
                  </p>

                  {/* Features / Specifications List */}
                  <div className="space-y-2 pt-3 border-t border-slate-100">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      {isId ? 'Spesifikasi & Standar Pengerjaan:' : 'Specifications & Construction Standards:'}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {activeService.features[lang].map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5 font-bold" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Materials & Best for */}
                  <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                        {isId ? 'Standar & Grade Material:' : 'Material Grades:'}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {activeService.materials?.map((mat, i) => (
                          <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                            {mat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {activeService.bestFor && (
                      <div className="sm:text-right max-w-xs">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-0.5">
                          {isId ? 'Cocok Untuk:' : 'Recommended For:'}
                        </span>
                        <span className="text-slate-700 text-xs font-medium">{activeService.bestFor}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <button
                      onClick={() => setSelectedServiceForModal(activeService)}
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition-colors cursor-pointer"
                    >
                      {isId ? 'Lihat Spesifikasi Lengkap' : 'Full Technical Spec'}
                    </button>

                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/6287878952077?text=Halo%202M%20Advertising%2C%20saya%20tertarik%20dengan%20layanan%20${encodeURIComponent(activeService.title.id)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 flex items-center gap-1.5 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>WhatsApp</span>
                      </a>

                      <button
                        onClick={() => onSelectServiceForEstimate(activeService.id)}
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1.5 shadow-md shadow-blue-600/20 transition-all cursor-pointer"
                      >
                        <span>{isId ? 'Estimasi Biaya / Pajak' : 'Calculate Estimate'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* GRID VIEW (Only when user explicitly chooses "Lihat Semua")              */}
        {/* ========================================================================= */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col justify-between space-y-4 hover:border-blue-400 hover:shadow-md transition-all shadow-xs text-slate-900"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      {getServiceIcon(service.iconName)}
                    </div>
                    {service.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-950">{service.title[lang]}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">{service.subtitle[lang]}</p>
                  </div>

                  <ul className="space-y-1 text-xs text-slate-600 pt-2 border-t border-slate-100">
                    {service.features[lang].slice(0, 2).map((feat, i) => (
                      <li key={i} className="flex items-center gap-1.5 truncate">
                        <Check className="w-3 h-3 text-emerald-600 shrink-0 font-bold" />
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setSelectedServiceId(service.id);
                      setViewMode('interactive');
                    }}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                  >
                    <span>{isId ? 'Buka Detail' : 'Inspect'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>

                  <button
                    onClick={() => onSelectServiceForEstimate(service.id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white cursor-pointer shadow-xs"
                  >
                    {isId ? 'Estimasi' : 'Estimate'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Dedicated Tax Page Callout Banner */}
        {onNavigateToTax && (
          <div className="rounded-2xl bg-white border border-slate-200 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm text-slate-900">
            <div className="flex items-center gap-3 text-left">
              <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 border border-red-200 flex items-center justify-center shrink-0">
                <FileCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-950">
                  {isId ? 'Butuh Pengurusan Izin & Pajak Reklame Resmi?' : 'Need Official Advertising Tax & Legal Permits?'}
                </h4>
                <p className="text-xs text-slate-600">
                  {isId
                    ? 'Kunjungi halaman khusus kalkulator pajak & tahapan izin resmi daerah agar reklame Anda 100% legal.'
                    : 'Interactive municipal tax calculator and official licensing procedures.'}
                </p>
              </div>
            </div>

            <button
              onClick={onNavigateToTax}
              className="shrink-0 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
            >
              <span>{isId ? 'Buka Halaman Pajak & Izin' : 'Open Tax & Permits Page'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>

      {/* Modal for In-depth Specifications */}
      {selectedServiceForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto text-slate-900">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  {getServiceIcon(selectedServiceForModal.iconName)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-950">
                    {selectedServiceForModal.title[lang]}
                  </h3>
                  <p className="text-xs text-blue-600 font-semibold">
                    {selectedServiceForModal.subtitle[lang]}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedServiceForModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>{selectedServiceForModal.description[lang]}</p>

              <div>
                <h4 className="font-bold text-slate-950 text-xs uppercase tracking-wider mb-2">
                  {isId ? 'Spesifikasi Teknis & Standar Mutu:' : 'Technical Specifications & Quality Standards:'}
                </h4>
                <ul className="space-y-2">
                  {selectedServiceForModal.features[lang].map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-700">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 font-bold" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {selectedServiceForModal.materials && (
                <div>
                  <h4 className="font-bold text-slate-950 text-xs uppercase tracking-wider mb-2">
                    {isId ? 'Pilihan Material & Grade:' : 'Material Grades:'}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedServiceForModal.materials.map((m, i) => (
                      <span key={i} className="px-2.5 py-1 rounded bg-slate-100 text-slate-800 border border-slate-200 text-xs font-medium">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-500">{isId ? 'Rekomendasi Terbaik Untuk:' : 'Recommended For:'}</span>
                  <div className="font-semibold text-slate-900 mt-0.5">{selectedServiceForModal.bestFor}</div>
                </div>
                <div className="text-right">
                  <span className="text-slate-500">{isId ? 'Estimasi Produksi:' : 'Lead Time:'}</span>
                  <div className="font-semibold text-blue-600 mt-0.5">{selectedServiceForModal.leadTime}</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedServiceForModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
              >
                {isId ? 'Tutup' : 'Close'}
              </button>
              <button
                onClick={() => {
                  const id = selectedServiceForModal.id;
                  setSelectedServiceForModal(null);
                  onSelectServiceForEstimate(id);
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-sm cursor-pointer"
              >
                {isId ? 'Hitung Biaya Layanan Ini' : 'Estimate This Service'}
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
