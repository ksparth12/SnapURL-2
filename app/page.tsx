import { HeroSection } from '@/components/hero-section';
import { ShortenUrlForm } from '@/components/shorten-url-form';
import { FeatureShowcase } from '@/components/feature-showcase';
import { StatsSection } from '@/components/stats-section';
import { RecentLinksCarousel } from '@/components/recent-links-carousel';

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full">
      <HeroSection />
      <ShortenUrlForm />
      <RecentLinksCarousel />
      <FeatureShowcase />
      <StatsSection />
    </div>
  );
}