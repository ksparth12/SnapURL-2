/**
 * Custom hook for optimized intersection observer
 * This helps reduce unnecessary renders for animations that depend on scroll position
 */
import { useEffect, useState, useRef } from 'react';

type IntersectionOptions = {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
  disabled?: boolean;
};

export function useIntersectionObserver(
  options: IntersectionOptions = {}
): [React.RefObject<HTMLElement>, boolean] {
  const { 
    root = null, 
    rootMargin = '0px', 
    threshold = 0, 
    once = false,
    disabled = false
  } = options;
  
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const frozen = useRef(false);

  useEffect(() => {
    if (disabled || (once && frozen.current)) return;
    
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;
        
        // Only update state if needed
        if (isElementIntersecting !== isIntersecting) {
          setIsIntersecting(isElementIntersecting);
          
          if (once && isElementIntersecting) {
            frozen.current = true;
            // Disconnect immediately if once is true and element is intersecting
            observer.disconnect();
          }
        }
      },
      { root, rootMargin, threshold }
    );

    observer.observe(node);
    
    return () => {
      observer.disconnect();
    };
  }, [root, rootMargin, threshold, once, disabled, isIntersecting]);

  return [ref, isIntersecting];
}
