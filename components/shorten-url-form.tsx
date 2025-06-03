"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check, Sparkles, Wand2, Palette, Link as LinkIcon, Share2, Smartphone, Globe, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";

export function ShortenUrlForm() {
  const { toast } = useToast();
  const [brandName, setBrandName] = useState("mybrand");
  const [domain, setDomain] = useState("snap.ly");
  const [urlPath, setUrlPath] = useState("welcome");
  const [theme, setTheme] = useState("green");
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("customize");
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const [qrEnabled, setQrEnabled] = useState(false);
  const [brandingOption, setBrandingOption] = useState("standard");

  // Theme colors
  const themes = {
    green: { primary: "bg-green-500", secondary: "bg-green-400", text: "text-green-500" },
    blue: { primary: "bg-blue-500", secondary: "bg-blue-400", text: "text-blue-500" },
    purple: { primary: "bg-purple-500", secondary: "bg-purple-400", text: "text-purple-500" },
    pink: { primary: "bg-pink-500", secondary: "bg-pink-400", text: "text-pink-500" },
    amber: { primary: "bg-amber-500", secondary: "bg-amber-400", text: "text-amber-500" },
  };

  // Domains
  const domains = ["snap.ly", "shrt.link", "tiny.url", "go.link", "click.me"];

  const getFullUrl = () => {
    return `${domain}/${brandName}/${urlPath}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getFullUrl());
    setCopied(true);
    
    toast({
      title: "Copied to clipboard!",
      description: "Your branded URL is ready to share.",
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    toast({
      title: "Brand settings saved!",
      description: "Your custom URL brand has been created.",
    });
  };

  return (
    <div id="url-shortener-box" className="container py-4 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-3xl mx-auto"
      >
        <Card className="backdrop-blur-xl bg-background/60 shadow-2xl border-primary/20 overflow-hidden">
          <CardContent className="p-3 sm:p-4 md:p-5 lg:p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center mb-3"
            >
              <div className="relative">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 360, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className={`absolute -inset-4 ${themes[theme as keyof typeof themes].primary} rounded-full opacity-20 blur-xl`}
                />
                <Share2 className={`h-12 w-12 ${themes[theme as keyof typeof themes].text} relative`} />
              </div>
            </motion.div>

            <h2 className="text-xl font-bold text-center mb-3">
              <span className={themes[theme as keyof typeof themes].text}>Brand</span> Your Short Links
              <p className="text-sm font-normal text-muted-foreground mt-1">Create custom branded links that reflect your identity</p>
            </h2>

            <Tabs defaultValue="customize" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4 p-1 h-12">
                <TabsTrigger value="customize" className="text-base h-full flex items-center justify-center">
                  <Wand2 className="mr-2 h-4 w-4" /> Customize
                </TabsTrigger>
                <TabsTrigger value="preview" className="text-base h-full flex items-center justify-center">
                  <Globe className="mr-2 h-4 w-4" /> Preview
                </TabsTrigger>
              </TabsList>

              <TabsContent value="customize" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="brand-name" className="text-base font-medium mb-2 block">
                      Brand Name
                    </Label>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="relative group"
                    >
                      <div className={`absolute -inset-0.5 ${themes[theme as keyof typeof themes].primary} rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-1000`}></div>
                      <Input
                        id="brand-name"
                        type="text"
                        placeholder="mybrand"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value.replace(/\s+/g, '').toLowerCase())}
                        className="h-12 text-base relative bg-background/80"
                      />
                    </motion.div>
                  </div>

                  <div>
                    <Label htmlFor="domain" className="text-base font-medium mb-2 block">
                      Domain
                    </Label>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                      {domains.map((d) => (
                        <Button
                          key={d}
                          type="button"
                          variant={domain === d ? "default" : "outline"}
                          className={cn(
                            "h-10 px-3 transition-all",
                            domain === d && themes[theme as keyof typeof themes].primary
                          )}
                          onClick={() => setDomain(d)}
                        >
                          {d}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="url-path" className="text-base font-medium mb-2 block">
                      Default Path
                    </Label>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="relative group"
                    >
                      <div className={`absolute -inset-0.5 ${themes[theme as keyof typeof themes].primary} rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-1000`}></div>
                      <Input
                        id="url-path"
                        type="text"
                        placeholder="welcome"
                        value={urlPath}
                        onChange={(e) => setUrlPath(e.target.value.replace(/\s+/g, '-').toLowerCase())}
                        className="h-12 text-base relative bg-background/80"
                      />
                    </motion.div>
                  </div>

                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-base font-medium mb-2 block">
                      Brand Color
                    </Label>
                    <div className="flex space-x-4">
                      {Object.keys(themes).map((t) => (
                        <button
                          key={t}
                          type="button"
                          className={cn(
                            `w-12 h-12 rounded-full ${themes[t as keyof typeof themes].primary} transition-all duration-300 shadow-md hover:shadow-lg`,
                            theme === t ? "ring-2 ring-offset-4 ring-offset-background ring-primary scale-110" : ""
                          )}
                          onClick={() => setTheme(t)}
                          aria-label={`${t} theme`}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-medium mb-2 block">
                      URL Branding Options
                    </Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant={brandingOption === "standard" ? "default" : "outline"}
                        className={cn(
                          "transition-all h-12 flex flex-col items-center justify-center px-2",
                          brandingOption === "standard" && themes[theme as keyof typeof themes].primary
                        )}
                        onClick={() => setBrandingOption("standard")}
                      >
                        <LinkIcon className="h-5 w-5 mb-1" />
                        <span className="text-xs">Standard</span>
                      </Button>
                      <Button
                        variant={brandingOption === "branded" ? "default" : "outline"}
                        className={cn(
                          "transition-all h-12 flex flex-col items-center justify-center px-2",
                          brandingOption === "branded" && themes[theme as keyof typeof themes].primary
                        )}
                        onClick={() => setBrandingOption("branded")}
                      >
                        <Bookmark className="h-5 w-5 mb-1" />
                        <span className="text-xs">Branded</span>
                      </Button>
                      <Button
                        variant={brandingOption === "qr" ? "default" : "outline"}
                        className={cn(
                          "transition-all h-12 flex flex-col items-center justify-center px-2",
                          brandingOption === "qr" && themes[theme as keyof typeof themes].primary
                        )}
                        onClick={() => setBrandingOption("qr")}
                      >
                        <svg 
                          className="h-5 w-5 mb-1" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                          <rect x="7" y="7" width="3" height="3"></rect>
                          <rect x="14" y="7" width="3" height="3"></rect>
                          <rect x="7" y="14" width="3" height="3"></rect>
                          <rect x="14" y="14" width="3" height="3"></rect>
                        </svg>
                        <span className="text-xs">QR Code</span>
                      </Button>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className="pt-2"
                    >
                      <Button
                        type="button"
                        size="lg"
                        className={`w-full h-12 text-base font-medium rounded-xl shadow-lg transition-all duration-300 ${themes[theme as keyof typeof themes].primary} hover:shadow-[0_0_15px_rgba(34,197,94,0.5)] dark:hover:shadow-[0_0_15px_rgba(34,197,94,0.3)]`}
                        onClick={handleSave}
                      >
                        <Bookmark className="mr-2 h-4 w-4" />
                        Save Brand Settings
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="preview" className="space-y-4">
                <div className="flex justify-center space-x-4 mb-5">
                    <Button
                      variant={previewMode === "desktop" ? "default" : "outline"}
                      size="lg"
                      className={cn(
                        "transition-all px-6",
                        previewMode === "desktop" && themes[theme as keyof typeof themes].primary
                      )}
                      onClick={() => setPreviewMode("desktop")}
                    >
                      <Globe className="mr-2 h-5 w-5" /> Desktop
                    </Button>
                    <Button
                      variant={previewMode === "mobile" ? "default" : "outline"}
                      size="lg"
                      className={cn(
                        "transition-all px-6",
                        previewMode === "mobile" && themes[theme as keyof typeof themes].primary
                      )}
                      onClick={() => setPreviewMode("mobile")}
                    >
                      <Smartphone className="mr-2 h-5 w-5" /> Mobile
                    </Button>
                </div>

                <div className="flex justify-center">
                  <motion.div
                    className={cn(
                      "border rounded-xl overflow-hidden shadow-xl",
                      previewMode === "desktop" ? "w-full max-w-2xl" : "w-64"
                    )}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ 
                      scale: 1, 
                      opacity: 1,
                      y: brandingOption === "qr" ? [0, -5, 0] : 0
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    <div className={`${themes[theme as keyof typeof themes].primary} p-3 md:p-4 text-white`}>
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full ${themes[theme as keyof typeof themes].secondary} flex items-center justify-center mr-3 shadow-inner`}>
                          <span className="font-bold">{brandName.substring(0, 1).toUpperCase()}</span>
                        </div>
                        <span className="font-bold">{brandName}</span>
                      </div>
                    </div>
                    <div className="bg-background p-4 md:p-6">
                      <div className="bg-muted/30 rounded-lg p-3 md:p-4 mb-4 shadow-inner">
                        <p className="text-sm text-muted-foreground mb-2">Your branded short URL:</p>
                        <p className={`${themes[theme as keyof typeof themes].text} font-bold text-lg md:text-xl break-all`}>
                          {getFullUrl()}
                        </p>
                      </div>
                      <div className="space-y-4">
                        <div className="h-5 bg-muted/30 rounded-full w-full animate-pulse"></div>
                        <div className="h-5 bg-muted/30 rounded-full w-4/5 animate-pulse delay-100"></div>
                        <div className="h-5 bg-muted/30 rounded-full w-5/6 animate-pulse delay-200"></div>
                        <div className="flex space-x-2 mt-6">
                          <div className="h-8 w-8 bg-muted/40 rounded-full"></div>
                          <div className="h-8 w-8 bg-muted/40 rounded-full"></div>
                          <div className="h-8 w-8 bg-muted/40 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="pt-4"
                >
                  <Button
                    type="button"
                    size="lg"
                    className={`w-full h-12 text-base font-medium rounded-xl shadow-lg transition-all duration-300 ${themes[theme as keyof typeof themes].primary} hover:shadow-[0_0_15px_rgba(34,197,94,0.5)] dark:hover:shadow-[0_0_15px_rgba(34,197,94,0.3)]`}
                    onClick={copyToClipboard}
                  >
                    {copied ? (
                      <>
                        <Check className="mr-2 h-4 w-4" /> Copied to Clipboard
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" /> Copy Branded URL
                      </>
                    )}
                  </Button>
                </motion.div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}