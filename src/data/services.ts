import { ServiceItem } from '../types';

export const SERVICES: ServiceItem[] = [
  // 1. OUTDOOR ADVERTISING (OOH)
  {
    id: 'signboard',
    category: 'ooh',
    title: {
      id: 'Signboard & Papan Nama Toko',
      en: 'Signboard & Retail Storefront',
    },
    subtitle: {
      id: 'Papan nama outdoor daya tahan tinggi dengan rangka hollow galvanis anti-karat',
      en: 'Heavy-duty outdoor storefront signage with rust-resistant galvanized hollow frames',
    },
    description: {
      id: 'Solusi identitas visual outdoor nomor satu untuk ruko, kantor cabang, dan jaringan retail. Dibuat dengan material tahan cuaca tropis Lampung dan finishing rapi.',
      en: 'The #1 outdoor visual identity solution for retail shops, branch offices, and dealer networks. Engineered for tropical weather resilience and clean aesthetic finishes.',
    },
    badge: 'Popular for Retail',
    features: {
      id: [
        'Rangka besi hollow galvanis tebal 1.4mm - 2.0mm',
        'Visual Backlit Korea 510gsm atau Plat Aluminium Composite (ACP)',
        'Cat finishing duco anti-korosi & anti-UV',
        'Penerangan eksternal floodlight LED Philips atau lampu sorot hemat energi',
        'Garansi instalasi dan konstruksi 1 tahun',
      ],
      en: [
        'Galvanized hollow steel frame (1.4mm - 2.0mm thickness)',
        'Visual surface: Backlit Korea 510gsm or Aluminium Composite Panel (ACP)',
        'Anti-corrosion and UV-resistant duco finishing coat',
        'External Philips LED floodlighting options',
        '1-Year structural installation warranty',
      ],
    },
    materials: ['Hollow Galvanis', 'ACP Alucobond', 'Backlit Korea 510gsm', 'Plat Zincalume'],
    leadTime: '5 - 10 Hari Kerja',
    bestFor: 'Dealer otomotif, toko ritel, ruko, klinik & apotek',
    iconName: 'Signpost',
  },
  {
    id: 'neonbox',
    category: 'ooh',
    title: {
      id: 'Neonbox Acrylic & Backlit',
      en: 'Neonbox Acrylic & Backlit',
    },
    subtitle: {
      id: 'Kotak lampu bercahaya merata dengan modul LED Grade IP68 bergaransi',
      en: 'Evenly illuminated lightboxes featuring warranted Grade IP68 LED modules',
    },
    description: {
      id: 'Menjamin brand Anda tampak mencolok sepanjang waktu. Kami memproduksi neonbox 1 sisi maupun 2 sisi dengan sistem pencahayaan bebas titik gelap (hotspot-free).',
      en: 'Ensures your brand stands out vibrantly. We manufacture 1-sided and double-sided illuminated neonboxes engineered for hotspot-free glow.',
    },
    badge: 'High Impact Glow',
    features: {
      id: [
        'Pilihan cover: Akrilik Lembaran Grade A 3mm/5mm atau Backlit Film Outdoor',
        'Modul LED High-Lumen 1.2W Grade IP68 waterproof rating',
        'Trafo / Power Supply Rainproof bergaransi',
        'Profil aluminium profil khusus atau bending plat galvanil tebal',
        'Konsumsi daya listrik hemat energi hingga 60%',
      ],
      en: [
        'Cover choices: Grade-A Cast Acrylic 3mm/5mm or Outdoor Backlit Film',
        'High-Lumen 1.2W LED modules with Grade IP68 waterproof rating',
        'Rainproof power supply with warranty included',
        'Custom aluminum profile or seamless heavy galvanized sheet bending',
        'Energy-efficient performance (up to 60% power savings)',
      ],
    },
    materials: ['Akrilik Lembaran Grade A', 'Modul LED Grade IP68', 'Aluminium Extrusion Tebal', 'Vinyl Film Khusus Signage'],
    leadTime: '7 - 12 Hari Kerja',
    bestFor: 'Bank, ATM Center, Restoran, Kafe, Brand Shop & Hotel',
    iconName: 'Box',
  },
  {
    id: 'pylon-sign',
    category: 'ooh',
    title: {
      id: 'Pylon Sign & Totem Tower',
      en: 'Pylon Sign & Totem Tower',
    },
    subtitle: {
      id: 'Tengara monumental ketinggian 4m - 12m dengan pondasi beton bertulang',
      en: 'Monumental 4m - 12m vertical landmark signs with engineered concrete foundations',
    },
    description: {
      id: 'Pembeda kelas atas untuk SPBU, kantor pusat bank, dealer 3S, dan hotel berbintang. Dirancang dengan perhitungan teknik sipil wind-load (beban angin) dan izin lengkap.',
      en: 'The executive signature for fuel stations, bank headquarters, 3S automotive dealerships, and luxury hotels. Calculated for regional wind-load safety standards.',
    },
    badge: 'Flagship Enterprise',
    features: {
      id: [
        'Konstruksi tiang baja pipa seamless atau WF (Wide Flange) bersertifikat',
        'Cladding Aluminium Composite Panel (ACP) Seven / Alucobond tahan cuaca',
        'Pondasi cakar ayam beton K-250 / K-300 teruji',
        'Kombinasi 3D Acrylic Lettering timbul menyala & LED run text (opsional)',
        'Pendampingan penuh perizinan SIPR & rekomendasi tata kota',
      ],
      en: [
        'Certified Wide Flange (WF) or seamless heavy steel structural column',
        'Premium Seven / Alucobond ACP exterior cladding',
        'Reinforced K-250 / K-300 civil foundation engineered for stability',
        'Illuminated 3D acrylic lettering with optional programmable LED indicators',
        'Full municipal SIPR zoning and permit accompaniment',
      ],
    },
    materials: ['Baja WF / Pipa Seamless', 'ACP Seven 4mm 0.3/0.5', 'Akrilik LED', 'Baut Angkur Heavy Duty'],
    leadTime: '14 - 25 Hari Kerja',
    bestFor: 'SPBU, Hotel, Kantor Cabang Utama Bank, Rumah Sakit & Dealer Otomotif',
    iconName: 'TowerControl',
  },
  {
    id: 'lettering-3d',
    category: 'ooh',
    title: {
      id: 'Huruf Timbul 3D (Stainless, Akrilik, Kuningan)',
      en: '3D Lettering (Stainless, Acrylic, Brass)',
    },
    subtitle: {
      id: 'Tipografi timbul mewah dengan pemotongan laser fiber presisi milimeter',
      en: 'Luxurious 3D dimensional lettering precision-cut via high-powered fiber laser',
    },
    description: {
      id: 'Menciptakan impresi korporat prestisius pada fasad gedung. Tersedia opsi Stainless Hairline/Mirror 304, Kuningan Asli, Akrilik Solid, dan Galvanil cat Duco dengan backlight atau front-lit.',
      en: 'Delivers an immaculate corporate impression on building facades and headquarters. Available in Stainless 304 (Hairline/Mirror), Brass, Solid Acrylic, and Duco Galvanil.',
    },
    badge: 'Premium Craftsmanship',
    features: {
      id: [
        'Pemotongan laser cutting fiber mutakhir dengan toleransi presisi 0.1mm',
        'Bahan Stainless Steel SUS 304 asli tahan karat tepi pantai',
        'Pencahayaan LED Backlight (efek halo bercahaya mewah) atau Front-Lit',
        'Kerapian sambungan patri argon halus tanpa cacat visual',
        'Pola mal pemasangan akurat 1:1',
      ],
      en: [
        'Precision fiber laser cutting technology with 0.1mm tolerance',
        'Authentic SUS 304 marine-grade stainless steel (corrosion immune)',
        'Sophisticated halo backlight glow or frontal face-lit illumination',
        'Smooth argon welded seams hand-polished to perfection',
        '1:1 CAD-engineered mounting template for exact alignment',
      ],
    },
    materials: ['Stainless Steel SUS 304', 'Kuningan Plat Asli', 'Akrilik Solid Grade A', 'LED Strip Grade IP67'],
    leadTime: '7 - 14 Hari Kerja',
    bestFor: 'Gedung perkantoran, lobi hotel, instansi pemerintah, fasad mall',
    iconName: 'Type',
  },
  {
    id: 'billboard',
    category: 'ooh',
    title: {
      id: 'Billboard & Baliho Raksasa (OOH)',
      en: 'Billboards & Highway Unipole (OOH)',
    },
    subtitle: {
      id: 'Media luar ruang skala besar di titik-titik persimpangan dan jalan protokol Sumatera',
      en: 'Large-scale outdoor highway & city intersection billboards across Sumatera corridors',
    },
    description: {
      id: 'Membangun jangkauan massa tak tertandingi. Kami mengerjakan konstruksi baru, sewa titik strategis di Lampung, penggantian visual materi rutin, dan perawatan rutin berkala.',
      en: 'Builds unmatched regional brand recall. We handle custom structural construction, strategic highway spot licensing, periodic visual re-skins, and ongoing safety maintenance.',
    },
    badge: 'Massive Brand Reach',
    features: {
      id: [
        'Ukuran standar 4x8m, 5x10m, 6x12m hingga ukuran kustom',
        'Konstruksi pipa unpole ganda/tunggal dengan hitungan beban angin BMKG',
        'Penerangan lampu sorot LED high-lumen 150W - 250W dengan timer otomatis',
        'Material Flexy Frontlite 440gsm - 510gsm cetak Hi-Res tahan pudar',
        'Sertifikasi kelaikan struktur oleh insinyur sipil berpengalaman',
      ],
      en: [
        'Standard sizes: 4x8m, 5x10m, 6x12m, and custom large-format dimensions',
        'Single or twin unpole steel pipe towers verified for regional wind resistance',
        'Automated 150W - 250W high-lumen commercial LED floodlights',
        'Heavy UV-resistant 440gsm - 510gsm high-resolution banner media',
        'Structural integrity certification by licensed civil engineers',
      ],
    },
    materials: ['Pipa Baja Schedule 40', 'Siku Besi SNI', 'Lampu Sorot LED IP66', 'Flexy Korea 510gsm'],
    leadTime: '15 - 30 Hari Kerja',
    bestFor: 'Kampanye nasional, FMCG, perbankan, telekomunikasi & event akbar',
    iconName: 'Maximize',
  },
  {
    id: 'acrylic-signs',
    category: 'ooh',
    title: {
      id: 'Acrylic Signage & Plakat Khusus',
      en: 'Acrylic Signs & Architectural Plaques',
    },
    subtitle: {
      id: 'Plang akrilik elegan dengan baut stainless pen iklan dan finishing bevel',
      en: 'Sleek acrylic plaques with stainless stand-off bolts and beveled edge polish',
    },
    description: {
      id: 'Cocok untuk plang nama dokter, notaris, kantor konsultan, nomor rumah perumahan elit, dan penanda gedung modular outdoor.',
      en: 'Ideal for professional directory boards, notaries, medical clinics, corporate suites, and premium architectural house numbering.',
    },
    badge: 'Clean & Modern',
    features: {
      id: [
        'Akrilik bening tebal 5mm - 10mm dengan tepi bevel api berkilau',
        'Visual UV Flatbed print direct to substrate atau reverse vinyl print',
        'Baut pen stainless steel 304 anti-karat',
        'Bisa ditambah aksen backlight tipis minimalis',
      ],
      en: [
        'Clear acrylic 5mm - 10mm with flame-polished beveled edges',
        'Direct UV flatbed high-definition printing or reverse vinyl transfer',
        'Stainless steel 304 architectural stand-off mounting spacers',
        'Optional subtle edge-lit or backlit glow',
      ],
    },
    materials: ['Akrilik Bening 5-10mm', 'Pen Stainless', 'Tinta UV Fleksibel', 'Stiker Frosted/Sandblast'],
    leadTime: '3 - 7 Hari Kerja',
    bestFor: 'Notaris, Klinik Spesialis, Kantor Hukum, Nomor Kamar & Rumah',
    iconName: 'Layers',
  },

  // 2. INDOOR ADVERTISING
  {
    id: 'wayfinding',
    category: 'indoor',
    title: {
      id: 'Wayfinding & Signage Penunjuk Arah',
      en: 'Wayfinding & Architectural Navigation',
    },
    subtitle: {
      id: 'Sistem penunjuk arah terpadu untuk rumah sakit, hotel, mall, dan universitas',
      en: 'Integrated directional navigation systems for hospitals, hotels, malls & campuses',
    },
    description: {
      id: 'Membimbing alur gerak pengunjung dengan navigasi yang intuitif, terbaca jelas, dan selaras dengan interior arsitektur bangunan Anda.',
      en: 'Guides visitor flow seamlessly with intuitive, legible directional signage aligned with your facility architectural aesthetics.',
    },
    badge: 'Hospital & Mall Standard',
    features: {
      id: [
        'Standar visibilitas tinggi untuk zona darurat, ruang medis, dan lobi',
        'Material plat aluminium modular, akrilik warna, atau kayu finishing HPL',
        'Sistem gantung plafon (hanging sign), tempel dinding, atau floor totem standing',
        'Bisa diintegrasikan dengan braille dan simbol piktogram universal',
      ],
      en: [
        'High-visibility standards compliant with emergency and hospital protocols',
        'Modular extruded aluminum, colored acrylic, or HPL architectural wood',
        'Ceiling hanging, wall-mounted, or free-standing directory totems',
        'Universal iconography and tactile/braille integration options',
      ],
    },
    materials: ['Aluminium Modular', 'Akrilik MC', 'Vinyl Matte Non-Reflective', 'Kabel Sling Baja'],
    leadTime: '7 - 14 Hari Kerja',
    bestFor: 'Rumah sakit, hotel berbintang, pusat perbelanjaan, gedung kampus',
    iconName: 'Compass',
  },
  {
    id: 'led-flexy',
    category: 'indoor',
    title: {
      id: 'Custom LED Flexy / Neon Flex',
      en: 'Custom Neon Flex & Ambient Glow',
    },
    subtitle: {
      id: 'Lampu neon silikon generasi baru yang hemat listrik, aman dipegang, dan artistik',
      en: 'Next-gen silicone LED neon flex: low power, touch-safe, highly artistic',
    },
    description: {
      id: 'Pilihan populer kafe modern, studio foto, lounge, dan booth pameran untuk menciptakan spot Instagrammable yang memicu viralitas organik media sosial.',
      en: 'The top choice for modern cafes, photo studios, lounges, and exhibition booths to create viral, Instagram-worthy photo spots.',
    },
    badge: 'Instagrammable Spot',
    features: {
      id: [
        'Silikon LED Neon Flex 12V hemat daya dan dingin saat disentuh',
        'Alas dasar akrilik bening 5mm dipotong laser mengikuti lekukan font (cut-to-shape)',
        'Tersedia dimmer pengatur intensitas terang dan efek berkedip dinamis',
        'Kabel transparan rapi dengan adaptor bersertifikasi keselamatan',
      ],
      en: [
        '12V energy-efficient silicone LED flex, cool to the touch',
        '5mm clear acrylic backer laser contour-cut to typographic curves',
        'Smart dimmer for brightness adjustments and pulse animation modes',
        'Concealed transparent cabling with safety-certified power adapter',
      ],
    },
    materials: ['Silikon LED Flex 6mm/8mm', 'Akrilik Laser Cut', 'Adaptor 12V 10A', 'Dimmer RF Wireless'],
    leadTime: '3 - 6 Hari Kerja',
    bestFor: 'Coffee shop, bistro, butik, salon, studio podcast, backdrop panggung',
    iconName: 'Sparkles',
  },
  {
    id: 'indoor-lettering',
    category: 'indoor',
    title: {
      id: '3D Lettering Resepsionis & Lobi',
      en: 'Reception & Lobby 3D Lettering',
    },
    subtitle: {
      id: 'Logo dan tipografi korporat presisi tinggi untuk backdrop meja resepsionis',
      en: 'High-precision corporate brand crests and logos for reception backdrops',
    },
    description: {
      id: 'Menyapa tamu Anda dengan kesan profesionalisme tanpa kompromi saat pertama kali melangkah ke kantor Anda.',
      en: 'Welcomes your clients and partners with uncompromised corporate prestige upon their very first step into your lobby.',
    },
    badge: 'Executive Impression',
    features: {
      id: [
        'Pilihan material: Akrilik Mirror Gold/Silver, Stainless 304, Kuningan, Spons Eva',
        'Bisa dibuat tanpa lampu atau dengan backlight tersembunyi bergradasi halus',
        'Finishing tepi bevel halus tanpa goresan mikroskopis',
        'Pemasangan rapi dengan perekat berkekuatan tinggi tanpa merusak marmer/HPL',
      ],
      en: [
        'Finishes: Mirror Gold/Silver Acrylic, Brushed Stainless 304, Solid Brass',
        'Concealed warm-white perimeter halo illumination option',
        'Micro-polished beveled edges free of blemishes',
        'Clean non-destructive mounting adhesive safe for luxury marble/HPL wall panels',
      ],
    },
    materials: ['Akrilik Mirror Gold', 'Stainless Hairline', 'LED Warm White 3000K', 'Tape 3M VHB'],
    leadTime: '5 - 10 Hari Kerja',
    bestFor: 'Meja resepsionis bank, klinik kecantikan, kantor advokat, kantor BUMN',
    iconName: 'Award',
  },
  {
    id: 'store-branding',
    category: 'indoor',
    title: {
      id: 'Store Branding & Custom Furniture',
      en: 'Store Branding & Retail Fixtures',
    },
    subtitle: {
      id: 'Penyediaan booth display island, rak gondola brand, dan interior retail terintegrasi',
      en: 'End-to-end retail island booths, brand gondolas, and commercial interior fit-outs',
    },
    description: {
      id: 'Membangun ekosistem ritel yang mempercepat penjualan produk Anda di pusat perbelanjaan, supermarket, dan toko elektronik.',
      en: 'Engineered commercial fixtures that accelerate retail conversions across shopping malls, supermarkets, and electronics showrooms.',
    },
    badge: 'Full Fit-Out',
    features: {
      id: [
        'Konstruksi kayu multiplex tebal dilapisi HPL Taco / Duco premium',
        'Integrasi lampu LED downlight dan strip lighting tersembunyi',
        'Kunci lemari showcase terintegrasi, laci penyimpanan barang, dan stopkontak rapi',
        'Sesuai panduan visual merchandise (VM guidelines) brand multinasional',
      ],
      en: [
        'Plywood structural cabinet builds finished with premium Taco HPL or Duco',
        'Integrated commercial downlights and recessed edge lighting',
        'Security showcase locksets, storage drawers, and hidden cable channels',
        '100% compliant with multinational visual merchandising (VM) brand books',
      ],
    },
    materials: ['Multiplek 18mm', 'HPL Taco / Arborite', 'Kaca Tempered 8mm', 'Kaki Stainless'],
    leadTime: '10 - 20 Hari Kerja',
    bestFor: 'Island booth mall (seperti SKINTIFIC, Timezone), counter kosmetik, showroom gadget',
    iconName: 'Store',
  },

  // 3. TAX SERVICES (PAJAK REKLAME)
  {
    id: 'tax-services',
    category: 'tax',
    title: {
      id: 'Layanan Pengurusan Pajak Reklame & Izin SIPR',
      en: 'Advertisement Tax & Permitting Services',
    },
    subtitle: {
      id: 'Bantuan hukum dan birokrasi resmi pengurusan pajak reklame di Bandar Lampung & Sumatera',
      en: 'Official bureaucratic and legal licensing for outdoor advertisement tax across Sumatera',
    },
    description: {
      id: 'Hindari risiko denda, stiker "Belum Bayar Pajak", hingga pembongkaran paksa oleh Satpol PP. Tim legal kami mengurus perizinan reklame Anda dari titik nol hingga SKPD resmi terbit.',
      en: 'Eliminate the risk of hefty municipal penalties, warning stickers, or emergency dismantling by authorities. Our specialized team handles licensing from site zoning to final tax decrees.',
    },
    badge: 'Legal & Safe',
    features: {
      id: [
        'Perhitungan resmi Nilai Sewa Reklame (NSR) sesuai Perwali Kota Bandar Lampung',
        'Pengurusan Izin Penyelenggaraan Reklame (SIPR) di Dinas Penanaman Modal (PTSP)',
        'Pemeriksaan titik zonasi ruang kota dan jarak sempadan bangunan',
        'Pengurusan rekomendasi teknis Dinas Perhubungan dan Tata Kota',
        'Sistem notifikasi pengingat perpanjangan tahunan otomatis sebelum jatuh tempo',
        'Garansi perlindungan legal dari penertiban sepihak aparat',
      ],
      en: [
        'Accurate calculation of Municipal Advertisement Rent Value (NSR)',
        'Full acquisition of SIPR permits from One-Stop Investment Licensing Service (PTSP)',
        'Zoning compliance verification and setback boundary inspections',
        'Liaison with Municipal Department of Transportation & Urban Planning',
        'Automated annual renewal reminder system before penalty deadlines',
        'Full legal warranty protecting against unilateral enforcement shutdowns',
      ],
    },
    materials: ['Legal Documentation', 'BPPRD SKPD Resmi', 'Sertifikat Laik Fungsi', 'Asuransi Konstruksi'],
    leadTime: '7 - 14 Hari Kerja',
    bestFor: 'Semua pemilik billboard, neonbox outdoor, pylon sign di tepi jalan protokol',
    iconName: 'FileCheck',
  },

  // 4. DIGITAL ADS & STRATEGY CONSULTANCY (UPCOMING)
  {
    id: 'digital-strategy',
    category: 'digital',
    title: {
      id: 'Digital Ads & Strategy Consultancy',
      en: 'Digital Ads & Strategy Consultancy',
    },
    subtitle: {
      id: 'Ekspansi digital modern: Menghubungkan impresi fisik OOH dengan konversi digital online',
      en: 'Modern digital expansion: Bridging physical OOH street impressions with online conversions',
    },
    description: {
      id: 'Segera hadir untuk klien terpilih! Kami membantu bisnis Anda membangun playbook brand menyeluruh, strategi visual omnichannel, dan kampanye iklan Meta (Instagram & Facebook) berkinerja tinggi.',
      en: 'Launching soon for select partners! We empower legacy brands to build a comprehensive playbook, omnichannel presence, and high-ROI Meta (Instagram/Facebook) advertising funnels.',
    },
    badge: 'Not Launched Yet • Early Access',
    isUpcoming: true,
    features: {
      id: [
        'Brand Guidelines & Visual Playbook (Standar logo, palet warna, tipografi)',
        'Omnichannel OOH-to-Online Funnel Strategy (QR Code dinamis & retargeting)',
        'Meta Ads Performance Marketing (Instagram & Facebook Ads targeted regional Lampung-Sumatera)',
        'Audit kehadiran digital & identitas visual bisnis lokal',
        'Prioritas konsultasi perdana bagi mitra setia sejak 2002',
      ],
      en: [
        'Comprehensive Brand Guidelines & Visual Playbook (Typography, color psychology, logo rules)',
        'Omnichannel OOH-to-Online Funnel Strategy (Dynamic QR Tracking & retargeting)',
        'Meta Ads Performance Marketing (High-converting Instagram & Facebook regional funnels)',
        'Complete digital footprint & visual identity audit for local enterprises',
        'Priority consultation access reserved for longstanding clients since 2002',
      ],
    },
    materials: ['Figma Brand Deck', 'Meta Ads Manager Setup', 'Looker Studio Dashboard', 'Creative Templates'],
    leadTime: 'Membuka Waitlist Batch 1',
    bestFor: 'Bisnis lokal yang ingin naik kelas, ekspansi cabang, dan mendominasi pasar digital',
    iconName: 'TrendingUp',
  },
];
