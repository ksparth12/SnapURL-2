"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Phone, Github, Linkedin, Code, Database, Layers } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export function ContactInfo() {
  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      value: "ksparth12@gmail.com",
      link: "mailto:ksparth12@gmail.com"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Location",
      value: "Chandigarh University",
      link: "https://maps.google.com/?q=Chandigarh+University"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone",
      value: "Available on request",
      link: "#"
    }
  ];

  const socialLinks = [
    {
      icon: <Github className="h-5 w-5" />,
      title: "GitHub",
      value: "github.com/parthsharma",
      link: "https://github.com/parthsharma"
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      title: "LinkedIn",
      value: "linkedin.com/in/parthsharma",
      link: "https://linkedin.com/in/parthsharma"
    }
  ];

  const skillCategories = [
    {
      icon: <Code className="h-5 w-5" />,
      title: "Frontend",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS"]
    },
    {
      icon: <Database className="h-5 w-5" />,
      title: "Backend",
      skills: ["Node.js", "Express", "MongoDB", "SQL", "Firebase"]
    },
    {
      icon: <Layers className="h-5 w-5" />,
      title: "Other Skills",
      skills: ["Git", "Docker", "AWS", "CI/CD", "Agile", "Data Structures"]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
        <div className="grid grid-cols-1 gap-4">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden adaptive-card">
                <CardContent className="p-4 flex items-center">
                  <div className="rounded-full bg-gray-100 dark:bg-black/80 p-3 mr-4">
                    <span className="text-green-500">{info.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-green-400">{info.title}</h3>
                    <a
                      href={info.link}
                      className="font-medium text-gray-800 dark:text-white hover:text-green-400 transition-colors"
                      target={info.link.startsWith("http") ? "_blank" : undefined}
                      rel={info.link.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {info.value}
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Connect With Me</h2>
        <div className="grid grid-cols-1 gap-4">
          {socialLinks.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-md transition-all duration-300 adaptive-card">
                <CardContent className="p-4 flex items-center">
                  <div className="rounded-full bg-gray-100 dark:bg-black/80 p-3 mr-4">
                    <span className="text-green-500">{info.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-green-400">{info.title}</h3>
                    <a
                      href={info.link}
                      className="font-medium text-gray-800 dark:text-white hover:text-green-400 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {info.value}
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-6">My Skills</h2>
        <div className="grid grid-cols-1 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-md transition-all duration-300 adaptive-card">
                <CardContent className="p-4">
                  <div className="flex items-center mb-4">
                    <div className="rounded-full bg-gray-100 dark:bg-black/80 p-2 mr-3">
                      <span className="text-green-500">{category.icon}</span>
                    </div>
                    <h3 className="font-medium text-green-400">{category.title}</h3>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {category.skills.map((skill, i) => (
                      <Badge key={i} className="adaptive-tag">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
