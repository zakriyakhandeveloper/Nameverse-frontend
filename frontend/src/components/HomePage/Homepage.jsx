"use client";

import HeroSection from "./HeroSection";
import TrendingNames from "./TrendingNames";
import SEOContentBlock from "./SeoContentBlock";
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
        {/* HeroSection is now SSR for instant LCP */}
        <HeroSection />

        {/* Below-the-fold content loaded client-side */}
        <TrendingNames />
        <ArticleExplorer embedded />
        <SEOContentBlock />
      </main>
      
      {/* Footer is in layout.js, but can be added here if needed */}
    </>
  );
}
