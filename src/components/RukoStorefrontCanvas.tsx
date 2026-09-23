import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Building2,
  Sun,
  Moon,
  Ruler,
  Maximize2,
  CheckCircle2,
  Info,
  Sliders,
  Sparkles,
  Zap,
  Weight,
  Layers,
  MessageCircle,
  Eye
} from 'lucide-react';
import { Language } from '../types';

export type RukoType = 'ruko-1' | 'ruko-2' | 'cafe' | 'ruko-3';
export type MountingPosition = 'fascia' | 'blade' | 'totem' | 'rooftop';

interface RukoStorefrontCanvasProps {
  lang: Language;
  brandName: string;
  subText: string;
  signType: 'lettering' | 'neonbox' | 'acrylic' | 'pylon';
  faceColor: string;
  glowColor: string;
  glowMode: 'front' | 'back' | 'dual' | 'contour';
  fontFamilyClass: string;
  isNightMode: boolean;
  onToggleNightMode: () => void;
}

export const RukoStorefrontCanvas: React.FC<RukoStorefrontCanvasProps> = ({
  lang,
  brandName,
  subText,
  signType,
  faceColor,
  glowColor,
  glowMode,
  fontFamilyClass,
  isNightMode,
  onToggleNightMode,
}) => {
  const isId = lang === 'id';

  // Ruko configuration state
  const [rukoType, setRukoType] = useState<RukoType>('ruko-1');
  const [mountingPos, setMountingPos] = useState<MountingPosition>('fascia');
  const [signWidthMeters, setSignWidthMeters] = useState<number>(4.0);
  const [signHeightMeters, setSignHeightMeters] = useState<number>(1.0);
  const [groundFloorType, setGroundFloorType] = useState<'rolling' | 'glass'>('rolling');
  const [wallColorVariant, setWallColorVariant] = useState<'dark-acp' | 'white-acp' | 'concrete'>('dark-acp');

  // Building metadata based on type
  const rukoConfig = {
    'ruko-1': {
      name: isId ? 'Ruko Standar 1 Pintu (4.5m × 15m)' : 'Standard 1-Door Shophouse (4.5m × 15m)',
      widthMeters: 4.5,
      heightMeters: 15.0,
      floors: 2,
      maxSignWidth: 4.5,
      recommendedWidth: 4.0,
      recommendedHeight: 1.0,
      description: isId
        ? 'Tipe ruko paling umum di Indonesia. Lebar muka 4,5 meter dengan zona fasia standar setinggi 1,2 meter di atas kanopi pintu masuk.'
        : 'Most common commercial shophouse in Indonesia. 4.5m storefront width with a 1.2m fascia zone above the entrance awning.',
    },
    'ruko-2': {
      name: isId ? 'Ruko Gandeng 2 Pintu (9.0m × 15m)' : 'Double 2-Door Shophouse (9.0m × 15m)',
      widthMeters: 9.0,
      heightMeters: 15.0,
      floors: 2,
      maxSignWidth: 9.0,
      recommendedWidth: 8.4,
      recommendedHeight: 1.4,
      description: isId
        ? 'Dua ruko yang digabung menjadi satu (seperti proyek GT Radial Tirezone). Sangat cocok untuk fasia panjang horizontal atau kombinasi logo kiri-kanan.'
        : 'Two combined shophouse bays. Ideal for extended horizontal fascia signboards with prominent branding.',
    },
    'cafe': {
      name: isId ? 'Storefront Resto / Cafe (6.0m × 10m)' : 'Restaurant / Cafe Storefront (6.0m × 10m)',
      widthMeters: 6.0,
      heightMeters: 10.0,
      floors: 2,
      maxSignWidth: 5.8,
      recommendedWidth: 5.0,
      recommendedHeight: 1.1,
      description: isId
        ? 'Desain modern dengan pintu kaca penuh, kanopi elegan, dan pencahayaan hangat untuk bisnis F&B atau boutique.'
        : 'Modern boutique design with full glass front, elegant canopy, and warm lighting for F&B and retail.',
    },
    'ruko-3': {
      name: isId ? 'Ruko Komersial 3 Lantai (4.5m × 18m)' : 'Commercial 3-Story Shophouse (4.5m × 18m)',
      widthMeters: 4.5,
      heightMeters: 18.0,
      floors: 3,
      maxSignWidth: 4.5,
      recommendedWidth: 4.0,
      recommendedHeight: 1.2,
      description: isId
        ? 'Gedung ruko tinggi 3 lantai di jalan protokol. Dapat dipasang fasia di lantai 1 serta huruf timbul di lantai 3 (rooftop).'
        : 'Tall 3-story shophouse on major commercial boulevards. Can accommodate ground fascia plus rooftop lettering.',
    },
  }[rukoType];

  // Engineering specs estimation
  const areaSqMeters = signWidthMeters * signHeightMeters;
  const estimatedLedCount = Math.round(areaSqMeters * 18);
  const estimatedWatts = Math.round(estimatedLedCount * 1.5);
  const estimatedWeightKg = Math.round(areaSqMeters * 11);
  const marginMeters = ((rukoConfig.widthMeters - signWidthMeters) / 2).toFixed(2);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/90 backdrop-blur-md overflow-hidden shadow-2xl text-slate-100 flex flex-col">
      {/* Top Header & Quick Selector Controls */}
      <div className="p-4 sm:p-5 border-b border-slate-800/80 bg-slate-900/50 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-900/50 text-blue-400 border border-blue-700/50 flex items-center gap-1.5 uppercase tracking-wider">
              <Building2 className="w-3 h-3" />
              <span>{isId ? 'Simulasi Fasad Ruko Nyata' : 'Real Storefront Scale Simulation'}</span>
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Skala Arsitektural 1:1 Presisi
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white mt-1">
            {isId ? 'Visualisasi Skala Proporsi pada Bangunan Ruko' : 'Signage Proportion & Scale on Commercial Shophouse'}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {isId
              ? 'Ketahui persis bagaimana neon box atau huruf timbul terlihat nyata di atas pintu ruko Anda sebelum mulai diproduksi.'
              : 'Visualize exactly how your signage will look installed on your building storefront before fabrication.'}
          </p>
        </div>

        {/* Building Archetype Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          {(['ruko-1', 'ruko-2', 'cafe', 'ruko-3'] as RukoType[]).map((type) => {
            const isSelected = rukoType === type;
            const label = {
              'ruko-1': isId ? 'Ruko 1 Pintu (4.5m)' : '1-Bay Ruko (4.5m)',
              'ruko-2': isId ? 'Ruko 2 Pintu (9m)' : '2-Bay Ruko (9m)',
              'cafe': isId ? 'Cafe Resto (6m)' : 'Cafe Store (6m)',
              'ruko-3': isId ? 'Ruko 3 Lantai' : '3-Story Ruko',
            }[type];

            return (
              <button
                key={type}
                onClick={() => {
                  setRukoType(type);
                  if (type === 'ruko-2') {
                    setSignWidthMeters(8.0);
                    setSignHeightMeters(1.2);
                  } else if (type === 'ruko-1') {
                    setSignWidthMeters(4.0);
                    setSignHeightMeters(1.0);
                  } else if (type === 'cafe') {
                    setSignWidthMeters(5.0);
                    setSignHeightMeters(1.0);
                  }
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 border border-blue-500'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                <span>{label}</span>
              </button>
            );
          })}

          {/* Day / Night Toggle */}
          <button
            onClick={onToggleNightMode}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border cursor-pointer ${
              isNightMode
                ? 'bg-indigo-950/80 text-amber-300 border-indigo-700/60 hover:bg-indigo-900'
                : 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200'
            }`}
            title={isId ? 'Ubah Suasana Siang/Malam' : 'Toggle Day/Night Mode'}
          >
            {isNightMode ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
            <span>{isNightMode ? (isId ? 'Malam (LED ON)' : 'Night (LED ON)') : (isId ? 'Siang (Daylight)' : 'Daylight')}</span>
          </button>
        </div>
      </div>

      {/* Main Architectural Canvas */}
      <div
        className={`relative w-full min-h-[440px] sm:min-h-[500px] flex flex-col justify-end items-center overflow-hidden transition-colors duration-500 select-none ${
          isNightMode
            ? 'bg-gradient-to-b from-[#070b14] via-[#0c1222] to-[#080d1a]'
            : 'bg-gradient-to-b from-sky-200 via-sky-100 to-slate-200'
        }`}
      >
        {/* Sky Background Atmosphere */}
        {isNightMode ? (
          <div className="absolute inset-0 pointer-events-none">
            {/* Subtle stars */}
            <div className="absolute top-6 left-12 w-1 h-1 bg-white rounded-full opacity-60" />
            <div className="absolute top-16 right-24 w-1.5 h-1.5 bg-blue-200 rounded-full opacity-50" />
            <div className="absolute top-10 right-1/3 w-1 h-1 bg-amber-100 rounded-full opacity-70" />
            <div className="absolute top-20 left-1/4 w-1 h-1 bg-white rounded-full opacity-40" />
            {/* Soft moonlight gradient */}
            <div className="absolute top-0 right-1/4 w-80 h-80 bg-blue-500/10 blur-[100px] rounded-full" />
          </div>
        ) : (
          <div className="absolute inset-0 pointer-events-none">
            {/* Subtle sunny cloud shape */}
            <div className="absolute top-6 right-16 w-36 h-10 bg-white/40 blur-sm rounded-full" />
            <div className="absolute top-10 right-28 w-24 h-8 bg-white/50 blur-sm rounded-full" />
            <div className="absolute top-8 left-16 w-44 h-12 bg-white/35 blur-sm rounded-full" />
          </div>
        )}

        {/* Top Architectural Scale Ruler Bar */}
        <div className="absolute top-3 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
          <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900/80 backdrop-blur-md border border-slate-700/80 text-[11px] font-mono text-slate-300">
            <Ruler className="w-3.5 h-3.5 text-blue-400" />
            <span>
              {isId ? 'LEBAR BANGUNAN:' : 'BUILDING WIDTH:'}{' '}
              <strong className="text-white">{rukoConfig.widthMeters.toFixed(1)}m</strong>
            </span>
            <span className="text-slate-500">|</span>
            <span>
              {isId ? 'TINGGI:' : 'HEIGHT:'}{' '}
              <strong className="text-white">{rukoConfig.heightMeters.toFixed(0)}m ({rukoConfig.floors} Lantai)</strong>
            </span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900/80 backdrop-blur-md border border-slate-700/80 text-[11px] font-mono text-slate-300">
            <span>
              {isId ? 'UKURAN REKLAME:' : 'SIGN DIMENSIONS:'}{' '}
              <strong className="text-amber-400">{signWidthMeters.toFixed(1)}m × {signHeightMeters.toFixed(1)}m</strong>
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-emerald-400 font-semibold">
              {isId ? `Margin Sisi: ±${marginMeters}m` : `Side Margin: ±${marginMeters}m`}
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RUKO ARCHITECTURAL BUILDING ELEVATION                                     */}
        {/* ========================================================================= */}
        <div
          className={`relative z-10 transition-all duration-300 flex flex-col items-center ${
            rukoType === 'ruko-2' ? 'w-[90%] max-w-[780px]' : 'w-[82%] max-w-[560px]'
          }`}
        >
          {/* Top Parapet / Roof Cap */}
          <div className="w-full h-5 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-t-md border-t-2 border-slate-500 shadow-md flex items-center justify-between px-3">
            <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest">
              PARAPET ROOFLINE +15.00m
            </span>
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-400/50" />
              <div className="w-1.5 h-1.5 rounded-full bg-slate-400/50" />
            </div>
          </div>

          {/* Optional Rooftop Signage Mounting Mode */}
          {mountingPos === 'rooftop' && (
            <div className="relative -mt-12 mb-1 px-4 py-1.5 bg-slate-900/90 rounded-t border-t border-x border-slate-700 shadow-xl flex items-center justify-center">
              <div
                className={`font-black text-sm sm:text-base tracking-wider transition-all duration-300 ${fontFamilyClass}`}
                style={{
                  color: faceColor,
                  textShadow: isNightMode ? `0 0 16px ${glowColor}, 0 0 30px ${glowColor}aa` : 'none',
                }}
              >
                {brandName}
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* FLOOR 2 (LANTAI 2): MODERN ACP CLADDING & RIBBON WINDOWS              */}
          {/* ===================================================================== */}
          <div
            className={`w-full h-36 sm:h-44 relative border-x-4 border-slate-700/80 transition-colors duration-300 overflow-hidden flex flex-col justify-between p-3 sm:p-4 shadow-inner ${
              wallColorVariant === 'dark-acp'
                ? isNightMode ? 'bg-[#151c2c]' : 'bg-slate-700'
                : wallColorVariant === 'white-acp'
                ? isNightMode ? 'bg-[#2a303c]' : 'bg-slate-200'
                : isNightMode ? 'bg-[#1a202c]' : 'bg-stone-400'
            }`}
          >
            {/* ACP Panel Grooves (Horizontal & Vertical Architectural Grid) */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000022_2px,transparent_2px),linear-gradient(to_bottom,#00000022_2px,transparent_2px)] bg-[size:60px_60px] pointer-events-none" />

            {/* Top Floor Tag */}
            <div className="relative z-10 flex items-center justify-between text-[9px] font-mono text-slate-400">
              <span className="bg-slate-900/70 px-1.5 py-0.5 rounded border border-slate-700/60">
                LANTAI 2 (KANTOR / HUNIAN)
              </span>
              <span className="text-slate-400/80">ACP Seven PVDF 4mm</span>
            </div>

            {/* 2nd Floor Modern Windows & AC Compressor Detail */}
            <div className="relative z-10 w-full flex items-center justify-around gap-3 sm:gap-4 my-auto">
              {/* Window Unit 1 */}
              <div className="flex-1 h-20 sm:h-24 bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 rounded-md border-2 border-slate-800 shadow-md relative overflow-hidden flex flex-col justify-between p-1.5">
                {/* Window glass glare */}
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
                {/* Window Mullion Grid */}
                <div className="w-full h-full border border-slate-800/80 rounded grid grid-cols-2">
                  <div className="border-r border-slate-800/80 p-1">
                    {/* Blinds reflection */}
                    <div className="w-full space-y-1 opacity-20">
                      <div className="h-0.5 bg-white w-full" />
                      <div className="h-0.5 bg-white w-full" />
                      <div className="h-0.5 bg-white w-full" />
                    </div>
                  </div>
                  <div className="p-1">
                    <div className="w-full space-y-1 opacity-20">
                      <div className="h-0.5 bg-white w-full" />
                      <div className="h-0.5 bg-white w-full" />
                      <div className="h-0.5 bg-white w-full" />
                    </div>
                  </div>
                </div>
              </div>

              {/* If Ruko 2 Pintu: Window Unit 2 */}
              {rukoType === 'ruko-2' && (
                <div className="flex-1 h-20 sm:h-24 bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 rounded-md border-2 border-slate-800 shadow-md relative overflow-hidden flex flex-col justify-between p-1.5">
                  <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
                  <div className="w-full h-full border border-slate-800/80 rounded grid grid-cols-2">
                    <div className="border-r border-slate-800/80" />
                    <div />
                  </div>
                </div>
              )}

              {/* Split AC Outdoor Compressor Unit (realistic touch) */}
              <div className="w-10 sm:w-12 h-8 sm:h-9 bg-slate-300 dark:bg-slate-800 rounded border border-slate-400 dark:border-slate-700 flex flex-col items-center justify-center shadow-sm shrink-0">
                <div className="w-5 h-5 rounded-full border-2 border-slate-400 dark:border-slate-600 flex items-center justify-center">
                  <div className="w-2 h-0.5 bg-slate-500" />
                </div>
                <span className="text-[6px] font-mono text-slate-500 mt-0.5">INVERTER</span>
              </div>
            </div>

            {/* Floor Separation Joint / Balok Struktur */}
            <div className="w-full h-2 bg-slate-900/60 border-t border-slate-700/80" />
          </div>

          {/* ===================================================================== */}
          {/* FASCIA SIGNAGE BAND (AREA UTAMA PEMASANGAN REKLAME)                   */}
          {/* ===================================================================== */}
          <div className="w-full relative bg-slate-950 border-x-4 border-slate-700/80 py-3 sm:py-4 px-3 flex flex-col items-center justify-center overflow-visible z-20">
            {/* Realistic Wall Shadow under floor 2 */}
            <div className="absolute -top-3 left-0 right-0 h-3 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />

            {/* Mounting Position Indicator Dimension Ruler */}
            <div className="w-full flex items-center justify-between text-[8px] sm:text-[9px] font-mono text-blue-400 px-2 mb-1">
              <span>◄ 0.00m</span>
              <span className="bg-slate-900/90 px-2 py-0.5 rounded border border-blue-500/40 text-blue-300">
                {isId ? `Zona Fasia Ruko (Lebar Total: ${rukoConfig.widthMeters}m)` : `Fascia Zone (Total Width: ${rukoConfig.widthMeters}m)`}
              </span>
              <span>{rukoConfig.widthMeters.toFixed(1)}m ►</span>
            </div>

            {/* THE ACTUAL SIGNBOARD / NEON BOX / 3D LETTERING */}
            {mountingPos === 'fascia' ? (
              <motion.div
                layout
                className="relative rounded-lg transition-all duration-300 flex flex-col items-center justify-center p-3 sm:p-4 text-center cursor-pointer border"
                style={{
                  width: `${Math.min(96, (signWidthMeters / rukoConfig.widthMeters) * 100)}%`,
                  minHeight: `${Math.max(64, signHeightMeters * 65)}px`,
                  backgroundColor: signType === 'neonbox' ? '#0f172a' : 'transparent',
                  borderColor: isNightMode && glowMode !== 'back' ? glowColor : '#334155',
                  boxShadow:
                    isNightMode
                      ? glowMode === 'dual'
                        ? `0 0 25px ${glowColor}99, 0 0 50px ${glowColor}44, inset 0 0 15px ${glowColor}55`
                        : glowMode === 'back'
                        ? `0 0 35px ${glowColor}cc, 0 10px 40px ${glowColor}66`
                        : `0 0 20px ${glowColor}88, inset 0 0 12px ${glowColor}44`
                      : '0 4px 15px rgba(0,0,0,0.4)',
                }}
              >
                {/* 3D Sign Mounting Studs / Bracket Screws */}
                <div className="absolute top-1.5 left-2 w-1.5 h-1.5 rounded-full bg-slate-400/80 border border-slate-600 shadow-sm" />
                <div className="absolute top-1.5 right-2 w-1.5 h-1.5 rounded-full bg-slate-400/80 border border-slate-600 shadow-sm" />
                <div className="absolute bottom-1.5 left-2 w-1.5 h-1.5 rounded-full bg-slate-400/80 border border-slate-600 shadow-sm" />
                <div className="absolute bottom-1.5 right-2 w-1.5 h-1.5 rounded-full bg-slate-400/80 border border-slate-600 shadow-sm" />

                {/* Overhanging Spotlight Fixtures (Real OOH touch) */}
                {isNightMode && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-8 pointer-events-none">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-200 shadow-[0_0_12px_#fde047]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-200 shadow-[0_0_12px_#fde047]" />
                  </div>
                )}

                {/* Brand Name Text with 3D Extrusion & Illumination */}
                <div
                  className={`font-black tracking-wider transition-all duration-300 select-none ${fontFamilyClass}`}
                  style={{
                    color: faceColor,
                    fontSize:
                      signWidthMeters > 6
                        ? 'clamp(1.1rem, 2.8vw, 1.8rem)'
                        : 'clamp(0.95rem, 2.2vw, 1.45rem)',
                    textShadow: isNightMode
                      ? glowMode === 'back'
                        ? `0 0 18px ${glowColor}, 0 0 35px ${glowColor}`
                        : `0 0 12px ${glowColor}, 0 0 25px ${glowColor}, 0 2px 4px rgba(0,0,0,0.8)`
                      : '0 2px 4px rgba(0,0,0,0.5)',
                  }}
                >
                  {brandName || 'BRAND ANDA'}
                </div>

                {/* Subtext */}
                {subText && (
                  <div
                    className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase mt-1 opacity-90 transition-all truncate max-w-full px-2"
                    style={{
                      color: isNightMode ? '#E2E8F0' : '#CBD5E1',
                      textShadow: isNightMode ? `0 0 8px ${glowColor}88` : 'none',
                    }}
                  >
                    {subText}
                  </div>
                )}

                {/* Sign Dimension Overlay Tag */}
                <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-slate-900/95 border border-amber-500/60 text-[8px] font-mono font-bold text-amber-400 whitespace-nowrap shadow-md">
                  ◄ {signWidthMeters.toFixed(1)}m × {signHeightMeters.toFixed(1)}m ►
                </div>
              </motion.div>
            ) : (
              /* If another mounting position is active, show standard fascia placeholder */
              <div className="w-[85%] py-2 border border-dashed border-slate-700 rounded text-center text-[10px] text-slate-500">
                {isId ? 'Zona Fasia Kosong (Reklame dipasang di posisi lain)' : 'Empty Fascia (Sign installed at alternate position)'}
              </div>
            )}

            {/* Blade Sign Mounted Perpendicular on Side Column */}
            {mountingPos === 'blade' && (
              <div className="absolute -left-12 top-1/2 -translate-y-1/2 z-30 flex items-center">
                {/* Wall Bracket Arm */}
                <div className="w-4 h-1.5 bg-slate-400" />
                {/* Blade Sign Body */}
                <div
                  className="w-12 h-16 rounded-md border p-1 flex flex-col items-center justify-center text-center shadow-2xl transition-all"
                  style={{
                    backgroundColor: '#0f172a',
                    borderColor: isNightMode ? glowColor : '#475569',
                    boxShadow: isNightMode ? `0 0 20px ${glowColor}` : '0 4px 10px rgba(0,0,0,0.5)',
                  }}
                >
                  <span className="text-[7px] font-black" style={{ color: faceColor }}>
                    {brandName.slice(0, 6)}
                  </span>
                  <span className="text-[5px] text-slate-400 font-mono mt-0.5">60×90cm</span>
                </div>
              </div>
            )}
          </div>

          {/* ===================================================================== */}
          {/* FLOOR 1 (LANTAI 1): CANOPY, ROLLING DOOR & ENTRANCE                   */}
          {/* ===================================================================== */}
          {/* Modern Aluminum Awning / Canopy */}
          <div className="w-[104%] h-4 bg-gradient-to-b from-slate-600 to-slate-800 rounded-sm shadow-xl relative z-20 border-b border-slate-950 flex items-center justify-between px-3">
            <div className="w-full h-0.5 bg-slate-400/30" />
          </div>

          {/* Downlight Wash Cast on Ground Floor (Night illumination realism) */}
          {isNightMode && (
            <div
              className="w-full h-12 pointer-events-none absolute bottom-12 left-0 right-0 z-15 opacity-40 blur-xl transition-all"
              style={{
                background: `radial-gradient(ellipse at top, ${glowColor} 0%, transparent 70%)`,
              }}
            />
          )}

          {/* Ground Floor Entrance Bay */}
          <div className="w-full h-32 sm:h-36 relative bg-slate-900 border-x-4 border-slate-700/80 p-2.5 flex items-end justify-between overflow-hidden shadow-2xl">
            {groundFloorType === 'rolling' ? (
              /* Security Rolling Door */
              <div className="w-full h-full bg-gradient-to-b from-slate-800 via-slate-700 to-slate-800 rounded-t border-t-2 border-slate-600 flex flex-col justify-between p-2 shadow-inner relative">
                {/* Horizontal slats texture */}
                <div className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,#1e293b,#1e293b_6px,#334155_7px,#334155_8px)] opacity-60" />
                <div className="relative z-10 flex justify-between items-center text-[8px] font-mono text-slate-400">
                  <span>ROLLING DOOR BESI SNI</span>
                  <span>TINGGI 3.50m</span>
                </div>
                {/* Rolling Door Handle / Lock Center */}
                <div className="relative z-10 mx-auto w-12 h-3 rounded bg-slate-900 border border-slate-600 flex items-center justify-center">
                  <div className="w-4 h-1 bg-slate-500 rounded-full" />
                </div>
              </div>
            ) : (
              /* Modern Glass Storefront */
              <div className="w-full h-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-t border-2 border-slate-700 flex items-center justify-around p-2 relative">
                {/* Glass Glare */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
                {/* Glass Door with Handle */}
                <div className="w-1/2 h-full border-r-2 border-slate-700 flex flex-col items-center justify-center">
                  <span className="text-[8px] font-bold text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-700/60 mb-2">
                    OPEN
                  </span>
                  <div className="w-1.5 h-10 bg-slate-300 rounded-full shadow" />
                </div>
                <div className="w-1/2 h-full flex flex-col items-center justify-center">
                  <div className="w-1.5 h-10 bg-slate-300 rounded-full shadow" />
                </div>
              </div>
            )}
          </div>

          {/* Entrance Threshold / Keramik Teras Ruko */}
          <div className="w-full h-3 bg-gradient-to-r from-stone-400 via-stone-300 to-stone-400 border-t border-stone-200 shadow-md" />
        </div>

        {/* ========================================================================= */}
        {/* SIDEWALK, STREET & HUMAN / SCOOTER SCALE REFERENCES                       */}
        {/* ========================================================================= */}
        <div className="w-full relative z-20 flex flex-col">
          {/* Paved Sidewalk / Trotoar */}
          <div className="w-full h-7 bg-gradient-to-r from-slate-600 via-slate-500 to-slate-600 border-t-2 border-slate-400/80 shadow-md flex items-center justify-between px-6 relative">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(to_right,#00000015,#00000015_24px,transparent_24px,transparent_26px)]" />

            {/* Standing Totem / Mini Pylon Sign Option */}
            {mountingPos === 'totem' && (
              <div
                className="absolute left-6 -top-28 z-30 w-12 sm:w-14 h-28 bg-slate-900 rounded-t border-2 p-1 flex flex-col items-center justify-between shadow-2xl transition-all"
                style={{
                  borderColor: isNightMode ? glowColor : '#475569',
                  boxShadow: isNightMode ? `0 0 25px ${glowColor}` : '0 6px 15px rgba(0,0,0,0.5)',
                }}
              >
                <div className="w-full text-center">
                  <span className="text-[7px] font-black block truncate" style={{ color: faceColor }}>
                    {brandName.slice(0, 8)}
                  </span>
                </div>
                <div className="w-full border-t border-slate-700 pt-0.5 text-center">
                  <span className="text-[5px] font-mono text-slate-400">TOTEM 3M</span>
                </div>
              </div>
            )}

            {/* Human Silhouette Scale Reference (~1.75m high) */}
            <div className="absolute right-10 sm:right-16 -top-20 z-30 flex flex-col items-center group cursor-help">
              <div className="w-3.5 h-3.5 rounded-full bg-slate-400/90 shadow-sm" />
              <div className="w-5 h-8 bg-slate-400/90 rounded-t-sm mt-0.5 shadow-sm" />
              <div className="flex gap-1">
                <div className="w-1.5 h-8 bg-slate-400/90 rounded-b-sm" />
                <div className="w-1.5 h-8 bg-slate-400/90 rounded-b-sm" />
              </div>
              {/* Human scale tooltip tag */}
              <div className="absolute -top-6 px-1.5 py-0.5 rounded bg-slate-900/90 border border-slate-700 text-[8px] font-mono text-slate-300 whitespace-nowrap shadow">
                {isId ? 'Skala Manusia (1.75m)' : 'Human Scale (1.75m)'}
              </div>
            </div>

            {/* Motorbike / Scooter Silhouette (Very familiar Indonesian context) */}
            <div className="absolute left-1/4 -top-12 z-25 opacity-70 hidden sm:flex items-center gap-1">
              <div className="w-5 h-5 rounded-full border-2 border-slate-400" />
              <div className="w-8 h-4 bg-slate-400 rounded-t-sm" />
              <div className="w-5 h-5 rounded-full border-2 border-slate-400" />
              <span className="text-[7px] font-mono text-slate-400 ml-1">Parkir Ruko</span>
            </div>
          </div>

          {/* Asphalt Street / Jalan Aspal Depan Ruko */}
          <div className="w-full h-8 bg-gradient-to-b from-slate-900 via-slate-950 to-black flex items-center justify-between px-8 border-t border-slate-700">
            <div className="w-12 h-1 bg-yellow-400/80 rounded" />
            <div className="w-12 h-1 bg-yellow-400/80 rounded" />
            <div className="w-12 h-1 bg-yellow-400/80 rounded" />
            <div className="w-12 h-1 bg-yellow-400/80 rounded" />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SMART RATIO & PROPORTION ADVICE PANEL                                     */}
      {/* ========================================================================= */}
      <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-900/70 space-y-4">
        {/* Quick Position and Dimension Adjusters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Position Selector */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              {isId ? 'Posisi Pemasangan:' : 'Mounting Position:'}
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {[
                { id: 'fascia', label: isId ? 'Fasia Utama' : 'Main Fascia' },
                { id: 'blade', label: isId ? 'Neon Samping' : 'Blade Sign' },
                { id: 'totem', label: isId ? 'Totem Parkir' : 'Mini Totem' },
                { id: 'rooftop', label: isId ? 'Puncak Atap' : 'Rooftop' },
              ].map((pos) => (
                <button
                  key={pos.id}
                  onClick={() => setMountingPos(pos.id as MountingPosition)}
                  className={`px-2 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer text-center ${
                    mountingPos === pos.id
                      ? 'bg-blue-600 text-white font-bold'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {pos.label}
                </button>
              ))}
            </div>
          </div>

          {/* Width Slider */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <span>{isId ? 'Lebar Reklame:' : 'Sign Width:'}</span>
              <span className="text-amber-400 font-mono font-bold text-xs">{signWidthMeters.toFixed(1)} Meter</span>
            </div>
            <input
              type="range"
              min="2.0"
              max={rukoConfig.maxSignWidth}
              step="0.2"
              value={signWidthMeters}
              onChange={(e) => setSignWidthMeters(parseFloat(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[9px] text-slate-500 font-mono">
              <span>Min: 2.0m</span>
              <span className="text-emerald-400 font-semibold">{isId ? `Rekomendasi: ${rukoConfig.recommendedWidth}m` : `Ideal: ${rukoConfig.recommendedWidth}m`}</span>
              <span>Maks: {rukoConfig.maxSignWidth}m</span>
            </div>
          </div>

          {/* Height Slider */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <span>{isId ? 'Tinggi Reklame:' : 'Sign Height:'}</span>
              <span className="text-amber-400 font-mono font-bold text-xs">{signHeightMeters.toFixed(1)} Meter</span>
            </div>
            <input
              type="range"
              min="0.6"
              max="1.8"
              step="0.1"
              value={signHeightMeters}
              onChange={(e) => setSignHeightMeters(parseFloat(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[9px] text-slate-500 font-mono">
              <span>Min: 0.6m</span>
              <span className="text-emerald-400 font-semibold">{isId ? `Rekomendasi: ${rukoConfig.recommendedHeight}m` : `Ideal: ${rukoConfig.recommendedHeight}m`}</span>
              <span>Maks: 1.8m</span>
            </div>
          </div>

          {/* Facade & Entrance Style */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              {isId ? 'Gaya Pintu Lantai 1:' : 'Ground Entrance Style:'}
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => setGroundFloorType('rolling')}
                className={`px-2 py-1 rounded text-[11px] transition-colors cursor-pointer text-center ${
                  groundFloorType === 'rolling'
                    ? 'bg-blue-600 text-white font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {isId ? 'Rolling Door' : 'Rolling Slat'}
              </button>
              <button
                onClick={() => setGroundFloorType('glass')}
                className={`px-2 py-1 rounded text-[11px] transition-colors cursor-pointer text-center ${
                  groundFloorType === 'glass'
                    ? 'bg-blue-600 text-white font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {isId ? 'Pintu Kaca Cafe' : 'Full Glass'}
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Proportion Guidance & Technical Estimation Box */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/40 border border-blue-800/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                {isId ? 'Rekomendasi Proporsi Workshop CV. 2M Advertising:' : '2M Workshop Architectural Rationale:'}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isId ? (
                <>
                  Pada <strong>ruko lebar {rukoConfig.widthMeters}m</strong>, neon box berukuran{' '}
                  <strong className="text-amber-300">{signWidthMeters.toFixed(1)}m × {signHeightMeters.toFixed(1)}m</strong> menyisakan margin{' '}
                  <strong className="text-emerald-400">±{marginMeters} meter</strong> dari dinding tetangga. Jarak ini sangat ideal agar reklame tidak melintasi batas bangunan (sengketa tetangga) dan mempermudah penerbitan izin pajak reklame (SIPR BPPRD).
                </>
              ) : (
                <>
                  For a <strong>{rukoConfig.widthMeters}m shophouse</strong>, a sign size of{' '}
                  <strong className="text-amber-300">{signWidthMeters.toFixed(1)}m × {signHeightMeters.toFixed(1)}m</strong> leaves an optimal margin of{' '}
                  <strong className="text-emerald-400">±{marginMeters}m</strong> on each side, strictly adhering to municipal building setbacks and avoiding property disputes.
                </>
              )}
            </p>
          </div>

          {/* Quick Technical Stats Badge Group */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <div className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>~{estimatedWatts}W ({estimatedLedCount} LED)</span>
            </div>
            <div className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 flex items-center gap-1.5">
              <Weight className="w-3.5 h-3.5 text-blue-400" />
              <span>~{estimatedWeightKg} kg</span>
            </div>
            <a
              href={`https://wa.me/62811721596?text=Halo%202M%20Advertising%2C%20saya%20sudah%20simulasi%20reklame%20ruko%20lebar%20${rukoConfig.widthMeters}m%20dengan%20ukuran%20neon%20box%20${signWidthMeters}m%20x%20${signHeightMeters}m%20(Brand%3A%20${encodeURIComponent(brandName)}).%20Mohon%20info%20estimasi%20biaya%20dan%20survei.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{isId ? 'Pesan Ukuran Ruko Ini' : 'Order This Scale'}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
