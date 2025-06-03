"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

export function SocialLinks() {
  return (
    <div className="flex items-center space-x-4 mt-4 md:mt-0">
      <motion.a
        href="https://github.com/ksparth12"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -3, scale: 1.1 }}
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        <Github className="h-5 w-5" />
        <span className="sr-only">Github</span>
      </motion.a>
      <motion.a
        href="https://linkedin.com/in/ksparth128"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -3, scale: 1.1 }}
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        <Linkedin className="h-5 w-5" />
        <span className="sr-only">LinkedIn</span>
      </motion.a>
      <motion.a
        href="mailto:ksparth12@gmail.com"
        whileHover={{ y: -3, scale: 1.1 }}
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        <Mail className="h-5 w-5" />
        <span className="sr-only">Email</span>
      </motion.a>
    </div>
  );
}