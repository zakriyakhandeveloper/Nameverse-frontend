/**
 * StructuredData Component
 * Generates JSON-LD structured data for SEO purposes
 */

import { getSiteUrl } from "@/lib/seo/site";

export default function StructuredData({ 
  organization = false, 
  website = false, 
  breadcrumbs = [], 
  collectionPage = null,
  person = null,
  aboutPage = null,
  faqPage = null,
}) {
  const siteUrl = getSiteUrl();
  
  // Organization Schema
  const organizationSchema = organization ? {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "NameVerse",
    "url": siteUrl,
    "logo": `${siteUrl}/logo.png`,
    "sameAs": [
      // Add social media URLs here if needed
    ]
  } : null;

  // Website Schema
  const websiteSchema = website ? {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "NameVerse",
    "url": siteUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteUrl}/search?query={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  } : null;

  // Breadcrumb Schema
  const breadcrumbSchema = breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  } : null;

  const personId = person?.url ? `${person.url}#person` : null;

  // Person (e.g. About page expert); @id links with AboutPage.mainEntity
  const personSchema = person
    ? {
        "@context": "https://schema.org",
        "@type": "Person",
        ...(personId ? { "@id": personId } : {}),
        name: person.name,
        jobTitle: person.jobTitle,
        description: person.description,
        url: person.url,
        sameAs: person.sameAs || [],
        knowsAbout: person.knowsAbout || [
          "Baby names",
          "Name meanings",
          "Islamic names",
          "Hindu names",
          "Christian names",
          "Multicultural naming",
        ],
        ...(person.contactPoint?.telephone
          ? {
              contactPoint: {
                "@type": "ContactPoint",
                telephone: person.contactPoint.telephone,
                contactType: person.contactPoint.contactType || "Professional Services",
                availableLanguage: person.contactPoint.availableLanguage || ["English"],
              },
            }
          : {}),
      }
    : null;

  const aboutPageSchema =
    aboutPage && personId
      ? {
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: aboutPage.name,
          description: aboutPage.description,
          url: aboutPage.url,
          isPartOf: {
            "@type": "WebSite",
            name: "NameVerse",
            url: siteUrl,
          },
          ...(aboutPage.primaryImage
            ? { primaryImageOfPage: { "@type": "ImageObject", url: aboutPage.primaryImage } }
            : {}),
          mainEntity: { "@id": personId },
        }
      : aboutPage && !person
        ? {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: aboutPage.name,
            description: aboutPage.description,
            url: aboutPage.url,
            isPartOf: {
              "@type": "WebSite",
              name: "NameVerse",
              url: siteUrl,
            },
            ...(aboutPage.primaryImage
              ? { primaryImageOfPage: { "@type": "ImageObject", url: aboutPage.primaryImage } }
              : {}),
          }
        : null;

  const faqSchema =
    faqPage?.items?.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqPage.items.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  // Collection Page Schema
  const collectionPageSchema = collectionPage ? {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": collectionPage.name,
    "description": collectionPage.description,
    "url": collectionPage.url,
    "isPartOf": {
      "@type": "WebSite",
      "name": "NameVerse",
      "url": siteUrl
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": (collectionPage.items || []).slice(0, 20).map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.title || item.name,
        "url": `${siteUrl}/${item.slug ? `blog/${item.slug}` : `names/${item._id}`}`
      }))
    }
  } : null;

  // Filter out null schemas
  const schemas = [
    organizationSchema,
    websiteSchema,
    breadcrumbSchema,
    collectionPageSchema,
    personSchema,
    aboutPageSchema,
    faqSchema,
  ].filter(Boolean);

  if (schemas.length === 0) {
    return null;
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}