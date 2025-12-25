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
              {
                "@type": "WebSite",
                "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.com'}/#website`,
                "url": process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.com',
                "name": "NameVerse - Baby Names with Meanings",
                "description": "60,000+ verified baby names from Islamic, Hindu & Christian traditions with meanings in English, Urdu, Arabic & Hindi",
                "publisher": {
                  "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.com'}/#organization`
                },
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.com'}/search?q={search_term_string}`
                  },
                  "query-input": "required name=search_term_string"
                }
              },
              {
                "@type": "Organization",
                "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.com'}/#organization`,
                "name": "NameVerse",
                "url": process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.com',
                "logo": {
                  "@type": "ImageObject",
                  "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.com'}/logo.png`,
                  "width": 200,
                  "height": 60
                },
                "sameAs": [
                  "https://www.facebook.com/nameverse",
                  "https://twitter.com/nameverse",
                  "https://www.instagram.com/nameverse"
                ]
              },
              {
                "@type": "WebPage",
                "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.com'}/#webpage`,
                "url": process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.com',
                "name": "60,000+ Baby Names with Meanings | Islamic, Hindu, Christian Names 2025",
                "isPartOf": {
                  "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.com'}/#website`
                },
                "about": {
                  "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.com'}/#organization`
                },
                "description": "Find 60,000+ baby names with meanings in English, Urdu, Arabic & Hindi. Explore Islamic, Hindu & Christian names with origins and pronunciation guides."
              },
              {
                "@type": "ItemList",
                "name": "Popular Baby Names Categories",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "item": {
                      "@type": "Thing",
                      "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.com'}/names/islamic`,
                      "name": "Islamic Baby Names",
                      "description": "25,000+ Islamic baby names with Quranic references and meanings in Urdu & Arabic"
                    }
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "item": {
                      "@type": "Thing",
                      "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.com'}/names/hindu`,
                      "name": "Hindu Baby Names",
                      "description": "20,000+ Hindu baby names from Sanskrit with meanings in Hindi & English"
                    }
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "item": {
                      "@type": "Thing",
                      "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.com'}/names/christian`,
                      "name": "Christian Baby Names",
                      "description": "15,000+ Christian baby names with Biblical references and meanings"
                    }
                  }
                ]
              },
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What are some Muslim names?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Popular Muslim names include Muhammad (praised one), Ali (exalted), Omar (long-lived), Aisha (living), Fatima (captivating), and Zara (princess). NameVerse features 25,000+ authentic Islamic baby names with Quranic references and meanings in Urdu and Arabic."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What do Muslim names mean?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Muslim names carry deep spiritual meanings rooted in Arabic language and Islamic tradition. They often reflect virtues like faith, wisdom, beauty, and strength. Each name on NameVerse is verified by Islamic scholars with complete meanings in English, Urdu, and Arabic, plus Quranic verse references where applicable."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How do Muslim names work?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Muslim naming traditionally includes a given name (ism), followed by father's name (nasab using 'ibn' or 'bint'), family name (nisba), and sometimes a descriptive name (kunyah like 'Abu' or 'Umm'). Modern Muslim parents often choose Quranic names or names with beautiful Arabic meanings for their children."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How many baby names does NameVerse have?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "NameVerse features over 60,000 verified baby names including 25,000+ Islamic names, 20,000+ Hindu names, and 15,000+ Christian names with complete meanings in multiple languages."
                    }
                  }
                ]
              },
              {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.com'
                  }
                ]
              }
            ],
          }),
        }}
      />

      <main
        role="main"
        className="min-h-screen flex flex-col items-center justify-start bg-white"
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

        {/* Comprehensive FAQ - Converted from hidden content */}
        <ComprehensiveFAQ />

        {/* Article Explorer - Blog preview */}
        <ArticleExplorer embedded />
      </main>

      {/* Footer is in layout.js, but can be added here if needed */}
    </>
  );
}
