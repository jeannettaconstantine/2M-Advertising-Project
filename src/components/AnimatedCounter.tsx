import React, { useEffect, useState, useRef } from 'react';

interface AnimatedCounterProps {
  end: number;
  start?: number;
  duration?: number; // duration in ms
  prefix?: string;
  suffix?: string;
  separator?: ',' | '.' | 'none';
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  start = 0,
  duration = 1800,
  prefix = '',
  suffix = '',
  separator = ',',
  className = '',
}) => {
  const [count, setCount] = useState<number>(start);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const elementRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          let startTime: number | null = null;
          const startValue = start;
          const endValue = end;

          const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            
            // Subtle easeOutExpo / easeOutQuad curve for natural deceleration
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.floor(startValue + (endValue - startValue) * easeOutProgress);
            
            setCount(currentVal);

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(endValue);
            }
          };

          requestAnimationFrame(step);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [end, start, duration, hasAnimated]);

  const formatNumber = (num: number) => {
    if (separator === 'none') return num.toString();
    if (separator === '.') {
      return num.toLocaleString('id-ID');
    }
    return num.toLocaleString('en-US');
  };

  return (
    <span ref={elementRef} className={`tabular-nums inline-block ${className}`}>
      {prefix}
      {formatNumber(count)}
      {suffix}
    </span>
  );
};
