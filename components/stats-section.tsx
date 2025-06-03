"use client";

import { useEffect, useState, useRef, memo, useMemo, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { useShortenedUrls } from "@/context/shortened-url-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useIntersectionObserver } from "@/lib/use-intersection-observer";
import { usePerformance } from "@/context/performance-context";
import { domBatch } from "@/lib/performance";

// Memoized chart component to prevent unnecessary re-renders
const MemoizedBarChart = memo(({ data }: { data: any[] }) => (
  <ResponsiveContainer width="100%" height={200}>
    <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eaeaea" />
      <XAxis dataKey="name" tick={{ fill: '#888888' }} axisLine={false} />
      <YAxis tick={{ fill: '#888888' }} axisLine={false} />
      <Tooltip 
        contentStyle={{ 
          backgroundColor: '#1a1a1a', 
          border: '1px solid #333', 
          borderRadius: '8px',
          color: '#fff'
        }} 
        cursor={{ fill: 'rgba(0, 128, 0, 0.1)' }} 
      />
      <Bar 
        dataKey="clicks" 
        fill="#22c55e" 
        radius={[4, 4, 0, 0]} 
        animationDuration={1000}
      />
    </BarChart>
  </ResponsiveContainer>
));

// Memoized stat card component
const StatCard = memo(({ title, value, icon, className }: { 
  title: string; 
  value: string | number | React.ReactNode; 
  icon?: React.ReactNode; 
  className?: string;
}) => (
  <Card className={`border-primary/20 transition-all duration-300 hover:border-green-500 hover:shadow-lg hover:shadow-green-500/20 hover:-translate-y-1 hover:scale-105 ${className || ''}`}>
    <CardHeader className="pb-2">
      <CardTitle className="text-base font-medium flex items-center justify-between">
        {title}
        {icon}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
));

export const StatsSection = memo(function StatsSection() {
  const { totalUrls, totalClicks } = useShortenedUrls();
  const { state: performanceState } = usePerformance();
  
  // Use refs for animation values to avoid re-renders during animation
  const animatedUrlsRef = useRef(0);
  const animatedClicksRef = useRef(0);
  const animatedSavedRef = useRef(0);
  
  // Use state only for the final rendered values
  const [displayValues, setDisplayValues] = useState({
    urls: 0,
    clicks: 0,
    saved: 0
  });
  
  // Use intersection observer to only animate when in view
  const [sectionRef, isInView] = useIntersectionObserver({
    threshold: 0.2,
    once: true
  });
  
  // Memoize derived values
  const avgCharsSaved = useMemo(() => 45, []); // Average characters saved per URL
  const totalCharsSaved = useMemo(() => totalUrls * avgCharsSaved, [totalUrls, avgCharsSaved]);
  
  // Animation for counters - optimized with RAF and batched updates
  useEffect(() => {
    if (!isInView) return; // Don't animate if not in view
    
    // Reset animation values
    animatedUrlsRef.current = 0;
    animatedClicksRef.current = 0;
    animatedSavedRef.current = 0;
    
    // Use requestAnimationFrame for smoother animation
    const startTime = performance.now();
    const duration = performanceState.isLowPowerMode ? 2000 : 1500; // Longer duration in low power mode
    
    // Use a single animation frame for all counters
    let rafId: number;
    
    const updateCounters = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Use easeOutQuad for smoother animation
      const eased = 1 - (1 - progress) * (1 - progress);
      
      // Update ref values without causing re-renders
      animatedUrlsRef.current = eased * totalUrls;
      animatedClicksRef.current = eased * totalClicks;
      animatedSavedRef.current = eased * totalCharsSaved;
      
      // Batch DOM updates to reduce layout thrashing
      domBatch.addWrite(() => {
        // Only update state every 5 frames (or when complete) to reduce re-renders
        if (progress === 1 || elapsed % 83 < 16) { // ~5 frames at 60fps
          setDisplayValues({
            urls: Math.round(animatedUrlsRef.current),
            clicks: Math.round(animatedClicksRef.current),
            saved: Math.round(animatedSavedRef.current)
          });
        }
      });
      
      // Continue animation if not complete
      if (progress < 1) {
        rafId = requestAnimationFrame(updateCounters);
      }
    };
    
    // Start animation
    rafId = requestAnimationFrame(updateCounters);
    
    // Cleanup
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [totalUrls, totalClicks, totalCharsSaved, isInView, performanceState.isLowPowerMode]);
  
  // Memoize chart data to prevent unnecessary recalculations
  const mockData = useMemo(() => [
    { name: "Mon", clicks: 12 },
    { name: "Tue", clicks: 19 },
    { name: "Wed", clicks: 15 },
    { name: "Thu", clicks: 27 },
    { name: "Fri", clicks: 22 },
    { name: "Sat", clicks: 18 },
    { name: "Sun", clicks: 21 },
  ], []);
  
  return (
    <div 
      ref={(el) => {
        // @ts-ignore - This is fine for combining refs
        if (el) sectionRef.current = el;
      }} 
      className="bg-muted/50 py-16 md:py-24 w-full">
      <div className="container">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          >
            Track Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-800">Link Performance</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            See how your shortened links are performing with our simple analytics dashboard
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          <StatCard 
            title="Total URLs Shortened" 
            value={displayValues.urls.toLocaleString()} 
          />
          
          <StatCard 
            title="Total Clicks" 
            value={displayValues.clicks.toLocaleString()} 
          />
          
          <StatCard 
            title="Characters Saved" 
            value={displayValues.saved.toLocaleString()} 
          />
          
          <StatCard 
            title="Link Metrics" 
            className="adaptive-card"
            value={
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Click Rate</span>
                  <span className="text-card-foreground">24.8%</span>
                </div>
                <Progress value={25} className="h-1 adaptive-progress-bg" />
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Growth</span>
                  <span className="text-card-foreground">+12.3%</span>
                </div>
                <Progress value={12} className="h-1 adaptive-progress-bg" />
              </div>
            }
          />
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Card className="h-full border-primary/10 transition-all duration-300 hover:border-green-500 hover:shadow-lg hover:shadow-green-500/20 hover:-translate-y-1 hover:scale-105 group">
              <CardHeader>
                <CardTitle className="transition-all duration-300 group-hover:text-green-600">Weekly Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="clicks" fill="url(#colorGradient)" radius={[4, 4, 0, 0]} />
                      <defs>
                        <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                          <stop offset="100%" stopColor="#ec4899" stopOpacity={0.8}/>
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <Card className="h-full adaptive-card group">
              <CardHeader>
                <CardTitle className="transition-all duration-300 group-hover:text-green-500">Link Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium transition-all duration-300 group-hover:text-green-500">Average Click Rate</span>
                      <span className="text-sm font-medium transition-all duration-300 group-hover:text-green-500">
                        {totalUrls > 0 ? Math.round((totalClicks / totalUrls) * 100) : 0}%
                      </span>
                    </div>
                    <div className="relative w-full h-2 adaptive-progress-bg">
                      <div 
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full transition-all duration-1000 ease-out"
                        style={{ 
                          width: `${totalUrls > 0 ? Math.min((totalClicks / totalUrls) * 100, 100) : 0}%`,
                          boxShadow: '0 0 8px rgba(99, 102, 241, 0.6)'
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium transition-all duration-300 group-hover:text-green-500">Mobile Clicks</span>
                      <span className="text-sm font-medium transition-all duration-300 group-hover:text-green-500">68%</span>
                    </div>
                    <div className="relative w-full h-2 adaptive-progress-bg">
                      <div 
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-1000 ease-out"
                        style={{ 
                          width: '68%',
                          boxShadow: '0 0 8px rgba(56, 189, 248, 0.6)'
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium transition-all duration-300 group-hover:text-green-500">Desktop Clicks</span>
                      <span className="text-sm font-medium transition-all duration-300 group-hover:text-green-500">32%</span>
                    </div>
                    <div className="relative w-full h-2 adaptive-progress-bg">
                      <div 
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out"
                        style={{ 
                          width: '32%',
                          boxShadow: '0 0 8px rgba(217, 70, 239, 0.6)'
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium transition-all duration-300 group-hover:text-green-500">Link Availability</span>
                      <span className="text-sm font-medium transition-all duration-300 group-hover:text-green-500">100%</span>
                    </div>
                    <div className="relative w-full h-2 adaptive-progress-bg">
                      <div 
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-1000 ease-out animate-pulse"
                        style={{ 
                          width: '100%',
                          boxShadow: '0 0 8px rgba(52, 211, 153, 0.6)'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
});
