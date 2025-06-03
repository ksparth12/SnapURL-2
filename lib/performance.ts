/**
 * Performance optimization utilities for SnapURL
 * 
 * This file contains utilities to improve application performance
 * by reducing unnecessary re-renders and optimizing animations.
 */

/**
 * Throttle function to limit how often a function can be called
 * @param callback The function to throttle
 * @param delay The minimum time between function calls
 */
export function throttle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number = 100
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      callback(...args);
    }
  };
}

/**
 * Debounce function to delay execution until after a period of inactivity
 * @param callback The function to debounce
 * @param delay The time to wait after the last call
 */
export function debounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number = 300
): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

/**
 * Optimize animations by reducing work for the browser
 * @param callback Animation frame callback
 */
export function optimizedAnimationFrame(callback: FrameRequestCallback): number {
  // Use passive event listeners where possible
  return requestAnimationFrame(callback);
}

/**
 * Reduce layout thrashing by batching DOM reads and writes
 */
export class DOMBatch {
  private reads: Array<() => void> = [];
  private writes: Array<() => void> = [];
  private scheduled = false;

  addRead(fn: () => void): void {
    this.reads.push(fn);
    this.schedule();
  }

  addWrite(fn: () => void): void {
    this.writes.push(fn);
    this.schedule();
  }

  private schedule(): void {
    if (!this.scheduled) {
      this.scheduled = true;
      optimizedAnimationFrame(() => this.run());
    }
  }

  private run(): void {
    // Process all reads
    const reads = this.reads;
    this.reads = [];
    reads.forEach(read => read());

    // Process all writes
    const writes = this.writes;
    this.writes = [];
    writes.forEach(write => write());

    this.scheduled = false;

    // If new tasks were added during execution, schedule another run
    if (this.reads.length > 0 || this.writes.length > 0) {
      this.schedule();
    }
  }
}

// Create a singleton instance for app-wide use
export const domBatch = new DOMBatch();

/**
 * Optimize image loading by lazy loading images
 * @param src Image source URL
 * @param options Options for the image loader
 */
export function optimizedImageLoader(
  src: string,
  options: { quality?: number; priority?: boolean } = {}
): string {
  // Add query parameters for image optimization
  const params = new URLSearchParams();
  
  if (options.quality) {
    params.append('q', options.quality.toString());
  }
  
  if (options.priority) {
    params.append('priority', 'true');
  }
  
  // Add a timestamp parameter to prevent excessive caching during development
  if (process.env.NODE_ENV === 'development') {
    params.append('t', Date.now().toString());
  }
  
  const queryString = params.toString();
  return queryString ? `${src}?${queryString}` : src;
}
