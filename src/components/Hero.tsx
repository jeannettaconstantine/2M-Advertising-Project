import React from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  Calculator,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Box,
} from 'lucide-react';
import { Language } from '../types';
import { SlowlyAppearingText } from './SlowlyAppearingText';
import { AnimatedCounter } from './AnimatedCounter';

interface HeroProps {
  lang: Language;
  onOpenEstimator: () => void;
  onExplorePortfolio: () => void;
  onOpenVisualizer: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  lang,
  onOpenEstimator,
  onExplorePortfolio,
  onOpenVisualizer,
}) => {
  const isId = lang === 'id';

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-800/80 bg-slate-950">
      {/* Ambient background glow accents */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.12, 0.22, 0.12],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-blue-600 blur-[150px] pointer-events-none rounded-full"
      />
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.08, 0.16, 0.08],
        }}
        transition={{
          duration: 9.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute top-1/3 right-1/4 w-[450px] h-[400px] bg-red-600 blur-[160px] pointer-events-none rounded-full"
      />

      {/* Subtle Micro-Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0a_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        {/* 1. Top Badges & Company Lineage */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-2.5"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-slate-300 backdrop-blur-md shadow-lg shadow-black/40">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="font-semibold text-white tracking-wide">2M Advertising</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400 font-mono text-[11px]">
              {isId ? 'Fabrikasi Reklame & Izin Resmi Sejak 2002' : 'Signage Workshop & Permits Est. 2002'}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="px-2.5 py-1 rounded-full bg-blue-950/60 text-blue-400 border border-blue-800/40 font-semibold inline-flex items-center gap-1">
              <AnimatedCounter end={300} suffix="+" /> Brands
            </span>
            <span className="px-2.5 py-1 rounded-full bg-slate-900 text-slate-300 border border-slate-800 inline-flex items-center gap-1">
              <AnimatedCounter end={10000} suffix="+" separator="," /> Signages Done
            </span>
          </div>
        </motion.div>

        {/* 2. THE MAIN HOOK (USER REQUESTED CORE VALUE PROPOSITION) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-5"
        >
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-[1.12] sm:leading-[1.1]">
            ADVERTISING SPECIALISTS WHO TURN YOUR BRAND INTO SIGNAGE THAT GETS{' '}
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="text-blue-400 underline decoration-blue-500/60 decoration-wavy decoration-2 inline-block"
            >
              SEEN
            </motion.span>
            ,{' '}
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="text-amber-400 underline decoration-amber-400/60 decoration-wavy decoration-2 inline-block"
            >
              RECOGNIZED
            </motion.span>
            , AND{' '}
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="text-red-500 underline decoration-red-500/60 decoration-wavy decoration-2 inline-block"
            >
              REMEMBERED
            </motion.span>
            .
          </h1>

          {/* Slowly Appearing Sub-Sentence */}
          <div className="pt-1">
            <SlowlyAppearingText
              key={isId ? 'id-subtext' : 'en-subtext'}
              text={
                isId
                  ? 'Reklame berpresisi tinggi, mulai dari instalasi display custom hingga papan merk, kami memadukan design yang matang, material berkualitas, serta fabrikasi ahli yang rapih untuk membantu brand Anda dilihat lebih banyak mata, di Sumatera sampai ke Jawa'
                  : 'From precision-crafted signage and custom installations to large-scale brand displays, we combine thoughtful design, quality materials, and expert craftsmanship to give your brand a physical presence that gets noticed and built to last across Sumatera & Jawa'
              }
              className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal"
              delayStart={0.3}
              staggerSpeed={0.035}
            />
          </div>
        </motion.div>

        {/* 3. CALLS TO ACTION & SMALL 3D VISUALIZER CLICK */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          {/* Primary Action: Tax & Signage Estimator */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenEstimator}
            className="w-full sm:w-auto px-7 py-4 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-950/60 flex items-center justify-center gap-2.5 transition-all cursor-pointer"
          >
            <Calculator className="w-4 h-4" />
            <span>{isId ? 'Hitung Biaya & Pajak Reklame' : 'Calculate Signage & Tax'}</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>

          {/* THE 3D VISUALIZER: JUST A CLICK & SMALL INFO */}
          <motion.button
            whileHover={{ scale: 1.03, borderColor: '#3b82f6' }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenVisualizer}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-sm bg-slate-900/90 hover:bg-slate-850 text-white border border-slate-700/80 shadow-lg shadow-black/40 flex items-center justify-center gap-2.5 transition-all cursor-pointer group"
          >
            <div className="w-7 h-7 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Box className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs sm:text-sm">{isId ? 'Simulasi 3D Ruko & Signage' : '3D Facade & Signage Sim'}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 font-mono font-bold">
                  3D
                </span>
              </div>
              <div className="text-[11px] text-slate-400 font-normal">
                {isId ? 'Klik untuk uji ukuran 4.5 x 15m →' : 'Click to test 4.5 x 15m lot →'}
              </div>
            </div>
          </motion.button>

          {/* WhatsApp Direct Hotline */}
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            href="https://wa.me/6287878952077?text=Halo%202M%20Advertising%2C%20saya%20ingin%20konsultasi%20pembuatan%20reklame%20dan%20survei%20lokasi"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-4 rounded-xl font-semibold text-sm bg-slate-900/70 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp Hotline</span>
          </motion.a>
        </motion.div>

        {/* 4. Trust Badges & Workshop Guarantees */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-6 border-t border-slate-900 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-slate-400 font-medium">
            <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
            <span>{isId ? 'Fabrikasi Workshop Sendiri' : 'In-House Workshop'}</span>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-slate-400 font-medium">
            <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0" />
            <span>{isId ? '100% Legalitas Pajak BPPRD' : '100% Legal BPPRD Permits'}</span>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-slate-400 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>High Quality Guaranteed</span>
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-slate-400 font-medium">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="inline-flex items-center gap-1">
              <AnimatedCounter end={300} suffix="+" /> {isId ? 'Korporasi Terbukti' : 'Proven Enterprises'}
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
