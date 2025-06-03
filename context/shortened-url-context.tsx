"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export type ShortenedUrl = {
  id: string;
  originalUrl: string;
  shortCode: string;
  createdAt: number;
  clicks: number;
  lastClicked?: number;
  customAlias?: string;
};

interface ShortenedUrlContextProps {
  shortenedUrls: ShortenedUrl[];
  addShortenedUrl: (originalUrl: string, customAlias?: string) => ShortenedUrl;
  getShortenedUrl: (id: string) => ShortenedUrl | undefined;
  registerClick: (id: string) => void;
  totalUrls: number;
  totalClicks: number;
  clearShortenedUrls: () => void;
}

const ShortenedUrlContext = createContext<ShortenedUrlContextProps | undefined>(undefined);

export function ShortenedUrlProvider({ children }: { children: React.ReactNode }) {
  const [shortenedUrls, setShortenedUrls] = useState<ShortenedUrl[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const storedUrls = localStorage.getItem('shortenedUrls');
    if (storedUrls) {
      setShortenedUrls(JSON.parse(storedUrls));
    }
  }, []);

  // Save to localStorage whenever shortenedUrls changes
  useEffect(() => {
    if (isClient && shortenedUrls.length > 0) {
      localStorage.setItem('shortenedUrls', JSON.stringify(shortenedUrls));
    }
  }, [shortenedUrls, isClient]);

  // Generate a random short code
  const generateShortCode = (length = 6): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  // Add a new shortened URL
  const addShortenedUrl = (originalUrl: string, customAlias?: string): ShortenedUrl => {
    const shortCode = customAlias || generateShortCode();
    const newUrl: ShortenedUrl = {
      id: uuidv4(),
      originalUrl,
      shortCode,
      createdAt: Date.now(),
      clicks: 0,
      customAlias: customAlias || undefined,
    };
    
    setShortenedUrls((prev) => [newUrl, ...prev]);
    return newUrl;
  };

  // Get a specific shortened URL by ID
  const getShortenedUrl = (id: string): ShortenedUrl | undefined => {
    return shortenedUrls.find((url) => url.id === id);
  };

  // Register a click on a shortened URL
  const registerClick = (id: string): void => {
    setShortenedUrls((prev) =>
      prev.map((url) =>
        url.id === id
          ? { ...url, clicks: url.clicks + 1, lastClicked: Date.now() }
          : url
      )
    );
  };

  // Calculate total URLs and clicks
  const totalUrls = shortenedUrls.length;
  const totalClicks = shortenedUrls.reduce((acc, url) => acc + url.clicks, 0);

  // Clear all shortened URLs
  const clearShortenedUrls = (): void => {
    setShortenedUrls([]);
    if (isClient) {
      localStorage.removeItem('shortenedUrls');
    }
  };

  return (
    <ShortenedUrlContext.Provider
      value={{
        shortenedUrls,
        addShortenedUrl,
        getShortenedUrl,
        registerClick,
        totalUrls,
        totalClicks,
        clearShortenedUrls,
      }}
    >
      {children}
    </ShortenedUrlContext.Provider>
  );
}

export function useShortenedUrls() {
  const context = useContext(ShortenedUrlContext);
  if (context === undefined) {
    throw new Error('useShortenedUrls must be used within a ShortenedUrlProvider');
  }
  return context;
}