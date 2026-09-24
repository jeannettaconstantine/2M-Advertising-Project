import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';
import {
  Store,
  Box,
  TowerControl,
  Type,
  Maximize2,
  Building,
  Compass,
  Sparkles,
  Layers,
  ShoppingBag,
  Award,
  FilePlus,
  FileCheck,
  BookOpen,
  GitMerge,
  Share2,
  Users,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Clock
} from 'lucide-react';

interface ProductAnimatedShowcaseProps {
  lang: Language;
  onSelectServiceForEstimate?: (serviceId: string) => void;
  onNavigateToTax?: () => void;
}

type ProductCategory = 'outdoor' | 'indoor' | 'tax' | 'digital';

interface ProductItem {
  id: string;
  title: string;
  category: ProductCategory;
  categoryName: string;
  icon: React.ElementType;
  tagline: string;
  description: string;
  specs: string[];
  leadTime: string;
  accentBorder: string;
  badgeBg: string;
  iconColor: string;
}

export const ProductAnimatedShowcase: React.FC<ProductAnimatedShowcaseProps> = ({
  lang,
  onSelectServiceForEstimate,
  onNavigateToTax,
}) => {
  const isId = lang === 'id';
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('outdoor');
  const [selectedProductId, setSelectedProductId] = useState<string>('signboard-papan-nama-toko');

  // Exact products according to user specification (No images used)
  const products: ProductItem[] = [
    // === OUTDOOR ===
    {
      id: 'signboard-papan-nama-toko',
      title: 'Signboard & Papan Nama Toko',
      category: 'outdoor',
      categoryName: 'Outdoor',
      icon: Store,
      tagline: isId ? 'Plang Toko Komersial Rangka Kokoh & Visual Tajam' : 'Commercial Storefront Signboard with Heavy-Duty Frame',
      description: isId
        ? 'Papan nama toko dan plang nama ruko komersial berangka hollow galvanis SNI anti-karat, dilapisi plat aluminium atau sheet akrilik dengan cetak visual UV resolusi tinggi tahan panas matahari dan hujan lebat.'
        : 'Commercial storefront and retail signboards engineered with anti-corrosion galvanized frames and weatherproof high-definition UV prints.',
      specs: [
        'Rangka Hollow Galvanis SNI 30x30 / 40x40',
        'Visual Backlit / Plat Aluminium / Akrilik',
        'Lampu Sorot LED Outdoor IP66 / Neon Modul',
        'Finishing Lis Aluminium Ekstrusi Rapi'
      ],
      leadTime: isId ? '4 - 7 Hari Kerja' : '4 - 7 Business Days',
      accentBorder: 'border-blue-500/40 hover:border-blue-400',
      badgeBg: 'bg-blue-600/20 text-blue-300 border-blue-500/30',
      iconColor: 'text-blue-400',
    },
    {
      id: 'neonbox-acrylic-backlit',
      title: 'Neonbox Acrylic & Backlit',
      category: 'outdoor',
      categoryName: 'Outdoor',
      icon: Box,
      tagline: isId ? 'Akrilik Susu Grade A & Pendaran LED Bebas Hotspot' : 'Grade A Milky Acrylic & Hotspot-Free LED Illumination',
      description: isId
        ? 'Neon box outdoor 1 sisi atau 2 sisi (double-sided) dengan bahan akrilik susu 3mm berkualitas tinggi. Menggunakan modul LED mata lensa berjarak presisi sehingga cahaya berpendar merata 24 jam tanpa bayangan tabung.'
        : 'Single and double-sided outdoor acrylic lightboxes fabricated with optical lens LED modules for uniform, glare-free 24/7 visibility.',
      specs: [
        'Akrilik Susu Grade A Tebal 3-5mm',
        'Profil Aluminium Tebal Anti-Karat',
        'Modul LED Outdoor IP68 High-Lumen',
        'Cutting Sticker Translucent Oracal / Backlit'
      ],
      leadTime: isId ? '5 - 9 Hari Kerja' : '5 - 9 Business Days',
      accentBorder: 'border-amber-500/40 hover:border-amber-400',
      badgeBg: 'bg-amber-600/20 text-amber-300 border-amber-500/30',
      iconColor: 'text-amber-400',
    },
    {
      id: 'pylon-sign-totem-tower',
      title: 'Pylon Sign & Totem Tower',
      category: 'outdoor',
      categoryName: 'Outdoor',
      icon: TowerControl,
      tagline: isId ? 'Struktur Baja Berat & Uji Beban Angin Jalan Protokol' : 'Structural Steel Pylon & Wind-Load Tested Roadside Totem',
      description: isId
        ? 'Signage landmark berdiri mandiri di pinggir jalan raya protokol untuk visibilitas jarak jauh. Dibangun dengan pondasi cakar ayam beton bertulang, tiang baja seamless, cladding panel ACP PVDF, dan pencahayaan internal tahan badai.'
        : 'Monumental roadside totem landmarks built with reinforced concrete foundations, heavy steel piping, PVDF ACP cladding, and internal LED systems.',
      specs: [
        'Tiang Pipa Baja Seamless / WF SNI',
        'Cladding ACP PVDF Eksterior 4mm',
        'Pondasi Cakar Ayam Beton Bertulang K300',
        'Modul LED Outdoor IP68 & Timer Otomatis'
      ],
      leadTime: isId ? '14 - 25 Hari Kerja' : '14 - 25 Business Days',
      accentBorder: 'border-indigo-500/40 hover:border-indigo-400',
      badgeBg: 'bg-indigo-600/20 text-indigo-300 border-indigo-500/30',
      iconColor: 'text-indigo-400',
    },
    {
      id: 'huruf-timbul-3d',
      title: 'Huruf Timbul 3D',
      category: 'outdoor',
      categoryName: 'Outdoor',
      icon: Type,
      tagline: isId ? 'Stainless SUS 304, Kuningan, & Akrilik Potong Laser' : 'SUS 304 Stainless Steel, Solid Brass & Laser Cut Acrylic',
      description: isId
        ? 'Huruf timbul 3 dimensi presisi tinggi yang dipotong menggunakan mesin fiber laser CNC. Pilihan finishing mirror, brushed hairline, kuningan emas mewah, atau akrilik menyala dengan backlight pendaran halo LED.'
        : 'High-precision 3D dimensional lettering crafted with fiber laser CNC cutting. Available in mirror stainless, brushed hairline, brass, and halo backlit LED.',
      specs: [
        'Stainless Steel SUS 304 (Anti Karat Pesisir)',
        'Akrilik Solid Grade A / Kuningan Murni',
        'Laser Fiber Cutting Presisi Milimeter',
        'Backlight Halo LED Warm / Cool White IP68'
      ],
      leadTime: isId ? '7 - 12 Hari Kerja' : '7 - 12 Business Days',
      accentBorder: 'border-sky-500/40 hover:border-sky-400',
      badgeBg: 'bg-sky-600/20 text-sky-300 border-sky-500/30',
      iconColor: 'text-sky-400',
    },
    {
      id: 'billboard-baliho',
      title: 'Billboard & Baliho',
      category: 'outdoor',
      categoryName: 'Outdoor',
      icon: Maximize2,
      tagline: isId ? 'Tiang Tunggal Unipole & Lampu Sorot Daya Tinggi' : 'High-Reach Unipole Steel Framing & Heavy Floodlighting',
      description: isId
        ? 'Konstruksi reklame media luar ruang skala besar di koridor jalan protokol dan persimpangan strategis. Dilengkapi lampu sorot bertenaga tinggi, rangka pipa baja bersertifikasi teknik sipil, serta kelayakan struktur tahan gempa dan angin.'
        : 'Large format highway unipole billboards fabricated with structural civil calculations, high-power LED floodlights, and municipal compliance.',
      specs: [
        'Tiang Pipa Baja Tunggal Diameter 16-24"',
        'Rangka Panel Besi Siku 50x50 SNI',
        'Lampu Sorot LED Outdoor 150-200W IP66',
        'Media Flexi Backlit / Frontlit 510gsm'
      ],
      leadTime: isId ? '14 - 30 Hari Kerja' : '14 - 30 Business Days',
      accentBorder: 'border-rose-500/40 hover:border-rose-400',
      badgeBg: 'bg-rose-600/20 text-rose-300 border-rose-500/30',
      iconColor: 'text-rose-400',
    },
    {
      id: 'fasad-acp',
      title: 'Fasad ACP',
      category: 'outdoor',
      categoryName: 'Outdoor',
      icon: Building,
      tagline: isId ? 'Panel PVDF 4mm Eksterior & Nat Rata Anti-Gelombang' : '4mm PVDF Exterior ACP Panels & Anti-Warp Structural Grid',
      description: isId
        ? 'Pekerjaan peremajaan fasad ruko dan gedung komersial menggunakan Aluminium Composite Panel (ACP) coating PVDF khusus eksterior. Tahan panas terik dan hujan tanpa risiko pudar atau melengkung bertahun-tahun.'
        : 'Commercial storefront and building facade modernization using exterior-grade 4mm PVDF aluminum composite panels and expansion joints.',
      specs: [
        'Panel ACP PVDF 4mm Eksterior Bergaransi',
        'Rangka Kisi Hollow Galvanis 40x40 SNI',
        'Sealant Weatherproof Neutral Kualitas Tinggi',
        'Baut Dynabolt 12mm Pemasangan Presisi'
      ],
      leadTime: isId ? '10 - 20 Hari Kerja' : '10 - 20 Business Days',
      accentBorder: 'border-emerald-500/40 hover:border-emerald-400',
      badgeBg: 'bg-emerald-600/20 text-emerald-300 border-emerald-500/30',
      iconColor: 'text-emerald-400',
    },

    // === INDOOR ===
    {
      id: 'wayfinding-signage-penunjuk-arah',
      title: 'Wayfinding & Signage Penunjuk Arah',
      category: 'indoor',
      categoryName: 'Indoor',
      icon: Compass,
      tagline: isId ? 'Sistem Navigasi Fasilitas & Piktogram Standar Internasional' : 'Comprehensive Navigation Signage & International Pictograms',
      description: isId
        ? 'Sistem plang penunjuk arah terpadu, peta direktori lantai (floor directory), nomor ruangan, dan rambu evakuasi untuk rumah sakit, kampus universitas, pusat perbelanjaan, dan gedung bertingkat.'
        : 'Coordinated facility wayfinding systems, multi-story floor directories, room plaques, and evacuation signage built for high visual legibility.',
      specs: [
        'Profil Aluminium Extrusion Modular',
        'Akrilik Laser Cut & Insert Akrilik Magnetik',
        'Stiker Reflektif & Piktogram Standar ISO',
        'Plat Stainless SUS 304 Hairline'
      ],
      leadTime: isId ? '6 - 12 Hari Kerja' : '6 - 12 Business Days',
      accentBorder: 'border-teal-500/40 hover:border-teal-400',
      badgeBg: 'bg-teal-600/20 text-teal-300 border-teal-500/30',
      iconColor: 'text-teal-400',
    },
    {
      id: 'custom-led-neon-flex',
      title: 'Custom LED Neon Flex',
      category: 'indoor',
      categoryName: 'Indoor',
      icon: Sparkles,
      tagline: isId ? 'Silikon Fleksibel 12V Hemat Energi & Estetika Modern' : '12V Flexible Silicone Neon & Cold-to-Touch Interior Decor',
      description: isId
        ? 'Lampu neon estetik modern dari selang silikon fleksibel 12V di atas plat akrilik bening potong laser. Dingin saat disentuh, bebas radiasi panas, hemat daya, dan menjadi titik foto favorit di kafe, lounge, dan studio.'
        : 'Custom flexible silicone LED neon mounted on precision-cut clear acrylic backplates. Safe, cold-to-touch, and ideal for Instagram photo spots.',
      specs: [
        'Silikon LED Neon Flex 12V Ultra-Bright',
        'Akrilik Bening Solid 5mm CNC Laser Cut',
        'Power Supply Adaptor 12V Silent Stabil',
        'Dimmer Pengatur Terang Cahaya + Remote'
      ],
      leadTime: isId ? '4 - 7 Hari Kerja' : '4 - 7 Business Days',
      accentBorder: 'border-pink-500/40 hover:border-pink-400',
      badgeBg: 'bg-pink-600/20 text-pink-300 border-pink-500/30',
      iconColor: 'text-pink-400',
    },
    {
      id: '3d-lettering-resepsionis-lobby-kantor',
      title: '3D Lettering Resepsionis & Lobby Kantor',
      category: 'indoor',
      categoryName: 'Indoor',
      icon: Layers,
      tagline: isId ? 'Stainless Hairline SUS 304, Kuningan & Akrilik Bevel' : 'SUS 304 Brushed Hairline, Brass & Beveled Acrylic',
      description: isId
        ? 'Huruf timbul dan plakat logo interior mewah untuk backdrop meja resepsionis kantor korporat, ruang direksi, dan lobi gedung. Finishing satin hairline halus yang elegan tanpa silau berlebih.'
        : 'Executive interior wall plaques and 3D letters crafted for corporate reception backdrops, boardrooms, and headquarter lobbies.',
      specs: [
        'Stainless Steel SUS 304 Brushed Hairline / Mirror',
        'Kuningan Asli Gold Plating Elegan',
        'Akrilik Bening Kristal 8-10mm Bevel Cut',
        'Baut Pen Spacer Stainless Mirror SUS 304'
      ],
      leadTime: isId ? '5 - 10 Hari Kerja' : '5 - 10 Business Days',
      accentBorder: 'border-purple-500/40 hover:border-purple-400',
      badgeBg: 'bg-purple-600/20 text-purple-300 border-purple-500/30',
      iconColor: 'text-purple-400',
    },
    {
      id: 'store-branding-island-booth-mall',
      title: 'Store Branding & Island Booth Mall',
      category: 'indoor',
      categoryName: 'Indoor',
      icon: ShoppingBag,
      tagline: isId ? 'Konstruksi Booth Retail & Signage Standar Pusat Belanja' : 'Retail Store Fitting & Island Mall Booth Branding',
      description: isId
        ? 'Solusi terintegrasi fabrikasi identitas toko, backdrop counter kasir, dan island booth mall lengkap dengan elemen signage akrilik menyala, display produk, dan finishing interior berstandar pusat perbelanjaan.'
        : 'End-to-end retail store fitting, island mall kiosk fabrication, glowing acrylic counter signs, and turnkey shopping mall display buildouts.',
      specs: [
        'Rangka Multipleks & Rangka Besi Hollow Ringan',
        'Finishing HPL / Duco Glossy / Cat Polyurethane',
        'Signage Akrilik Glow & LED Strip 12V Tersembunyi',
        'Instalasi Kabel Rapi & Panel Listrik Mandiri'
      ],
      leadTime: isId ? '10 - 18 Hari Kerja' : '10 - 18 Business Days',
      accentBorder: 'border-amber-500/40 hover:border-amber-400',
      badgeBg: 'bg-amber-600/20 text-amber-300 border-amber-500/30',
      iconColor: 'text-amber-400',
    },
    {
      id: 'plakat-akrilik-bevel-pen-stainless',
      title: 'Plakat Akrilik Bevel & Pen Stainless',
      category: 'indoor',
      categoryName: 'Indoor',
      icon: Award,
      tagline: isId ? 'Akrilik Kristal Tebal Diamond Bevel & Pen Stainless Mirror' : 'Diamond Beveled Acrylic & Stainless Steel Standoff Pins',
      description: isId
        ? 'Papan plakat dinding akrilik bening tebal dengan tepi potongan diamond bevel presisi dan pen spacer baut stainless mirror. Sangat cocok untuk plang nama direksi, gelar dokter, sertifikat, atau signage penghargaan.'
        : 'Crystal clear acrylic plaques with diamond beveled borders and marine-grade stainless steel wall standoff pins for executive nameplates.',
      specs: [
        'Akrilik Solid Transparan Tebal 8mm - 12mm',
        'Proses Diamond Polishing & Bevel Tepi',
        'Baut Pen Spacer Stainless Steel SUS 304',
        'Sablon UV HD / Grafir Laser Presisi Tinggi'
      ],
      leadTime: isId ? '3 - 6 Hari Kerja' : '3 - 6 Business Days',
      accentBorder: 'border-cyan-500/40 hover:border-cyan-400',
      badgeBg: 'bg-cyan-600/20 text-cyan-300 border-cyan-500/30',
      iconColor: 'text-cyan-400',
    },

    // === TAX & PERMITTING ===
    {
      id: 'izin-pembuatan-titik-reklame',
      title: 'Izin Pembuatan Titik Reklame',
      category: 'tax',
      categoryName: 'Tax & Permitting',
      icon: FilePlus,
      tagline: isId ? 'Survei Titik, Gambar CAD Berstempel & Terbit SIPR Resmi' : 'Site Feasibility, Stamped CAD Drawings & Official Municipal SIPR',
      description: isId
        ? 'Layanan lengkap pengurusan izin baru penyelenggaraan reklame (SIPR) ke dinas BPPRD dan DPMPTSP. Kami menangani survei koordinat lapangan, penyusunan gambar teknik CAD berstempel keahlian, hingga penerbitan surat izin resmi.'
        : 'Full turnkey processing for new billboard and signage municipal permits (SIPR) with local authorities, including CAD blueprints and zoning checks.',
      specs: [
        'Survei Lapangan & Plotting Koordinat GPS Titik',
        'Gambar Konstruksi & Arsitektur CAD Berstempel',
        'Pengurusan Rekomendasi Teknis DPMPTSP & BPPRD',
        'Penerbitan Surat Izin Penyelenggaraan Reklame (SIPR)'
      ],
      leadTime: isId ? '10 - 20 Hari Kerja' : '10 - 20 Business Days',
      accentBorder: 'border-red-500/40 hover:border-red-400',
      badgeBg: 'bg-red-600/20 text-red-300 border-red-500/30',
      iconColor: 'text-red-400',
    },
    {
      id: 'izin-perpanjangan-pajak-reklame',
      title: 'Izin Perpanjangan Pajak Reklame',
      category: 'tax',
      categoryName: 'Tax & Permitting',
      icon: FileCheck,
      tagline: isId ? 'Hitung NSR Resmi Sesuai Perda & Bebas Sanksi Segel Satpol PP' : 'Official NSR Tax Assessment & Protection from Takedowns',
      description: isId
        ? 'Pengurusan perpanjangan Surat Ketetapan Pajak Daerah (SKPD) reklame tahunan. Kami menghitung tarif Nilai Sewa Reklame (NSR) resmi sesuai zonasi Perda, memperpanjang masa berlaku, dan memastikan bisnis aman dari penertiban Satpol PP.'
        : 'Annual municipal signage tax renewals, official NSR tax assessment, and legal protection against municipal takedowns and violation notices.',
      specs: [
        'Kalkulasi NSR Resmi Sesuai Zonasi Jalan Protokol',
        'Verifikasi Berkas & Fisik Reklame Eksisting',
        'Penerbitan SKPD & Bukti Setor Pajak Sah Bapenda',
        'Stiker Legalisasi Pajak Reklame Resmi'
      ],
      leadTime: isId ? '5 - 10 Hari Kerja' : '5 - 10 Business Days',
      accentBorder: 'border-rose-500/40 hover:border-rose-400',
      badgeBg: 'bg-rose-600/20 text-rose-300 border-rose-500/30',
      iconColor: 'text-rose-400',
    },

    // === DIGITAL ADS & STRATEGY CONSULTANCY ===
    {
      id: 'brand-guidelines-visual-playbook',
      title: 'Brand Guidelines & Visual Playbook',
      category: 'digital',
      categoryName: 'Digital Ads & Strategy Consultancy',
      icon: BookOpen,
      tagline: isId ? 'Standar Identitas Visual, Tipografi, Warna & Mockup 3D' : 'Complete Visual Brand Identity & Architectural 3D Playbook',
      description: isId
        ? 'Penyusunan buku panduan identitas merek komprehensif untuk standarisasi cabang bisnis Anda. Meliputi aturan penggunaan logo, palet warna resmi (CMYK, RGB, Pantone), hierarki font, dan panduan teknis penerapan signage fisik.'
        : 'Comprehensive brand guideline development ensuring visual consistency across nationwide branches, storefronts, and marketing collateral.',
      specs: [
        'Buku Panduan Brand Playbook (Master PDF & Vector)',
        'Formulasi Warna Standar (CMYK, RGB, HEX, Pantone)',
        'Aturan Minimum Margin, Skala & Larangan Logo',
        'Simulasi 3D Penerapan Signboard & Fasad Ruko'
      ],
      leadTime: isId ? '7 - 14 Hari Kerja' : '7 - 14 Business Days',
      accentBorder: 'border-indigo-500/40 hover:border-indigo-400',
      badgeBg: 'bg-indigo-600/20 text-indigo-300 border-indigo-500/30',
      iconColor: 'text-indigo-400',
    },
    {
      id: 'omnichannel-ooh-to-online-funnel',
      title: 'Omnichannel OOH To Online Funnel',
      category: 'digital',
      categoryName: 'Digital Ads & Strategy Consultancy',
      icon: GitMerge,
      tagline: isId ? 'Integrasi Reklame Fisik Jalan Raya dengan Konversi Digital' : 'Connecting Outdoor Highway Media to Digital Online Conversions',
      description: isId
        ? 'Strategi menghubungkan reklame fisik luar ruang (billboard, pylon, neon box) ke dalam corong konversi digital. Menggunakan dynamic QR code tracking, geofencing lokasi, dan landing page khusus untuk mengukur impresi nyata.'
        : 'Strategic integration linking physical outdoor billboards and storefronts with digital landing pages and trackable QR conversion funnels.',
      specs: [
        'Dynamic QR Code Routing & Trackable Shortlinks',
        'Desain Mobile Landing Page Berkonversi Tinggi',
        'UTM Campaign Parameter & Analytics Dashboard',
        'Integrasi Direct WhatsApp Lead Generator'
      ],
      leadTime: isId ? '5 - 10 Hari Kerja' : '5 - 10 Business Days',
      accentBorder: 'border-violet-500/40 hover:border-violet-400',
      badgeBg: 'bg-violet-600/20 text-violet-300 border-violet-500/30',
      iconColor: 'text-violet-400',
    },
    {
      id: 'meta-ads-awareness',
      title: 'Meta Ads (Instagram & Facebook) Awareness',
      category: 'digital',
      categoryName: 'Digital Ads & Strategy Consultancy',
      icon: Share2,
      tagline: isId ? 'Iklan Berbayar Hyperlocal Berbasis Radius Lokasi Gerai' : 'Hyperlocal Geo-Radius Paid Advertising for Retail Outlets',
      description: isId
        ? 'Manajemen kampanye iklan berbayar Meta Ads (Instagram & Facebook) dengan penargetan radius geografis di sekitar lokasi toko Anda di Bandar Lampung dan sekitarnya, melipatgandakan dampak promosi reklame fisik.'
        : 'Hyperlocal Meta Ads management targeting users within a precise kilometer radius of your storefront, multiplying the foot-traffic impact of physical signage.',
      specs: [
        'Setup Meta Business Suite & Tracking Pixel',
        'Geo-Radius Hyperlocal Targeting (1 - 15 km gerai)',
        'Pembuatan Materi Creative Video Reels & Carousel',
        'Laporan Performa Jangkauan & Biaya per Impresi (CPM)'
      ],
      leadTime: isId ? 'Setup 3 - 5 Hari Kerja' : 'Setup 3 - 5 Business Days',
      accentBorder: 'border-blue-500/40 hover:border-blue-400',
      badgeBg: 'bg-blue-600/20 text-blue-300 border-blue-500/30',
      iconColor: 'text-blue-400',
    },
    {
      id: 'dynamic-audience-targeting',
      title: 'Dynamic Audience Targeting',
      category: 'digital',
      categoryName: 'Digital Ads & Strategy Consultancy',
      icon: Users,
      tagline: isId ? 'Segmentasi Demografi, Minat Bisnis & Optimasi Budget' : 'Demographic Segmentation, High-Intent Audiences & Budget ROI',
      description: isId
        ? 'Layanan optimasi audiens tingkat lanjut untuk kampanye komersial. Mengelompokkan calon pembeli berdasarkan daya beli, perilaku belanja, intensi pencarian, dan data demografi spesifik untuk memastikan anggaran iklan tepat sasaran.'
        : 'Advanced audience profiling that segments potential clients by purchasing intent, local business interests, and behavioral engagement.',
      specs: [
        'Segmentasi Custom & Lookalike Audiences',
        'Penyaringan Demografi Usia, Profesi & Minat',
        'A/B Split Testing Format Pesan & Penawaran',
        'Optimasi Anggaran Harian Berbasis Konversi Nyata'
      ],
      leadTime: isId ? '5 - 10 Hari Kerja' : '5 - 10 Business Days',
      accentBorder: 'border-emerald-500/40 hover:border-emerald-400',
      badgeBg: 'bg-emerald-600/20 text-emerald-300 border-emerald-500/30',
      iconColor: 'text-emerald-400',
    },
  ];

  const categories: { id: ProductCategory; label: string; count: number }[] = [
    { id: 'outdoor', label: 'Outdoor', count: 6 },
    { id: 'indoor', label: 'Indoor', count: 5 },
    { id: 'tax', label: 'Tax & Permitting', count: 2 },
    { id: 'digital', label: 'Digital Ads & Strategy Consultancy', count: 4 },
  ];

  const currentCategoryProducts = products.filter(p => p.category === activeCategory);
  const activeProduct = products.find(p => p.id === selectedProductId) || currentCategoryProducts[0] || products[0];
  const ActiveIcon = activeProduct.icon;

  const handleCategoryChange = (cat: ProductCategory) => {
    setActiveCategory(cat);
    const firstInCat = products.find(p => p.category === cat);
    if (firstInCat) {
      setSelectedProductId(firstInCat.id);
    }
  };

  return (
    <section className="py-14 sm:py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden border-b border-slate-800">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* SECTION HEADER: Clean text WITHOUT highlight */}
        <div className="border-b border-slate-800/80 pb-6 space-y-3">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight uppercase">
            PILIHAN PRODUK & LAYANAN REKLAME
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
            {isId
              ? 'Jelajahi seluruh lini produk reklame yang kami fabrikasi langsung di workshop 2M Advertising - Bandar Lampung dengan standar material & pengerjaan terbaik.'
              : 'Explore our complete lineup of signage and advertising solutions fabricated directly at our workshop in Bandar Lampung with top material standards.'}
          </p>
        </div>

        {/* CATEGORY TABS: Outdoor, Indoor, Tax & Permitting, Digital Ads & Strategy Consultancy */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-700">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer shrink-0 flex items-center gap-2 border ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30'
                    : 'bg-slate-900/90 text-slate-400 hover:text-white border-slate-800 hover:border-slate-700'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* 2-COLUMN INTERACTIVE PRODUCT EXPLORER (Zero images, pristine typography & specs) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT LIST: Product Selector Buttons in Active Category (5 cols) */}
          <div className="lg:col-span-5 space-y-2.5">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold px-1 flex items-center justify-between">
              <span>{activeCategory.toUpperCase()} ({currentCategoryProducts.length} Produk & Layanan)</span>
              <span className="text-slate-500 text-[10px]">Pilih untuk detail spesifikasi</span>
            </div>

            <div className="space-y-2">
              {currentCategoryProducts.map((prod) => {
                const isSelected = prod.id === activeProduct.id;
                const IconComp = prod.icon;
                return (
                  <button
                    key={prod.id}
                    onClick={() => setSelectedProductId(prod.id)}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 relative overflow-hidden ${
                      isSelected
                        ? 'bg-slate-800/95 border-blue-500 shadow-lg shadow-blue-500/10'
                        : 'bg-slate-900/70 hover:bg-slate-800/50 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />
                    )}

                    <div
                      className={`p-2.5 rounded-xl shrink-0 ${
                        isSelected ? 'bg-blue-600/20 text-blue-400' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      <IconComp className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className={`text-xs sm:text-sm font-bold tracking-tight truncate ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                          {prod.title}
                        </h3>
                        <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-blue-400 translate-x-0.5' : 'text-slate-600'}`} />
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        {prod.tagline}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT CARD: Selected Product Technical Specifications, Narrative & Direct Action (7 cols) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProduct.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-xl relative"
              >
                
                {/* Header info */}
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border ${activeProduct.badgeBg}`}>
                        {activeProduct.categoryName}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        Standar Fabrikasi 2M
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
                      {activeProduct.title}
                    </h3>

                    <p className="text-xs sm:text-sm font-semibold text-blue-300">
                      {activeProduct.tagline}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 shadow-inner">
                    <ActiveIcon className={`w-8 h-8 ${activeProduct.iconColor}`} />
                  </div>
                </div>

                {/* Description */}
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activeProduct.description}
                </div>

                {/* Technical Specifications */}
                <div className="space-y-2.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-blue-400" />
                    <span>{isId ? 'Spesifikasi Teknis & Standar Material:' : 'Technical Specifications:'}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeProduct.specs.map((spec, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/70 text-xs text-slate-200 flex items-start gap-2.5"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="font-medium leading-tight">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Meta details: Lead Time & Direct Workshop guarantee */}
                <div className="flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-slate-800 flex-wrap gap-3">
                  <span className="flex items-center gap-1.5 font-semibold text-[11px] bg-slate-800/70 px-3 py-1.5 rounded-xl border border-slate-700">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{isId ? 'Workshop & Garansi Konstruksi' : 'Direct Workshop Guarantee'}</span>
                  </span>

                  <span className="text-[11px] font-mono text-blue-300 bg-blue-950/70 px-3 py-1.5 rounded-xl border border-blue-800/70 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    <span>Lead Time: {activeProduct.leadTime}</span>
                  </span>
                </div>

                {/* CTA Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href={`https://wa.me/6287878952077?text=Halo%202M%20Advertising%2C%20saya%20ingin%20konsultasi%20layanan%20${encodeURIComponent(activeProduct.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-900/30 flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-white" />
                    <span>{isId ? 'Konsultasi via WhatsApp' : 'Inquire via WhatsApp'}</span>
                  </a>

                  {activeProduct.category === 'tax' && onNavigateToTax ? (
                    <button
                      onClick={onNavigateToTax}
                      className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-md cursor-pointer flex items-center gap-2 transition-all"
                    >
                      <FileCheck className="w-4 h-4" />
                      <span>{isId ? 'Kalkulator Pajak Reklame' : 'Tax Calculator'}</span>
                    </button>
                  ) : (
                    onSelectServiceForEstimate && (
                      <button
                        onClick={() => onSelectServiceForEstimate(activeProduct.id)}
                        className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/20 cursor-pointer flex items-center gap-2 transition-all"
                      >
                        <span>{isId ? 'Hitung Estimasi Biaya' : 'Estimate Cost'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )
                  )}
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};
