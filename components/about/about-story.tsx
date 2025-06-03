"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, memo } from "react";
import { throttle } from "@/lib/performance";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

// Using memo to prevent unnecessary re-renders
export const AboutStory = memo(function AboutStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  // Optimized scroll handling with fewer transform points
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
    // Using more efficient scroll measurement
    layoutEffect: false
  });
  
  // Simplified transforms with fewer keypoints
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]); // Reduced movement range
  
  const timelineItems = [
    {
      year: "2025",
      title: "SnapURL Founded",
      description:
        "Started with a simple idea: beautiful, memorable links that are easy to share."
    },
    {
      year: "2025",
      title: "Launch of Core Platform",
      description:
        "Released the first version of our platform with basic shortening capabilities."
    },
    {
      year: "2025",
      title: "Advanced Analytics",
      description:
        "Introduced comprehensive analytics to track link performance and audience insights."
    },
    {
      year: "2025",
      title: "QR Code Integration",
      description:
        "Added QR code generation to bridge digital and physical experiences."
    }
  ];

  return (
    <section className="py-16 md:py-24 adaptive-section-bg">
      <div className="container" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 10 }} // Reduced y distance
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }} // Added amount for better trigger timing
          transition={{ duration: 0.3 }} // Faster animation
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">Our Story</h2>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
            From inception to industry leadership, discover the journey that made SnapURL
            the premier link shortening service trusted by millions.
          </p>
        </motion.div>

        <motion.div
          style={{ opacity, y }}
          className="relative"
        >
          <div className="absolute left-1/2 -ml-px h-full w-[2px] bg-gray-600" />

          <div className="space-y-12 relative">
            {timelineItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }} // Reduced x distance
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }} // Better viewport trigger
                transition={{ duration: 0.3, delay: index * 0.05 }} // Faster animation, shorter delays
                className={`flex ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                } items-center group`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? "pr-10 text-right" : "pl-10"}`}>
                  <Card className="border-primary/20 adaptive-card transition-all duration-300 hover:border-green-500 hover:shadow-lg hover:shadow-green-500/20 hover:-translate-y-1 hover:scale-105">
                    <CardHeader>
                      <CardDescription className="text-sm text-gray-400">{item.year}</CardDescription>
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="relative flex h-6 w-6 items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-green-500 transition-all duration-300 group-hover:scale-150 group-hover:bg-green-400 group-hover:shadow-lg group-hover:shadow-green-500/50" />
                </div>
                <div className="w-1/2" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
});

// Memoized timeline item component for better performance
const TimelineItem = memo(({ item, index, isEven }: { item: any, index: number, isEven: boolean }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`flex ${isEven ? "flex-row" : "flex-row-reverse"} items-center group`}
    >
      <div className={`w-1/2 ${isEven ? "pr-10 text-right" : "pl-10"}`}>
        <Card className="border-primary/20 adaptive-card transition-all duration-300 hover:border-green-500 hover:shadow-lg hover:shadow-green-500/20 hover:-translate-y-1 hover:scale-105">
          <CardHeader>
            <CardDescription className="text-sm text-gray-400 transition-all duration-300 group-hover:text-green-400">{item.year}</CardDescription>
            <CardTitle className="text-xl transition-all duration-300 group-hover:text-green-500">{item.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 transition-all duration-300 group-hover:text-white">{item.description}</p>
          </CardContent>
        </Card>
      </div>
      <div className="relative flex h-6 w-6 items-center justify-center">
        <div className="h-3 w-3 rounded-full bg-green-500 transition-all duration-300 group-hover:scale-150 group-hover:bg-green-400 group-hover:shadow-lg group-hover:shadow-green-500/50" />
      </div>
      <div className="w-1/2" />
    </motion.div>
  );
});