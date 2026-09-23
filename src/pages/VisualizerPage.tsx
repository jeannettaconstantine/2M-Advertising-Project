import React from 'react';
import { motion } from 'motion/react';
import { Language } from '../types';
import { SignageVisualizer } from '../components/SignageVisualizer';
import { AmbientBackground } from '../components/AmbientBackground';
import {
  ArrowLeft,
  Sparkles,
  Layers,
  Ruler,
  ShieldCheck,
  Calculator,
  MessageCircle,
  Building,
} from 'lucide-react';

interface VisualizerPageProps {
  lang: Language;
  onBackToHome: () => void;
  onOpenEstimator: () => void;
}

export const VisualizerPage: React.FC<VisualizerPageProps> = ({
  lang,
  onBackToHome,
  onOpenEstimator,
}) => {
  const isId = lang === 'id';

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 py-8 sm:py-12 overflow-hidden">
      {/* Dynamic Ambient Background */}
      <AmbientBackground intensity="vibrant" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumb / Back Button */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors text-xs font-semibold backdrop-blur-md cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isId ? 'Kembali ke Beranda' : 'Back to Home'}</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-800/60 text-blue-400 text-xs font-mono font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isId ? 'Konfigurator 3D Real-Time' : 'Real-Time 3D Configurator'}</span>
            </span>
          </div>
        </div>

        {/* Page Header */}
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono">
            <Building className="w-3.5 h-3.5 text-blue-400" />
            <span>{isId ? 'Konfigurator 3D Real-Time & Simulasi Foto Lokasi Asli' : 'Real-Time 3D Configurator & Real-World Photo Simulation'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase leading-tight">
            VISUALIZER 3D SIGNAGE
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {isId
              ? 'Bantu Anda memvisualisasikan bagaimana neonbox, huruf timbul 3D, signboard fasia, pylon totem, atau neonflex akan terlihat pada dinding/toko Anda sebelum menghubungi kami. Upload foto lokasi, sesuaikan ukuran centimeter, pencahayaan malam, dan konsultasikan via WhatsApp.'
              : 'Visualize how neonboxes, 3D channel letters, signboards, pylon totems, or neonflex will look installed on your actual wall or storefront before contacting us. Upload your location photo, tweak dimensions in centimeters, test night LED glow, and send specs via WhatsApp.'}
          </p>
        </div>

        {/* The Full Interactive 3D Signage Visualizer */}
        <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-2 sm:p-6 backdrop-blur-xl shadow-2xl">
          <SignageVisualizer lang={lang} />
        </div>

        {/* Engineering & Material Guarantees */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-1.5">
            <div className="flex items-center gap-2 text-blue-400 text-xs font-bold">
              <Layers className="w-4 h-4" />
              <span>{isId ? 'Presisi Skala Arsitektural' : 'Architectural Scale Precision'}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isId
                ? 'Rasio skala proporsional dengan standar fasad ruko Indonesia (lebar 4-5 meter per pintu, tinggi 12-16 meter).'
                : 'Proportionally scaled to standard Indonesian commercial shophouse lots (4-5m width per unit, 12-16m height).'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>{isId ? 'Fabrikasi Workshop 2M' : 'In-House 2M Fabrication'}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isId
                ? 'Dikerjakan langsung dengan mesin laser fiber CNC, bending otomatis, dan garansi kelistrikan LED IP68.'
                : 'Directly manufactured using in-house CNC fiber laser cutting, automatic bending, and IP68 waterproof LEDs.'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-1.5">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
              <MessageCircle className="w-4 h-4" />
              <span>{isId ? 'Kirim Simulasi ke WhatsApp' : 'Send Spec to WhatsApp'}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isId
                ? 'Tim teknis CV. 2M siap melakukan survei lokasi gratis dan pengukuran laser langsung ke ruko Anda.'
                : 'Our technical survey team provides free on-site physical measurements across Lampung and South Sumatera.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
