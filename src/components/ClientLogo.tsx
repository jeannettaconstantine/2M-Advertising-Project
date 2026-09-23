import React, { useState } from 'react';

interface ClientLogoProps {
  clientId: string;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark' | 'color';
}

interface LogoDefinition {
  src: string;
  alt: string;
  title: string;
  extraImgClass?: string;
  extraContainerClass?: string;
}

// Registry of verified client logos from /images-logo folder
export const CLIENT_LOGOS_MAP: Record<string, LogoDefinition> = {
  // 1. BRIDGESTONE
  bridgestone: {
    src: '/images-logo/Bridgestone-Logo.wine.png',
    alt: 'Bridgestone',
    title: 'Bridgestone',
    extraImgClass: 'max-h-full w-auto scale-115 sm:scale-120 object-contain origin-center',
    extraContainerClass: 'w-full max-w-[150px]',
  },
  // 2. GT RADIAL
  'gt-radial': {
    src: '/images-logo/lg-67b7d60e0b374-GT-Radial.webp',
    alt: 'GT Radial',
    title: 'GT Radial',
    extraImgClass: 'max-h-full w-auto scale-115 sm:scale-120 object-contain origin-center',
    extraContainerClass: 'w-full max-w-[150px]',
  },
  gtradial: {
    src: '/images-logo/lg-67b7d60e0b374-GT-Radial.webp',
    alt: 'GT Radial',
    title: 'GT Radial',
    extraImgClass: 'max-h-full w-auto scale-115 sm:scale-120 object-contain origin-center',
    extraContainerClass: 'w-full max-w-[150px]',
  },
  // 3. ACCELERA
  accelera: {
    src: '/images-logo/accelera-radial-logo-png_seeklogo-425451.png',
    alt: 'Accelera Radial',
    title: 'Accelera',
    extraImgClass: 'max-h-full w-auto scale-120 sm:scale-125 object-contain origin-center',
    extraContainerClass: 'w-full max-w-[150px]',
  },
  // 4. ACHILLES
  achilles: {
    src: '/images-logo/achilles-tires-logo.jpeg',
    alt: 'Achilles Radial Tires',
    title: 'Achilles',
    extraImgClass: 'max-h-full w-auto mix-blend-multiply contrast-105',
    extraContainerClass: 'rounded px-1',
  },
  // 5. KFC
  kfc: {
    src: '/images-logo/KFC_Logo.svg',
    alt: 'KFC',
    title: 'KFC',
    extraImgClass: 'max-h-full w-auto',
  },
  // 6. BANK SYARIAH INDONESIA (BSI)
  bsi: {
    src: '/images-logo/Bank_Syariah_Indonesia.svg.webp',
    alt: 'Bank Syariah Indonesia (BSI)',
    title: 'Bank Syariah Indonesia',
    extraImgClass: 'max-h-full w-auto',
  },
  'bank-syariah-indonesia': {
    src: '/images-logo/Bank_Syariah_Indonesia.svg.webp',
    alt: 'Bank Syariah Indonesia (BSI)',
    title: 'Bank Syariah Indonesia',
    extraImgClass: 'max-h-full w-auto',
  },
  // 7. BANK LAMPUNG
  'bank-lampung': {
    src: '/images-logo/Logo_bank_Lampung_baru.png',
    alt: 'Bank Lampung',
    title: 'Bank Lampung',
    extraImgClass: 'max-h-full w-auto',
  },
  // 8. DAIKIN
  daikin: {
    src: '/images-logo/Daikin-Logo.png',
    alt: 'Daikin',
    title: 'Daikin',
    extraImgClass: 'max-h-full w-auto',
  },
  // 9. SHARP
  sharp: {
    src: '/images-logo/Logo_of_the_Sharp_Corporation.svg.webp',
    alt: 'SHARP',
    title: 'SHARP',
    extraImgClass: 'max-h-full w-auto',
  },
  // 10. ELECTROLUX
  electrolux: {
    src: '/images-logo/Electrolux_logo_master_blue_RGB.png',
    alt: 'Electrolux',
    title: 'Electrolux',
    extraImgClass: 'max-h-full w-auto',
  },
  // 11. PLN (PERSERO)
  pln: {
    src: '/images-logo/Logo_PLN.png',
    alt: 'PLN (Persero)',
    title: 'PLN (Persero)',
    extraImgClass: 'max-h-full w-auto scale-125 sm:scale-130 object-contain origin-center',
    extraContainerClass: 'py-0.5',
  },
  // 12. WASKITA KARYA
  waskita: {
    src: '/images-logo/Waskita_Karya.svg.webp',
    alt: 'Waskita Karya',
    title: 'Waskita Karya',
    extraImgClass: 'max-h-full w-auto',
  },
  'waskita-karya': {
    src: '/images-logo/Waskita_Karya.svg.webp',
    alt: 'Waskita Karya',
    title: 'Waskita Karya',
    extraImgClass: 'max-h-full w-auto',
  },
  // 13. NOVOTEL
  novotel: {
    src: '/images-logo/Novotel_logo_2019.png',
    alt: 'Novotel',
    title: 'Novotel',
    extraImgClass: 'max-h-full w-auto',
  },
  // 14. RADISSON HOTELS & RESORTS
  radisson: {
    src: '/images-logo/radisson-hotels-and-restorts-logo-png-3.png',
    alt: 'Radisson Hotels & Resorts',
    title: 'Radisson Hotels & Resorts',
    extraImgClass: 'max-h-full w-auto',
  },
  // 15. HOTEL SANTIKA PREMIERE
  'hotel-santika': {
    src: '/images-logo/Santika_Indonesia_Hotels_&_Resorts_logo.svg.webp',
    alt: 'Hotel Santika Premiere',
    title: 'Hotel Santika Premiere',
    extraImgClass: 'max-h-full w-auto',
  },
  santika: {
    src: '/images-logo/Santika_Indonesia_Hotels_&_Resorts_logo.svg.webp',
    alt: 'Hotel Santika Premiere',
    title: 'Hotel Santika Premiere',
    extraImgClass: 'max-h-full w-auto',
  },
  // 16. PEMERINTAH PROVINSI LAMPUNG
  'pemprov-lampung': {
    src: '/images-logo/Lampung_coa.png',
    alt: 'Pemerintah Provinsi Lampung',
    title: 'Pemerintah Provinsi Lampung',
    extraImgClass: 'max-h-full w-auto py-0.5',
  },
  lampung: {
    src: '/images-logo/Lampung_coa.png',
    alt: 'Pemerintah Provinsi Lampung',
    title: 'Pemerintah Provinsi Lampung',
    extraImgClass: 'max-h-full w-auto py-0.5',
  },
};

export const ClientLogo: React.FC<ClientLogoProps> = ({
  clientId,
  className = '',
  size = 'md',
  variant = 'color',
}) => {
  const [imgError, setImgError] = useState(false);
  const normalizedId = clientId.toLowerCase().trim();
  const logoData = CLIENT_LOGOS_MAP[normalizedId];

  // Size configurations
  const heightClass =
    size === 'xs'
      ? 'h-6 max-w-[120px]'
      : size === 'sm'
      ? 'h-9 max-w-[150px]'
      : size === 'lg'
      ? 'h-14 sm:h-16 max-w-[260px]'
      : 'h-11 max-w-[180px]';

  // If found in images-logo registry and image hasn't errored
  if (logoData && !imgError) {
    const isDarkVariant = variant === 'dark';
    return (
      <div
        className={`flex items-center justify-center ${heightClass} ${
          isDarkVariant ? 'bg-white/95 px-2 py-1 rounded-lg shadow-xs' : ''
        } ${logoData.extraContainerClass || ''} ${className}`}
        title={logoData.title}
      >
        <img
          src={logoData.src}
          alt={logoData.alt}
          className={`h-full w-auto max-w-full object-contain ${logoData.extraImgClass || ''}`}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  // Graceful fallback if unknown client or image fails to load
  return (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs ${heightClass} ${className}`}
      title={clientId}
    >
      <span className="w-5 h-5 rounded bg-blue-600 text-white flex items-center justify-center text-[10px] uppercase shrink-0">
        {clientId.charAt(0)}
      </span>
      <span className="truncate">{clientId.replace(/-/g, ' ').toUpperCase()}</span>
    </div>
  );
};

