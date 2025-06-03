"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export function AboutMission() {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="container py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Our Mission & Vision
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          We're dedicated to simplifying the way people share information online, 
          making the web more accessible and user-friendly for everyone.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="h-full overflow-hidden border-primary/20 transition-all duration-300 hover:shadow-lg">
            <CardContent className="p-0">
              <div className="bg-gradient-to-br from-green-500/90 to-green-700/90 p-8 text-primary-foreground h-[200px] flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-primary-foreground/90">
                  To empower individuals and businesses by transforming complex web addresses 
                  into short, memorable links that enhance online communication and engagement.
                </p>
              </div>
              <div className="p-8">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="mr-3 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3 text-primary"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <span>
                      Make link sharing simpler and more effective for everyone
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3 text-primary"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <span>
                      Provide valuable insights through comprehensive analytics
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3 text-primary"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <span>
                      Bridge the gap between digital and physical experiences with QR codes
                    </span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="h-full overflow-hidden border-primary/20 transition-all duration-300 hover:shadow-lg">
            <CardContent className="p-0">
              <div className="bg-gradient-to-br from-green-700/90 to-green-500/90 p-8 text-primary-foreground h-[200px] flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-primary-foreground/90">
                  To create a world where sharing online content is seamless, 
                  analytics are accessible, and everyone can leverage the power of shorter links.
                </p>
              </div>
              <div className="p-8">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="mr-3 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3 text-primary"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <span>
                      Become the global standard for link shortening and management
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3 text-primary"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <span>
                      Continuously innovate and improve the link sharing experience
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3 text-primary"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <span>
                      Empower marketers and content creators with powerful insights
                    </span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}