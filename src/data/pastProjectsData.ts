// Real past project photographic archive uploaded by 2M Advertising
// Direct imports of genuine workshop fabrication & installed signage projects

export interface RealProjectItem {
  id: string;
  order: number;
  title: string;
  category: '3d-lettering' | 'neonbox' | 'acp-facade' | 'pylon-sign' | 'billboard' | 'shop-sign';
  categoryLabel: { id: string; en: string };
  client: string;
  location: string;
  year: string;
  materials: string[];
  dimensions: string;
  image: string;
  narrative: {
    id: string;
    en: string;
  };
  specs: {
    frame: string;
    lighting: string;
    finish: string;
    warranty: string;
  };
}

// Eager load all project images via Vite glob
const imageModules = import.meta.glob<{ default: string }>('../assets/real-projects/*.png', {
  eager: true,
});

// Helper to find image by partial filename
const getImageByFilename = (part: string): string => {
  for (const [path, mod] of Object.entries(imageModules)) {
    if (path.includes(part)) {
      return mod.default;
    }
  }
  // Fallback to first available
  const values = Object.values(imageModules);
  return values.length > 0 ? values[0].default : '';
};

export const REAL_PAST_PROJECTS: RealProjectItem[] = [
  {
    id: 'proj-01',
    order: 1,
    title: 'Huruf Timbul 3D Stainless Steel & Backlight LED Halo',
    category: '3d-lettering',
    categoryLabel: { id: 'Huruf Timbul 3D', en: '3D Channel Letters' },
    client: 'Gedung Korporat Perkantoran & Institusi',
    location: 'Jl. Raden Intan, Bandar Lampung',
    year: '2023',
    materials: ['Stainless Mirror 304 0.8mm', 'Acrylic Milky 5mm', 'Samsung LED IP68 Warm White', 'Laser Cut Solid'],
    dimensions: 'Tinggi Font: 85 cm • Tebal 8 cm',
    image: getImageByFilename('12.32.36'),
    narrative: {
      id: 'Fabrikasi huruf timbul stainless mirror grade 304 dengan teknik tekuk presisi tanpa sambungan kasar. Dilengkapi backlight LED warm white bergaransi tahan cuaca tropis Lampung.',
      en: 'Precision fabricated 304-grade mirror stainless channel lettering with seamless fold lines and weather-rated warm-white LED halo backlighting.',
    },
    specs: {
      frame: 'Hollow Galvanis 30x30 anti-karat',
      lighting: 'Samsung Module LED IP68 1.2W',
      finish: 'Mirror Polish Grade A (Non-tarnishing)',
      warranty: 'Garansi Struktur & Kelistrikan 1 Tahun',
    },
  },
  {
    id: 'proj-02',
    order: 2,
    title: 'Neon Box Restoran & Kafe Akrilik Embossed Double-Sided',
    category: 'neonbox',
    categoryLabel: { id: 'Neon Box Akrilik', en: 'Acrylic Neon Box' },
    client: 'Food & Beverage Lifestyle Cafe',
    location: 'Kawasan Bisnis Way Halim, Bandar Lampung',
    year: '2023',
    materials: ['Cast Acrylic MC 3mm', 'Alumunium Profile Anodized', 'Sticker Oracal 8500 Translucent', 'Trafo Rainproof'],
    dimensions: '180 cm x 90 cm x 15 cm',
    image: getImageByFilename('12.34.38'),
    narrative: {
      id: 'Neon box dua sisi dengan pencahayaan merata tanpa bayangan tabung (no shadow lines). Menggunakan stiker khusus signage Oracal seri 8500 anti pudar.',
      en: 'Double-sided acrylic neon box engineered with homogenous illumination without hot-spot shadows, utilizing fade-resistant Oracal 8500 vinyl.',
    },
    specs: {
      frame: 'Profil Alumunium Extrusion Heavy Duty',
      lighting: 'LED Bar High Lumen 6500K Cool White',
      finish: 'Clear Coat Acrylic Protective Seal',
      warranty: 'Garansi Trafo & LED 1 Tahun Penuh',
    },
  },
  {
    id: 'proj-03',
    order: 3,
    title: 'Fasad Ruko Modern Komersial Alumunium Composite Panel (ACP)',
    category: 'acp-facade',
    categoryLabel: { id: 'Fasad Ruko ACP', en: 'ACP Shophouse Facade' },
    client: 'Pusat Niaga Komersial 3 Lantai',
    location: 'Jl. ZA. Pagar Alam, Rajabasa, Bandar Lampung',
    year: '2024',
    materials: ['ACP Seven PVDF 4mm Eksterior', 'Rangka Hollow Besi 40x40', 'Silicone Sealant Dow Corning 791', 'Baut Dynabolt 12mm'],
    dimensions: 'Lebar 9.5 Meter • Tinggi 12 Meter (3 Lantai)',
    image: getImageByFilename('12.34.48'),
    narrative: {
      id: 'Instalasi cladding fasad ruko komersial menggunakan panel Seven PVDF garansi warna 10 tahun. Nat sambungan simetris dengan sealant tahan gempa mikro dan cuaca pesisir.',
      en: 'Commercial facade cladding using PVDF exterior ACP Seven with 10-year color warranty, engineered structural joints, and coastal weather sealants.',
    },
    specs: {
      frame: 'Besi Hollow Galvanis 40x40 Tebal 1.6mm',
      lighting: 'Hidden LED Strip IP67 Accent Line',
      finish: 'Matte Grey & Vibrant Accent Composite',
      warranty: 'Garansi Konstruksi Rangka 2 Tahun',
    },
  },
  {
    id: 'proj-04',
    order: 4,
    title: 'Signboard Ruko Retail & Fascia Banner Storefront',
    category: 'shop-sign',
    categoryLabel: { id: 'Shop Sign & Fascia', en: 'Storefront Fascia' },
    client: 'Jaringan Toko Retail & Perlengkapan',
    location: 'Jl. Teuku Umar, Kedaton, Bandar Lampung',
    year: '2023',
    materials: ['Flexi Backlite Jerman 510gsm', 'Besi Siku 40x40', 'List Alumunium Coklat', 'Lampu LED T8 Waterproof'],
    dimensions: 'Panjang 600 cm x Tinggi 150 cm',
    image: getImageByFilename('12.34.59'),
    narrative: {
      id: 'Plang merek fascia ruko berdimensi panjang dengan cetak resolusi tinggi teknologi UV print. Tahan panas terik dan hujan lebat tanpa gelembung atau sobek.',
      en: 'Long-span storefront fascia billboard with high-durability UV printing on German 510gsm backlite substrate, engineered for high UV resistance.',
    },
    specs: {
      frame: 'Konstruksi Besi Siku 4x4 & Hollow 3x3',
      lighting: 'Philips LED Tube IP65 High-Efficiency',
      finish: 'Alumunium Bezel Trim 2-Inch',
      warranty: 'Garansi Reklame & Lampu 1 Tahun',
    },
  },
  {
    id: 'proj-05',
    order: 5,
    title: 'Pylon Sign Totem SPBU & Pusat Otomotif',
    category: 'pylon-sign',
    categoryLabel: { id: 'Pylon Sign Totem', en: 'Pylon Sign Totem' },
    client: 'Stasiun Pengisian & Layanan Otomotif Resmi',
    location: 'Lintas Sumatera, Bypass Soekarno-Hatta',
    year: '2023',
    materials: ['Pipa Seamless 10 Inch', 'ACP Alucobond 4mm', 'Akrilik Laser 10mm Timbul', 'Modul LED Outdoor Superbright'],
    dimensions: 'Tinggi 8.0 Meter • Lebar 2.2 Meter',
    image: getImageByFilename('12.57.42'),
    narrative: {
      id: 'Pylon sign totem berdiri bebas (free-standing) tahan terpaan angin kencang hingga 120 km/jam. Dilengkapi pondasi cakar ayam beton bertulang kedalaman 2.5 meter.',
      en: 'Heavy-duty free-standing pylon totem engineered for 120 km/h wind loads, supported by 2.5-meter deep reinforced concrete rebar footings.',
    },
    specs: {
      frame: 'Tiang Pipa Baja Unipole & WF 200',
      lighting: 'LED Superbright Modul Injection IP68',
      finish: 'DuPont Auto Paint & Polyurethane Clear',
      warranty: 'Garansi Struktur Sipil 3 Tahun',
    },
  },
  {
    id: 'proj-06',
    order: 6,
    title: 'Huruf Timbul Akrilik LED Menyala Depan (Face-Lit)',
    category: '3d-lettering',
    categoryLabel: { id: 'Akrilik Face-Lit 3D', en: 'Face-Lit 3D Acrylic' },
    client: 'Klinik Spesialis & Apotek Modern 24 Jam',
    location: 'Jl. Kartini, Tanjung Karang Pusat',
    year: '2024',
    materials: ['Akrilik Murni Marga Cipta 3mm', 'Kuping Samping Plat Galvanis', 'Cat Oven Nippon Paint', 'LED Modul Samsung'],
    dimensions: 'Total Panjang Kalimat: 550 cm • Tinggi 60 cm',
    image: getImageByFilename('12.58.38'),
    narrative: {
      id: 'Keterbacaan optimal dari kejauhan 200 meter di malam hari. Menggunakan akrilik grade A yang tidak menguning setelah terpapar sinar matahari bertahun-tahun.',
      en: 'Engineered for 200-meter nocturnal readability with high-purity non-yellowing acrylic and uniform diffused LED back illumination.',
    },
    specs: {
      frame: 'Plat Galvanis 0.7mm Laser Cut',
      lighting: 'Samsung Module 3-Mata White 10000K',
      finish: 'Baking Enamel Paint Coating',
      warranty: 'Garansi Servis & Kelistrikan 1 Tahun',
    },
  },
  {
    id: 'proj-07',
    order: 7,
    title: 'Billboard Raksasa Unipole Lintas Provinsi',
    category: 'billboard',
    categoryLabel: { id: 'Billboard Unipole', en: 'Highway Unipole Billboard' },
    client: 'Brand Telekomunikasi & Perbankan Nasional',
    location: 'Gerbang Tol Kota Baru - Itera, Lampung',
    year: '2023',
    materials: ['Tiang Pipa Baja 24 Inch Tebal 12mm', 'Besi Siku & UNP Struktur', 'Plat Bordes Catwalk Servis', 'Sorot LED 200W x 8 Titik'],
    dimensions: 'Panel Reklame 6m x 12m • Ketinggian Tiang 18m',
    image: getImageByFilename('1.14.06'),
    narrative: {
      id: 'Konstruksi baja berat berstandar SNI sipil dengan pengelasan full penetrasi argon. Dilengkapi tangga dan catwalk pengaman untuk pergantian visual cepat.',
      en: 'Heavy civil-grade structural steel billboard adhering to Indonesian SNI standards, featuring maintenance catwalks and 1600W total LED flood illumination.',
    },
    specs: {
      frame: 'Pipa Baja Konstruksi 24" & Rangka Siku UNP',
      lighting: '8x LED Floodlight 200W IP66 Waterproof',
      finish: 'Epoxy Primer & Polyurethane Marine Paint',
      warranty: 'Garansi Kekuatan Struktur 5 Tahun',
    },
  },
  {
    id: 'proj-08',
    order: 8,
    title: 'Signage Identitas Cabang Bank BUMN & ATM Center',
    category: '3d-lettering',
    categoryLabel: { id: 'Banking Signage', en: 'Banking Signage' },
    client: 'Institusi Perbankan Terkemuka',
    location: 'Kantor Cabang Pembantu (KCP) Kedamaian, Bandar Lampung',
    year: '2024',
    materials: ['Stainless Hairline 304', 'Akrilik Biru Khusus Korporat', 'Rangka Gantung Stainless', 'Catu Daya Meanwell IP67'],
    dimensions: '350 cm x 80 cm x 10 cm',
    image: getImageByFilename('1.14.12'),
    narrative: {
      id: 'Dikerjakan dengan kepatuhan buku panduan identitas korporat (Brand Guidelines) yang sangat ketat: akurasi warna Pantone dan presisi sudut potong CNC 0.1mm.',
      en: 'Strict adherence to enterprise banking brand guidelines with Pantone-matched acrylic pigments and 0.1mm CNC tolerance cuts.',
    },
    specs: {
      frame: 'Stainless Steel Hairline 1.0mm 304',
      lighting: 'Meanwell Waterproof Power Supply + LED IP68',
      finish: 'Scotch-Brite Directional Hairline',
      warranty: 'Garansi Bebas Karat & LED 2 Tahun',
    },
  },
  {
    id: 'proj-09',
    order: 9,
    title: 'Neon Box Slim Bulat Gantung (Blade Signage)',
    category: 'neonbox',
    categoryLabel: { id: 'Blade Sign Bulat', en: 'Circular Blade Sign' },
    client: 'Kedai Kopi & Lifestyle Roastery',
    location: 'Jl. Gatot Subroto, Pahoman, Bandar Lampung',
    year: '2023',
    materials: ['Alumunium Round Frame Die-Cast', 'Akrilik Thermoformed Cembung', 'Braket Besi Tempa Hitam Doff', 'LED Circle Ring'],
    dimensions: 'Diameter 70 cm • Tebal 12 cm',
    image: getImageByFilename('1.14.20'),
    narrative: {
      id: 'Signage blade dua sisi berbentuk bulat dengan akrilik cembung thermoformed modern. Menarik perhatian pejalan kaki dan pengendara dari sudut tegak lurus.',
      en: 'Double-sided thermoformed round blade sign engineered for 90-degree street corner pedestrian visibility with heavy wrought-iron wall mounts.',
    },
    specs: {
      frame: 'Die-cast Seamless Round Alumunium',
      lighting: 'High CRI 90+ Circular LED Strip',
      finish: 'Matte Powder Coating Black Sand',
      warranty: 'Garansi Komponen 1 Tahun',
    },
  },
  {
    id: 'proj-10',
    order: 10,
    title: 'Huruf Timbul Kuningan Antik & Gold Mirror Klasik',
    category: '3d-lettering',
    categoryLabel: { id: 'Huruf Kuningan Gold', en: 'Brass & Gold Mirror' },
    client: 'Hotel Butik & Ballroom Eksekutif',
    location: 'Kawasan Teluk Betung, Bandar Lampung',
    year: '2023',
    materials: ['Plat Kuningan Asli 1.0mm', 'Clear Lacquer Pelindung Oksidasi', 'Baut Tanam Stainless', 'LED Sela Dinding'],
    dimensions: 'Tinggi Font: 45 cm • Tebal 4 cm',
    image: getImageByFilename('1.14.27'),
    narrative: {
      id: 'Kemewahan logam kuningan asli yang digosok manual menghasilkan pantulan kilau emas mewah. Dilapisi pelindung lacquer anti kusam dan anti oksidasi udara lembap.',
      en: 'Hand-buffed genuine brass letters protected by industrial anti-oxidation lacquer, providing luxury hotel-grade warm gold brilliance.',
    },
    specs: {
      frame: 'Baut Tanam Stainless Tersembunyi (Invisible Studs)',
      lighting: 'Warm 2700K Halo Glow Accent',
      finish: 'Mirror Gold Brass + Clear PU Coating',
      warranty: 'Garansi Kilau Logam 2 Tahun',
    },
  },
  {
    id: 'proj-11',
    order: 11,
    title: 'Neon Sign Flex LED Custom Art & Interior Ritel',
    category: 'neonbox',
    categoryLabel: { id: 'Neon Flex Kustom', en: 'Custom Neon Flex' },
    client: 'Distro Fashion & Studio Kreatif',
    location: 'Mall Boemi Kedaton (MBK), Bandar Lampung',
    year: '2024',
    materials: ['Silicone Neon Flex 12V High Lumens', 'Akrilik Bening 8mm Laser Cut', 'Adaptor 12V 10A Jaring', 'Dimmer Remote Control'],
    dimensions: '140 cm x 85 cm',
    image: getImageByFilename('1.14.47'),
    narrative: {
      id: 'Instalasi tipografi artistik neon fleksibel silikon dengan lengkungan tajam sempurna. Hemat daya listrik hingga 80% dibanding tabung kaca gas tradisional.',
      en: 'Artistic silicone LED neon flex lettering precision-bonded to 8mm crystal acrylic baseboards, delivering 80% energy savings over neon glass.',
    },
    specs: {
      frame: 'Laser Cut Crystal Clear Acrylic 8mm',
      lighting: 'Silicone IP67 120LED/m 12V Neon',
      finish: 'Polished Flame Edge Acrylic',
      warranty: 'Garansi Modul LED 1 Tahun',
    },
  },
  {
    id: 'proj-12',
    order: 12,
    title: 'Rambu Petunjuk Arah Wayfinding & Pylon Gedung',
    category: 'pylon-sign',
    categoryLabel: { id: 'Wayfinding Sign', en: 'Campus Wayfinding' },
    client: 'Rumah Sakit Swasta & Kampus Universitas',
    location: 'Kawasan Pendidikan Sukarame, Bandar Lampung',
    year: '2024',
    materials: ['Plat Alumunium 2mm', 'Cat Polyurethane Reflective 3M', 'Tiang Pipa Besi 4 Inch', 'Pondasi Angkur Cor'],
    dimensions: 'Tinggi 240 cm x Lebar 100 cm',
    image: getImageByFilename('1.22.31'),
    narrative: {
      id: 'Sistem rambu wayfinding kampus dan rumah sakit dengan standar keterbacaan darurat. Menggunakan stiker reflektif 3M Diamond Grade yang bersinar terang saat tersorot lampu kendaraan.',
      en: 'Hospital and campus directional navigation totem utilizing 3M Diamond Grade reflective sheeting for immediate nocturnal guidance.',
    },
    specs: {
      frame: 'Baja Galvanis Tiang Bulat 4" Tebal 3mm',
      lighting: '3M Diamond Grade Reflective Substrate',
      finish: 'Powder Coating Oven Heat-Cured',
      warranty: 'Garansi Daya Rekat Stiker 3 Tahun',
    },
  },
  {
    id: 'proj-13',
    order: 13,
    title: 'Canopy & Fasad Entrance Megah Showroom Otomotif',
    category: 'acp-facade',
    categoryLabel: { id: 'Canopy & ACP Entrance', en: 'Canopy & ACP Facade' },
    client: 'Dealer Mobil & Showroom Resmi',
    location: 'Jl. Hajimena, Natar, Lampung Selatan',
    year: '2023',
    materials: ['ACP Seven Metallic Silver', 'Besi Baja IWF 150', 'Talang Air Stainless 304', 'Lampu Downlight Waterproof IP65'],
    dimensions: 'Bentang Kanopi 14m x 5m',
    image: getImageByFilename('1.24.59'),
    narrative: {
      id: 'Fabrikasi kanopi entrance dan portal fasad dealer otomotif dengan perhitungan drainase talang air tersembunyi agar air hujan tidak melimpas ke area parkir tamu.',
      en: 'Automotive dealership entrance portal with integrated hidden stainless storm gutters and clean silver metallic composite finishes.',
    },
    specs: {
      frame: 'Baja Berat WF 150 & Kuda-Kuda Besi',
      lighting: 'Integrated LED Downlight 18W IP65',
      finish: 'Seven Metallic Silver PVDF Cladding',
      warranty: 'Garansi Struktur & Bebas Bocor 2 Tahun',
    },
  },
  {
    id: 'proj-14',
    order: 14,
    title: 'Plang Reklame Bengkel & Pusat Ban Resmi',
    category: 'shop-sign',
    categoryLabel: { id: 'Plang Merek Bengkel', en: 'Service Center Fascia' },
    client: 'Pusat Ban & Servis Otomotif Ternama',
    location: 'Jl. Urip Sumoharjo, Way Halim, Bandar Lampung',
    year: '2024',
    materials: ['Seng Plat Alumunium Tebal', 'Cat Duco Polyurethane Otomotif', 'Besi Hollow Rangka 40x40', 'Sorot Tembak LED 100W'],
    dimensions: 'Panjang 800 cm x Tinggi 180 cm',
    image: getImageByFilename('1.27.00'),
    narrative: {
      id: 'Signboard ruko otomotif dengan cat duco tahan minyak, oli, dan panas knalpot. Rangka diperkuat dengan kawat seling baja penahan getaran jalan raya.',
      en: 'Oil and grime resistant automotive service center fascia billboard reinforced with secondary vibration damper steel cables.',
    },
    specs: {
      frame: 'Hollow Galvanis 4x4 Double Truss',
      lighting: 'Floodlight LED 100W Wide Angle',
      finish: 'DuPont Auto Polyurethane Enamel',
      warranty: 'Garansi Rangka 2 Tahun',
    },
  },
  {
    id: 'proj-15',
    order: 15,
    title: 'Neon Box Toko Ritel Farmasi & Kebugaran 24 Jam',
    category: 'neonbox',
    categoryLabel: { id: 'Neon Box Farmasi', en: 'Pharmacy 24H Neon Box' },
    client: 'Jaringan Farmasi & Apotek Terkemuka',
    location: 'Jl. Diponegoro, Teluk Betung Utara, Bandar Lampung',
    year: '2024',
    materials: ['Akrilik Susu 3mm', 'Stiker Cutting Oracal Translucent', 'Profil Alumunium 13cm', 'Modul LED Waterproof'],
    dimensions: 'Lebar 300 cm x Tinggi 100 cm',
    image: getImageByFilename('1.42.22'),
    narrative: {
      id: 'Pencahayaan LED merata dengan konsumsi daya hanya 90 Watt untuk ukuran 3 meter. Dilengkapi sensor otomatis fotosel (otomatis menyala saat maghrib).',
      en: 'Energy-saving 90W total draw pharmacy lightbox equipped with automatic photocell dusk-to-dawn day/night activation relays.',
    },
    specs: {
      frame: 'Profil Alumunium List Coklat Anodized',
      lighting: 'LED Module Injection 1.5W IP68 + Sensor Cahaya',
      finish: 'Oracal 8500 Translucent Color Matched',
      warranty: 'Garansi Elektrikal 1 Tahun',
    },
  },
  {
    id: 'proj-16',
    order: 16,
    title: 'Huruf Timbul Logam Galvanis Solid Cat Duco Oven',
    category: '3d-lettering',
    categoryLabel: { id: 'Huruf Timbul Galvanis', en: 'Galvanized Lettering' },
    client: 'Pusat Logistik & Gudang Ekspedisi Kargo',
    location: 'Kawasan Industri Lampung (KILP), Srengsem',
    year: '2023',
    materials: ['Plat Galvanis Anti-Karat 1.2mm', 'Cat Primer Epoxy', 'Top Coat Polyurethane Industri', 'Baut Fischer Heavy Duty'],
    dimensions: 'Tinggi Font: 110 cm • Tebal 12 cm',
    image: getImageByFilename('1.42.42'),
    narrative: {
      id: 'Huruf timbul skala besar untuk fasad pergudangan kargo pelabuhan. Tahan terhadap uap garam air laut Teluk Lampung dengan sistem cat pelapisan 3 lapis (primer, undercoat, topcoat).',
      en: 'Large-scale 1.1-meter warehouse facade channel letters protected against marine salt mist via 3-stage epoxy industrial coatings.',
    },
    specs: {
      frame: 'Besi Beton Angkur 12mm Tembus Dinding',
      lighting: 'Sorot Floodlight LED Outdoor 150W',
      finish: 'Epoxy Anti-Rust + Industrial Gloss Topcoat',
      warranty: 'Garansi Bebas Keropos 3 Tahun',
    },
  },
  {
    id: 'proj-17',
    order: 17,
    title: 'Billboard Toko Elektronik & Ponsel Pintar',
    category: 'billboard',
    categoryLabel: { id: 'Billboard Komersial', en: 'Storefront Billboard' },
    client: 'Authorized Brand Store Elektronik & Gadget',
    location: 'Simpang Lima Kedaton, Bandar Lampung',
    year: '2024',
    materials: ['Besi Pipa 3 Inch', 'Plat Alumunium Composite', 'Frontlite Korea 440gsm High-Res UV', 'Baut Stainless'],
    dimensions: 'Lebar 500 cm x Tinggi 300 cm',
    image: getImageByFilename('1.42.48'),
    narrative: {
      id: 'Pemasangan di persimpangan jalan protokol terpadat di Bandar Lampung dengan sudut kemiringan (angle) yang dihitung khusus untuk visibilitas 100% dari lampu merah.',
      en: 'Engineered at a calibrated sightline angle at Bandar Lampung’s busiest intersection for 100% unobstructed stoplight dwell-time visibility.',
    },
    specs: {
      frame: 'Truss Konstruksi Pipa 3" & UNP 80',
      lighting: '4x Floodlight LED 50W Cool White',
      finish: 'Alumunium Framing Corner Covers',
      warranty: 'Garansi Konstruksi & Izin Pajak BPPRD',
    },
  },
];
