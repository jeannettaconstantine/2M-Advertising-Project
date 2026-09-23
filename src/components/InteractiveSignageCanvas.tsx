import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Sun,
  Moon,
  Maximize2,
  Minimize2,
  RotateCcw,
  Move,
  Eye,
  Sliders,
  Sparkles,
  Layers,
  Ruler,
  Camera,
  Upload,
} from 'lucide-react';
import { Language } from '../types';

export type SignageType = 'neonbox' | 'huruf-timbul' | 'signboard' | 'pylon' | 'neonflex';
export type FontStyleId =
  | 'modern-sans'
  | 'bold-impact'
  | 'luxury-serif'
  | 'royal-serif'
  | 'rounded'
  | 'condensed'
  | 'tech-grotesk'
  | 'script'
  | 'industrial-mono';
export type LightingStyle = 'frontlit' | 'backlit-halo' | 'dual-glow' | 'unlit';

export interface SignageConfig {
  type: SignageType;
  font: FontStyleId;
  brandName: string;
  subText: string;
  faceColor: string;
  materialFinish: 'acrylic' | 'stainless-mirror' | 'hairline-silver' | 'matte' | 'neon-tube';
  glowColor: string;
  lightingStyle: LightingStyle;
  isNightMode: boolean;
  
  // Dimensions in centimeters
  widthCm: number;
  heightCm: number;
  depthCm: number;

  // 3D Placement & Perspective
  posX: number; // -100 to 100 (% offset from center)
  posY: number; // -100 to 100 (% offset from center)
  scale: number; // 0.5 to 2.0
  rotateX: number; // -45 to 45 deg (vertical perspective tilt)
  rotateY: number; // -45 to 45 deg (horizontal wall angle)
  rotateZ: number; // -30 to 30 deg (leveling rotation)

  // Background
  backgroundImage: string;
  isUploadedPhoto: boolean;
  beforeAfterMode: 'split' | 'after-only' | 'before-only';
  splitPosition: number; // 0 to 100%
}

interface InteractiveSignageCanvasProps {
  config: SignageConfig;
  onChangeConfig: (updater: Partial<SignageConfig>) => void;
  lang: Language;
  onOpenUpload: () => void;
}

export const InteractiveSignageCanvas: React.FC<InteractiveSignageCanvasProps> = ({
  config,
  onChangeConfig,
  lang,
  onOpenUpload,
}) => {
  const isId = lang === 'id';
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDraggingSign, setIsDraggingSign] = useState(false);
  const [isDraggingSplit, setIsDraggingSplit] = useState(false);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const [initialPos, setInitialPos] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Font family mapping
  const getFontFamily = (fontId: FontStyleId) => {
    switch (fontId) {
      case 'modern-sans':
        return "'Plus Jakarta Sans', sans-serif";
      case 'bold-impact':
        return "'Montserrat', sans-serif";
      case 'luxury-serif':
        return "'Playfair Display', serif";
      case 'royal-serif':
        return "'Cinzel', serif";
      case 'rounded':
        return "'Quicksand', sans-serif";
      case 'condensed':
        return "'Bebas Neue', sans-serif";
      case 'tech-grotesk':
        return "'Space Grotesk', sans-serif";
      case 'script':
        return "'Pacifico', cursive";
      case 'industrial-mono':
        return "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
      default:
        return "'Plus Jakarta Sans', sans-serif";
    }
  };

  const getFontWeight = (fontId: FontStyleId) => {
    switch (fontId) {
      case 'modern-sans':
        return '800';
      case 'bold-impact':
        return '900';
      case 'luxury-serif':
        return '700';
      case 'royal-serif':
        return '700';
      case 'rounded':
        return '700';
      case 'condensed':
        return '400';
      case 'tech-grotesk':
        return '700';
      case 'script':
        return '400';
      case 'industrial-mono':
        return '700';
      default:
        return '800';
    }
  };

  // Dragging Signage on Canvas
  const handleMouseDownSign = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingSign(true);
    setDragStartPos({ x: e.clientX, y: e.clientY });
    setInitialPos({ x: config.posX, y: config.posY });
  };

  // Dragging Split Slider for Before/After
  const handleMouseDownSplit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingSplit(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingSign && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const deltaX = ((e.clientX - dragStartPos.x) / rect.width) * 160;
        const deltaY = ((e.clientY - dragStartPos.y) / rect.height) * 160;

        const newX = Math.max(-80, Math.min(80, initialPos.x + deltaX));
        const newY = Math.max(-80, Math.min(80, initialPos.y + deltaY));
        onChangeConfig({ posX: Math.round(newX), posY: Math.round(newY) });
      }

      if (isDraggingSplit && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const relativeX = e.clientX - rect.left;
        const newSplit = Math.max(5, Math.min(95, (relativeX / rect.width) * 100));
        onChangeConfig({ splitPosition: Math.round(newSplit) });
      }
    };

    const handleMouseUp = () => {
      setIsDraggingSign(false);
      setIsDraggingSplit(false);
    };

    if (isDraggingSign || isDraggingSplit) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingSign, isDraggingSplit, dragStartPos, initialPos, onChangeConfig]);

  // Reset Position to default center
  const handleResetPosition = () => {
    onChangeConfig({
      posX: 0,
      posY: -10,
      scale: 1.0,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
    });
  };

  // Render the 3D Signage based on selected Type
  const render3DSignage = () => {
    const font = getFontFamily(config.font);
    const weight = getFontWeight(config.font);
    const isNight = config.isNightMode;
    const isIlluminated = config.lightingStyle !== 'unlit';
    const depthPx = Math.max(4, Math.round((config.depthCm / 30) * 16));

    // Dynamic color styling for front face
    let faceStyle: React.CSSProperties = {
      color: config.faceColor,
      fontFamily: font,
      fontWeight: weight,
    };

    if (config.materialFinish === 'stainless-mirror') {
      faceStyle = {
        ...faceStyle,
        backgroundImage: 'linear-gradient(135deg, #fef08a 0%, #d97706 35%, #fef3c7 55%, #b45309 85%, #fef08a 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
      };
    } else if (config.materialFinish === 'hairline-silver') {
      faceStyle = {
        ...faceStyle,
        backgroundImage: 'linear-gradient(135deg, #f8fafc 0%, #94a3b8 35%, #f1f5f9 55%, #64748b 85%, #cbd5e1 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
      };
    }

    // 1. NEONBOX TYPE
    if (config.type === 'neonbox') {
      return (
        <div
          className="relative transition-all duration-300 select-none cursor-move group"
          style={{
            transformStyle: 'preserve-3d',
            width: `${Math.round((config.widthCm / 240) * 360 * config.scale)}px`,
            minHeight: `${Math.round((config.heightCm / 80) * 110 * config.scale)}px`,
          }}
        >
          {/* Wall light spill in night mode */}
          {isNight && isIlluminated && (
            <div
              className="absolute -inset-10 rounded-3xl pointer-events-none blur-3xl opacity-60"
              style={{
                backgroundColor: config.glowColor,
                transform: 'translateZ(-20px)',
              }}
            />
          )}

          {/* 3D Extruded Box Returns / Depth */}
          <div
            className="w-full h-full rounded-xl relative p-4 flex flex-col items-center justify-center text-center transition-all duration-300"
            style={{
              backgroundColor: isNight ? '#0b0f19' : '#1e293b',
              border: '4px solid #334155',
              boxShadow: isNight && isIlluminated
                ? `0 ${depthPx * 2}px ${depthPx * 4}px rgba(0,0,0,0.8), 0 0 25px ${config.glowColor}55, inset 0 0 20px ${config.glowColor}33`
                : `0 ${depthPx}px ${depthPx * 2}px rgba(0,0,0,0.6), inset 0 2px 4px rgba(255,255,255,0.2), inset 0 -4px 8px rgba(0,0,0,0.7)`,
              transform: `translateZ(${depthPx}px)`,
            }}
          >
            {/* Corner Standoff Brackets */}
            <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-slate-500 border border-slate-300 shadow-inner" />
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-slate-500 border border-slate-300 shadow-inner" />
            <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-slate-500 border border-slate-300 shadow-inner" />
            <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-slate-500 border border-slate-300 shadow-inner" />

            {/* Acrylic Illuminated Face */}
            <div
              className="w-full h-full rounded-lg p-3 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-300"
              style={{
                backgroundColor: isNight && isIlluminated ? `${config.glowColor}25` : '#ffffff0d',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              {/* Acrylic Glass Specular Reflection */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20 pointer-events-none" />

              {/* Brand Name Text */}
              <h2
                className="text-xl sm:text-2xl lg:text-3xl tracking-tight leading-none uppercase transition-all duration-300"
                style={{
                  ...faceStyle,
                  textShadow: isNight && isIlluminated
                    ? `0 0 12px ${config.glowColor}, 0 0 24px ${config.glowColor}80`
                    : '0 2px 4px rgba(0,0,0,0.6)',
                }}
              >
                {config.brandName || 'YOUR BRAND'}
              </h2>

              {/* Subtext */}
              {config.subText && (
                <p
                  className="text-[10px] sm:text-xs tracking-widest uppercase font-mono mt-1 opacity-90 transition-all duration-300"
                  style={{
                    color: isNight && isIlluminated ? '#ffffff' : '#94a3b8',
                    textShadow: isNight && isIlluminated ? `0 0 8px ${config.glowColor}` : 'none',
                  }}
                >
                  {config.subText}
                </p>
              )}
            </div>
          </div>
        </div>
      );
    }

    // 2. HURUF TIMBUL (3D Channel Letters)
    if (config.type === 'huruf-timbul') {
      const isBacklit = config.lightingStyle === 'backlit-halo' || config.lightingStyle === 'dual-glow';
      const isFrontlit = config.lightingStyle === 'frontlit' || config.lightingStyle === 'dual-glow';

      // Multi-layer 3D letter returns (depth)
      const returnShadows = Array.from({ length: depthPx }).map((_, i) => {
        const offset = i + 1;
        const shade = Math.max(10, 50 - i * 3);
        return `0 ${offset}px 0 rgb(${shade}, ${shade}, ${shade})`;
      }).join(', ');

      const contactWallShadow = `0 ${depthPx + 10}px 25px rgba(0,0,0,0.85)`;
      const haloGlow = (isNight && isBacklit)
        ? `0 0 35px ${config.glowColor}, 0 0 60px ${config.glowColor}90`
        : '';

      const combinedTextShadow = [
        returnShadows,
        contactWallShadow,
        haloGlow,
        (isNight && isFrontlit ? `0 0 15px ${config.glowColor}` : ''),
      ].filter(Boolean).join(', ');

      return (
        <div
          className="relative transition-all duration-300 select-none cursor-move flex flex-col items-center justify-center text-center group"
          style={{
            transformStyle: 'preserve-3d',
            transform: `scale(${config.scale})`,
          }}
        >
          {/* Wall Halo Light Spill behind individual letters */}
          {isNight && isBacklit && (
            <div
              className="absolute -inset-12 rounded-full pointer-events-none blur-3xl opacity-75"
              style={{
                backgroundColor: config.glowColor,
                transform: 'translateZ(-10px)',
              }}
            />
          )}

          {/* Main 3D Brand Letters */}
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-none uppercase transition-all duration-300 whitespace-nowrap"
            style={{
              ...faceStyle,
              textShadow: combinedTextShadow,
              transform: `translateZ(${depthPx}px)`,
            }}
          >
            {config.brandName || 'YOUR BRAND'}
          </h2>

          {/* Subtext Letters */}
          {config.subText && (
            <div
              className="mt-2 text-xs sm:text-sm tracking-widest uppercase font-mono font-bold whitespace-nowrap opacity-95 transition-all duration-300"
              style={{
                color: isNight && isIlluminated ? config.glowColor : '#e2e8f0',
                textShadow: isNight && isIlluminated
                  ? `0 0 10px ${config.glowColor}, 0 4px 10px rgba(0,0,0,0.8)`
                  : '0 2px 4px rgba(0,0,0,0.8)',
                transform: `translateZ(${Math.max(2, depthPx - 2)}px)`,
              }}
            >
              {config.subText}
            </div>
          )}
        </div>
      );
    }

    // 3. SIGNBOARD (Panel Reklame Datar)
    if (config.type === 'signboard') {
      return (
        <div
          className="relative transition-all duration-300 select-none cursor-move group"
          style={{
            transformStyle: 'preserve-3d',
            width: `${Math.round((config.widthCm / 240) * 380 * config.scale)}px`,
            minHeight: `${Math.round((config.heightCm / 80) * 100 * config.scale)}px`,
          }}
        >
          {/* Overhead Wall Spotlight Light Cone in night mode */}
          {isNight && isIlluminated && (
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-4/5 h-20 bg-gradient-to-b from-white/30 via-white/5 to-transparent blur-xl pointer-events-none" />
          )}

          {/* Flat Composite Architectural Panel */}
          <div
            className="w-full h-full rounded-md relative p-5 flex flex-col items-center justify-center text-center transition-all duration-300"
            style={{
              backgroundColor: isNight ? '#0f172a' : '#1e293b',
              backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 100%)',
              border: '2px solid #475569',
              boxShadow: `0 ${depthPx}px 24px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.25)`,
              transform: `translateZ(${depthPx}px)`,
            }}
          >
            {/* Stainless Steel Standoff Spacers on 4 Corners */}
            <div className="absolute top-2.5 left-2.5 w-3 h-3 rounded-full bg-gradient-to-tr from-slate-600 via-slate-300 to-slate-100 shadow-md border border-slate-400" />
            <div className="absolute top-2.5 right-2.5 w-3 h-3 rounded-full bg-gradient-to-tr from-slate-600 via-slate-300 to-slate-100 shadow-md border border-slate-400" />
            <div className="absolute bottom-2.5 left-2.5 w-3 h-3 rounded-full bg-gradient-to-tr from-slate-600 via-slate-300 to-slate-100 shadow-md border border-slate-400" />
            <div className="absolute bottom-2.5 right-2.5 w-3 h-3 rounded-full bg-gradient-to-tr from-slate-600 via-slate-300 to-slate-100 shadow-md border border-slate-400" />

            {/* Brand Title Graphic */}
            <h2
              className="text-2xl sm:text-3xl tracking-tight leading-none uppercase transition-all duration-300"
              style={{
                ...faceStyle,
                textShadow: '0 2px 6px rgba(0,0,0,0.7)',
              }}
            >
              {config.brandName || 'YOUR BRAND'}
            </h2>

            {/* Subtext */}
            {config.subText && (
              <p className="text-[11px] sm:text-xs tracking-wider uppercase font-mono text-slate-400 mt-1.5 font-semibold">
                {config.subText}
              </p>
            )}
          </div>
        </div>
      );
    }

    // 4. PYLON SIGN / TOTEM (Monolit Mandiri Berdiri)
    if (config.type === 'pylon') {
      return (
        <div
          className="relative transition-all duration-300 select-none cursor-move flex flex-col items-center group"
          style={{
            transformStyle: 'preserve-3d',
            width: `${Math.round((config.widthCm / 150) * 160 * config.scale)}px`,
            minHeight: `${Math.round((config.heightCm / 300) * 320 * config.scale)}px`,
          }}
        >
          {/* Ground Ambient Reflection */}
          {isNight && isIlluminated && (
            <div
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-16 rounded-full blur-2xl opacity-60 pointer-events-none"
              style={{ backgroundColor: config.glowColor }}
            />
          )}

          {/* Vertical Monolith Body */}
          <div
            className="w-full flex-1 rounded-t-2xl relative flex flex-col items-center justify-between p-3.5 transition-all duration-300"
            style={{
              backgroundColor: isNight ? '#090d16' : '#1e293b',
              border: '3px solid #334155',
              boxShadow: `0 ${depthPx}px 30px rgba(0,0,0,0.9), inset 0 2px 4px rgba(255,255,255,0.15)`,
              transform: `translateZ(${depthPx}px)`,
            }}
          >
            {/* Top Primary Illuminated Brand Header */}
            <div
              className="w-full p-4 rounded-xl flex flex-col items-center justify-center text-center transition-all duration-300"
              style={{
                backgroundColor: isNight && isIlluminated ? `${config.glowColor}25` : '#33415580',
                border: '1px solid rgba(255,255,255,0.15)',
                boxShadow: isNight && isIlluminated ? `0 0 15px ${config.glowColor}40` : 'none',
              }}
            >
              <h2
                className="text-lg sm:text-xl font-black uppercase tracking-tight transition-all duration-300"
                style={{
                  ...faceStyle,
                  textShadow: isNight && isIlluminated ? `0 0 12px ${config.glowColor}` : 'none',
                }}
              >
                {config.brandName || 'YOUR BRAND'}
              </h2>
            </div>

            {/* Mid Segment: Operating Info or Icon */}
            <div className="w-full py-3 px-2 flex flex-col items-center gap-1.5 border-y border-slate-700/60 my-2">
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                {config.subText || 'YOUR DETAILS'}
              </span>
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-80" />
            </div>

            {/* Lower Segment: Directional / Status indicator */}
            <div className="w-full py-2 px-3 rounded-lg bg-slate-900/80 border border-slate-800 text-center">
              <span className="text-[9px] font-mono font-bold text-emerald-400">
                ● BUKA SETIAP HARI
              </span>
            </div>
          </div>

          {/* Concrete Base Pedestal Foundation */}
          <div
            className="w-[125%] h-7 rounded-sm bg-slate-700 border-t-2 border-slate-500 shadow-2xl flex items-center justify-center"
            style={{ transform: `translateZ(${depthPx - 2}px)` }}
          >
            <div className="w-4/5 h-1 bg-slate-900/50 rounded-full" />
          </div>
        </div>
      );
    }

    // 5. NEONFLEX (Lampu Selang LED Artistik)
    if (config.type === 'neonflex') {
      const isGlowing = isNight || isIlluminated;
      const glowEffect = isGlowing
        ? `0 0 5px #ffffff, 0 0 10px ${config.glowColor}, 0 0 20px ${config.glowColor}, 0 0 40px ${config.glowColor}, 0 0 80px ${config.glowColor}80`
        : '0 2px 4px rgba(0,0,0,0.8)';

      return (
        <div
          className="relative transition-all duration-300 select-none cursor-move flex flex-col items-center justify-center text-center group"
          style={{
            transformStyle: 'preserve-3d',
            transform: `scale(${config.scale})`,
          }}
        >
          {/* Wall light spill diffusion */}
          {isGlowing && (
            <div
              className="absolute -inset-16 rounded-full pointer-events-none blur-3xl opacity-80"
              style={{
                backgroundColor: config.glowColor,
                transform: 'translateZ(-15px)',
              }}
            />
          )}

          {/* Transparent Acrylic Backer Plate (Contour cut) */}
          <div
            className="px-6 py-4 rounded-3xl relative flex flex-col items-center justify-center transition-all duration-300"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              backdropFilter: 'blur(2px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
              transform: `translateZ(${depthPx}px)`,
            }}
          >
            {/* Acrylic Plate Wall Mount Studs */}
            <div className="absolute top-2 left-4 w-2 h-2 rounded-full bg-slate-400 border border-white shadow-xs" />
            <div className="absolute top-2 right-4 w-2 h-2 rounded-full bg-slate-400 border border-white shadow-xs" />
            <div className="absolute bottom-2 left-4 w-2 h-2 rounded-full bg-slate-400 border border-white shadow-xs" />
            <div className="absolute bottom-2 right-4 w-2 h-2 rounded-full bg-slate-400 border border-white shadow-xs" />

            {/* Glowing Neon Tube Text */}
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl tracking-normal leading-none transition-all duration-300 whitespace-nowrap"
              style={{
                fontFamily: font,
                fontWeight: weight,
                color: isGlowing ? '#ffffff' : config.faceColor,
                textShadow: glowEffect,
                WebkitTextStroke: isGlowing ? `1.5px ${config.glowColor}` : 'none',
              }}
            >
              {config.brandName || 'YOUR BRAND'}
            </h2>

            {/* Neonflex Subtext */}
            {config.subText && (
              <p
                className="mt-2 text-xs sm:text-sm tracking-widest uppercase font-mono font-bold whitespace-nowrap opacity-90 transition-all duration-300"
                style={{
                  color: isGlowing ? '#ffffff' : '#94a3b8',
                  textShadow: isGlowing ? `0 0 10px ${config.glowColor}` : 'none',
                }}
              >
                {config.subText}
              </p>
            )}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 transition-all duration-300 select-none ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none border-none' : 'h-[480px] sm:h-[560px] lg:h-[620px]'
      }`}
    >
      {/* 1. REAL-WORLD BACKGROUND LAYER (BEFORE / ORIGINAL PHOTO) */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-500"
        style={{
          backgroundImage: `url(${config.backgroundImage})`,
          filter: config.isNightMode ? 'brightness(0.35) contrast(1.15) saturate(0.85)' : 'brightness(0.95)',
        }}
      />

      {/* 2. NIGHT MODE AMBIENT TINT */}
      {config.isNightMode && (
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712cc] via-[#050c1ecc] to-[#020617ee] pointer-events-none transition-opacity duration-500" />
      )}

      {/* 3. 3D SIGNAGE LAYER (AFTER / WITH SIGNAGE INSTALLED) */}
      {config.beforeAfterMode !== 'before-only' && (
        <div
          className="absolute inset-0 pointer-events-none flex items-center justify-center"
          style={{
            clipPath:
              config.beforeAfterMode === 'split'
                ? `inset(0 0 0 ${config.splitPosition}%)`
                : 'none',
            perspective: '1000px',
          }}
        >
          {/* Signage 3D Positioning Anchor */}
          <div
            onMouseDown={handleMouseDownSign}
            className="pointer-events-auto cursor-grab active:cursor-grabbing transition-transform duration-75"
            style={{
              transform: `translate3d(${config.posX}%, ${config.posY}%, 0) rotateX(${config.rotateX}deg) rotateY(${config.rotateY}deg) rotateZ(${config.rotateZ}deg)`,
            }}
          >
            {render3DSignage()}
          </div>
        </div>
      )}

      {/* 4. BEFORE / AFTER SPLIT SLIDER DIVIDER */}
      {config.beforeAfterMode === 'split' && (
        <div
          onMouseDown={handleMouseDownSplit}
          className="absolute top-0 bottom-0 z-30 cursor-ew-resize flex items-center justify-center group"
          style={{ left: `${config.splitPosition}%` }}
        >
          {/* Vertical Divider Line */}
          <div className="w-0.5 h-full bg-white shadow-[0_0_10px_rgba(0,0,0,0.8)]" />

          {/* Draggable Center Handle */}
          <div className="absolute w-8 h-8 rounded-full bg-white text-slate-900 font-black text-[10px] shadow-2xl flex items-center justify-center border-2 border-blue-600 transition-transform group-hover:scale-110">
            ↔
          </div>

          {/* Badges on left and right of divider */}
          <div className="absolute top-4 -left-20 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-white text-[10px] font-mono uppercase tracking-wider pointer-events-none">
            {isId ? 'Sebelum' : 'Before'}
          </div>
          <div className="absolute top-4 left-4 px-2 py-0.5 rounded bg-blue-600/80 backdrop-blur-md text-white text-[10px] font-mono uppercase tracking-wider pointer-events-none">
            {isId ? 'Sesudah' : 'After'}
          </div>
        </div>
      )}

      {/* 5. TOP CANVAS CONTROLS (Day/Night, Fullscreen, Upload, Reset) */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        {/* Left: Location & Dimensions badge */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="px-3 py-1.5 rounded-xl bg-slate-900/85 backdrop-blur-md border border-slate-700 text-xs font-mono text-slate-200 shadow-xl flex items-center gap-2">
            <Ruler className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-bold">{config.widthCm} × {config.heightCm} cm</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">Tebal {config.depthCm} cm</span>
          </div>

          {config.isUploadedPhoto && (
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[11px] font-mono font-bold hidden sm:inline-flex items-center gap-1">
              ✓ {isId ? 'Foto Lokasi Aktif' : 'Location Photo'}
            </span>
          )}
        </div>

        {/* Right: Quick Tools */}
        <div className="flex items-center gap-1.5 pointer-events-auto">
          {/* Day / Night Toggle */}
          <button
            onClick={() => onChangeConfig({ isNightMode: !config.isNightMode })}
            className={`p-2 rounded-xl backdrop-blur-md border transition-all cursor-pointer shadow-lg ${
              config.isNightMode
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                : 'bg-slate-900/85 text-slate-300 border-slate-700 hover:text-white'
            }`}
            title={config.isNightMode ? 'Ubah ke Mode Siang (Daylight)' : 'Ubah ke Mode Malam (Night LED Glow)'}
          >
            {config.isNightMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Reset Position */}
          <button
            onClick={handleResetPosition}
            className="p-2 rounded-xl bg-slate-900/85 backdrop-blur-md border border-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer shadow-lg"
            title="Reset Posisi & Sudut Kemiringan"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Upload Photo Button */}
          <button
            onClick={onOpenUpload}
            className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-lg cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isId ? 'Ganti Foto Lokasi' : 'Change Location'}</span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-xl bg-slate-900/85 backdrop-blur-md border border-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer shadow-lg"
            title="Layar Penuh"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 6. BOTTOM CANVAS HINTS & DRAG HELPER */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        <div className="px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[11px] text-slate-300 font-mono hidden sm:inline-flex items-center gap-2">
          <Move className="w-3.5 h-3.5 text-blue-400" />
          <span>{isId ? 'Geser langsung reklame pada gambar untuk atur posisi' : 'Drag signage directly on image to reposition'}</span>
        </div>

        {/* Before / After Mode Selector */}
        <div className="pointer-events-auto flex items-center gap-1 bg-slate-900/85 backdrop-blur-md p-1 rounded-xl border border-slate-700 text-[11px] font-semibold">
          <button
            onClick={() => onChangeConfig({ beforeAfterMode: 'after-only' })}
            className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
              config.beforeAfterMode === 'after-only' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            {isId ? 'Dengan Signage' : 'With Signage'}
          </button>
          <button
            onClick={() => onChangeConfig({ beforeAfterMode: 'split' })}
            className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
              config.beforeAfterMode === 'split' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            {isId ? 'Split Slider' : 'Split Slider'}
          </button>
          <button
            onClick={() => onChangeConfig({ beforeAfterMode: 'before-only' })}
            className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
              config.beforeAfterMode === 'before-only' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            {isId ? 'Foto Asli' : 'Original Photo'}
          </button>
        </div>
      </div>
    </div>
  );
};
