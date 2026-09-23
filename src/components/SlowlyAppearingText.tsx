import React, { useMemo } from 'react';
import { motion } from 'motion/react';

interface SlowlyAppearingTextProps {
  text: string;
  className?: string;
  delayStart?: number;
  staggerSpeed?: number;
}

export const SlowlyAppearingText: React.FC<SlowlyAppearingTextProps> = ({
  text,
  className = '',
  delayStart = 0.4,
  staggerSpeed = 0.035,
}) => {
  const words = useMemo(() => text.split(' '), [text]);

  return (
    <p className={`inline-block leading-relaxed ${className}`}>
      {words.map((word, idx) => (
        <motion.span
          key={`${word}-${idx}`}
          initial={{
            opacity: 0,
            y: 8,
            filter: 'blur(6px)',
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
          }}
          transition={{
            duration: 0.75,
            delay: delayStart + idx * staggerSpeed,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block mr-[0.28em] will-change-transform"
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
};
