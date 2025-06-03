"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from '@/components/theme-provider';
import { ShortenedUrlProvider } from '@/context/shortened-url-context';
import { Toaster } from '@/components/ui/toaster';
import { Analytics } from '@/components/analytics';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

// Pre-calculate fixed values for shapes to avoid any randomness on re-renders
const shapes = [
  { size: 180, left: 10, top: 20, delay: 0.0, rotate: '10deg', color: 'from-primary/5 to-secondary/5' },
  { size: 250, left: 30, top: 50, delay: 0.2, rotate: '20deg', color: 'from-secondary/5 to-primary/5' },
  { size: 200, left: 60, top: 10, delay: 0.4, rotate: '-15deg', color: 'from-primary/5 to-secondary/5' },
  { size: 300, left: 80, top: 70, delay: 0.6, rotate: '5deg', color: 'from-secondary/5 to-primary/5' },
  { size: 150, left: 40, top: 80, delay: 0.8, rotate: '-20deg', color: 'from-primary/5 to-secondary/5' },
  { size: 220, left: 70, top: 30, delay: 1.0, rotate: '15deg', color: 'from-secondary/5 to-primary/5' },
  { size: 270, left: 20, top: 60, delay: 1.2, rotate: '-10deg', color: 'from-primary/5 to-secondary/5' },
  { size: 230, left: 50, top: 40, delay: 1.4, rotate: '25deg', color: 'from-secondary/5 to-primary/5' },
  { size: 190, left: 90, top: 15, delay: 1.6, rotate: '-5deg', color: 'from-primary/5 to-secondary/5' },
  { size: 280, left: 5, top: 90, delay: 1.8, rotate: '30deg', color: 'from-secondary/5 to-primary/5' }
];

export function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Reduced loading time for better performance
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Enhanced page transition variants for smoother navigation
  const pageVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring',
        stiffness: 120, 
        damping: 20,
        mass: 0.8,
        velocity: 2,
        duration: 0.5 
      }
    },
    exit: { 
      opacity: 0, 
      y: -10,
      transition: { 
        duration: 0.3,
        ease: 'easeInOut'
      } 
    }
  };
  
  return (
    <>
      {/* Loading overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-background"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 100 }}
              className="flex flex-col items-center"
            >
              <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
              <p className="text-lg font-medium text-foreground">Loading SnapURL...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Animated background with improved shapes */}
      <div className="animated-background">
        {shapes.map((shape, i) => (
          <motion.div
            key={i}
            className={`bg-shape rounded-full backdrop-blur-md bg-gradient-to-br ${shape.color}`}
            style={{
              width: shape.size,
              height: shape.size,
              left: `${shape.left}%`,
              top: `${shape.top}%`,
              rotate: shape.rotate,
              transformStyle: 'preserve-3d',
              perspective: '1000px',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0.3, 0.5, 0.3], 
              scale: [1, 1.05, 1],
              y: [0, -15, 0],
              rotateX: [0, 5, 0]
            }}
            transition={{
              delay: shape.delay,
              duration: 20, // Fixed duration for better performance
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
              times: [0, 0.5, 1]
            }}
          >
            <div className="bg-shape-inner rounded-full backdrop-blur-sm" />
          </motion.div>
        ))}
      </div>
      
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        disableTransitionOnChange
      >
        <ShortenedUrlProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <AnimatePresence mode="wait">
              <motion.main 
                key={pathname}
                className="flex-1"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={pageVariants}
              >
                {children}
              </motion.main>
            </AnimatePresence>
            <Footer />
          </div>
          <Analytics />
          <Toaster />
        </ShortenedUrlProvider>
      </ThemeProvider>
    </>
  );
}