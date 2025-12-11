"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import HeroSection from "./HeroSection"; // now SSR
const TrendingNames = dynamic(() => import("./TrendingNames"), { ssr: false });
const LatestStories = dynamic(() => import("./latestStories"), { ssr: false });
const SEOContentBlock = dynamic(() => import("./SeoContentBlock"), { ssr: false });

import { Button } from "@/components/ui/button";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" },
  }),
};

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
        <LatestStories />
        <SEOContentBlock />
      </main>
      
      {/* Footer is in layout.js, but can be added here if needed */}
    </>
  );
}