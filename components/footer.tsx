"use client";

import { motion } from "framer-motion";
import { Link2, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t py-8 bg-background">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center overflow-hidden"
            >
              <img src="/SnapURL.png" alt="SnapURL Logo" className="h-8" />
            </motion.div>
            <span className="font-bold">SnapURL</span>
          </div>
          
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm text-muted-foreground hover:text-green-600 transition-colors duration-200">
              Home
            </Link>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-green-600 transition-colors duration-200">
              About
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-green-600 transition-colors duration-200">
              Privacy
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <Link 
              href="https://github.com/ksparth12" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-green-600 transition-colors duration-200 hover:scale-110"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link 
              href="https://linkedin.com/in/ksparth128" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-green-600 transition-colors duration-200 hover:scale-110"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link 
              href="mailto:ksparth12@gmail.com" 
              className="text-muted-foreground hover:text-green-600 transition-colors duration-200 hover:scale-110"
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
          </div>
        </div>
        
        <div className="mt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} SnapURL. All rights reserved.
        </div>
      </div>
    </footer>
  );
}