"use client";

import { motion } from "framer-motion";
import { 
  Shield, 
  Lightbulb, 
  Users, 
  Zap,
  Smile
} from "lucide-react";
import { cn } from "@/lib/utils";
import { memo } from "react";
import { throttle } from "@/lib/performance";

// Using memo to prevent unnecessary re-renders
export const AboutValues = memo(function AboutValues() {
  const values = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Security & Trust",
      description: "We prioritize the security of our users' data and maintain trust through transparent practices."
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Innovation",
      description: "We constantly push the boundaries of what's possible in link shortening and analytics."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "User-Centric",
      description: "Our users' needs drive every decision we make, from feature development to customer support."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Performance",
      description: "We're obsessed with speed and reliability, ensuring our services perform flawlessly."
    },
    {
      icon: <Smile className="h-8 w-8" />,
      title: "Simplicity",
      description: "We believe in making complex things simple, creating intuitive experiences for everyone."
    }
  ];

  // Optimized animation variants
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
    hidden: { opacity: 0, y: 10 }, // Reduced y distance from 20 to 10
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3 // Reduced from 0.5 for faster animation
      }
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 10 }} // Reduced y distance
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }} // Added amount for better trigger timing
          transition={{ duration: 0.3 }} // Faster animation
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Values</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            These core principles guide everything we do at SnapURL, 
            from how we build our product to how we treat our users.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }} // Simplified viewport options
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card border border-primary/10 h-full transition-all duration-300 hover:border-green-500 hover:shadow-lg hover:shadow-green-500/20 hover:-translate-y-1 hover:scale-105 group">
                <div className={cn(
                  "rounded-full p-4 mb-4 transition-all duration-300 transform group-hover:scale-110 group-hover:shadow-md group-hover:shadow-green-500/20",
                  "bg-green-100/50 text-green-600 dark:bg-green-900/20 dark:text-green-400 group-hover:bg-green-200 group-hover:text-green-700"
                )}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 transition-all duration-300 group-hover:text-green-600">{value.title}</h3>
                <p className="text-muted-foreground transition-all duration-300 group-hover:text-foreground">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

// Memoized value card component for better performance
const ValueCard = memo(({ value, index }: { value: any, index: number }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.3 }
        }
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card border border-primary/10 h-full transition-all duration-300 hover:border-green-500 hover:shadow-lg hover:shadow-green-500/20 hover:-translate-y-1 hover:scale-105 group">
        <div className="rounded-full p-4 mb-4 transition-all duration-300 transform group-hover:scale-110 group-hover:shadow-md group-hover:shadow-green-500/20 bg-green-100/50 text-green-600 dark:bg-green-900/20 dark:text-green-400 group-hover:bg-green-200 group-hover:text-green-700">
          {value.icon}
        </div>
        <h3 className="text-xl font-bold mb-2 transition-all duration-300 group-hover:text-green-600">{value.title}</h3>
        <p className="text-muted-foreground transition-all duration-300 group-hover:text-foreground">{value.description}</p>
      </div>
    </motion.div>
  );
});