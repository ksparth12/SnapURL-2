"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";

export function AboutTechnology() {
  const technologies = [
    { name: "Next.js", progress: 98 },
    { name: "React", progress: 95 },
    { name: "TypeScript", progress: 92 },
    { name: "Tailwind CSS", progress: 96 },
    { name: "Framer Motion", progress: 90 },
  ];
  
  const tabContent = [
    {
      title: "Frontend",
      content: "Our frontend stack is built on Next.js and React, leveraging TypeScript for type safety and Tailwind CSS for beautiful, responsive designs. We use Framer Motion to create smooth, elegant animations that delight our users."
    },
    {
      title: "Backend",
      content: "Our backend services are built with Node.js and Express, with a PostgreSQL database for reliable data storage. We use Redis for caching to ensure lightning-fast response times for all API requests."
    },
    {
      title: "Analytics",
      content: "Our analytics platform is powered by a combination of real-time data processing using Kafka and batch processing with Spark. We use Tableau and custom dashboards to visualize data and extract meaningful insights."
    }
  ];

  return (
    <section className="container py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Powered by Modern Technology
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          We leverage cutting-edge technologies to create a fast, reliable, and beautiful 
          link shortening experience for our users.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold mb-8">Our Tech Stack</h3>
          <div className="space-y-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex justify-between">
                  <span className="font-medium">{tech.name}</span>
                  <span>{tech.progress}%</span>
                </div>
                <Progress value={tech.progress} className="h-2" />
              </motion.div>
            ))}
          </div>
          <div className="mt-10">
            <Button className="h-12 px-8">Join Our Tech Team</Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs defaultValue="Frontend">
            <TabsList className="grid w-full grid-cols-3">
              {tabContent.map((tab) => (
                <TabsTrigger key={tab.title} value={tab.title}>
                  {tab.title}
                </TabsTrigger>
              ))}
            </TabsList>
            {tabContent.map((tab) => (
              <TabsContent key={tab.title} value={tab.title} className="mt-6">
                <div className="rounded-lg border p-6 bg-card">
                  <h4 className="text-xl font-semibold mb-4">{tab.title} Technology</h4>
                  <p className="text-muted-foreground">{tab.content}</p>
                  <div className="mt-6">
                    <Button variant="outline">Learn More</Button>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}