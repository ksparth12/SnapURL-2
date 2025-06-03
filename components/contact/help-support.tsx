"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, MessageSquare, FileText, Youtube } from "lucide-react";

export function HelpSupport() {
  const supportOptions = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Knowledge Base",
      description: "Browse our comprehensive guides and tutorials",
      action: "Explore Documentation",
      link: "#"
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Live Chat Support",
      description: "Get instant help from our support team",
      action: "Start Chat",
      link: "#"
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Submit a Ticket",
      description: "Open a support ticket for complex issues",
      action: "Submit Ticket",
      link: "#"
    },
    {
      icon: <Youtube className="h-6 w-6" />,
      title: "Video Tutorials",
      description: "Watch step-by-step video guides",
      action: "Watch Videos",
      link: "#"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="bg-muted/50 py-16 md:py-24 w-full">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Help & Support
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            We're here to help you get the most out of SnapURL.
            Choose from our support options below.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {supportOptions.map((option, index) => (
            <motion.div key={index} variants={item}>
              <Card className="h-full border-primary/10 transition-all duration-300 hover:shadow-md">
                <CardHeader>
                  <div className="rounded-full w-12 h-12 bg-primary/10 flex items-center justify-center text-primary mb-4">
                    {option.icon}
                  </div>
                  <CardTitle>{option.title}</CardTitle>
                  <CardDescription>{option.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full">
                    <a href={option.link}>{option.action}</a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-6">
            Can't find what you're looking for? Our team is just an email away.
          </p>
          <Button asChild size="lg">
            <a href="mailto:support@snapurl.com">Contact Support Team</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}