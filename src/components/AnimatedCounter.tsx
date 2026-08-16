import React, { useEffect, useState, useRef } from 'react';

interface AnimatedCounterProps {
  value: string | number;
  duration?: number;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1600,
  className = '',
}) => {
  const [displayValue, setDisplayValue] = useState<string>('');
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const strVal = String(value);

    // Regex to separate prefix, numeric value (allowing commas and decimals), and suffix
    const match = strVal.match(/^(.*?)([\d,]+(?:\.\d+)?)(.*)$/);

    if (!match) {
      setDisplayValue(strVal);
      return;
    }

    const prefix = match[1];
    const rawNumStr = match[2];
    const suffix = match[3];
    const numStr = rawNumStr.replace(/,/g, '');
    const targetNum = parseFloat(numStr);
    const hasDecimal = rawNumStr.includes('.');
    const decimalPlaces = hasDecimal ? (rawNumStr.split('.')[1]?.length || 1) : 0;
    const hasCommas = rawNumStr.includes(',');

    if (isNaN(targetNum)) {
      setDisplayValue(strVal);
      return;
    }

    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Easing function for smooth count up effect
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentNum = easeProgress * targetNum;

      let formattedCurrent: string;
      if (hasDecimal) {
        formattedCurrent = currentNum.toFixed(decimalPlaces);
      } else {
        const rounded = Math.floor(currentNum);
        formattedCurrent = hasCommas ? rounded.toLocaleString('en-US') : rounded.toString();
      }

      setDisplayValue(`${prefix}${formattedCurrent}${suffix}`);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        const finalNumStr = hasDecimal
          ? targetNum.toFixed(decimalPlaces)
          : (hasCommas ? Math.floor(targetNum).toLocaleString('en-US') : targetNum.toString());
        setDisplayValue(`${prefix}${finalNumStr}${suffix}`);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animationFrameId = requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    } else {
      animationFrameId = requestAnimationFrame(step);
    }

    return () => {
      if (elementRef.current) observer.unobserve(elementRef.current);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [value, duration, hasAnimated]);

  return <span ref={elementRef} className={className}>{displayValue || String(value)}</span>;
};
