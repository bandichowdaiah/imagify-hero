
import { useEffect, useState } from 'react';

export const useFadeIn = (delay = 0, duration = 300) => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpacity(1);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return {
    style: {
      opacity,
      transition: `opacity ${duration}ms ease-in-out`,
    },
  };
};

export const useIntersectionObserver = (
  options = { threshold: 0.1, rootMargin: '0px' }
) => {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return { ref: setRef, isVisible };
};

// Staggered animations for lists of items
export const useStaggeredAnimation = (
  items: any[],
  baseDelay = 100,
  staggerAmount = 50
) => {
  return items.map((item, index) => ({
    ...item,
    animationDelay: baseDelay + index * staggerAmount,
  }));
};
