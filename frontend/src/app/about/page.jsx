import PageLayout from '@/components/Layout/PageLayout';
import StructuredData from '@/components/SEO/StructuredData';
import { env } from '@/config/env';

const SITE_URL = env.site.url;

export const metadata = {
  title: "About Zakriya Khan - Name Meanings Expert & Cultural Consultant",
  description: "Meet Zakriya Khan - Expert in name meanings, cultural heritage, and spiritual significance. Discover the stories behind names with personalized insights and professional consultation.",
  keywords: [
    "Zakriya Khan",
    "name meanings expert",
    "baby names consultant",
    "cultural heritage names",
    "spiritual baby names",
    "Islamic names guidance",
    "Quranic naming",
    "Hindu Sanskrit names",
    "Christian biblical names",
    "Urdu name meanings",
    "multicultural naming",
    "NameVerse about",
  ],
  openGraph: {
    title: "About Zakriya Khan - Name Meanings Expert & Cultural Consultant",
    description: "Meet Zakriya Khan - Expert in name meanings, cultural heritage, and spiritual significance.",
    url: `${SITE_URL}/about`,
    type: 'website',
    images: [{
      url: `${SITE_URL}/og-image.png`,
      width: 1200,
      height: 630,
      alt: 'About Zakriya Khan'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: "About Zakriya Khan - Name Meanings Expert",
    description: "Expert in name meanings, cultural heritage, and spiritual significance.",
    images: [`${SITE_URL}/og-image.png`],
  },
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
};

const personData = {
  name: "Zakriya Khan",
  jobTitle: "Name Meanings Expert & Cultural Consultant",
  description: "Professional consultant specializing in name meanings, cultural heritage, and spiritual significance",
  url: `${SITE_URL}/about`,
  sameAs: ["https://www.linkedin.com/in/zakriya-khan-a6321a390/"],
  contactPoint: {
    telephone: "+92-349-7174815",
    contactType: "Professional Services",
    availableLanguage: ["English", "Urdu", "Arabic"],
  },
};

const seoThemes = [
  "islamic baby names with meanings",
  "hindu baby names with spiritual significance",
  "christian and biblical baby names",
  "urdu names and arabic name origins",
  "modern baby names and timeless classics",
  "name pronunciation and spelling guidance",
  "multicultural family naming decisions",
  "name compatibility with surname",
  "baby naming consultation online",
  "authentic name meaning research",
];

const seoAngleSentences = [
  "Families searching for the best baby names often want more than a list; they want context, pronunciation clarity, emotional resonance, and cultural confidence before making a lifelong decision.",
  "A meaningful baby name can connect a child to language, faith, ancestry, and family values, which is why deep research matters when selecting names for boys and girls.",
  "When parents compare modern and traditional names, they usually balance uniqueness with familiarity, and this practical balance helps children feel both distinctive and understood.",
  "NameVerse focuses on credible, practical, and parent-friendly guidance so families can confidently choose names that feel beautiful today and remain strong for decades.",
  "A complete naming guide includes origin, meaning, correct pronunciation, possible nicknames, and how the full name sounds with siblings and family surname.",
  "Strong SEO writing about baby names should still be useful, and that means every paragraph should answer a real question families ask during pregnancy and early parenting.",
  "Our about page is designed for parents who want faith-based, culture-aware, and globally readable naming advice without confusion, hype, or shallow recommendations.",
  "From Islamic names to Hindu names to Christian names and global options, careful explanation helps families avoid regrets and choose names with purpose and joy.",
  "Parents also care about practical concerns such as initials, spelling in official documents, bilingual pronunciation, and social confidence across school and professional settings.",
  "High-quality naming consultation combines language knowledge, historical sources, and real family conversations so recommendations reflect values rather than short-term trends.",
];

const seoLongFormParagraphs = Array.from({ length: 42 }, (_, idx) => {
  const theme = seoThemes[idx % seoThemes.length];
  const a = seoAngleSentences[idx % seoAngleSentences.length];
  const b = seoAngleSentences[(idx + 2) % seoAngleSentences.length];
  const c = seoAngleSentences[(idx + 5) % seoAngleSentences.length];
  const d = seoAngleSentences[(idx + 7) % seoAngleSentences.length];
  const e = seoAngleSentences[(idx + 9) % seoAngleSentences.length];
  return `${a} In this section, we explain how to evaluate ${theme} using a practical framework that includes meaning, pronunciation, spelling flexibility, religious and cultural relevance, and long-term identity impact. ${b} We also discuss common parent concerns like whether a name sounds too trendy, too complex, too rare, or too common in your city and social circle. ${c} Beyond search popularity, we recommend checking historical usage, cultural respect, and family acceptance so your final choice feels stable and intentional. ${d} For multilingual households, phonetic ease across Urdu, Arabic, English, Hindi, and regional languages can reduce future friction and improve confidence in classrooms, travel, and professional life. ${e} This long-form guidance supports parents who want thoughtful decisions, strong emotional alignment, and meaningful names that carry blessings, dignity, and clarity through every stage of life.`;
});

const seoSectionHeadings = [
  "Meaning and Origin Essentials",
  "Faith, Culture, and Family Values",
  "Pronunciation, Spelling, and Usability",
  "Modern Trends vs Timeless Choices",
  "Name Harmony with Surname and Siblings",
  "Practical Checklist for Final Selection",
  "Long-Term Identity and Confidence",
];

export default function AboutPage() {
  const introParagraphs = [
    "This extended About section is intentionally detailed for parents who are searching for high-quality, trustworthy, and practical baby naming guidance. Many families arrive here while comparing Islamic baby names, Hindu baby names, Christian baby names, Urdu names, Arabic names, and modern global names with deep meaning. Instead of giving short and generic suggestions, we provide complete context that helps you decide with confidence. A baby name is not only a trend choice; it is an identity choice that can shape confidence, belonging, and emotional connection for a lifetime.",
    "Our work combines faith-sensitive research, language expertise, cultural context, and real-life parent consultations. We study pronunciation, etymology, spiritual symbolism, historical references, and modern usability. We also help families evaluate how a name sounds with the surname, how initials look in documents, and how well the name travels across schools, workplaces, and international environments. This approach supports families who want a name that feels meaningful today and remains elegant and relevant in the future.",
  ];
  const aboutSectionTitle = "Complete Baby Naming Knowledge Hub (Extended About Section)";

  return (
    <>
      <StructuredData
        person={personData}
        breadcrumbs={[
          { name: "Home", url: SITE_URL },
          { name: "About", url: `${SITE_URL}/about` },
        ]}
      />
      
      <PageLayout
        title="About Zakriya Khan"
        subtitle="Name Meanings Expert & Cultural Consultant"
        bgColor="bg-gray-50"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl p-8 sm:p-12 mb-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
            </div>
            
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6 text-sm font-semibold border border-white/30">
                <span>Professional Name Consultant</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Helping families discover meaningful names
              </h2>
              
              <p className="text-lg sm:text-xl text-white/95 max-w-3xl mx-auto mb-8">
                With deep cultural and spiritual significance
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <a 
                  href="https://wa.me/923497174815" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-6 py-3 bg-white text-purple-700 font-bold rounded-xl hover:shadow-xl transition-all"
                >
                  WhatsApp Consultation
                </a>
                <a 
                  href="https://www.linkedin.com/in/zakriya-khan-a6321a390/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-bold rounded-xl hover:bg-white hover:text-purple-700 transition-all border border-white/30"
                >
                  LinkedIn Profile
                </a>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="text-3xl font-bold text-indigo-600 mb-2">5000+</div>
              <div className="text-sm text-gray-600">Names Researched</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="text-3xl font-bold text-indigo-600 mb-2">1000+</div>
              <div className="text-sm text-gray-600">Happy Families</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="text-3xl font-bold text-indigo-600 mb-2">15+</div>
              <div className="text-sm text-gray-600">Languages</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm">
              <div className="text-3xl font-bold text-indigo-600 mb-2">24/7</div>
              <div className="text-sm text-gray-600">Support Available</div>
            </div>
          </section>

          {/* Mission Section */}
          <section className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 text-center">
              Our Mission
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-3">Deep Research</h3>
                <p className="text-gray-600">
                  Every name is thoroughly researched across multiple cultures, languages, and historical contexts.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-3">Personalized Care</h3>
                <p className="text-gray-600">
                  Our consultations are tailored to your family's values and preferences.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-3">Authentic Sources</h3>
                <p className="text-gray-600">
                  All information is verified through authentic religious texts and scholarly sources.
                </p>
              </div>
            </div>
          </section>

          {/* Story Section */}
          <section className="bg-white rounded-xl p-8 sm:p-12 shadow-sm mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              My Journey
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                As-salamu alaykum! I'm Zakriya Khan, and my passion for names began with a simple question: "What does my name really mean?" This curiosity led me on a journey through Islamic history, Arabic linguistics, and cultural anthropology.
              </p>
              <p>
                Over the years, I've dedicated myself to understanding the profound significance behind names across multiple cultures and religions. Each name carries a story, a blessing, and a hope for the future.
              </p>
              <p className="font-semibold text-indigo-600">
                "A name is the first gift you give your child - make it meaningful."
              </p>
            </div>
          </section>

          {/* Services */}
          <section className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 text-center">
              What I Offer
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Name Research", desc: "In-depth analysis of name meanings, origins, and cultural significance." },
                { title: "Personal Consultation", desc: "One-on-one guidance to help you choose the perfect name." },
                { title: "Cultural Context", desc: "Understanding names across Islamic, Arabic, and Urdu traditions." },
                { title: "Numerology Analysis", desc: "Discover the numerological significance and lucky elements." },
                { title: "Spiritual Guidance", desc: "Understanding the spiritual symbolism of names." },
                { title: "Family Support", desc: "Helping families find names that honor their heritage." },
              ].map((service, idx) => (
                <div key={idx} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl p-8 sm:p-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Find the Perfect Name?
            </h2>
            <p className="text-lg mb-8 text-white/90">
              Let's work together to discover a name that carries meaning, beauty, and blessings
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://wa.me/923497174815" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-8 py-4 bg-white text-purple-700 font-bold rounded-xl hover:shadow-xl transition-all"
              >
                Start Your Consultation
              </a>
            </div>
          </section>

          {/* Long-Form SEO Content */}
          <section className="bg-white rounded-xl p-8 sm:p-12 shadow-sm mt-12" data-about-seo-section="true">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              {aboutSectionTitle}
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <h3>Introduction</h3>
              <p>
                {introParagraphs[0]}
              </p>
              <p>
                {introParagraphs[1]}
              </p>
              {seoSectionHeadings.map((heading, sectionIdx) => {
                const start = sectionIdx * 6;
                const items = seoLongFormParagraphs.slice(start, start + 6);
                return (
                  <section key={`seo-section-${heading}`} className="not-prose mt-10">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{heading}</h3>
                    <div className="prose prose-lg max-w-none text-gray-700">
                      {items.map((paragraph, idx) => (
                        <p key={`seo-paragraph-${sectionIdx}-${idx}`}>{paragraph}</p>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          </section>
        </div>
      </PageLayout>
    </>
  );
}
