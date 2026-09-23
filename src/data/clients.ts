import { ClientItem } from '../types';

export const NOTABLE_CLIENTS: ClientItem[] = [
  // Automotive & Tires
  {
    id: 'bridgestone',
    name: 'Bridgestone',
    category: 'automotive',
    categoryLabel: { id: 'Otomotif & Ban', en: 'Automotive & Tires' },
    projectScope: 'Authorized Dealer Pylon Sign, Shopfront Fascia & 3D Acrylic Lettering',
    location: 'Bandar Lampung & Sumatera Network',
    featured: true,
  },
  {
    id: 'gt-radial',
    name: 'GT Radial',
    category: 'automotive',
    categoryLabel: { id: 'Otomotif & Ban', en: 'Automotive & Tires' },
    projectScope: 'Tirezone Dealership Signboard, Neon Box & Exterior Branding',
    location: 'Lampung & Sumatera Selatan',
    featured: true,
  },
  {
    id: 'accelera',
    name: 'Accelera Radial',
    category: 'automotive',
    categoryLabel: { id: 'Otomotif & Ban', en: 'Automotive & Tires' },
    projectScope: 'Automotive Outlet Signage & Workshop Pylon Signs',
    location: 'Bandar Lampung & Metro',
    featured: true,
  },
  {
    id: 'achilles',
    name: 'Achilles Tires',
    category: 'automotive',
    categoryLabel: { id: 'Otomotif & Ban', en: 'Automotive & Tires' },
    projectScope: 'Tire Partner Retail Storefront Signage & Neon Boxes',
    location: 'Lampung Regional',
    featured: true,
  },

  // Government & National Infrastructure (BUMN & Pemprov)
  {
    id: 'pln',
    name: 'PLN (Persero)',
    category: 'government',
    categoryLabel: { id: 'BUMN & Pemerintah', en: 'SOE & Government' },
    projectScope: 'Kantor Wilayah Main Pylon Sign, Wayfinding & Acrylic Building Branding',
    location: 'PLN UID Lampung & Sub-stations',
    featured: true,
  },
  {
    id: 'pemprov-lampung',
    name: 'Pemerintah Provinsi Lampung',
    category: 'government',
    categoryLabel: { id: 'BUMN & Pemerintah', en: 'SOE & Government' },
    projectScope: 'Public Information Billboards, City Landmarks & Monumental 3D Lettering',
    location: 'Bandar Lampung & Kompleks Pemprov',
    featured: true,
  },
  {
    id: 'waskita',
    name: 'Waskita Karya',
    category: 'government',
    categoryLabel: { id: 'BUMN & Pemerintah', en: 'SOE & Government' },
    projectScope: 'Toll Road Signage, Infrastructure Project Safety Signboards & Construction Branding',
    location: 'JTTS (Jalan Tol Trans Sumatera)',
    featured: true,
  },

  // Banking & Financial
  {
    id: 'bank-lampung',
    name: 'Bank Lampung',
    category: 'banking',
    categoryLabel: { id: 'Perbankan & Finansial', en: 'Banking & Financial' },
    projectScope: 'Branch Office Fascia Signs, ATM Center Neonboxes & Complete Interior Wayfinding',
    location: 'Headquarters & Branch Network across Lampung',
    featured: true,
  },
  {
    id: 'bsi',
    name: 'BSI (Bank Syariah Indonesia)',
    category: 'banking',
    categoryLabel: { id: 'Perbankan & Finansial', en: 'Banking & Financial' },
    projectScope: 'National Merger Rebranding: Pylon Signs, ATM Kiosks & 3D Stainless Lettering',
    location: 'Bandar Lampung & Sumatera',
    featured: true,
  },

  // Electronics & Commercial Appliances
  {
    id: 'daikin',
    name: 'Daikin',
    category: 'electronics',
    categoryLabel: { id: 'Elektronik & Brand', en: 'Electronics & Tech' },
    projectScope: 'Proshop Exclusive Signage, High-Grade Aluminium Pylon & Acrylic Lettering',
    location: 'Bandar Lampung Specialist Outlets',
    featured: true,
  },
  {
    id: 'sharp',
    name: 'SHARP',
    category: 'electronics',
    categoryLabel: { id: 'Elektronik & Brand', en: 'Electronics & Tech' },
    projectScope: 'Distributor Storefront Signboards & Illuminated Showroom Pylons',
    location: 'Sumatera Distribution Hub',
    featured: true,
  },
  {
    id: 'electrolux',
    name: 'Electrolux',
    category: 'electronics',
    categoryLabel: { id: 'Elektronik & Brand', en: 'Electronics & Tech' },
    projectScope: 'Premium Showroom Interior Lettering & Front Acrylic Neon Signs',
    location: 'Bandar Lampung',
    featured: true,
  },

  // F&B, Hospitality & Hotels
  {
    id: 'kfc',
    name: 'KFC',
    category: 'hospitality',
    categoryLabel: { id: 'Hotel, F&B & Resto', en: 'Hotels & F&B' },
    projectScope: 'Drive-Thru Menu Boards, High-Elevation Pylon Signs & 3D Colonel Signs',
    location: 'Multiple Outlets in Lampung & Sumatera',
    featured: true,
  },
  {
    id: 'radisson',
    name: 'Radisson Hotels & Resorts',
    category: 'hospitality',
    categoryLabel: { id: 'Hotel, F&B & Resto', en: 'Hotels & F&B' },
    projectScope: 'Architectural Rooftop 3D Stainless Sign, Grand Driveway Pylon & Wayfinding System',
    location: 'Bandar Lampung Luxury District',
    featured: true,
  },
  {
    id: 'novotel',
    name: 'NOVOTEL',
    category: 'hospitality',
    categoryLabel: { id: 'Hotel, F&B & Resto', en: 'Hotels & F&B' },
    projectScope: 'Exterior Illumination, Hotel Lobby Brass Lettering & Parking Wayfinding',
    location: 'Bandar Lampung Coastal Area',
    featured: true,
  },
  {
    id: 'hotel-santika',
    name: 'Hotel Santika Premiere',
    category: 'hospitality',
    categoryLabel: { id: 'Hotel, F&B & Resto', en: 'Hotels & F&B' },
    projectScope: 'High-Rise Facade Acrylic LED Lettering & Premium Ballroom Directional Signs',
    location: 'Bandar Lampung',
    featured: true,
  },
];

export const CLIENT_CATEGORIES = [
  { id: 'all', label: { id: 'Semua Klien (16 Brand)', en: 'All Clients (16 Brands)' } },
  { id: 'automotive', label: { id: 'Otomotif & Ban', en: 'Automotive & Tires' } },
  { id: 'government', label: { id: 'BUMN & Pemerintah', en: 'Government & SOE' } },
  { id: 'banking', label: { id: 'Perbankan & Finansial', en: 'Banking & Financial' } },
  { id: 'electronics', label: { id: 'Elektronik & Brand', en: 'Electronics & Tech' } },
  { id: 'hospitality', label: { id: 'Hotel, F&B & Resto', en: 'Hotels & F&B' } },
];

