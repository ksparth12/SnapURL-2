"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, ArrowRight } from "lucide-react";

export function ContactForm() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <Card className="border-none overflow-hidden adaptive-card">
        <CardHeader className="pb-8">
          <CardTitle className="text-2xl text-primary">Let's Connect Directly</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <p className="text-card-foreground">
              I prefer direct communication over contact forms. Feel free to reach out to me via email for any inquiries, project proposals, or just to say hello.
            </p>
            
            <div className="bg-card/80 border border-primary/30 p-6 rounded-lg flex flex-col items-center text-center space-y-4">
              <div className="rounded-full bg-muted p-3">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1 text-primary">Email Me Directly</h3>
                <p className="text-card-foreground mb-4">I typically respond within 24-48 hours</p>
                <Button asChild className="group bg-green-600 hover:bg-green-700 text-white">
                  <a href="mailto:ksparth12@gmail.com">
                    Email Now <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="font-medium mb-3 text-primary">What to include in your email:</h3>
              <ul className="list-disc list-inside space-y-2 text-card-foreground">
                <li>A brief introduction about yourself or your company</li>
                <li>Details about your project or inquiry</li>
                <li>Any relevant timeline or budget considerations</li>
                <li>How you found me and my work</li>
              </ul>
            </div>
            
            <div className="bg-card/80 border border-primary/30 p-4 rounded-lg mt-6">
              <p className="text-sm text-center text-primary">
                Looking forward to discussing how we can work together on your next project!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-none adaptive-card">
        <CardHeader>
          <CardTitle className="text-primary">Availability</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-primary/30">
              <span className="font-medium text-gray-800 dark:text-white">Current Status</span>
              <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-medium">
                Available for Work
              </span>
            </div>
            
            <div className="flex justify-between items-center pb-2 border-b border-primary/30">
              <span className="font-medium text-gray-800 dark:text-white">Response Time</span>
              <span className="text-card-foreground">24-48 hours</span>
            </div>
            
            <div className="flex justify-between items-center pb-2 border-b border-primary/30">
              <span className="font-medium text-gray-800 dark:text-white">Preferred Projects</span>
              <span className="text-card-foreground">Web Development, Full-Stack</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-800 dark:text-white">Remote Work</span>
              <span className="text-card-foreground">Yes</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}