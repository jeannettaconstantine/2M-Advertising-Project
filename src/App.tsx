import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PastClientsSection } from './components/PastClientsSection';
import { HomeServicesShowcase } from './components/HomeServicesShowcase';
import { WorkshopQuality } from './components/WorkshopQuality';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { TaxPage } from './pages/TaxPage';
import { ServicesPage } from './pages/ServicesPage';
import { VisualizerPage } from './pages/VisualizerPage';
import { MessageCircle } from 'lucide-react';

const sectionMotionVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function App() {
  const [lang, setLang] = useState<Language>('id');
  const [currentPage, setCurrentPage] = useState<'home' | 'services' | 'tax' | 'visualizer'>('home');
  const [selectedServiceCategory, setSelectedServiceCategory] = useState<'all' | 'ooh' | 'indoor' | 'tax' | 'digital'>('all');

  // Sync state with URL hash (#services vs #tax vs #visualizer vs #home)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#tax' || hash === '#pajak') {
        setCurrentPage('tax');
      } else if (hash === '#services' || hash === '#layanan') {
        setCurrentPage('services');
      } else if (hash === '#visualizer' || hash === '#3d' || hash === '#simulasi') {
        setCurrentPage('visualizer');
      } else {
        setCurrentPage('home');
      }
    };

    // Run on initial load
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: 'home' | 'services' | 'tax' | 'visualizer') => {
    setCurrentPage(page);
    if (page === 'tax') {
      window.location.hash = 'tax';
    } else if (page === 'services') {
      window.location.hash = 'services';
    } else if (page === 'visualizer') {
      window.location.hash = 'visualizer';
    } else {
      window.location.hash = '';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'id' ? 'en' : 'id'));
  };

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
  };

  const scrollToSection = (id: string) => {
    if (currentPage !== 'home') {
      handleNavigate('home');
      setTimeout(() => {
        const elem = document.getElementById(id);
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    } else {
      const elem = document.getElementById(id);
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Sticky Navigation */}
      <Navbar
        lang={lang}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onToggleLang={handleToggleLang}
        onSetLang={handleSetLang}
        onOpenEstimator={() => handleNavigate('tax')}
        onOpenContact={() => scrollToSection('contact-section')}
      />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          {currentPage === 'services' ? (
            /* ============================================================ */
            /* DEDICATED SERVICES & MANUFACTURING SPECS PAGE                */
            /* ============================================================ */
            <motion.div
              key="services-page"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <ServicesPage
                lang={lang}
                initialCategory={selectedServiceCategory}
                onBackToHome={() => handleNavigate('home')}
                onNavigateToTax={() => handleNavigate('tax')}
                onSelectServiceForEstimate={() => handleNavigate('tax')}
              />
            </motion.div>
          ) : currentPage === 'tax' ? (
            /* ============================================================ */
            /* DEDICATED TAX & PERMITTING PAGE                              */
            /* ============================================================ */
            <motion.div
              key="tax-page"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <TaxPage
                lang={lang}
                onBackToHome={() => handleNavigate('home')}
              />
            </motion.div>
          ) : currentPage === 'visualizer' ? (
            /* ============================================================ */
            /* DEDICATED 3D FACADE & SIGNAGE VISUALIZER PAGE                */
            /* ============================================================ */
            <motion.div
              key="visualizer-page"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <VisualizerPage
                lang={lang}
                onBackToHome={() => handleNavigate('home')}
                onOpenEstimator={() => handleNavigate('tax')}
              />
            </motion.div>
          ) : (
            /* ============================================================ */
            /* STREAMLINED HOME PAGE (Clean, high-impact & not overly long) */
            /* ============================================================ */
            <motion.div
              key="home-page"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              {/* 1. Hero Section: Hook & Small 3D Visualizer Trigger */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              >
                <Hero
                  lang={lang}
                  onOpenEstimator={() => handleNavigate('tax')}
                  onExplorePortfolio={() => scrollToSection('clients-section')}
                  onOpenVisualizer={() => handleNavigate('visualizer')}
                />
              </motion.div>

              {/* 2. ONE Single Consolidated Section to Showcase Past Clients */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={sectionMotionVariants}
              >
                <PastClientsSection
                  lang={lang}
                />
              </motion.div>

              {/* 3. Core Signage Services - 4-Categories Carousel Showcase (Sejalan style) */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.08 }}
                variants={sectionMotionVariants}
              >
                <HomeServicesShowcase
                  lang={lang}
                  onOpenServicesPage={(category) => {
                    if (category) {
                      setSelectedServiceCategory(category as any);
                    }
                    handleNavigate('services');
                    if (category) {
                      setTimeout(() => {
                        const targetElem = document.getElementById(`service-category-${category}`);
                        if (targetElem) {
                          targetElem.scrollIntoView({ behavior: 'smooth' });
                        }
                      }, 150);
                    }
                  }}
                  onSelectCategoryForEstimate={() => handleNavigate('tax')}
                />
              </motion.div>

              {/* 4. In-House Workshop Craftsmanship & Structural Safety */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={sectionMotionVariants}
              >
                <WorkshopQuality
                  lang={lang}
                />
              </motion.div>

              {/* 5. Direct Contact, Survey Booking & FAQ */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.08 }}
                variants={sectionMotionVariants}
              >
                <ContactSection
                  lang={lang}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Quick Action WhatsApp Button */}
      <motion.aside
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        aria-label="WhatsApp Hotline"
        className="fixed bottom-6 right-6 z-40"
      >
        <a
          href="https://wa.me/62811721596?text=Halo%202M%20Advertising%2C%20saya%20ingin%20konsultasi%20pembuatan%20reklame%20dan%20pajak"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-2xl shadow-emerald-950/60 transition-transform hover:scale-105"
          title="Chat WhatsApp Langsung"
        >
          <MessageCircle className="w-5 h-5 fill-white" />
          <span className="hidden sm:inline">
            {lang === 'id' ? 'Chat WhatsApp (Fast Response)' : 'WhatsApp Consultation'}
          </span>
        </a>
      </motion.aside>

      {/* Footer */}
      <Footer
        lang={lang}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
