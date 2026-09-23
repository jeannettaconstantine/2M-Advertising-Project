export type Language = 'id' | 'en';

export interface ServiceItem {
  id: string;
  category: 'ooh' | 'indoor' | 'tax' | 'digital';
  title: {
    id: string;
    en: string;
  };
  subtitle: {
    id: string;
    en: string;
  };
  description: {
    id: string;
    en: string;
  };
  badge?: string;
  isUpcoming?: boolean;
  features: {
    id: string[];
    en: string[];
  };
  materials?: string[];
  leadTime?: string;
  bestFor: string;
  iconName: string;
}

export interface ClientItem {
  id: string;
  name: string;
  category: 'automotive' | 'government' | 'banking' | 'electronics' | 'hospitality' | 'fmcg_retail';
  categoryLabel: {
    id: string;
    en: string;
  };
  projectScope: string;
  location: string;
  featured?: boolean;
}

export interface PortfolioProject {
  id: string;
  title: string;
  client: string;
  category: 'ooh' | 'indoor' | 'pylon' | 'lettering' | 'tax_included';
  categoryLabel: {
    id: string;
    en: string;
  };
  industry: string;
  location: string;
  year: string;
  dimensions: string;
  materials: string[];
  description: {
    id: string;
    en: string;
  };
  highlights: string[];
  colorAccent: string;
  imageUrl?: string;
  verified?: boolean;
}

export interface EstimateOptions {
  serviceType: string;
  widthMeters: number;
  heightMeters: number;
  quantity: number;
  materialTier: 'standard' | 'premium' | 'architectural';
  lightingType: 'none' | 'led_module' | 'neon_flex' | 'floodlight';
  includeTaxPermit: boolean;
  installationHeight: 'ground' | 'medium' | 'highrise';
  cityLocation: string;
}
