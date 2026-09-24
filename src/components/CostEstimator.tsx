import React, { useState, useMemo, useEffect } from 'react';
import { Language } from '../types';
import { 
  Calculator, MessageCircle, Copy, Check, Sparkles, 
  Layers, MapPin, ArrowRight, CheckCircle2, HelpCircle,
  Lightbulb, Building2, Store, Sliders, ChevronDown
} from 'lucide-react';

interface CostEstimatorProps {
  lang: Language;
  preselectedServiceId?: string;
}

export function formatRupiah(amount: number): string {
  return 'Rp ' + amount.toLocaleString('id-ID');
}

// 9 Standard Product Categories
export type ProductCategoryId = 
  | 'neonbox'
  | 'pylon-sign'
  | 'lettering-3d'
  | 'signboard'
  | 'billboard'
  | 'acrylic-signs'
  | 'wayfinding'
  | 'led-flexy'
  | 'store-branding';

interface ProductOption {
  id: string;
  name: { id: string; en: string };
  shortDesc: { id: string; en: string };
  startingPriceLabel: { id: string; en: string };
  rate?: number; // per m2 or per cm
  unit?: 'm2' | 'cm';
  isConsultationOnly?: boolean;
}

interface ProductCategoryConfig {
  id: ProductCategoryId;
  name: { id: string; en: string };
  unitType?: 'm2' | 'cm' | 'consultation';
  options?: ProductOption[];
  isLocationConsultation?: boolean; // Billboard
  isDirectConsultation?: boolean;   // Store branding
}

const PRODUCT_CATEGORIES: ProductCategoryConfig[] = [
  {
    id: 'neonbox',
    name: { id: '1. Neonbox Acrylic & Backlite', en: '1. Acrylic & Backlite Neonbox' },
    unitType: 'm2',
    options: [
      {
        id: 'standard',
        name: { id: 'Standard Komersial', en: 'Commercial Standard' },
        shortDesc: { id: 'Praktis untuk kebutuhan komersial', en: 'Practical for commercial storefronts' },
        startingPriceLabel: { id: 'Mulai dari Rp 450.000/m²', en: 'From Rp 450,000/m²' },
        rate: 450000,
        unit: 'm2',
      },
      {
        id: 'premium',
        name: { id: 'Premium Heavy-Duty', en: 'Premium Heavy-Duty' },
        shortDesc: { id: 'Lebih kokoh untuk jangka panjang', en: 'High durability for long-term use' },
        startingPriceLabel: { id: 'Mulai dari Rp 1.200.000/m²', en: 'From Rp 1,200,000/m²' },
        rate: 1200000,
        unit: 'm2',
      },
    ],
  },
  {
    id: 'pylon-sign',
    name: { id: '2. Pylon Sign / Totem Tower', en: '2. Pylon Sign / Totem Tower' },
    unitType: 'm2',
    options: [
      {
        id: 'standard',
        name: { id: 'Standard Komersial — Backlite', en: 'Commercial Standard — Backlite' },
        shortDesc: { id: 'Efisien untuk branding area', en: 'Efficient for site & entrance branding' },
        startingPriceLabel: { id: 'Mulai dari Rp 550.000/m²', en: 'From Rp 550,000/m²' },
        rate: 550000,
        unit: 'm2',
      },
      {
        id: 'premium',
        name: { id: 'Premium Heavy-Duty — ACP', en: 'Premium Heavy-Duty — ACP' },
        shortDesc: { id: 'Kokoh untuk penggunaan outdoor', en: 'Heavy-duty ACP finish for outdoor durability' },
        startingPriceLabel: { id: 'Mulai dari Rp 1.400.000/m²', en: 'From Rp 1,400,000/m²' },
        rate: 1400000,
        unit: 'm2',
      },
      {
        id: 'custom',
        name: { id: 'Custom — Running Text', en: 'Custom — Dynamic LED Running Text' },
        shortDesc: { id: 'Dilengkapi tampilan LED dinamis', en: 'Integrated with programmable LED display' },
        startingPriceLabel: { id: 'Mulai dari Rp 600.000/m²', en: 'From Rp 600,000/m²' },
        rate: 600000,
        unit: 'm2',
      },
    ],
  },
  {
    id: 'lettering-3d',
    name: { id: '3. Huruf Timbul 3D', en: '3. 3D Channel Letters' },
    unitType: 'cm',
    options: [
      {
        id: 'standard',
        name: { id: 'Standard Komersial — Acrylic', en: 'Commercial Standard — Acrylic' },
        shortDesc: { id: 'Clean, ringan, dan ekonomis', en: 'Clean, lightweight, and cost-effective' },
        startingPriceLabel: { id: 'Mulai dari Rp 4.000/cm', en: 'From Rp 4,000/cm' },
        rate: 4000,
        unit: 'cm',
      },
      {
        id: 'premium',
        name: { id: 'Premium Heavy-Duty — Stainless Steel', en: 'Premium Heavy-Duty — Stainless Steel' },
        shortDesc: { id: 'Premium, kokoh, dan tahan lama', en: 'Prestige finish, sturdy, and weather-resistant' },
        startingPriceLabel: { id: 'Mulai dari Rp 12.000/cm', en: 'From Rp 12,000/cm' },
        rate: 12000,
        unit: 'cm',
      },
    ],
  },
  {
    id: 'signboard',
    name: { id: '4. Signboard / Plang Toko', en: '4. Store Signboard / Shop Plaque' },
    unitType: 'm2',
    options: [
      {
        id: 'standard',
        name: { id: 'Standard Komersial — Backlite', en: 'Commercial Standard — Backlite' },
        shortDesc: { id: 'Praktis untuk kebutuhan toko', en: 'Practical for storefront fascia' },
        startingPriceLabel: { id: 'Mulai dari Rp 450.000/m²', en: 'From Rp 450,000/m²' },
        rate: 450000,
        unit: 'm2',
      },
      {
        id: 'premium',
        name: { id: 'Premium Heavy-Duty — Acrylic', en: 'Premium Heavy-Duty — Acrylic' },
        shortDesc: { id: 'Lebih premium untuk tampilan elegan', en: 'More premium finish for high-end look' },
        startingPriceLabel: { id: 'Mulai dari Rp 1.200.000/m²', en: 'From Rp 1,200,000/m²' },
        rate: 1200000,
        unit: 'm2',
      },
      {
        id: 'custom',
        name: { id: 'Custom — ACP & 3D Lettering', en: 'Custom — ACP & 3D Lettering' },
        shortDesc: { id: 'Custom sesuai identitas brand', en: 'Fully customized to corporate brand identity' },
        startingPriceLabel: { id: 'Mulai dari Rp 1.500.000/m²', en: 'From Rp 1,500,000/m²' },
        rate: 1500000,
        unit: 'm2',
      },
    ],
  },
  {
    id: 'billboard',
    name: { id: '5. Billboard', en: '5. Highway & City Billboard' },
    unitType: 'consultation',
    isLocationConsultation: true,
  },
  {
    id: 'acrylic-signs',
    name: { id: '6. Acrylic Signage / Plakat', en: '6. Acrylic Signage & Plaques' },
    unitType: 'cm',
    options: [
      {
        id: 'custom',
        name: { id: 'Custom', en: 'Custom Architectural Acrylic' },
        shortDesc: { id: 'Dibuat sesuai desain kebutuhan', en: 'Fabricated exactly to custom architectural specs' },
        startingPriceLabel: { id: 'Mulai dari Rp 4.000/cm', en: 'From Rp 4,000/cm' },
        rate: 4000,
        unit: 'cm',
      },
    ],
  },
  {
    id: 'wayfinding',
    name: { id: '7. Wayfinding / Navigasi Gedung', en: '7. Wayfinding & Building Navigation' },
    unitType: 'cm',
    options: [
      {
        id: 'standard',
        name: { id: 'Standard Komersial — Acrylic', en: 'Commercial Standard — Acrylic' },
        shortDesc: { id: 'Praktis untuk navigasi area', en: 'Clear directional layout for facility navigation' },
        startingPriceLabel: { id: 'Mulai dari Rp 4.000/cm', en: 'From Rp 4,000/cm' },
        rate: 4000,
        unit: 'cm',
      },
      {
        id: 'premium',
        name: { id: 'Premium Heavy-Duty — Stainless Steel', en: 'Premium Heavy-Duty — Stainless Steel' },
        shortDesc: { id: 'Elegan dan tahan penggunaan', en: 'Elegant and durable against high foot-traffic wear' },
        startingPriceLabel: { id: 'Mulai dari Rp 12.000/cm', en: 'From Rp 12,000/cm' },
        rate: 12000,
        unit: 'cm',
      },
      {
        id: 'custom',
        name: { id: 'Custom — Standing ACP / Stainless', en: 'Custom — Freestanding Totem ACP / Stainless' },
        shortDesc: { id: 'Custom untuk kebutuhan khusus', en: 'Custom engineered for specific corporate facilities' },
        startingPriceLabel: { id: 'Konsultasi via WhatsApp', en: 'Consult via WhatsApp' },
        isConsultationOnly: true,
      },
    ],
  },
  {
    id: 'led-flexy',
    name: { id: '8. Custom LED NeonFlex', en: '8. Custom LED NeonFlex' },
    unitType: 'm2',
    options: [
      {
        id: 'standard',
        name: { id: 'Standard Komersial', en: 'Commercial Standard' },
        shortDesc: { id: 'Fleksibel untuk signage dekoratif', en: 'Flexible silicone tube for decorative cafe & interior branding' },
        startingPriceLabel: { id: 'Mulai dari Rp 400.000/m²', en: 'From Rp 400,000/m²' },
        rate: 400000,
        unit: 'm2',
      },
    ],
  },
  {
    id: 'store-branding',
    name: { id: '9. Store Branding & Custom Fixture', en: '9. Store Branding & Custom Fixtures' },
    unitType: 'consultation',
    isDirectConsultation: true,
  },
];

const BILLBOARD_LOCATIONS = [
  'Bandar Lampung',
  'Pringsewu',
  'Metro',
  'Unit 2',
  'Jakarta',
];

export const CostEstimator: React.FC<CostEstimatorProps> = ({
  lang,
  preselectedServiceId,
}) => {
  const isId = lang === 'id';

  // State 1: Selected Category
  const [selectedCategoryId, setSelectedCategoryId] = useState<ProductCategoryId>('neonbox');

  // State 2: Selected Option in Category
  const [selectedOptionId, setSelectedOptionId] = useState<string>('standard');

  // State 3: Dimensions
  const [widthMeters, setWidthMeters] = useState<number>(3.0);
  const [heightMeters, setHeightMeters] = useState<number>(1.0);
  const [heightCm, setHeightCm] = useState<number>(25);
  const [charCount, setCharCount] = useState<number>(10);

  // State 4: Optional Lighting Add-on (Lampu Sorot Philips)
  const [hasSpotlight, setHasSpotlight] = useState<boolean>(false);
  const [spotlightQty, setSpotlightQty] = useState<number>(2);

  // State 5: Billboard Location
  const [billboardLocation, setBillboardLocation] = useState<string>('Bandar Lampung');

  // Copy notification state
  const [copied, setCopied] = useState<boolean>(false);

  // Sync if preselectedServiceId is provided
  useEffect(() => {
    if (preselectedServiceId) {
      const match = PRODUCT_CATEGORIES.find((c) => c.id === preselectedServiceId);
      if (match) {
        setSelectedCategoryId(match.id);
        if (match.options && match.options.length > 0) {
          setSelectedOptionId(match.options[0].id);
        }
      }
    }
  }, [preselectedServiceId]);

  // Current Category Configuration
  const currentCategory = useMemo(() => {
    return PRODUCT_CATEGORIES.find((c) => c.id === selectedCategoryId) || PRODUCT_CATEGORIES[0];
  }, [selectedCategoryId]);

  // Handle Category Change from embedded Dropdown
  const handleCategoryChange = (catId: ProductCategoryId) => {
    setSelectedCategoryId(catId);
    const cat = PRODUCT_CATEGORIES.find((c) => c.id === catId);
    if (cat?.options && cat.options.length > 0) {
      setSelectedOptionId(cat.options[0].id);
    }
  };

  // Current Selected Option
  const currentOption = useMemo(() => {
    if (!currentCategory.options) return null;
    return currentCategory.options.find((opt) => opt.id === selectedOptionId) || currentCategory.options[0];
  }, [currentCategory, selectedOptionId]);

  // Calculations
  const calculation = useMemo(() => {
    if (currentCategory.isLocationConsultation || currentCategory.isDirectConsultation) {
      return { isConsultation: true };
    }

    if (currentOption?.isConsultationOnly) {
      return { isConsultation: true, optionConsultation: true };
    }

    const rate = currentOption?.rate || 0;
    const unit = currentOption?.unit || 'm2';

    let baseCost = 0;
    let measureSummary = '';

    if (unit === 'm2') {
      const area = Math.max(0.1, Number((widthMeters * heightMeters).toFixed(2)));
      baseCost = Math.round(area * rate);
      measureSummary = `${widthMeters} m × ${heightMeters} m = ${area} m²`;
    } else {
      const totalCm = Math.max(1, heightCm * charCount);
      baseCost = Math.round(totalCm * rate);
      measureSummary = isId
        ? `${heightCm} cm × ${charCount} unit/huruf = ${totalCm} cm`
        : `${heightCm} cm × ${charCount} units/letters = ${totalCm} cm`;
    }

    // Optional Spotlight Add-on
    const spotlightCost = hasSpotlight ? spotlightQty * 300000 : 0;
    const totalEstimatedPrice = baseCost + spotlightCost;

    return {
      isConsultation: false,
      baseCost,
      measureSummary,
      unit,
      spotlightCost,
      totalEstimatedPrice,
      formattedBaseCost: formatRupiah(baseCost),
      formattedSpotlightCost: formatRupiah(spotlightCost),
      formattedTotal: formatRupiah(totalEstimatedPrice),
    };
  }, [
    isId,
    currentCategory,
    currentOption,
    widthMeters,
    heightMeters,
    heightCm,
    charCount,
    hasSpotlight,
    spotlightQty,
  ]);

  // Pre-filled WhatsApp Link Generator
  const waLink = useMemo(() => {
    let msg = '';
    const catName = currentCategory.name[isId ? 'id' : 'en'];
    const optName = currentOption?.name[isId ? 'id' : 'en'] || '';

    if (isId) {
      msg = `Halo 2M Advertising, saya ingin konsultasi estimasi proyek:\n`;
      if (currentCategory.id === 'billboard') {
        msg += `• Produk: Billboard\n`;
        msg += `• Lokasi Titik: ${billboardLocation}\n`;
        msg += `Mohon informasi ketersediaan titik dan penawaran harga sewa/konstruksi.`;
      } else if (currentCategory.id === 'store-branding') {
        msg += `• Produk: Store Branding & Custom Fixture\n`;
        msg += `Mohon informasi jadwal survei lokasi dan estimasi quotation custom.`;
      } else if (currentOption?.isConsultationOnly) {
        msg += `• Produk: ${catName}\n`;
        msg += `• Opsi: ${optName}\n`;
        msg += `Mohon konsultasi teknis spesifikasi dan estimasi harga kustom.`;
      } else {
        msg += `• Produk: ${catName}\n`;
        msg += `• Tipe Material: ${optName}\n`;
        if (currentOption?.unit === 'm2') {
          msg += `• Ukuran: ${widthMeters} m (L) × ${heightMeters} m (T)\n`;
        } else {
          msg += `• Dimensi: ${heightCm} cm × ${charCount} unit/huruf\n`;
        }
        if (hasSpotlight) {
          msg += `• Lampu Sorot Philips: Ya (${spotlightQty} pcs)\n`;
        }
        msg += `• Estimasi Awal: Mulai dari ${calculation.formattedTotal || 'Rp 0'}\n`;
        msg += `Mohon info survei lokasi dan detail penawaran RAB resmi.`;
      }
    } else {
      msg = `Hello 2M Advertising, I would like to consult on a project cost estimate:\n`;
      if (currentCategory.id === 'billboard') {
        msg += `• Product: Billboard\n`;
        msg += `• Location: ${billboardLocation}\n`;
        msg += `Please provide information regarding site availability and rental/construction proposals.`;
      } else if (currentCategory.id === 'store-branding') {
        msg += `• Product: Store Branding & Custom Fixture\n`;
        msg += `Please provide information regarding site survey schedule and custom quotation.`;
      } else if (currentOption?.isConsultationOnly) {
        msg += `• Product: ${catName}\n`;
        msg += `• Option: ${optName}\n`;
        msg += `Please provide technical specification consultation and custom estimate.`;
      } else {
        msg += `• Product: ${catName}\n`;
        msg += `• Material Option: ${optName}\n`;
        if (currentOption?.unit === 'm2') {
          msg += `• Dimensions: ${widthMeters} m (W) × ${heightMeters} m (H)\n`;
        } else {
          msg += `• Dimensions: ${heightCm} cm × ${charCount} units/letters\n`;
        }
        if (hasSpotlight) {
          msg += `• Philips Spotlights: Yes (${spotlightQty} pcs)\n`;
        }
        msg += `• Preliminary Estimate: Starting from ${calculation.formattedTotal || 'Rp 0'}\n`;
        msg += `Please provide on-site survey details and formal quotation proposal.`;
      }
    }

    return `https://wa.me/6287878952077?text=${encodeURIComponent(msg)}`;
  }, [
    isId,
    currentCategory,
    currentOption,
    billboardLocation,
    widthMeters,
    heightMeters,
    heightCm,
    charCount,
    hasSpotlight,
    spotlightQty,
    calculation,
  ]);

  // Handle Copy Specifications Text
  const handleCopySpecs = () => {
    const catName = currentCategory.name[isId ? 'id' : 'en'];
    const optName = currentOption?.name[isId ? 'id' : 'en'] || '';

    let text = '';
    if (isId) {
      text = `2M Advertising - Estimasi Proyek Reklame\n`;
      text += `Produk: ${catName}\n`;
      if (currentOption) {
        text += `Pilihan: ${optName}\n`;
      }
      if (currentOption?.unit === 'm2') {
        text += `Dimensi: ${widthMeters} m × ${heightMeters} m (${(widthMeters * heightMeters).toFixed(2)} m²)\n`;
      } else if (currentOption?.unit === 'cm') {
        text += `Dimensi: ${heightCm} cm × ${charCount} unit (${heightCm * charCount} cm)\n`;
      }
      if (hasSpotlight) {
        text += `Lampu Sorot Philips: ${spotlightQty} pcs (${formatRupiah(spotlightQty * 300000)})\n`;
      }
      if (!calculation.isConsultation) {
        text += `Estimasi Harga: Mulai dari ${calculation.formattedTotal}\n`;
      }
      text += `*Harga merupakan estimasi awal dan dapat berubah sesuai desain, material, ukuran, finishing, instalasi, dan kondisi proyek.`;
    } else {
      text = `2M Advertising - Signage Project Estimate\n`;
      text += `Product: ${catName}\n`;
      if (currentOption) {
        text += `Option: ${optName}\n`;
      }
      if (currentOption?.unit === 'm2') {
        text += `Dimensions: ${widthMeters} m × ${heightMeters} m (${(widthMeters * heightMeters).toFixed(2)} m²)\n`;
      } else if (currentOption?.unit === 'cm') {
        text += `Dimensions: ${heightCm} cm × ${charCount} units (${heightCm * charCount} cm)\n`;
      }
      if (hasSpotlight) {
        text += `Philips Spotlights: ${spotlightQty} pcs (${formatRupiah(spotlightQty * 300000)})\n`;
      }
      if (!calculation.isConsultation) {
        text += `Price Estimate: Starting from ${calculation.formattedTotal}\n`;
      }
      text += `*Price is a preliminary estimate and may vary depending on design, material, dimensions, finishing, installation, and on-site conditions.`;
    }

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="estimator-section" className="py-12 sm:py-16 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* SECTION HEADER: Clean world-class styling, no pill badge, no highlight */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700">
            <Calculator className="w-3.5 h-3.5 text-blue-600" />
            <span>{isId ? 'Estimator Harga Reklame 2M Advertising' : '2M Advertising Signage Cost Estimator'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight uppercase">
            {isId ? 'Kalkulator Estimasi Biaya & Spesifikasi Reklame' : 'Signage Cost & Specification Estimator'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {isId
              ? 'Hitung perkiraan biaya awal proyek reklame Anda secara transparan. Pilih kategori produk dari menu dropdown di bawah untuk melihat pilihan spesifikasi.'
              : 'Calculate transparent preliminary costs for your signage project. Select a product category from the dropdown below to explore technical options.'}
          </p>
        </div>

        {/* UNIFIED 2-COLUMN CALCULATOR INTERFACE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: CONTROLS & SPECIFICATIONS (7 Cols) */}
          <div className="lg:col-span-7 bg-slate-50/90 rounded-2xl border border-slate-200/90 p-6 sm:p-7 space-y-6 shadow-sm">
            
            {/* EMBEDDED STEP 1: DROPDOWN SELECTION */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-blue-700 font-mono">
                  {isId ? '1. Pilih Kategori Produk Reklame' : '1. Select Signage Product Category'}
                </label>
                <span className="text-[11px] font-medium text-slate-500">
                  {isId ? '9 Kategori Tersedia' : '9 Categories Available'}
                </span>
              </div>
              
              <div className="relative">
                <select
                  value={selectedCategoryId}
                  onChange={(e) => handleCategoryChange(e.target.value as ProductCategoryId)}
                  className="w-full appearance-none px-4 py-3.5 pr-10 rounded-xl bg-white border border-slate-300 text-slate-950 font-bold text-sm shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 cursor-pointer transition-all"
                >
                  {PRODUCT_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id} className="text-slate-900 font-medium py-1">
                      {cat.name[isId ? 'id' : 'en']}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* BILLBOARD SPECIFIC FLOW: SELECT LOCATION */}
            {currentCategory.id === 'billboard' && (
              <div className="space-y-4 pt-2 border-t border-slate-200">
                <div className="space-y-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-blue-700 font-mono">
                    {isId ? '2. Pilih Lokasi Titik Billboard' : '2. Select Billboard Location'}
                  </label>
                  <p className="text-xs text-slate-600">
                    {isId
                      ? 'Pilih kota atau koridor jalan strategis untuk penempatan billboard:'
                      : 'Select a strategic city or road corridor for billboard placement:'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {BILLBOARD_LOCATIONS.map((loc) => {
                    const isSelected = billboardLocation === loc;
                    return (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => setBillboardLocation(loc)}
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-blue-50/80 border-blue-600 text-blue-950 shadow-xs ring-1 ring-blue-600/30 font-bold'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className={`w-4 h-4 ${isSelected ? 'text-red-600' : 'text-slate-400'}`} />
                          <span className="text-xs sm:text-sm">{loc}</span>
                        </div>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-blue-600" />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 text-xs text-slate-700 shadow-xs">
                  <div className="font-bold text-slate-900 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-blue-600" />
                    <span>{isId ? 'Informasi Titik & Sewa Billboard' : 'Billboard Site & Rental Information'}</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    {isId
                      ? 'Harga sewa titik dan pajak billboard ditentukan oleh klasifikasi jalan (Protokol/Kolektor), sudut pandang lalu lintas, serta ukuran rangka konstruksi. Tim kami siap mengirimkan denah titik yang sedang kosong beserta penawaran resmi.'
                      : 'Billboard rental rates and municipal advertising taxes depend on street classification (Protocol/Collector), traffic visibility, and structural dimensions. Our team will provide available site layouts and formal proposals.'}
                  </p>
                </div>
              </div>
            )}

            {/* STORE BRANDING SPECIFIC FLOW */}
            {currentCategory.id === 'store-branding' && (
              <div className="space-y-4 pt-2 border-t border-slate-200">
                <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-3 shadow-xs">
                  <div className="flex items-center gap-2 text-blue-700">
                    <Store className="w-5 h-5" />
                    <h4 className="text-sm font-bold uppercase tracking-wider">
                      {isId ? 'Fabrikasi Custom Fixture & Store Branding' : 'Custom Fixture Fabrication & Store Branding'}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {isId
                      ? 'Store branding dan perlengkapan toko (fascia ACP, display cabinet, neon lighting khusus) dikerjakan secara custom mengikuti panduan identitas brand, gambar kerja arsitektur, serta dimensi spesifik outlet Anda.'
                      : 'Store branding and retail fixtures (ACP fascia, display cabinets, custom neon lighting) are custom fabricated to your brand guidelines, architectural drawings, and store dimensions.'}
                  </p>
                  <div className="pt-2 text-xs font-semibold text-slate-800">
                    {isId
                      ? 'Hubungi spesialis kami untuk konsultasi denah layout, peninjauan gambar kerja teknis, atau jadwal survei lokasi.'
                      : 'Contact our specialists for layout consultations, technical drawing reviews, or on-site survey scheduling.'}
                  </div>
                </div>
              </div>
            )}

            {/* STANDARD PRODUCT FLOW: STEP 2 (OPTIONS SELECTION) */}
            {currentCategory.options && currentCategory.options.length > 0 && (
              <div className="space-y-2.5 pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-blue-700 font-mono">
                    {isId ? '2. Pilih Opsi Material & Spesifikasi' : '2. Select Material & Specification Option'}
                  </label>
                  <span className="text-[11px] text-slate-500">{isId ? 'Pilih salah satu' : 'Select one'}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentCategory.options.map((opt) => {
                    const isSelected = selectedOptionId === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedOptionId(opt.id)}
                        className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2.5 ${
                          isSelected
                            ? 'bg-blue-50/80 border-blue-600 text-blue-950 shadow-xs ring-1 ring-blue-600/30'
                            : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs sm:text-sm font-bold text-slate-950 tracking-tight">
                              {opt.name[isId ? 'id' : 'en']}
                            </h4>
                            {isSelected && (
                              <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                            )}
                          </div>
                          <p className="text-[11px] text-slate-600 leading-relaxed">
                            {opt.shortDesc[isId ? 'id' : 'en']}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-xs font-bold text-blue-700 font-mono">
                            {opt.startingPriceLabel[isId ? 'id' : 'en']}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 3: MEASUREMENT FIELDS */}
            {currentOption && !currentOption.isConsultationOnly && (
              <div className="space-y-3 pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-blue-700 font-mono">
                    {isId ? '3. Masukkan Dimensi / Ukuran' : '3. Enter Dimensions / Size'}
                  </label>
                  <span className="text-[11px] text-slate-500">
                    {isId
                      ? (currentOption.unit === 'm2' ? 'Satuan: Meter (m²)' : 'Satuan: Sentimeter (cm)')
                      : (currentOption.unit === 'm2' ? 'Unit: Meters (m²)' : 'Unit: Centimeters (cm)')}
                  </span>
                </div>

                {/* For products priced per m2 */}
                {currentOption.unit === 'm2' && (
                  <div className="space-y-2.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          {isId ? 'Lebar (Meter)' : 'Width (Meters)'}
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            step="0.1"
                            min="0.5"
                            max="50"
                            value={widthMeters}
                            onChange={(e) => setWidthMeters(parseFloat(e.target.value) || 0.5)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 shadow-xs"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-mono">
                            {isId ? 'meter' : 'meters'}
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          {isId ? 'Tinggi (Meter)' : 'Height (Meters)'}
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            step="0.1"
                            min="0.3"
                            max="30"
                            value={heightMeters}
                            onChange={(e) => setHeightMeters(parseFloat(e.target.value) || 0.3)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 shadow-xs"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-mono">
                            {isId ? 'meter' : 'meters'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-white border border-slate-200 flex items-center justify-between text-xs text-slate-700">
                      <span>{isId ? 'Total Luas Reklame:' : 'Total Signage Area:'}</span>
                      <span className="font-mono font-bold text-blue-700">
                        {widthMeters} m × {heightMeters} m = {(widthMeters * heightMeters).toFixed(2)} m²
                      </span>
                    </div>
                  </div>
                )}

                {/* For products priced per cm */}
                {currentOption.unit === 'cm' && (
                  <div className="space-y-2.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          {isId ? 'Tinggi / Dimensi (cm)' : 'Height / Dimension (cm)'}
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            step="1"
                            min="5"
                            max="300"
                            value={heightCm}
                            onChange={(e) => setHeightCm(parseInt(e.target.value) || 5)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 shadow-xs"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-mono">
                            cm
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          {isId ? 'Jumlah Karakter / Huruf / Unit' : 'Number of Characters / Letters / Units'}
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            step="1"
                            min="1"
                            max="200"
                            value={charCount}
                            onChange={(e) => setCharCount(parseInt(e.target.value) || 1)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 shadow-xs"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-mono">
                            {isId ? 'unit' : 'units'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-white border border-slate-200 flex items-center justify-between text-xs text-slate-700">
                      <span>{isId ? 'Total Akumulasi Dimensi:' : 'Total Dimension Accumulation:'}</span>
                      <span className="font-mono font-bold text-blue-700">
                        {heightCm} cm × {charCount} unit = {heightCm * charCount} cm
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 4: OPTIONAL LIGHTING ADD-ON */}
            {currentOption && !currentOption.isConsultationOnly && (
              <div className="space-y-3 pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-blue-700 font-mono">
                    {isId ? '4. Tambahan Sistem Pencahayaan' : '4. Additional Lighting System'}
                  </label>
                  <span className="text-[11px] text-slate-500">{isId ? 'Opsional' : 'Optional'}</span>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-500" />
                      <span className="text-xs sm:text-sm font-bold text-slate-900">
                        {isId ? 'Tambahkan Lampu Sorot?' : 'Add Floodlights / Spotlights?'}
                      </span>
                    </div>

                    {/* YES / NO Toggle Buttons */}
                    <div className="flex items-center bg-slate-100 rounded-lg p-1 border border-slate-200">
                      <button
                        type="button"
                        onClick={() => setHasSpotlight(false)}
                        className={`px-3 py-1 rounded-md text-xs font-bold cursor-pointer transition-all ${
                          !hasSpotlight
                            ? 'bg-white text-slate-900 shadow-xs'
                            : 'text-slate-500 hover:text-slate-900'
                        }`}
                      >
                        {isId ? 'Tidak' : 'No'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setHasSpotlight(true)}
                        className={`px-3 py-1 rounded-md text-xs font-bold cursor-pointer transition-all ${
                          hasSpotlight
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'text-slate-500 hover:text-slate-900'
                        }`}
                      >
                        {isId ? 'Ya' : 'Yes'}
                      </button>
                    </div>
                  </div>

                  {/* If YES: Show Lampu Sorot Philips & Quantity */}
                  {hasSpotlight && (
                    <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                      <div>
                        <div className="text-xs font-bold text-slate-900">
                          {isId ? 'Lampu Sorot Philips Outdoor' : 'Philips Outdoor Floodlight'}
                        </div>
                        <div className="text-xs font-mono text-blue-700 font-bold mt-0.5">
                          {isId ? 'Mulai dari Rp 300.000/pc' : 'From Rp 300,000/pc'}
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-2 text-xs">
                        <span className="text-slate-600">{isId ? 'Jumlah:' : 'Qty:'}</span>
                        <select
                          value={spotlightQty}
                          onChange={(e) => setSpotlightQty(parseInt(e.target.value) || 1)}
                          className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                        >
                          <option value="1">1 pc</option>
                          <option value="2">2 pcs</option>
                          <option value="3">3 pcs</option>
                          <option value="4">4 pcs</option>
                          <option value="6">6 pcs</option>
                          <option value="8">8 pcs</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>

          {/* RIGHT COLUMN: ESTIMATE RESULTS & WHATSAPP ACTION (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* BILLBOARD CONSULTATION CARD */}
            {currentCategory.id === 'billboard' && (
              <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 space-y-5 shadow-md relative overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-red-500 absolute top-0 left-0 right-0" />
                
                <div className="space-y-1.5 border-b border-slate-100 pb-4">
                  <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-wider">
                    {isId ? 'KONSULTASI TITIK STRATEGIS' : 'STRATEGIC LOCATION CONSULTATION'}
                  </span>
                  <h4 className="text-lg font-black text-slate-950">
                    {isId ? 'Konsultasikan Harga Billboard' : 'Consult Billboard Pricing'}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-red-600" />
                    <span>{isId ? 'Lokasi:' : 'Location:'} <strong className="text-slate-900">{billboardLocation}</strong></span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {isId
                    ? 'Dapatkan ketersediaan titik sewa, rincian biaya retribusi pajak daerah BPPRD, serta penawaran konstruksi billboard berizin resmi langsung dari tim kami.'
                    : 'Get vacant site availability, municipal tax levy breakdowns (BPPRD), and fully permitted billboard construction offers directly from our team.'}
                </p>

                <div className="space-y-3 pt-2">
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>{isId ? 'Konsultasi via WhatsApp' : 'Consult via WhatsApp'}</span>
                  </a>
                </div>
              </div>
            )}

            {/* STORE BRANDING CONSULTATION CARD */}
            {currentCategory.id === 'store-branding' && (
              <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 space-y-5 shadow-md relative overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-red-500 absolute top-0 left-0 right-0" />
                
                <div className="space-y-1.5 border-b border-slate-100 pb-4">
                  <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-wider">
                    {isId ? 'QUOTATION CUSTOM ARSITEKTURAL' : 'CUSTOM ARCHITECTURAL QUOTATION'}
                  </span>
                  <h4 className="text-lg font-black text-slate-950">
                    {isId ? 'Konsultasikan Kebutuhan Anda' : 'Consult Your Project Needs'}
                  </h4>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {isId
                    ? 'Kirimkan detail denah, foto ruko/toko, atau panduan identitas brand Anda. Tim teknik kami akan menghitungkan estimasi RAB fabrikasi dan penjadwalan survei lapangan secara transparan.'
                    : 'Send floor plan details, store photos, or brand guidelines. Our engineering team will prepare transparent cost estimates and schedule on-site surveys.'}
                </p>

                <div className="space-y-3 pt-2">
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>{isId ? 'Konsultasi via WhatsApp' : 'Consult via WhatsApp'}</span>
                  </a>
                </div>
              </div>
            )}

            {/* WAYFINDING CUSTOM CONSULTATION CARD */}
            {currentOption?.isConsultationOnly && (
              <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 space-y-5 shadow-md relative overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-red-500 absolute top-0 left-0 right-0" />
                
                <div className="space-y-1.5 border-b border-slate-100 pb-4">
                  <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-wider">
                    {isId ? 'CUSTOM STANDING WAYFINDING' : 'CUSTOM WAYFINDING SIGNAGE'}
                  </span>
                  <h4 className="text-lg font-black text-slate-950">
                    {isId ? 'Konsultasikan Kebutuhan Wayfinding' : 'Consult Wayfinding Requirements'}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {currentOption.name[isId ? 'id' : 'en']}
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {isId
                    ? 'Untuk standing totem ACP / stainless interaktif atau arah navigasi gedung bertingkat, hubungi tim kami untuk estimasi desain kustom dan pilihan material.'
                    : 'For interactive ACP / stainless standing totems or directional multi-story navigation, contact our team for custom design estimates and material options.'}
                </p>

                <div className="space-y-3 pt-2">
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>{isId ? 'Konsultasi via WhatsApp' : 'Consult via WhatsApp'}</span>
                  </a>
                </div>
              </div>
            )}

            {/* STANDARD CALCULATION RESULT CARD */}
            {!calculation.isConsultation && (
              <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-7 space-y-5 shadow-md relative overflow-hidden text-left">
                <div className="h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-red-500 absolute top-0 left-0 right-0" />

                {/* Header Info */}
                <div className="border-b border-slate-100 pb-4 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-wider">
                    {isId ? 'RINGKASAN ESTIMASI REKLAME' : 'SIGNAGE ESTIMATION SUMMARY'}
                  </span>
                  <h4 className="text-base font-bold text-slate-950 tracking-tight">
                    {currentCategory.name[isId ? 'id' : 'en']}
                  </h4>
                  <div className="text-xs text-slate-600">
                    {isId ? 'Opsi:' : 'Option:'} <span className="text-slate-900 font-semibold">{currentOption?.name[isId ? 'id' : 'en']}</span>
                  </div>
                </div>

                {/* Calculation Breakdown */}
                <div className="space-y-2 text-xs text-slate-700">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-slate-500">{isId ? 'Perhitungan Dimensi:' : 'Dimension Calculation:'}</span>
                    <span className="font-mono text-slate-900 text-right font-medium">
                      {calculation.measureSummary}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-slate-500">
                      {isId
                        ? `Harga Satuan (${currentOption?.startingPriceLabel.id.replace('Mulai dari ', '')}):`
                        : `Unit Rate (${currentOption?.startingPriceLabel.en.replace('From ', '')}):`}
                    </span>
                    <span className="font-mono text-slate-900 font-semibold">
                      {calculation.formattedBaseCost}
                    </span>
                  </div>

                  {hasSpotlight && (
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-blue-700">
                      <span>{isId ? `Lampu Sorot Philips (${spotlightQty} pcs):` : `Philips Spotlights (${spotlightQty} pcs):`}</span>
                      <span className="font-mono font-semibold">
                        +{calculation.formattedSpotlightCost}
                      </span>
                    </div>
                  )}
                </div>

                {/* ESTIMATED PRICE DISPLAY */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                    {isId ? 'Estimasi Harga' : 'Estimated Price'}
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                    {isId ? `Mulai dari ${calculation.formattedTotal}` : `Starting from ${calculation.formattedTotal}`}
                  </div>
                  <span className="text-[10px] text-blue-600 block font-medium">
                    {isId ? '(Harga Mulai Dari / Estimasi Awal)' : '(Preliminary Price Estimate)'}
                  </span>
                </div>

                {/* REQUIRED DISCLAIMER */}
                <p className="text-[11px] text-slate-500 leading-relaxed italic border-l-2 border-slate-300 pl-3">
                  {isId
                    ? '*Harga merupakan estimasi awal dan dapat berubah sesuai desain, material, ukuran, finishing, instalasi, dan kondisi proyek.'
                    : '*Price is a preliminary estimate and may vary based on design, materials, dimensions, finishes, installation, and on-site conditions.'}
                </p>

                {/* ACTION BUTTONS: WHATSAPP & COPY SPECS */}
                <div className="space-y-2.5 pt-1">
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>{isId ? 'Konsultasi via WhatsApp' : 'Consult via WhatsApp'}</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopySpecs}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-slate-900 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isId ? (copied ? 'Spesifikasi Berhasil Disalin!' : 'Salin Rincian Estimasi') : (copied ? 'Specifications Copied!' : 'Copy Estimate Details')}</span>
                  </button>
                </div>

                {/* DIRECT WORKSHOP GUARANTEE FOOTNOTE */}
                <div className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1.5 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isId ? 'Dikerjakan langsung di workshop 2M Advertising Bandar Lampung' : 'Manufactured directly at 2M Advertising workshop in Bandar Lampung'}</span>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
