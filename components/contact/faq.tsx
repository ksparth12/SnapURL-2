"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function Faq() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const faqs = [
    {
      question: "What is SnapURL?",
      answer: "SnapURL is a link shortening service that allows you to create short, memorable links from long URLs. It also provides analytics and QR code generation features."
    },
    {
      question: "Is SnapURL free to use?",
      answer: "Yes, SnapURL offers a free tier that includes basic link shortening features. We also offer premium plans with advanced analytics and custom branding options."
    },
    {
      question: "How do I create a shortened link?",
      answer: "Simply paste your long URL into the input field on our homepage, click 'Shorten Now', and we'll generate a short link for you instantly. You can also customize the short link if you prefer."
    },
    {
      question: "Are the shortened links permanent?",
      answer: "Yes, once created, your shortened links will work permanently. We ensure that your links remain active and redirect to the original URL as long as our service is operating."
    },
    {
      question: "Can I track clicks on my shortened links?",
      answer: "Absolutely! SnapURL provides analytics for all shortened links, allowing you to track clicks, geographic data, and referral sources."
    },
    {
      question: "How do I create custom shortened links?",
      answer: "When shortening a URL, toggle the 'Use custom alias' option and enter your preferred alias. If it's available, your link will be created with that custom ending."
    },
    {
      question: "Are there any restrictions on what links I can shorten?",
      answer: "We prohibit shortening links to harmful, illegal, or malicious content. Please review our Terms of Service for full details on usage restrictions."
    },
    {
      question: "How do I generate a QR code for my link?",
      answer: "QR codes are automatically generated for all shortened links. After shortening a URL, you'll see the QR code displayed alongside your shortened link."
    }
  ];
  
  // Filter FAQs based on search query
  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <section className="container py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Frequently Asked Questions
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Got questions? We've got answers. If you can't find what you're looking for,
          feel free to contact our support team.
        </p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="max-w-3xl mx-auto mb-10"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for answers..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="max-w-3xl mx-auto"
      >
        <AnimatePresence>
          {filteredFaqs.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <AccordionItem value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground">
                No results found for "{searchQuery}". Try a different search term or
                contact our support team for assistance.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}