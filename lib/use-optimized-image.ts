/**
 * Custom hook for optimized image loading
 * This reduces layout shifts and improves performance by preloading images
 */
import { useState, useEffect } from 'react';

type ImageStatus = 'loading' | 'loaded' | 'error';

export function useOptimizedImage(src: string): {
  loaded: boolean;
  error: boolean;
  status: ImageStatus;
  blurDataURL: string;
} {
  const [status, setStatus] = useState<ImageStatus>('loading');
  const [blurDataURL, setBlurDataURL] = useState<string>('');

  useEffect(() => {
    if (!src) {
      setStatus('error');
      return;
    }

    // Generate a tiny blur placeholder (1x1 pixel transparent GIF)
    setBlurDataURL('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');

    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setStatus('loaded');
    };
    
    img.onerror = () => {
      setStatus('error');
    };

    // Clean up
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return {
    loaded: status === 'loaded',
    error: status === 'error',
    status,
    blurDataURL
  };
}
