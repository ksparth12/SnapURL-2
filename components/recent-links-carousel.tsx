"use client";

import { useShortenedUrls } from "@/context/shortened-url-context";
import { motion } from "framer-motion";
import { 
  Card, 
  CardContent, 
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { ExternalLink, Copy, BarChart2, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

export function RecentLinksCarousel() {
  const { shortenedUrls, registerClick } = useShortenedUrls();
  const { toast } = useToast();
  const [urlToDelete, setUrlToDelete] = useState<string | null>(null);
  
  // Get the deleteShortenedUrl function from context
  const context = useShortenedUrls();
  const deleteShortenedUrl = (id: string) => {
    // Filter out the URL with the given ID
    const updatedUrls = shortenedUrls.filter(url => url.id !== id);
    
    // Update localStorage with the filtered array
    localStorage.setItem('shortenedUrls', JSON.stringify(updatedUrls));
    
    // Force a refresh of the component
    window.location.reload();
    
    toast({
      title: "Link deleted",
      description: "The shortened URL has been removed.",
    });
  };

  if (shortenedUrls.length === 0) {
    return null;
  }

  const copyToClipboard = (shortUrl: string) => {
    navigator.clipboard.writeText(`https://snap.ly/${shortUrl}`);
    toast({
      title: "Copied to clipboard!",
      description: "Your shortened URL is ready to share.",
    });
  };

  const handleLinkClick = (id: string, originalUrl: string) => {
    registerClick(id);
    // In a real app, we would redirect to the original URL
    window.open(originalUrl, "_blank");
  };

  return (
    <section className="container py-12">
      <div className="flex flex-col items-center justify-center mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold"
        >
          Your Recent Links
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground"
        >
          View and manage your recently shortened URLs
        </motion.p>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {shortenedUrls.map((url) => (
            <CarouselItem key={url.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
                className="h-full"
              >
                <Card className="h-full border-primary/10">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg truncate max-w-[200px]">
                        snap.ly/{url.shortCode}
                      </CardTitle>
                      <Badge variant="outline" className="ml-2">
                        {url.clicks} {url.clicks === 1 ? "click" : "clicks"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground truncate mb-2">
                      {url.originalUrl}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Created {formatDistanceToNow(url.createdAt, { addSuffix: true })}
                    </p>
                    {url.lastClicked && (
                      <p className="text-xs text-muted-foreground">
                        Last clicked {formatDistanceToNow(url.lastClicked, { addSuffix: true })}
                      </p>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between pt-0 flex-wrap gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => copyToClipboard(url.shortCode)}
                    >
                      <Copy className="h-4 w-4 mr-1" /> Copy
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLinkClick(url.id, url.originalUrl)}
                    >
                      <ExternalLink className="h-4 w-4 mr-1" /> Visit
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => setUrlToDelete(url.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete shortened URL?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your
                            shortened URL and remove it from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            className="bg-destructive hover:bg-destructive/90"
                            onClick={() => deleteShortenedUrl(url.id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardFooter>
                </Card>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center mt-8">
          <CarouselPrevious className="static transform-none mr-2" />
          <CarouselNext className="static transform-none" />
        </div>
      </Carousel>
    </section>
  );
}