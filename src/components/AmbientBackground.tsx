import React from 'react';
import { motion } from 'motion/react';

interface AmbientBackgroundProps {
  intensity?: 'subtle' | 'vibrant';
  variant?: 'blue-red' | 'cyber' | 'amber';
  theme?: 'dark' | 'light';
}

export const AmbientBackground: React.FC<AmbientBackgroundProps> = ({
  intensity = 'subtle',
  theme = 'dark',
}) => {
  const isVibrant = intensity === 'vibrant';
  const isLight = theme === 'light';

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Mesh Orb 1: Primary Electric Blue breathing orb */}
      <motion.div
        animate={{
          scale: [1, 1.15, 0.95, 1],
          opacity: isLight
            ? (isVibrant ? [0.18, 0.32, 0.16, 0.18] : [0.12, 0.22, 0.10, 0.12])
            : (isVibrant ? [0.22, 0.35, 0.18, 0.22] : [0.12, 0.20, 0.10, 0.12]),
          x: [0, 30, -20, 0],
          y: [0, -25, 20, 0],
          rotate: [0, 45, 90, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`absolute top-1/6 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[400px] sm:h-[550px] ${
          isLight
            ? 'bg-gradient-to-tr from-blue-400 via-indigo-300 to-cyan-300 blur-[130px]'
            : 'bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 blur-[150px]'
        } rounded-full`}
      />

      {/* Mesh Orb 2: Dynamic Crimson / Magenta / Coral color shift orb */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1.02, 1],
          opacity: isLight
            ? (isVibrant ? [0.15, 0.28, 0.14, 0.15] : [0.10, 0.18, 0.08, 0.10])
            : (isVibrant ? [0.18, 0.30, 0.15, 0.18] : [0.09, 0.18, 0.08, 0.09]),
          x: [0, -35, 25, 0],
          y: [0, 30, -25, 0],
          rotate: [0, -45, -90, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.5,
        }}
        className={`absolute top-1/3 right-1/10 w-[500px] sm:w-[700px] h-[450px] sm:h-[600px] ${
          isLight
            ? 'bg-gradient-to-br from-rose-400 via-red-300 to-amber-300 blur-[140px]'
            : 'bg-gradient-to-br from-red-600 via-rose-600 to-amber-600 blur-[160px]'
        } rounded-full`}
      />

      {/* Mesh Orb 3: Deep Royal Violet / Cyan / Blue foundation glow */}
      <motion.div
        animate={{
          scale: [1, 1.12, 0.94, 1],
          opacity: isLight
            ? (isVibrant ? [0.12, 0.24, 0.10, 0.12] : [0.08, 0.15, 0.07, 0.08])
            : (isVibrant ? [0.16, 0.28, 0.14, 0.16] : [0.08, 0.16, 0.07, 0.08]),
          x: [0, 20, -30, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 3,
        }}
        className={`absolute bottom-1/6 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[350px] sm:h-[500px] ${
          isLight
            ? 'bg-gradient-to-r from-blue-300 via-indigo-200 to-purple-300 blur-[150px]'
            : 'bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 blur-[170px]'
        } rounded-full`}
      />

      {/* Subtle Micro-Grid Overlay */}
      <div className={`absolute inset-0 ${
        isLight
          ? 'bg-[linear-gradient(to_right,#0284c70a_1px,transparent_1px),linear-gradient(to_bottom,#0284c70a_1px,transparent_1px)]'
          : 'bg-[linear-gradient(to_right,#3341550a_1px,transparent_1px),linear-gradient(to_bottom,#3341550a_1px,transparent_1px)]'
      } bg-[size:36px_36px]`} />
    </div>
  );
};

