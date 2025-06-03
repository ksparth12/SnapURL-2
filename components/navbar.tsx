"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link2, Menu, Home, Info, Mail } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/", label: "Home", icon: 'home' },
    { href: "/about", label: "About", icon: 'info' },
    { href: "/contact", label: "Contact", icon: 'mail' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/20 dark:bg-black/80 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-lg dark:shadow-neutral-900/50">
      <div className="flex h-20 items-center justify-between w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 max-w-[1920px] mx-auto">
        <Link href="/" className="flex items-center space-x-2 group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="logo-hover relative flex items-center justify-center transition-all duration-200"
          >
            <div className="relative overflow-hidden rounded-xl p-1">
              <Image 
                src="/SnapURL.png" 
                alt="SnapURL Logo" 
                width={120} 
                height={40} 
                className="object-contain"
                priority
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-green-700/10 rounded-xl relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              />
            </div>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex gap-6 bg-green-50/30 dark:bg-green-950/20 px-6 py-2 rounded-full shadow-inner border border-green-100/30 dark:border-green-900/30">
            {links.map(({ href, label, icon }) => {
              const IconComponent = icon === 'home' ? Home : icon === 'info' ? Info : Mail;
              return (
                <NavigationMenuItem key={href}>
                  <NavigationMenuLink asChild>
                    <Link
                      key={href}
                      href={href}
                      className={cn(
                        "relative flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-300 hover:text-green-600 rounded-full",
                        pathname === href
                          ? "text-green-600 bg-green-100/50 dark:bg-green-900/30 shadow-sm"
                          : "text-foreground/70 hover:bg-green-50/50 dark:hover:bg-green-900/20"
                      )}
                    >
                      <IconComponent className={cn("h-4 w-4 transition-all", pathname === href ? "text-green-600" : "text-foreground/60 group-hover:text-green-600")} />
                      <span>{label}</span>
                      {pathname === href && (
                        <motion.div 
                          className="absolute bottom-0 left-0 right-0 mx-auto h-1 w-1 rounded-full bg-green-600"
                          layoutId="navIndicator"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center">
          <div className="bg-green-50/30 dark:bg-green-950/20 p-2 rounded-full shadow-inner border border-green-100/30 dark:border-green-900/30">
            <ThemeToggle />
          </div>
          
          {/* Mobile Navigation */}
        {/* Theme toggle is already included via the ThemeToggle component */}

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-green-600 hover:text-green-700 hover:bg-green-100/20 rounded-full p-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px] dark:bg-black/95 border-l border-border/30 pr-0">
              <div className="flex items-center gap-3 mb-8 mt-4">
                <div className="flex items-center justify-center">
                  <div className="relative overflow-hidden rounded-xl p-1">
                    <Image 
                      src="/SnapURL.png" 
                      alt="SnapURL Logo" 
                      width={100} 
                      height={35} 
                      className="object-contain"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-green-700/10 rounded-xl" />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-6 mt-8 border-b border-border/30 pb-4">
                <h3 className="text-sm font-medium text-muted-foreground">Navigation</h3>
              </div>
              
              <nav className="flex flex-col gap-2">
                {links.map(({ href, label }) => (
                  <Link 
                    key={href} 
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "card-hover px-4 py-3 text-base font-medium rounded-lg transition-all duration-300 flex items-center gap-3 hover:translate-x-1",
                      pathname === href 
                        ? "bg-green-100/50 dark:bg-green-900/30 text-green-600 shadow-sm" 
                        : "hover:bg-green-50/50 dark:hover:bg-green-900/20"
                    )}
                  >
                    {label}
                    <div className="ml-auto opacity-70">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </Link>
                ))}
              </nav>
              
              <div className="absolute bottom-0 left-0 right-0 p-6">

                <div className="rounded-lg border border-border/50 bg-green-50/20 dark:bg-green-950/20 p-4 shadow-sm">
                  <h4 className="mb-2 text-sm font-semibold">Need help?</h4>
                  <p className="mb-3 text-xs text-muted-foreground">Contact our support team for assistance with your URL shortening needs.</p>
                  <Button variant="default" size="sm" className="w-full btn-hover bg-gradient-to-r from-green-600 to-green-700 text-white hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300">
                    Contact Support
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}