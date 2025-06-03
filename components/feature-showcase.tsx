"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Zap, 
  BarChart, 
  Link2, 
  QrCode, 
  Palette, 
  TrendingUp 
} from "lucide-react";

import { memo } from "react";

// Using React.memo to prevent unnecessary re-renders
export const FeatureShowcase = memo(function FeatureShowcase() {
  const features = [
    {
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      title: "Instant Shortening",
      description: "Create short links in seconds with our lightning-fast shortening engine."
    },
    {
      icon: <BarChart className="h-8 w-8 text-blue-500" />,
      title: "Click Analytics",
      description: "Track performance with detailed analytics on who's clicking your links."
    },
    {
      icon: <Link2 className="h-8 w-8 text-purple-500" />,
      title: "Custom Aliases",
      description: "Create branded, memorable links with your own custom aliases."
    },
    {
      icon: <QrCode className="h-8 w-8 text-green-500" />,
      title: "QR Codes",
      description: "Instantly generate QR codes for your shortened links."
    },
    {
      icon: <Palette className="h-8 w-8 text-orange-500" />,
      title: "Beautiful Interface",
      description: "Enjoy our stunning, intuitive interface designed for productivity."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-red-500" />,
      title: "Usage Insights",
      description: "Gain valuable insights with comprehensive usage statistics."
    }
  ];

  // Optimized animation variants with simpler transitions
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05 // Reduced from 0.1 for faster appearance
      }
    }
  };

  const item = {
    hidden: { y: 10, opacity: 0 }, // Reduced y distance
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3 // Reduced from 0.5 for faster animation
      }
    }
  };

  return (
    <section className="container py-16 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Powerful Features
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Everything you need to create, share, and track your links
        </p>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }} // Simplified viewport options
      >
        {features.map((feature, index) => (
          <motion.div key={index} variants={item}>
            <Card className="h-full border-primary/10 transition-all duration-300 hover:border-green-500 hover:shadow-lg hover:shadow-green-500/20 hover:-translate-y-1 hover:scale-105 group">
              <CardHeader>
                <div className="mb-2 transform transition-transform duration-200 ease-out group-hover:scale-110">
                  {feature.icon}
                </div>
                <CardTitle className="transition-all duration-300 group-hover:text-green-600">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground transition-all duration-300 group-hover:text-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
});

// Pre-render feature icons to avoid re-creation on each render
const FeatureIcon = memo(({ children }: { children: React.ReactNode }) => {
  return <div className="mb-2 transform transition-transform duration-200 ease-out group-hover:scale-110">{children}</div>;
});