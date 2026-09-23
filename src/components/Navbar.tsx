import React from 'react';
import { Language } from '../types';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  lang: Language;
  currentPage: 'home' | 'services' | 'tax' | 'visualizer';
  onNavigate: (page: 'home' | 'services' | 'tax' | 'visualizer') => void;
  onToggleLang?: () => void;
  onSetLang?: (lang: Language) => void;
  onOpenEstimator?: () => void;
  onOpenContact?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  currentPage,
  onNavigate,
  onToggleLang,
  onSetLang,
}) => {
  const handleNavClick = (target: 'home' | 'services' | 'tax' | 'visualizer', sectionId?: string) => {
    if (target === 'services' || target === 'tax' || target === 'visualizer') {
      onNavigate(target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentPage !== target) {
      onNavigate(target);
      if (sectionId) {
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 120);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectLang = (targetLang: Language) => {
    if (onSetLang) {
      onSetLang(targetLang);
    } else if (onToggleLang && lang !== targetLang) {
      onToggleLang();
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/90">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo with Official Vector Emblem Only */}
        <button
          id="navbar-brand-logo"
          className="flex items-center group text-left focus:outline-none cursor-pointer"
          onClick={() => handleNavClick('home')}
          aria-label="2M Advertising Home"
        >
          <BrandLogo size="lg" showText={false} />
        </button>

        {/* Navigation Links and Language Switcher on the Right */}
        <div className="flex items-center gap-1.5 sm:gap-3 md:gap-6 text-xs sm:text-sm font-semibold tracking-wide text-slate-300">
          <button
            id="nav-link-home"
            onClick={() => handleNavClick('home')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              currentPage === 'home'
                ? 'text-blue-400 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            Home
          </button>

          <button
            id="nav-link-services"
            onClick={() => handleNavClick('services')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              currentPage === 'services'
                ? 'text-blue-400 font-bold'
                : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            Services
          </button>

          <button
            id="nav-link-visualizer"
            onClick={() => handleNavClick('visualizer')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 group ${
              currentPage === 'visualizer'
                ? 'text-blue-400 font-bold bg-blue-950/40 border border-blue-800/50'
                : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
            }`}
          >
            <span>Visualizer 3D</span>
            <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              3D
            </span>
          </button>

          <button
            id="nav-link-portfolio"
            onClick={() => handleNavClick('home', 'clients-section')}
            className="px-2.5 sm:px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900/60 transition-colors cursor-pointer"
          >
            Portfolio
          </button>

          <button
            id="nav-link-contact"
            onClick={() => handleNavClick('home', 'contact-section')}
            className="px-2.5 sm:px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900/60 transition-colors cursor-pointer"
          >
            Contact Us
          </button>

          {/* Language Option: IN / EN */}
          <div className="flex items-center rounded-lg bg-slate-900 border border-slate-800 p-0.5 text-xs font-bold shrink-0 ml-1 sm:ml-2">
            <button
              id="lang-toggle-in"
              type="button"
              onClick={() => handleSelectLang('id')}
              className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
                lang === 'id'
                  ? 'bg-blue-600 text-white font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              aria-label="Bahasa Indonesia"
              title="Bahasa Indonesia"
            >
              IN
            </button>
            <span className="text-slate-600 text-[10px] px-0.5 select-none">/</span>
            <button
              id="lang-toggle-en"
              type="button"
              onClick={() => handleSelectLang('en')}
              className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
                lang === 'en'
                  ? 'bg-blue-600 text-white font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
              aria-label="English"
              title="English"
            >
              EN
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};
