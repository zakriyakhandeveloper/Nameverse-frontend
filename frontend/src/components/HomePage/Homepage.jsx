"use client";

import HeroSection from "./HeroSection";
import AlphabetNavigation from "./AlphabetNavigation";
import PopularNamesSection from "./PopularNamesSection";
import TrendingNames from "./TrendingNames";
import WhyChooseSection from "./WhyChooseSection";
import SEOContentBlock from "./SeoContentBlock";
import ComprehensiveFAQ from "./ComprehensiveFAQ";
import ArticleExplorer from "./latestStories";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePageClient() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Preload main hero image for faster LCP */}
      <link rel="preload" as="image" href="/images/hero.jpg" />

      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              /* WebSite, Organization, BreadcrumbList, Article, FAQ, etc. */
            ],
          }),
        }}
      />

      <main
        role="main"
        className="min-h-screen flex flex-col items-center justify-start bg-gray-50"
      >
        {/* HeroSection - Above the fold */}
        <HeroSection />

        {/* A-Z Alphabetical Navigation - Critical for SEO */}
        <AlphabetNavigation />

        {/* Popular Names Section - Trending content */}
        <PopularNamesSection />

        {/* Trending Names - Existing component */}
        <TrendingNames />

        {/* Why Choose NameVerse - Trust building */}
        <WhyChooseSection />

        {/* SEO Content Block - Cultural importance */}
        <SEOContentBlock />

        {/* Comprehensive FAQ - Converted from hidden content */}
        <ComprehensiveFAQ />

        {/* Article Explorer - Blog preview */}
        <ArticleExplorer embedded />
      </main>

      {/* Footer is in layout.js, but can be added here if needed */}
    </>
  );
}
