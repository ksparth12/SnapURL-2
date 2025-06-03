"use client";

import { motion } from "framer-motion";
import { Link2 } from "lucide-react";

export function AboutHero() {
  return (
    <section className="container py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-green-400 to-green-600 p-0.5"
          >
            <div className="w-full h-full rounded-full bg-background/90 flex items-center justify-center">
              <Link2 className="h-8 w-8 text-green-500" />
            </div>
          </motion.div>
        </div>
        
        <motion.h1 
          className="text-4xl font-extrabold tracking-tight text-center sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">SnapURL</span>
        </motion.h1>
        
        <motion.p 
          className="text-xl text-muted-foreground text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          A modern URL shortening service designed to make your links concise, 
          trackable, and easy to share.
        </motion.p>

        <motion.div
          className="space-y-10 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-card p-8 rounded-xl shadow-sm border">
            <h2 className="text-2xl font-bold mb-4">💻 Our Story</h2>
            <p className="text-muted-foreground">
              SnapURL was created with a simple mission: to make sharing links easier and more efficient.
              In today's fast-paced digital world, long URLs can be cumbersome and difficult to share.
              Our platform provides a streamlined solution that transforms lengthy web addresses into
              short, memorable links that are perfect for social media, messaging, and professional communications.
            </p>
          </div>

          <div className="bg-card p-8 rounded-xl shadow-sm border">
            <h2 className="text-2xl font-bold mb-4">🚀 What We Offer</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Quick and easy URL shortening with custom alias options</li>
              <li>Comprehensive analytics to track link performance</li>
              <li>Secure and reliable redirection services</li>
              <li>User-friendly dashboard to manage all your shortened links</li>
            </ul>
          </div>

          <div className="bg-card p-8 rounded-xl shadow-sm border">
            <h2 className="text-2xl font-bold mb-4">🔍 Our Vision</h2>
            <p className="text-muted-foreground">
              We're committed to continuous improvement and innovation in link management.
              Our vision is to become the go-to platform for anyone looking to share links
              efficiently while gaining valuable insights into their audience's engagement.
              As we grow, we'll continue to add features that make link sharing even more
              powerful and intuitive.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}