"use client";

import { motion } from "framer-motion";
import { Link2 } from "lucide-react";

export function ContactHero() {
  return (
    <section className="w-full relative overflow-hidden py-16 md:py-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/50 z-10"></div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent"></div>
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-green-500/30 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-emerald-500/30 blur-3xl"></div>
      </div>
      
      {/* Content */}
      <div className="container relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 p-0.5"
            >
              <div className="w-full h-full rounded-full bg-background/90 flex items-center justify-center">
                <Link2 className="h-8 w-8 text-green-500" />
              </div>
            </motion.div>
          </div>
          
          <motion.h1 
            className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">Touch</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Have a question or want to work together? I'd love to hear from you!
          </motion.p>
          
          <motion.div 
            className="mt-8 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="inline-flex items-center rounded-full border px-4 py-1.5 bg-background/80 backdrop-blur-sm">
              <span className="flex items-center text-sm">
                <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
                Currently available for new opportunities
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}