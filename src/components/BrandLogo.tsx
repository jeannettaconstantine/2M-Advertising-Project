import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  variant?: 'full' | 'emblem-only';
}

/**
 * Official cv. 2M AdvertisinG Brand Logo
 * Recreated with mathematical precision following the official corporate emblem:
 * - Oval blue frame (#223886)
 * - Two red heads (#D81E28) with 3 arched blue dots
 * - Royal blue 'M' with horizontal wrapping orbit
 * - Soft perspective floor reflection
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
  variant = 'full',
}) => {
  const sizeMap = {
    sm: { emblem: 'w-10 h-8', title: 'text-sm', sub: 'text-[9px]' },
    md: { emblem: 'w-14 h-11', title: 'text-base', sub: 'text-[10px]' },
    lg: { emblem: 'w-20 h-16', title: 'text-lg', sub: 'text-xs' },
    xl: { emblem: 'w-28 h-22', title: 'text-2xl', sub: 'text-sm' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-2.5 group select-none ${className}`}>
      {/* Official Oval Emblem */}
      <div className={`${currentSize.emblem} relative shrink-0 flex items-center justify-center transition-transform group-hover:scale-105 duration-200`}>
        <svg
          viewBox="0 0 540 330"
          className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(34,56,134,0.3)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="reflGrad2M" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#94A3B8" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Outer Oval Ring */}
          <ellipse cx="270" cy="155" rx="250" ry="142" fill="#FFFFFF" stroke="#223886" strokeWidth="18" />

          {/* Perspective Floor Reflection */}
          <g opacity="0.45" transform="translate(0, 10)">
            <ellipse cx="270" cy="245" rx="140" ry="24" fill="url(#reflGrad2M)" />
            {/* Reflected M legs */}
            <path
              d="M 200 230 L 225 260 L 245 230 L 295 230 L 315 260 L 340 230 L 350 248 L 325 272 L 295 245 L 245 245 L 215 272 Z"
              fill="#94A3B8"
            />
          </g>

          {/* Back Arc of Center Orbit (Behind M) */}
          <path
            d="M 145 168 C 170 142, 370 142, 395 168"
            fill="none"
            stroke="#223886"
            strokeWidth="15"
            strokeLinecap="round"
          />

          {/* Central Blue 'M' Body */}
          <path
            d="
              M 195 110 
              L 248 110 
              C 256 142, 262 154, 270 154 
              C 278 154, 284 142, 292 110 
              L 345 110 
              L 345 205 
              C 345 220, 332 230, 315 230 
              C 298 230, 288 220, 288 205 
              L 288 178 
              C 282 186, 276 190, 270 190 
              C 264 190, 258 186, 252 178 
              L 252 205 
              C 252 220, 242 230, 225 230 
              C 208 230, 195 220, 195 205 
              Z
            "
            fill="#223886"
          />

          {/* Front Arc of Center Orbit (In front of M) */}
          <path
            d="M 125 172 C 160 215, 380 215, 415 172 C 388 196, 152 196, 125 172 Z"
            fill="#223886"
          />

          {/* Two Red Circular Heads */}
          <circle cx="222" cy="80" r="24" fill="#D81E28" />
          <circle cx="318" cy="80" r="24" fill="#D81E28" />

          {/* 3 Blue Arched Dots */}
          <circle cx="254" cy="67" r="7.5" fill="#223886" />
          <circle cx="270" cy="62" r="8" fill="#223886" />
          <circle cx="286" cy="67" r="7.5" fill="#223886" />
        </svg>
      </div>

      {/* Official Corporate Typography */}
      {showText && (
        <div className="flex flex-col text-left">
          <div className="flex items-baseline font-serif font-bold tracking-tight">
            {/* 2 in Royal Blue */}
            <span className="text-[#223886] font-serif font-extrabold text-lg sm:text-xl tracking-tight">
              2
            </span>
            {/* M in Crimson Red */}
            <span className="text-[#D81E28] font-serif font-black text-2xl sm:text-3xl ml-0.5 leading-none">
              M
            </span>
            {/* Advertisin in Royal Blue with Underline */}
            <span className="relative inline-block text-[#223886] font-serif font-bold text-lg sm:text-xl ml-0.5">
              Advertisin
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-[#223886]"></span>
            </span>
            {/* G in Crimson Red */}
            <span className="text-[#D81E28] font-serif font-black text-2xl sm:text-3xl ml-0.5 leading-none">
              G
            </span>
          </div>

          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-slate-400">
              Signage & OOH Specialists
            </span>
            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-red-600/10 text-red-500 border border-red-500/20">
              Est. 2002
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
