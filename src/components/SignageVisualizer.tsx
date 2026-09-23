import React, { useState, useRef } from 'react';
import { Language } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import {
  InteractiveSignageCanvas,
  SignageConfig,
  SignageType,
  FontStyleId,
  LightingStyle,
} from './InteractiveSignageCanvas';
import {
  Sparkles,
  Type,
  Palette,
  Ruler,
  Upload,
  Move,
  MessageCircle,
  Calculator,
  RotateCcw,
  Check,
  ShieldCheck,
  Eye,
  Sliders,
  Sun,
  Moon,
  Box,
  Layers,
  Flame,
  Building,
  Image as ImageIcon,
  CheckCircle2,
  HelpCircle,
  Maximize2,
  ChevronDown,
} from 'lucide-react';

interface SignageVisualizerProps {
  lang: Language;
}

// 9 Curated Font Categories with Live Typography Styling
export const FONT_OPTIONS: {
  id: FontStyleId;
  name: string;
  category: string;
  familyStyle: string;
  desc: { id: string; en: string };
  preview: string;
}[] = [
  {
    id: 'modern-sans',
    name: 'Plus Jakarta Sans',
    category: 'Modern Sans Serif',
    familyStyle: "'Plus Jakarta Sans', sans-serif",
    desc: { id: 'Bersih, simetris, modern & korporat standar nasional', en: 'Clean, balanced, modern corporate standard' },
    preview: 'MODERN SANS',
  },
  {
    id: 'bold-impact',
    name: 'Montserrat 900 Heavy',
    category: 'Heavy Bold Impact',
    familyStyle: "'Montserrat', sans-serif",
    desc: { id: 'Tebal maksimal, visibilitas tinggi dari kejauhan & jalan raya', en: 'Maximum thickness, high visibility from distance & road' },
    preview: 'HEAVY IMPACT',
  },
  {
    id: 'condensed',
    name: 'Bebas Neue',
    category: 'Condensed / Tall',
    familyStyle: "'Bebas Neue', sans-serif",
    desc: { id: 'Arsitektural ramping & tinggi, hemat bidang horizontal fasia', en: 'Tall & compact, space-saving for tight fascia' },
    preview: 'CONDENSED TALL',
  },
  {
    id: 'luxury-serif',
    name: 'Playfair Display',
    category: 'Elegant Luxury Serif',
    familyStyle: "'Playfair Display', serif",
    desc: { id: 'Mewah, elegan, berkelas tinggi untuk butik, resto & klinik estetika', en: 'Prestigious, high-end elegance for boutique & fine dining' },
    preview: 'Luxury Serif',
  },
  {
    id: 'royal-serif',
    name: 'Cinzel Decorative',
    category: 'Royal Architectural Serif',
    familyStyle: "'Cinzel', serif",
    desc: { id: 'Klasik megah berkarakter hukum, arsitektur, monumen & heritage', en: 'Classic grand character for law, heritage & monuments' },
    preview: 'ROYAL SERIF',
  },
  {
    id: 'rounded',
    name: 'Quicksand Bold',
    category: 'Rounded Contemporary',
    familyStyle: "'Quicksand', sans-serif",
    desc: { id: 'Sudut melengkung ramah, modern F&B, baby shop & bakery', en: 'Soft rounded corners, friendly retail & contemporary cafe' },
    preview: 'Rounded Soft',
  },
  {
    id: 'tech-grotesk',
    name: 'Space Grotesk',
    category: 'Futuristic / Tech Grotesk',
    familyStyle: "'Space Grotesk', sans-serif",
    desc: { id: 'Futuristik geometris, start-up teknologi, digital & agensi', en: 'Futuristic geometric, tech startup & creative agency' },
    preview: 'TECH GROTESK',
  },
  {
    id: 'script',
    name: 'Pacifico Artisan',
    category: 'Artisan Neon Script',
    familyStyle: "'Pacifico', cursive",
    desc: { id: 'Gaya tulisan tangan bersambung mengalir, sangat cocok untuk neonflex kafe', en: 'Flowing handwritten cursive, ideal for neonflex signage' },
    preview: 'Artisan Script',
  },
  {
    id: 'industrial-mono',
    name: 'Precision Industrial Mono',
    category: 'Industrial Monospace',
    familyStyle: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    desc: { id: 'Presisi mekanik, workshop otomotif, pabrik & laboratorium', en: 'Mechanical precision for automotive, workshop & laboratory' },
    preview: 'INDUSTRIAL MONO',
  },
];

// 5 Curated Indonesian Commercial Location Presets
const LOCATION_PRESETS = [
  {
    id: 'ruko-lampung',
    name: {
      id: 'Fasad Ruko 2 Lantai (Standar Lampung)',
      en: 'Standard 2-Story Commercial Shophouse',
    },
    url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f8?auto=format&fit=crop&w=1600&q=85',
    desc: {
      id: 'Fasad ruko komersial standar dengan zona fasia kanopi pintu masuk.',
      en: 'Standard commercial shophouse with upper entrance fascia band.',
    },
    defaultPosY: -12,
    defaultScale: 1.0,
  },
  {
    id: 'dark-acp',
    name: {
      id: 'Dinding Fasad Dark ACP Modern',
      en: 'Modern Dark ACP Composite Wall',
    },
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85',
    desc: {
      id: 'Cladding panel komposit abu-abu gelap arsitektural.',
      en: 'Architectural charcoal gray composite panel cladding.',
    },
    defaultPosY: -5,
    defaultScale: 1.1,
  },
  {
    id: 'boutique-glass',
    name: {
      id: 'Toko Kaca Boutique / Cafe Modern',
      en: 'Boutique Retail / Cafe Glass Storefront',
    },
    url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=85',
    desc: {
      id: 'Storefront elegan dengan pintu kaca dan pencahayaan hangat.',
      en: 'Elegant glass storefront with warm ambient lighting.',
    },
    defaultPosY: -18,
    defaultScale: 0.95,
  },
  {
    id: 'concrete-minimalist',
    name: {
      id: 'Dinding Beton & Eksterior Gedung',
      en: 'Minimalist Architectural Concrete Wall',
    },
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
    desc: {
      id: 'Fasad beton polos cocok untuk huruf timbul stainless & neonflex.',
      en: 'Raw architectural concrete facade for stainless & neon lettering.',
    },
    defaultPosY: 0,
    defaultScale: 1.05,
  },
  {
    id: 'night-facade',
    name: {
      id: 'Fasad Komersial Malam Hari (Night View)',
      en: 'Night Commercial Storefront Scene',
    },
    url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1600&q=85',
    desc: {
      id: 'Suasana malam kota untuk menguji pendaran lampu LED & neon.',
      en: 'Evening street ambience to evaluate nighttime LED illumination.',
    },
    defaultPosY: -10,
    defaultScale: 1.0,
  },
];

export const SignageVisualizer: React.FC<SignageVisualizerProps> = ({
  lang,
}) => {
  const isId = lang === 'id';
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Active navigation tab for the configurator
  const [activeTab, setActiveTab] = useState<'type' | 'font' | 'color' | 'size' | 'location'>('type');
  const [isFontDropdownOpen, setIsFontDropdownOpen] = useState(false);

  // Core 3D Configurator State
  const [config, setConfig] = useState<SignageConfig>({
    type: 'huruf-timbul',
    font: 'bold-impact',
    brandName: 'YOUR BRAND',
    subText: 'YOUR DETAILS',
    faceColor: '#F59E0B',
    materialFinish: 'stainless-mirror',
    glowColor: '#F59E0B',
    lightingStyle: 'backlit-halo',
    isNightMode: true,

    widthCm: 240,
    heightCm: 60,
    depthCm: 12,

    posX: 0,
    posY: -12,
    scale: 1.0,
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,

    backgroundImage: LOCATION_PRESETS[0].url,
    isUploadedPhoto: false,
    beforeAfterMode: 'after-only',
    splitPosition: 50,
  });

  // Partial state updater helper
  const handleUpdateConfig = (updater: Partial<SignageConfig>) => {
    setConfig((prev) => ({ ...prev, ...updater }));
  };

  // Upload Custom Location Photo
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          handleUpdateConfig({
            backgroundImage: uploadEvent.target.result as string,
            isUploadedPhoto: true,
            beforeAfterMode: 'split',
            splitPosition: 50,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Rough estimation logic based on dimensions & type
  const calculateRoughEstimate = () => {
    const areaM2 = (config.widthCm * config.heightCm) / 10000;
    let basePrice = 0;

    switch (config.type) {
      case 'huruf-timbul':
        basePrice = Math.max(2500000, Math.round(config.heightCm * 22000 * (config.brandName.length || 10)));
        break;
      case 'neonbox':
        basePrice = Math.max(1800000, Math.round(areaM2 * 1850000));
        break;
      case 'signboard':
        basePrice = Math.max(1200000, Math.round(areaM2 * 1150000));
        break;
      case 'pylon':
        basePrice = Math.max(9500000, Math.round(areaM2 * 3200000 + 4500000));
        break;
      case 'neonflex':
        basePrice = Math.max(1500000, Math.round((config.brandName.length || 10) * 165000));
        break;
    }

    const minPrice = Math.round(basePrice * 0.9);
    const maxPrice = Math.round(basePrice * 1.15);

    return {
      min: minPrice.toLocaleString('id-ID'),
      max: maxPrice.toLocaleString('id-ID'),
    };
  };

  const priceEstimate = calculateRoughEstimate();

  // Current active font object from the expanded categories
  const currentFontOption = FONT_OPTIONS.find((f) => f.id === config.font) || FONT_OPTIONS[0];

  // WhatsApp Pre-filled Consultation Message
  const getWhatsAppUrl = () => {
    const typeLabel = {
      'huruf-timbul': 'Huruf Timbul 3D (Channel Letters)',
      'neonbox': 'Neonbox Akrilik Menyala',
      'signboard': 'Signboard Panel Reklame Fasia',
      'pylon': 'Pylon Sign / Totem Freestanding',
      'neonflex': 'Neonflex LED Tube',
    }[config.type];

    const fontLabel = `${currentFontOption.name} (${currentFontOption.category})`;

    const text = `Halo 2M Advertising, saya ingin konsultasi signage dengan detail hasil visualisasi website:
- Jenis Signage: ${typeLabel}
- Nama Brand / Teks: "${config.brandName || 'YOUR BRAND'}"
- Sub-teks: "${config.subText || 'YOUR DETAILS'}"
- Font Style: ${fontLabel}
- Warna / Material: ${config.faceColor} (${config.materialFinish})
- Pencahayaan: ${config.lightingStyle}
- Ukuran Fisik: ${config.widthCm} cm (Lebar) × ${config.heightCm} cm (Tinggi) × ${config.depthCm} cm (Tebal)
- Foto Lokasi: ${config.isUploadedPhoto ? 'Sudah Ada Foto Lokasi Dinding / Toko' : 'Menggunakan Preset Studio Fasad'}
- Perkiraan Anggaran: Rp ${priceEstimate.min} - Rp ${priceEstimate.max}

Mohon bantuan untuk jadwal survei lapangan dan pembuatan layout teknis gratis.`;

    return `https://wa.me/62811721596?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="space-y-8">
      
      {/* 1. TOP INTERACTIVE 3D CANVAS VIEWPORT */}
      <div className="space-y-3">
        <InteractiveSignageCanvas
          config={config}
          onChangeConfig={handleUpdateConfig}
          lang={lang}
          onOpenUpload={() => fileInputRef.current?.click()}
        />

        {/* Hidden File Input for Location Photo */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileUpload}
        />
      </div>

      {/* 2. CONFIGURATOR NAVIGATION TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 scrollbar-none">
        <button
          onClick={() => setActiveTab('type')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'type'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'
              : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          <Box className="w-4 h-4" />
          <span>1. {isId ? 'Jenis Signage' : 'Signage Type'}</span>
        </button>

        <button
          onClick={() => setActiveTab('font')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'font'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'
              : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          <Type className="w-4 h-4" />
          <span>2. {isId ? 'Font & Teks' : 'Font & Text'}</span>
        </button>

        <button
          onClick={() => setActiveTab('color')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'color'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'
              : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>3. {isId ? 'Warna & Lampu' : 'Color & Light'}</span>
        </button>

        <button
          onClick={() => setActiveTab('size')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'size'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'
              : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          <Ruler className="w-4 h-4" />
          <span>4. {isId ? 'Ukuran & Posisi' : 'Size & Placement'}</span>
        </button>

        <button
          onClick={() => setActiveTab('location')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'location'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'
              : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          <Upload className="w-4 h-4" />
          <span>5. {isId ? 'Foto Lokasi Saya' : 'My Location'}</span>
          {config.isUploadedPhoto && <span className="w-2 h-2 rounded-full bg-emerald-400" />}
        </button>
      </div>

      {/* 3. TAB PANELS */}
      <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-5 sm:p-7">
        
        {/* TAB 1: SIGNAGE TYPE (5 DISTINCT PHYSICAL CONSTRUCTIONS) */}
        {activeTab === 'type' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-black text-white uppercase tracking-tight">
                {isId ? 'Pilih Jenis Reklame / Signage' : 'Select Signage Construction Type'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {isId
                  ? 'Setiap jenis memiliki konstruksi fisik, ketebalan profil 3D, dan karakter pencahayaan yang berbeda secara arsitektural.'
                  : 'Each option features distinct physical construction, 3D return depth, and illumination characteristics.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Option A: Neonbox */}
              <div
                onClick={() => handleUpdateConfig({ type: 'neonbox', lightingStyle: 'frontlit' })}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  config.type === 'neonbox'
                    ? 'bg-blue-950/60 border-blue-500 shadow-xl shadow-blue-950/50 ring-1 ring-blue-400'
                    : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                    <Box className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white leading-snug">
                    A. Neonbox
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {isId
                      ? 'Struktur kotak tertutup dengan list profil aluminium, permukaan akrilik susu tembus cahaya internal LED.'
                      : 'Enclosed box structure with aluminum profile edge, illuminated acrylic face & internal LED diffusion.'}
                  </p>
                </div>
                <div className="text-[10px] font-mono text-blue-400 font-semibold border-t border-slate-800 pt-2">
                  {isId ? 'Profil Kotak 3D' : 'Box Enclosure'}
                </div>
              </div>

              {/* Option B: Huruf Timbul */}
              <div
                onClick={() => handleUpdateConfig({ type: 'huruf-timbul', lightingStyle: 'backlit-halo' })}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  config.type === 'huruf-timbul'
                    ? 'bg-blue-950/60 border-blue-500 shadow-xl shadow-blue-950/50 ring-1 ring-blue-400'
                    : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white leading-snug">
                    B. Huruf Timbul
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {isId
                      ? 'Huruf 3D individual bersudut tegas, kedalaman timbul nyata pada dinding dengan bayangan kontak dan opsi halo backlit.'
                      : 'Individual 3D letters with visible return depth, realistic contact wall shadows & front/halo glow.'}
                  </p>
                </div>
                <div className="text-[10px] font-mono text-amber-400 font-semibold border-t border-slate-800 pt-2">
                  {isId ? 'Huruf 3D Bevel' : '3D Channel Letters'}
                </div>
              </div>

              {/* Option C: Signboard */}
              <div
                onClick={() => handleUpdateConfig({ type: 'signboard', lightingStyle: 'unlit' })}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  config.type === 'signboard'
                    ? 'bg-blue-950/60 border-blue-500 shadow-xl shadow-blue-950/50 ring-1 ring-blue-400'
                    : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    <Building className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white leading-snug">
                    C. Signboard
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {isId
                      ? 'Panel komposit datar (ACP) persegi panjang dengan list bingkai logam & baut standoff penempelan dinding fasia.'
                      : 'Flat architectural composite panel with metal frame border trim & wall standoff spacers.'}
                  </p>
                </div>
                <div className="text-[10px] font-mono text-emerald-400 font-semibold border-t border-slate-800 pt-2">
                  {isId ? 'Panel Datar Fasia' : 'Flat Facade Panel'}
                </div>
              </div>

              {/* Option D: Pylon Sign / Totem */}
              <div
                onClick={() => handleUpdateConfig({ type: 'pylon', posY: 10, scale: 0.95 })}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  config.type === 'pylon'
                    ? 'bg-blue-950/60 border-blue-500 shadow-xl shadow-blue-950/50 ring-1 ring-blue-400'
                    : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                    <Building className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white leading-snug">
                    D. Pylon Sign / Totem
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {isId
                      ? 'Struktur monolit vertikal berdiri mandiri di atas tanah dengan pondasi angkur beton dan panel lampu bersekat.'
                      : 'Freestanding vertical monolith totem with ground concrete foundation anchor & segmented panels.'}
                  </p>
                </div>
                <div className="text-[10px] font-mono text-purple-400 font-semibold border-t border-slate-800 pt-2">
                  {isId ? 'Totem Mandiri Berdiri' : 'Freestanding Monolith'}
                </div>
              </div>

              {/* Option E: Neonflex */}
              <div
                onClick={() => handleUpdateConfig({ type: 'neonflex', lightingStyle: 'dual-glow' })}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  config.type === 'neonflex'
                    ? 'bg-blue-950/60 border-blue-500 shadow-xl shadow-blue-950/50 ring-1 ring-blue-400'
                    : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold">
                    <Flame className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white leading-snug">
                    E. Neonflex
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {isId
                      ? 'Selang silikon fleksibel menyala terang dengan pendaran cahaya kuat dan alas akrilik bening.'
                      : 'Flexible illuminated silicone tubing with vibrant continuous light spill on transparent acrylic backer.'}
                  </p>
                </div>
                <div className="text-[10px] font-mono text-pink-400 font-semibold border-t border-slate-800 pt-2">
                  {isId ? 'Selang LED Fleksibel' : 'Glowing Flexible Tube'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FONT SELECTION & CUSTOM TEXT */}
        {activeTab === 'font' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-black text-white uppercase tracking-tight">
                {isId ? 'Pilihan Font & Teks Signage' : 'Font Selection & Letter Geometry'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {isId
                  ? 'Font langsung memengaruhi geometri 3D, ketebalan garis, dan proporsi huruf pada reklame.'
                  : 'Selected font directly updates the physical 3D letter geometry and spacing.'}
              </p>
            </div>

            {/* Custom Text Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-slate-300 font-bold">
                  {isId ? 'Nama brand utama:' : 'Main Brand Name:'}
                </label>
                <input
                  type="text"
                  value={config.brandName}
                  onChange={(e) => handleUpdateConfig({ brandName: e.target.value })}
                  maxLength={30}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold text-sm focus:outline-none focus:border-blue-500 tracking-wide"
                  placeholder="Your Brand"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase text-slate-300 font-bold">
                  {isId ? 'Sub-teks (Opsional):' : 'Sub-Text / Details (Optional):'}
                </label>
                <input
                  type="text"
                  value={config.subText}
                  onChange={(e) => handleUpdateConfig({ subText: e.target.value })}
                  maxLength={40}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500 tracking-wide"
                  placeholder="Your Details"
                />
              </div>
            </div>

            {/* Font Categories in Dropdown Mode */}
            <div className="space-y-2 relative">
              <label className="text-xs font-mono uppercase text-slate-400 font-bold block">
                {isId ? 'Pilih Kategori Gaya Font (Mode Dropdown):' : 'Select Font Style Category (Dropdown Mode):'}
              </label>

              {/* Dropdown Trigger Button */}
              <button
                type="button"
                onClick={() => setIsFontDropdownOpen(!isFontDropdownOpen)}
                className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700 hover:border-blue-500 transition-all flex items-center justify-between text-left cursor-pointer shadow-lg group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold text-sm shrink-0 group-hover:scale-105 transition-transform">
                    <Type className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-blue-950 text-blue-400 border border-blue-800/60 font-semibold">
                        {currentFontOption.category}
                      </span>
                      <span className="text-xs text-slate-400 font-semibold">
                        {currentFontOption.name}
                      </span>
                    </div>
                    <div
                      className="text-lg sm:text-xl font-bold text-white tracking-wide truncate mt-1"
                      style={{ fontFamily: currentFontOption.familyStyle }}
                    >
                      {config.brandName || 'YOUR BRAND'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-slate-400 shrink-0 ml-3">
                  <span className="text-xs font-mono hidden sm:inline text-blue-400 group-hover:underline">
                    {isId ? 'Pilih Gaya Font' : 'Select Font'}
                  </span>
                  <div className="p-1 rounded-lg bg-slate-800 border border-slate-700">
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isFontDropdownOpen ? 'rotate-180 text-blue-400' : 'text-slate-400'}`} />
                  </div>
                </div>
              </button>

              {/* Floating Dropdown Menu */}
              {isFontDropdownOpen && (
                <div className="mt-2 p-2 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl space-y-1.5 z-30 max-h-[460px] overflow-y-auto">
                  <div className="px-3 py-2 text-[11px] font-mono text-slate-400 uppercase border-b border-slate-800 flex justify-between items-center">
                    <span>{isId ? '9 Kategori Gaya Font Tersedia' : '9 Font Style Categories Available'}</span>
                    <span className="text-blue-400 font-bold">{isId ? 'Klik untuk memilih' : 'Click to select'}</span>
                  </div>

                  {FONT_OPTIONS.map((f) => {
                    const isSelected = config.font === f.id;
                    return (
                      <div
                        key={f.id}
                        onClick={() => {
                          handleUpdateConfig({ font: f.id });
                          setIsFontDropdownOpen(false);
                        }}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'bg-blue-950/70 border-blue-500 ring-1 ring-blue-500/60 shadow-md'
                            : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/60'
                        }`}
                      >
                        <div className="min-w-0 space-y-1 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-blue-300 border border-slate-700/60">
                              {f.category}
                            </span>
                            <span className="text-xs text-slate-300 font-semibold">
                              {f.name}
                            </span>
                          </div>

                          <div
                            className="text-lg sm:text-xl font-bold text-white tracking-tight truncate"
                            style={{ fontFamily: f.familyStyle }}
                          >
                            {config.brandName || f.preview}
                          </div>

                          <p className="text-[11px] text-slate-400 leading-snug">
                            {isId ? f.desc.id : f.desc.en}
                          </p>
                        </div>

                        {isSelected && (
                          <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Active Font Characteristics Callout */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                  {isId ? 'Karakter Tipografi Aktif:' : 'Active Typography Character:'}
                </span>
                <p className="text-xs text-slate-200 font-medium">
                  {isId ? currentFontOption.desc.id : currentFontOption.desc.en}
                </p>
              </div>
              <div className="px-3 py-1 rounded-lg bg-blue-950/60 border border-blue-800/60 text-blue-400 text-xs font-mono font-semibold shrink-0">
                {currentFontOption.name}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: COLOR & LIGHTING */}
        {activeTab === 'color' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-black text-white uppercase tracking-tight">
                {isId ? 'Warna Material & Karakter Pencahayaan' : 'Material Finish & Lighting Character'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {isId
                  ? 'Pilih kombinasi warna depan, kilau logam SUS 304, dan rona lampu LED.'
                  : 'Select front face material, SUS 304 metallic sheen, and LED lighting character.'}
              </p>
            </div>

            {/* Material Finish Preset Buttons */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase text-slate-400 font-bold block">
                {isId ? 'Material Permukaan Huruf:' : 'Letter Surface Finish:'}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <button
                  type="button"
                  onClick={() => handleUpdateConfig({ materialFinish: 'stainless-mirror', faceColor: '#F59E0B' })}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    config.materialFinish === 'stainless-mirror'
                      ? 'bg-amber-500/20 border-amber-500 text-white ring-1 ring-amber-400'
                      : 'bg-slate-950 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="text-xs font-bold text-amber-300">Gold Mirror SUS 304</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Kilap Cermin Emas Mewah</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleUpdateConfig({ materialFinish: 'hairline-silver', faceColor: '#E2E8F0' })}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    config.materialFinish === 'hairline-silver'
                      ? 'bg-slate-300/20 border-slate-300 text-white ring-1 ring-slate-300'
                      : 'bg-slate-950 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="text-xs font-bold text-slate-200">Hairline Silver Steel</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Serat Garis Baja Modern</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleUpdateConfig({ materialFinish: 'acrylic' })}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    config.materialFinish === 'acrylic'
                      ? 'bg-blue-500/20 border-blue-500 text-white ring-1 ring-blue-400'
                      : 'bg-slate-950 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="text-xs font-bold text-blue-400">Glossy Acrylic MC</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Warna Solid Berkilau</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleUpdateConfig({ materialFinish: 'matte' })}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    config.materialFinish === 'matte'
                      ? 'bg-purple-500/20 border-purple-500 text-white ring-1 ring-purple-400'
                      : 'bg-slate-950 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="text-xs font-bold text-purple-400">Powder Coat Matte</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Doff Minimalis Tegas</div>
                </button>
              </div>
            </div>

            {/* Curated Color Swatches */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-mono uppercase text-slate-400 font-bold block">
                {isId ? 'Pilihan Palet Warna Utama:' : 'Curated Color Palette:'}
              </span>
              <div className="flex flex-wrap items-center gap-2.5">
                {[
                  { name: 'Putih Bersih', hex: '#FFFFFF' },
                  { name: 'Gold Mirror', hex: '#F59E0B' },
                  { name: 'Silver Steel', hex: '#CBD5E1' },
                  { name: 'Biru Elektrik', hex: '#2563EB' },
                  { name: 'Merah Sinyal', hex: '#DC2626' },
                  { name: 'Hijau Zamrud', hex: '#10B981' },
                  { name: 'Cyan Neon', hex: '#06B6D4' },
                  { name: 'Amber Glow', hex: '#F97316' },
                  { name: 'Hitam Obsidian', hex: '#1E293B' },
                ].map((c) => (
                  <button
                    key={c.hex}
                    type="button"
                    onClick={() => handleUpdateConfig({ faceColor: c.hex, glowColor: c.hex })}
                    className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                      config.faceColor.toLowerCase() === c.hex.toLowerCase()
                        ? 'bg-slate-800 border-white text-white shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full border border-white/30 shadow-xs" style={{ backgroundColor: c.hex }} />
                    <span>{c.name}</span>
                  </button>
                ))}

                {/* Custom Color Input */}
                <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 px-3 py-1 rounded-xl">
                  <span className="text-[11px] text-slate-400">Custom:</span>
                  <input
                    type="color"
                    value={config.faceColor}
                    onChange={(e) => handleUpdateConfig({ faceColor: e.target.value, glowColor: e.target.value })}
                    className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                  />
                  <span className="font-mono text-[11px] text-slate-300 uppercase">{config.faceColor}</span>
                </div>
              </div>
            </div>

            {/* Lighting Style */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-mono uppercase text-slate-400 font-bold block">
                {isId ? 'Tipe Pencahayaan LED:' : 'LED Illumination Style:'}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'backlit-halo' as LightingStyle, label: isId ? 'Backlit / Halo Glow' : 'Backlit / Halo Glow', desc: isId ? 'Pendaran elegan ke dinding' : 'Warm wall bounce illumination' },
                  { id: 'frontlit' as LightingStyle, label: isId ? 'Frontlit (Menyala Depan)' : 'Frontlit (Front Face)', desc: isId ? 'Permukaan huruf menyala' : 'Illuminated face visibility' },
                  { id: 'dual-glow' as LightingStyle, label: isId ? 'Dual Glow (Depan + Belakang)' : 'Dual Glow (Front + Halo)', desc: isId ? 'Kombinasi maksimal 360°' : 'Maximum 360° radiance' },
                  { id: 'unlit' as LightingStyle, label: isId ? 'Non-Lampu (Unlit)' : 'Unlit (No Lighting)', desc: isId ? 'Hanya sorot lampu luar' : 'External spotlight only' },
                ].map((lt) => (
                  <button
                    key={lt.id}
                    type="button"
                    onClick={() => handleUpdateConfig({ lightingStyle: lt.id })}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      config.lightingStyle === lt.id
                        ? 'bg-blue-600/20 border-blue-500 text-white ring-1 ring-blue-400'
                        : 'bg-slate-950 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold">{lt.label}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{lt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SIZE & 3D PLACEMENT CONTROLS */}
        {activeTab === 'size' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-black text-white uppercase tracking-tight">
                {isId ? 'Kontrol Ukuran & Sudut Perspektif 3D' : 'Size Control & 3D Perspective Alignment'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {isId
                  ? 'Sesuaikan dimensi centimeter nyata dan putar sudut perspektif agar selaras dengan foto dinding Anda.'
                  : 'Adjust real-world centimeter scale and tilt perspective to seamlessly match your wall angle.'}
              </p>
            </div>

            {/* Sliders + Numerical Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-4 rounded-xl bg-slate-950 border border-slate-800">
              {/* Width Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-300 font-bold uppercase">{isId ? 'Lebar (Width):' : 'Width:'}</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min={80}
                      max={600}
                      value={config.widthCm}
                      onChange={(e) => handleUpdateConfig({ widthCm: Number(e.target.value) || 80 })}
                      className="w-16 px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-white font-mono text-right text-xs"
                    />
                    <span className="text-slate-400 font-mono text-[11px]">cm</span>
                  </div>
                </div>
                <input
                  type="range"
                  min={80}
                  max={600}
                  step={10}
                  value={config.widthCm}
                  onChange={(e) => handleUpdateConfig({ widthCm: Number(e.target.value) })}
                  className="w-full accent-blue-500 cursor-pointer"
                />
                <span className="text-[10px] text-slate-500 block">Standar ruko: 240 – 400 cm</span>
              </div>

              {/* Height Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-300 font-bold uppercase">{isId ? 'Tinggi (Height):' : 'Height:'}</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min={30}
                      max={250}
                      value={config.heightCm}
                      onChange={(e) => handleUpdateConfig({ heightCm: Number(e.target.value) || 30 })}
                      className="w-16 px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-white font-mono text-right text-xs"
                    />
                    <span className="text-slate-400 font-mono text-[11px]">cm</span>
                  </div>
                </div>
                <input
                  type="range"
                  min={30}
                  max={250}
                  step={5}
                  value={config.heightCm}
                  onChange={(e) => handleUpdateConfig({ heightCm: Number(e.target.value) })}
                  className="w-full accent-blue-500 cursor-pointer"
                />
                <span className="text-[10px] text-slate-500 block">Standar fasia: 60 – 120 cm</span>
              </div>

              {/* Depth Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-300 font-bold uppercase">{isId ? 'Tebal / Timbul (Depth):' : '3D Depth:'}</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min={5}
                      max={40}
                      value={config.depthCm}
                      onChange={(e) => handleUpdateConfig({ depthCm: Number(e.target.value) || 5 })}
                      className="w-16 px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-white font-mono text-right text-xs"
                    />
                    <span className="text-slate-400 font-mono text-[11px]">cm</span>
                  </div>
                </div>
                <input
                  type="range"
                  min={5}
                  max={40}
                  step={1}
                  value={config.depthCm}
                  onChange={(e) => handleUpdateConfig({ depthCm: Number(e.target.value) })}
                  className="w-full accent-blue-500 cursor-pointer"
                />
                <span className="text-[10px] text-slate-500 block">Kedalaman bevel 3D: 8 – 20 cm</span>
              </div>
            </div>

            {/* 3D Perspective & Tilt Alignment Controls */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono uppercase text-slate-400 font-bold block">
                {isId ? 'Penyesuaian Kemiringan Sudut Dinding (3D Perspective):' : '3D Perspective Wall Angle Alignment:'}
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">Kemiringan Samping (Rotasi Y)</span>
                    <span className="font-mono text-blue-400">{config.rotateY}°</span>
                  </div>
                  <input
                    type="range"
                    min={-40}
                    max={40}
                    value={config.rotateY}
                    onChange={(e) => handleUpdateConfig({ rotateY: Number(e.target.value) })}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-500">Sesuaikan jika foto dinding diambil dari sudut serong</span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">Kemiringan Atas/Bawah (Rotasi X)</span>
                    <span className="font-mono text-blue-400">{config.rotateX}°</span>
                  </div>
                  <input
                    type="range"
                    min={-35}
                    max={35}
                    value={config.rotateX}
                    onChange={(e) => handleUpdateConfig({ rotateX: Number(e.target.value) })}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-500">Sesuaikan jika kamera mendongak ke lantai atas</span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300">Perbesaran / Skala (Scale)</span>
                    <span className="font-mono text-blue-400">{Math.round(config.scale * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min={0.6}
                    max={1.8}
                    step={0.05}
                    value={config.scale}
                    onChange={(e) => handleUpdateConfig({ scale: Number(e.target.value) })}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-500">Kecilkan / besarkan proporsi visual</span>
                </div>
              </div>
            </div>

            {/* Quick Placement Positions */}
            <div className="flex items-center gap-2 pt-1 flex-wrap">
              <span className="text-xs font-mono text-slate-400 mr-2">{isId ? 'Posisi Cepat:' : 'Quick Positions:'}</span>
              <button
                type="button"
                onClick={() => handleUpdateConfig({ posX: 0, posY: -22 })}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer"
              >
                {isId ? 'Zona Fasia Atas' : 'Upper Fascia'}
              </button>
              <button
                type="button"
                onClick={() => handleUpdateConfig({ posX: 0, posY: 0 })}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer"
              >
                {isId ? 'Tengah Dinding' : 'Center Wall'}
              </button>
              <button
                type="button"
                onClick={() => handleUpdateConfig({ posX: 0, posY: 18 })}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer"
              >
                {isId ? 'Area Masuk / Lantai 1' : 'Entrance Level'}
              </button>
              <button
                type="button"
                onClick={() => handleUpdateConfig({ posX: 0, posY: -10, rotateX: 0, rotateY: 0, rotateZ: 0, scale: 1.0 })}
                className="px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/40 text-xs font-semibold cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{isId ? 'Reset Posisi Standar' : 'Reset Default'}</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 5: UPLOAD MY LOCATION / SURFACE */}
        {activeTab === 'location' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-black text-white uppercase tracking-tight">
                {isId ? 'Upload Foto Lokasi Pemasangan Signage Anda' : 'Upload Your Location / Installation Surface'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                {isId
                  ? 'Gunakan foto nyata toko, dinding ruko, atau gedung Anda agar signage langsung divisualisasikan pada tempat aslinya.'
                  : 'Upload an actual photo of your building, storefront, or wall to immediately inspect the signage in situ.'}
              </p>
            </div>

            {/* Prominent Upload Dropzone */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="p-8 sm:p-10 rounded-2xl border-2 border-dashed border-blue-500/50 hover:border-blue-400 bg-blue-950/20 hover:bg-blue-950/30 text-center transition-all cursor-pointer space-y-3 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-600/20 text-blue-400 mx-auto flex items-center justify-center transition-transform group-hover:scale-110">
                <Upload className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <h4 className="text-base font-bold text-white">
                  {isId ? 'Klik untuk Upload Foto Lokasi' : 'Click to Upload Location Photo'}
                </h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  {isId
                    ? 'Upload foto toko, dinding, gedung, atau area tempat signage akan dipasang (JPG, PNG, WebP).'
                    : 'Upload photo of storefront, building facade, wall, entrance, or outdoor area.'}
                </p>
              </div>

              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md">
                  <ImageIcon className="w-4 h-4" />
                  <span>{isId ? 'Pilih Foto dari Galeri / Kamera' : 'Choose Photo from Device'}</span>
                </span>
              </div>
            </div>

            {/* Curated Pre-loaded Indonesian Architectural Environments */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono uppercase text-slate-400 font-bold block">
                {isId ? 'Atau Pilih Preset Fasad Komersial Siap Pakai:' : 'Or Select a Pre-Loaded Architectural Preset:'}
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {LOCATION_PRESETS.map((loc) => (
                  <div
                    key={loc.id}
                    onClick={() =>
                      handleUpdateConfig({
                        backgroundImage: loc.url,
                        isUploadedPhoto: false,
                        posY: loc.defaultPosY,
                        scale: loc.defaultScale,
                      })
                    }
                    className={`rounded-xl border overflow-hidden transition-all cursor-pointer flex flex-col justify-between ${
                      config.backgroundImage === loc.url && !config.isUploadedPhoto
                        ? 'border-blue-500 ring-2 ring-blue-400/50 shadow-lg'
                        : 'border-slate-800 hover:border-slate-700 bg-slate-900/60'
                    }`}
                  >
                    <div className="h-28 w-full bg-cover bg-center" style={{ backgroundImage: `url(${loc.url})` }} />
                    <div className="p-3 space-y-1">
                      <div className="text-xs font-bold text-white">{loc.name[lang]}</div>
                      <div className="text-[11px] text-slate-400 line-clamp-1">{loc.desc[lang]}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* 4. ROUGH ESTIMATION & SPECIFICATION SUMMARY */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950/80 border border-slate-800 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-bold">
            <Calculator className="w-3.5 h-3.5" />
            <span>{isId ? 'Estimasi Kasar Biaya Produksi Workshop' : 'Workshop Rough Cost Estimate'}</span>
          </div>

          <div className="text-2xl sm:text-3xl font-black text-white">
            Rp {priceEstimate.min} – {priceEstimate.max}
          </div>

          <p className="text-xs text-slate-400 max-w-xl">
            {isId
              ? `Estimasi mencakup ${config.widthCm}×${config.heightCm} cm ${config.type.toUpperCase()}, struktur rangka pipa/baja, modul LED weatherproof IP68, adaptor trafo, dan garansi workshop 2M Advertising.`
              : `Estimate includes ${config.widthCm}×${config.heightCm} cm fabrication, welded steel framework, IP68 weatherproof LEDs, power supply, and 2M warranty.`}
          </p>
        </div>
      </div>

      {/* 5. CTA SECTION (AS REQUESTED BY USER) */}
      <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-8 sm:p-10 text-center space-y-6">
        <div className="space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold">
            SUDAH PUNYA BAYANGAN?
          </span>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight uppercase">
            Konsultasikan Desain Anda
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
            {isId
              ? 'Kirimkan konfigurasi visual reklame yang baru saja Anda buat ke tim teknis 2M Advertising. Kami siap melakukan survei ukuran langsung ke lokasi toko Anda dan menerbitkan surat penawaran resmi (RAB).'
              : 'Forward your configured visual simulation directly to our technical engineering department. We offer free physical site surveys and formal itemized quotations.'}
          </p>
        </div>

        <div className="pt-2">
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-emerald-950/50 hover:scale-105 transition-all cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            <span>Konsultasi via WhatsApp</span>
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-slate-400 text-xs">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{isId ? 'Survei Lapangan Gratis' : 'Free On-Site Survey'}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-blue-400" />
            <span>{isId ? 'Gambar Kerja Arsitektural CAD' : 'Architectural CAD Drawings'}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span>{isId ? 'Bantuan Izin Resmi BPPRD & Satpol PP' : 'Official Municipal Permit Handling'}</span>
          </span>
        </div>
      </div>

    </div>
  );
};
