"use client";

import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef, memo, useMemo, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, Copy, CheckCircle2, Link2, Check, Loader2, Sparkles } from "lucide-react";
import Image from "next/image";
import { throttle, optimizedImageLoader, debounce, domBatch } from "@/lib/performance";
import { useIntersectionObserver } from "@/lib/use-intersection-observer";
import { useOptimizedImage } from "@/lib/use-optimized-image";
import { usePerformance } from "@/context/performance-context";

// Define the type for individual shape objects
interface ShapeProps {
  size: string;
  left: string;
  top: string;
  delay: number;
  duration: number;
  rotate: string;
}

// Using memo to prevent unnecessary re-renders
export const HeroSection = memo(function HeroSection() {
  const [demoUrl, setDemoUrl] = useState("https://example.com/very-long-url-that-needs-shortening");
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Get performance context for adaptive optimizations
  const { state: performanceState } = usePerformance();
  
  // Use intersection observer to only animate when visible
  const [heroSectionRef, isHeroVisible] = useIntersectionObserver({
    threshold: 0.1,
    once: false
  });
  
  // Mouse parallax effect with optimized throttling
  const handleMouseMove = useRef(
    throttle((e: React.MouseEvent<HTMLDivElement>) => {
      // Skip processing if element isn't visible or user prefers reduced motion
      if (!heroRef.current || !isHeroVisible || performanceState.prefersReducedMotion) return;
      
      // Use DOM batching to reduce layout thrashing
      domBatch.addRead(() => {
        const rect = heroRef.current!.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        // Only update state if there's a significant change (reduces renders)
        if (Math.abs(x - mousePosition.x) > 0.01 || Math.abs(y - mousePosition.y) > 0.01) {
          domBatch.addWrite(() => {
            setMousePosition({ x, y });
          });
        }
      });
    }, performanceState.isLowPowerMode ? 100 : 50) // Adaptive throttling based on device power mode
  ).current;

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
  };

  // 3D Card animation variants
  const card3d = {
    rest: { 
      rotateY: 0, 
      rotateX: 0, 
      scale: 1,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
    },
    hover: { 
      rotateY: 5, 
      rotateX: -5, 
      scale: 1.02,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
    }
  };

  // Reduced number of background shapes and simplified animations for better performance
  const shapes = [
    { size: "h-24 w-24", left: "10%", top: "15%", delay: 0, duration: 30, rotate: "45deg" },
    { size: "h-40 w-40", left: "85%", top: "60%", delay: 0.6, duration: 30, rotate: "-12deg" },
  ];
  
  // Copy demo shortened URL
  const handleCopy = () => {
    navigator.clipboard.writeText("https://snap.url/ab1c23");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simulating URL shortening animation
  const [shortening, setShortening] = useState(false);
  const [shortened, setShortened] = useState(false);
  
  const simulateShortening = () => {
    setShortening(true);
    setTimeout(() => {
      setShortened(true);
      setShortening(false);
    }, 1500);
  };

  const gradientStyle = {
    background: 'linear-gradient(90deg, rgba(0,128,0,1) 0%, rgba(34,139,34,1) 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  // Memoize expensive parts of the component with performance adaptations
  const MemoizedShapes = memo(({ shapes, isVisible, prefersReducedMotion }: { 
    shapes: ShapeProps[], 
    isVisible: boolean,
    prefersReducedMotion: boolean
  }) => {
    // Don't render shapes if not visible or reduced motion is preferred
    if (!isVisible) return null;
    
    return (
      <>
        {shapes.map((shape, index) => {
          // Skip rendering shapes when reduced motion is preferred
          if (prefersReducedMotion) {
            return (
              <div
                key={index}
                className={cn(
                  "absolute rounded-full bg-gradient-to-br from-green-600 to-green-800",
                  shape.size
                )}
                style={{ 
                  left: shape.left, 
                  top: shape.top,
                  rotate: shape.rotate,
                  opacity: 0.2,
                }}
              />
            );
          }
          
          return (
            <motion.div
              key={index}
              className={cn(
                "absolute rounded-full bg-gradient-to-br from-green-600 to-green-800 card-3d-inner",
                shape.size
              )}
              style={{ 
                left: shape.left, 
                top: shape.top,
                rotate: shape.rotate,
                opacity: 0.2,
              }}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0.2, 0.3, 0.2],
                y: [0, -10, 0],
              }}
              transition={{
                delay: shape.delay,
                duration: shape.duration,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
                times: [0, 0.5, 1]
              }}
            />
          );
        })}
      </>
    );
  }, (prevProps, nextProps) => {
    // Custom comparison function to prevent unnecessary re-renders
    return prevProps.isVisible === nextProps.isVisible && 
           prevProps.prefersReducedMotion === nextProps.prefersReducedMotion;
  });
  
  // Memoize the card rotation calculations
  const cardRotation = useMemo(() => {
    if (performanceState.prefersReducedMotion) {
      return { rotateY: 0, rotateX: 0 };
    }
    
    return {
      rotateY: mousePosition.x * 5, // Max 5 degrees
      rotateX: -(mousePosition.y * 5) // Max -5 degrees
    };
  }, [mousePosition.x, mousePosition.y, performanceState.prefersReducedMotion]);
  
  // Preload hero images
  useEffect(() => {
    const imageUrls = ['/hero-image.png', '/qr-code.png'];
    imageUrls.forEach(url => {
      // Use the browser's built-in Image constructor, not Next.js Image component
      const img = new window.Image();
      img.src = url;
    });
  }, []);
  
  return (
    <div 
      ref={(el) => {
        // Combine refs
        if (el) {
          // @ts-ignore - This is fine for combining refs
          heroRef.current = el;
          // @ts-ignore
          heroSectionRef.current = el;
        }
      }}
      className="relative overflow-hidden w-full" 
      onMouseMove={handleMouseMove}
    >
      {/* Using memoized shapes component with visibility tracking */}
      <MemoizedShapes 
        shapes={shapes} 
        isVisible={isHeroVisible} 
        prefersReducedMotion={performanceState.prefersReducedMotion} 
      />

      <div className="container relative z-10 min-h-[calc(100vh-4rem)] py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left column - Text content */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-xl"
          >
            <motion.div
              variants={item}
              className="mb-4 inline-flex items-center rounded-full border border-green-600/20 bg-black px-4 py-1.5 text-sm font-medium backdrop-blur-sm transition-all hover:bg-black/90 btn-hover"
            >
              <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-green-600"></span>
              <span className="text-green-600">New - QR Codes & Analytics Now Available!</span>
            </motion.div>
            
            <motion.h1
              variants={item}
              className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl leading-tight"
            >
              <span className={cn("block bg-clip-text text-transparent drop-shadow-sm")} style={gradientStyle}>
                Transform Long URLs
              </span>
              <span className="block">Into <span className="text-green-600">Powerful</span> Links</span>
            </motion.h1>
            
            <motion.p
              variants={item}
              className="mb-8 text-lg text-muted-foreground md:text-xl"
            >
              Create branded, memorable links in seconds. Track performance, 
              generate QR codes, and elevate your digital presence with our 
              modern link shortening platform.
            </motion.p>
            
            <motion.div variants={item} className="flex flex-wrap gap-4 mb-12">
              <Button size="lg" className="h-12 px-8 rounded-xl shadow-lg btn-hover font-medium group bg-green-500 hover:bg-green-600 text-white hover:shadow-[0_0_15px_rgba(34,197,94,0.5)] dark:hover:shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                Start Shortening
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <Button size="lg" variant="outline" className="h-12 px-8 rounded-xl border-green-500 text-green-500 hover:bg-green-50 hover:text-green-600 backdrop-blur-sm btn-hover">
                View Features
              </Button>
            </motion.div>
            
            <motion.div variants={item} className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span>No registration required</span>
              <span className="mx-2">•</span>
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span>Custom domains</span>
              <span className="mx-2">•</span>
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span>Detailed analytics</span>
            </motion.div>
          </motion.div>
          
          {/* Right column - Interactive 3D card */}
          <motion.div
            variants={item}
            initial="hidden"
            animate="show"
            className="mx-auto max-w-md w-full"
          >
            <motion.div 
              className="relative z-10 rounded-xl bg-gradient-to-br from-green-600 to-green-800 p-[2px] shadow-lg transition-all duration-300 hover:shadow-green-500/20 dark:hover:shadow-green-700/20"
              variants={card3d}
              initial="rest"
              animate={isHovered ? "hover" : "rest"}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px",
                transform: mousePosition.x !== 0 ? `rotateY(${(mousePosition.x - 0.5) * 5}deg) rotateX(${(mousePosition.y - 0.5) * -5}deg)` : 'none'
              }}
            >
              <div className="flex h-full w-full flex-col items-center justify-center gap-4 rounded-lg bg-white px-4 py-6 dark:bg-[#0a1a0a] sm:px-6 adaptive-card">
                <div className="mb-6 flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-600/10">
                      <Link2 className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">URL Shortener</h3>
                      <p className="text-sm text-muted-foreground">Instant short links</p>
                    </div>
                  </div>
                  <span className="text-xs rounded-full px-2 py-1 bg-green-600/10 text-green-600">
                    {shortened ? "Shortened" : shortening ? "Processing..." : "Ready"}
                  </span>
                </div>
                
                <div className="mb-4 w-full">
                  <div className="mb-2 flex items-center">
                    <div className="h-2 w-2 rounded-full bg-green-600 mr-2"></div>
                    <span className="text-sm font-medium">Enter long URL</span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={demoUrl}
                      onChange={(e) => setDemoUrl(e.target.value)}
                      className="w-full rounded-lg border bg-background p-3 text-sm text-foreground shadow-inner focus:outline-none focus:ring-2 focus:ring-green-600/50"
                    />
                  </div>
                </div>
                
                <AnimatePresence>
                  {shortened && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className="mb-4 w-full"
                    >
                      <div className="mb-2 flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-700 mr-2"></div>
                        <span className="text-sm font-medium">Your shortened link</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border border-green-600/20 bg-green-50/50 dark:bg-green-900/10 p-3">
                        <div className="mr-2 w-full overflow-hidden text-ellipsis whitespace-nowrap">
                          https://snap.url/ab1c23
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={handleCopy}
                          className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-100 dark:hover:bg-green-900/20"
                        >
                          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <Button
                  className="w-full h-12 text-base font-medium rounded-xl shadow-lg transition-all duration-300 bg-green-500 hover:bg-green-600 hover:shadow-[0_0_15px_rgba(34,197,94,0.5)] dark:hover:shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                  onClick={simulateShortening}
                  disabled={shortening || shortened}
                >
                  {shortening ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Shortening...
                    </>
                  ) : shortened ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      URL Shortened
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Shorten Now
                    </>
                  )}
                </Button>
                
                {shortened && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mt-4 grid grid-cols-3 gap-2 text-center text-xs text-muted-foreground"
                  >
                    <div className="rounded-md border p-2">
                      <div className="font-medium text-lg text-foreground">0</div>
                      <div>Clicks</div>
                    </div>
                    <div className="rounded-md border p-2">
                      <div className="font-medium text-lg text-foreground">--</div>
                      <div>Location</div>
                    </div>
                    <div className="rounded-md border p-2">
                      <div className="font-medium text-lg text-foreground">--</div>
                      <div>Device</div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
});
