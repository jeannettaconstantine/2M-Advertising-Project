import { EstimateOptions } from '../types';

export interface CalculationResult {
  estimatedMinPriceIDR: number;
  estimatedMaxPriceIDR: number;
  formattedMin: string;
  formattedMax: string;
  areaSquareMeters: number;
  taxPermitEstIDR: number;
  recommendedMaterials: string[];
  leadTimeDays: string;
  specsSummary: string[];
  whatsAppMessage: string;
}

export function formatIDR(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateProjectEstimate(opts: EstimateOptions, lang: 'id' | 'en' = 'id'): CalculationResult {
  const {
    serviceType,
    widthMeters,
    heightMeters,
    quantity,
    materialTier,
    lightingType,
    includeTaxPermit,
    installationHeight,
    cityLocation,
  } = opts;

  const area = Math.max(0.2, widthMeters * heightMeters);

  // Base price per m2 or base unit price
  let basePricePerM2 = 1200000; // Rp 1.2M default base
  let unitType: 'area' | 'length' = 'area';

  switch (serviceType) {
    case 'neonbox':
      basePricePerM2 = 1650000; // Acrylic / Backlit Neonbox per m2
      break;
    case 'pylon-sign':
      basePricePerM2 = 4500000; // Heavy steel column + ACP + concrete base
      break;
    case 'lettering-3d':
      // 3D Lettering usually calculated by centimeter height, but as an approximate m2 facade coverage
      basePricePerM2 = 2800000;
      break;
    case 'billboard':
      basePricePerM2 = 2200000; // Large format structural unpole & frame
      break;
    case 'acrylic-signs':
      basePricePerM2 = 1350000;
      break;
    case 'wayfinding':
      basePricePerM2 = 1450000;
      break;
    case 'led-flexy':
      basePricePerM2 = 2100000; // Silicone Neon Flex
      break;
    case 'store-branding':
      basePricePerM2 = 3800000; // Cabinetry + HPL + Acrylic + Lighting
      break;
    case 'signboard':
    default:
      basePricePerM2 = 950000;
      break;
  }

  // Material Tier multiplier
  let materialMultiplier = 1.0;
  let recommendedMaterials: string[] = ['Rangka Besi Hollow SNI', 'Visual Standard Quality'];

  if (materialTier === 'standard') {
    materialMultiplier = 1.0;
    recommendedMaterials = ['Hollow Galvanis 1.4mm', 'Akrilik MC 3mm / Backlit Korea 440gsm', 'LED Modul IP65'];
  } else if (materialTier === 'premium') {
    materialMultiplier = 1.35;
    recommendedMaterials = ['Hollow Galvanis Tebal 1.8mm', 'Akrilik MC 5mm / ACP Seven 4mm 0.3', 'LED Samsung High-Flux IP68', 'Trafo Rainproof Bergaransi'];
  } else if (materialTier === 'architectural') {
    materialMultiplier = 1.8;
    recommendedMaterials = ['Stainless Steel SUS 304 Marine Grade', 'ACP Alucobond Heavy Duty 0.5', 'Baja WF / Pipa Seamless Sch 40', 'Samsung/Osram LED Pro', 'Pondasi Cakar Ayam Beton K-300'];
  }

  // Lighting multiplier & addon
  let lightingAddon = 0;
  if (lightingType === 'led_module') {
    lightingAddon = area * 450000;
  } else if (lightingType === 'neon_flex') {
    lightingAddon = area * 750000;
  } else if (lightingType === 'floodlight') {
    lightingAddon = Math.ceil(widthMeters / 2) * 650000; // Philips outdoor floodlight
  }

  // Installation height complexity
  let heightMultiplier = 1.0;
  if (installationHeight === 'medium') {
    heightMultiplier = 1.15; // Scaffolding 2-3 storeys
  } else if (installationHeight === 'highrise') {
    heightMultiplier = 1.35; // Crane / gondola / specialized rigging
  }

  // Base production cost
  const rawUnitCost = (basePricePerM2 * area * materialMultiplier + lightingAddon) * heightMultiplier;
  const totalProductionCost = rawUnitCost * Math.max(1, quantity);

  // Advertisement Tax (Pajak Reklame) & Permitting Estimate (Bandar Lampung / Sumatera Standard)
  // Typically based on area x NSR (Nilai Sewa Reklame) x 25% tax rate + administrative permit fees
  let taxPermitEstIDR = 0;
  if (includeTaxPermit) {
    const isProtocollRoad = true;
    const nsrPerM2Year = 800000; // Estimated baseline
    const taxRate = 0.25; // 25% Pajak Reklame
    const legalAdminFee = 1500000; // Pengurusan berkas SIPR, survey, koordinasi perizinan
    taxPermitEstIDR = Math.round(area * nsrPerM2Year * taxRate + legalAdminFee);
  }

  const minTotal = Math.round(totalProductionCost * 0.95);
  const maxTotal = Math.round(totalProductionCost * 1.25);

  let leadTimeDays = '5 - 10 Hari Kerja';
  if (serviceType === 'pylon-sign' || serviceType === 'billboard') {
    leadTimeDays = '15 - 25 Hari Kerja';
  } else if (serviceType === 'led-flexy' || serviceType === 'acrylic-signs') {
    leadTimeDays = '3 - 6 Hari Kerja';
  }

  const specsSummary = [
    `${lang === 'id' ? 'Kategori' : 'Category'}: ${serviceType.toUpperCase()}`,
    `${lang === 'id' ? 'Dimensi' : 'Dimensions'}: ${widthMeters}m x ${heightMeters}m (${area.toFixed(2)} m²) x ${quantity} unit`,
    `${lang === 'id' ? 'Tingkat Material' : 'Material Tier'}: ${materialTier.toUpperCase()}`,
    `${lang === 'id' ? 'Penerangan' : 'Lighting'}: ${lightingType.replace('_', ' ').toUpperCase()}`,
    `${lang === 'id' ? 'Ketinggian Instalasi' : 'Elevation'}: ${installationHeight.toUpperCase()}`,
    `${lang === 'id' ? 'Lokasi Pemasangan' : 'Location'}: ${cityLocation || 'Bandar Lampung'}`,
    `${lang === 'id' ? 'Pengurusan Pajak & Izin' : 'Tax & Permitting'}: ${includeTaxPermit ? (lang === 'id' ? 'Ya (Termasuk Pengurusan BPPRD)' : 'Yes (Includes BPPRD Licensing)') : (lang === 'id' ? 'Tidak (Hanya Produksi)' : 'Production Only')}`,
  ];

  const waTextId = `Halo 2M Advertising (Est. 2002), saya ingin konsultasi & penawaran resmi untuk proyek reklame:%0A%0A` +
    `*Spesifikasi Permintaan:*%0A` +
    `• Kategori: ${serviceType}%0A` +
    `• Ukuran: ${widthMeters}m x ${heightMeters}m (${area.toFixed(2)} m²) - Qty: ${quantity} unit%0A` +
    `• Kualitas Material: ${materialTier}%0A` +
    `• Pencahayaan: ${lightingType}%0A` +
    `• Lokasi Pemasangan: ${cityLocation || 'Bandar Lampung'} (${installationHeight})%0A` +
    `• Bantuan Pajak & Izin SIPR: ${includeTaxPermit ? 'Ya' : 'Tidak'}%0A` +
    `• Estimasi Biaya Web: ${formatIDR(minTotal)} - ${formatIDR(maxTotal)}%0A%0A` +
    `Mohon info ketersediaan survey lokasi dan penawaran resmi (RAB/Invoice). Terima kasih!`;

  return {
    estimatedMinPriceIDR: minTotal,
    estimatedMaxPriceIDR: maxTotal,
    formattedMin: formatIDR(minTotal),
    formattedMax: formatIDR(maxTotal),
    areaSquareMeters: Number(area.toFixed(2)),
    taxPermitEstIDR,
    recommendedMaterials,
    leadTimeDays,
    specsSummary,
    whatsAppMessage: waTextId,
  };
}
