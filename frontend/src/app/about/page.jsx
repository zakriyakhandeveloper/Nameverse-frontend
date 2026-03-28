import PageLayout from '@/components/Layout/PageLayout';
import StructuredData from '@/components/SEO/StructuredData';
import { env } from '@/config/env';
import {
  aboutNamingGuideHubTitle,
  getAboutNamingGuideSections,
} from '@/content/aboutNamingGuideSections';

const SITE_URL = env.site.url;

const aboutPageDescription =
  'Learn how NameVerse helps families choose Islamic, Hindu, Christian, and multicultural baby names with verified meanings, pronunciation guidance, and respectful cultural context. Meet consultant Zakriya Khan.';

export const metadata = {
  title: 'About Zakriya Khan | Name Meanings Expert & Baby Naming Guide | NameVerse',
  description: aboutPageDescription,
  keywords: [
    'Zakriya Khan',
    'baby name consultant',
    'name meanings expert',
    'Islamic baby names guide',
    'Hindu baby names meanings',
    'Christian biblical names',
    'Urdu Arabic name meanings',
    'multicultural baby naming',
    'baby name pronunciation',
    'Quranic naming advice',
    'Sanskrit baby names',
    'NameVerse about',
    'professional name research',
  ],
  authors: [{ name: 'Zakriya Khan', url: `${SITE_URL}/about` }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: 'About Zakriya Khan — Name Meanings Expert & Cultural Consultant | NameVerse',
    description: aboutPageDescription,
    url: `${SITE_URL}/about`,
    type: 'website',
    siteName: env.site.name || 'NameVerse',
    locale: 'en_US',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'NameVerse — Baby names and meanings',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Zakriya Khan | NameVerse Name Expert',
    description: aboutPageDescription,
    images: [`${SITE_URL}/og-image.png`],
  },
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
};

const personData = {
  name: 'Zakriya Khan',
  jobTitle: 'Name Meanings Expert & Cultural Consultant',
  description:
    'Professional consultant specializing in baby name meanings, cultural heritage, and spiritual significance across Islamic, Hindu, Christian, and global traditions.',
  url: `${SITE_URL}/about`,
  sameAs: ['https://www.linkedin.com/in/zakriya-khan-a6321a390/'],
  knowsAbout: [
    'Baby names',
    'Islamic names',
    'Hindu names',
    'Christian names',
    'Name etymology',
    'Multilingual pronunciation',
    'Cultural naming traditions',
  ],
  contactPoint: {
    telephone: '+92-349-7174815',
    contactType: 'Professional Services',
    availableLanguage: ['English', 'Urdu', 'Arabic'],
  },
};

const aboutFaqItems = [
  {
    question: 'What does a baby name consultant help with?',
    answer:
      'A consultant helps you verify meanings and origins, compare spelling and pronunciation options, respect religious and cultural context, and shortlist names that fit your surname and family values—so the choice feels confident rather than rushed.',
  },
  {
    question: 'Does NameVerse focus only on Islamic names?',
    answer:
      'No. NameVerse supports families exploring Islamic, Hindu, Christian, and many global naming traditions, with emphasis on accurate meanings and practical usability in multilingual households.',
  },
  {
    question: 'How should parents research name meanings?',
    answer:
      'Cross-check at least two reputable sources, note the language of origin, and watch for spelling variants that change pronunciation. If traditions matter to your family, prioritize guidance aligned with those sources rather than random social lists.',
  },
  {
    question: 'How important is pronunciation for a baby name?',
    answer:
      'Very important for daily life—school, healthcare, travel, and work. Testing a name in every language your household speaks, plus checking initials with the surname, prevents friction your child would carry for years.',
  },
  {
    question: 'Can I get a personal consultation?',
    answer:
      'Yes. You can reach out via the WhatsApp link on this page for tailored guidance. Share your values, shortlisted names, and any family naming rules so recommendations stay practical and respectful.',
  },
];

const namingGuideSections = getAboutNamingGuideSections();

export default function AboutPage() {
  return (
    <>
      <StructuredData
        person={personData}
        aboutPage={{
          name: `About Zakriya Khan | ${env.site.name || 'NameVerse'}`,
          description: aboutPageDescription,
          url: `${SITE_URL}/about`,
          primaryImage: `${SITE_URL}/og-image.png`,
        }}
        breadcrumbs={[
          { name: 'Home', url: SITE_URL },
          { name: 'About', url: `${SITE_URL}/about` },
        ]}
        faqPage={{ items: aboutFaqItems }}
      />

      <PageLayout
        title="About Zakriya Khan"
        subtitle="Name Meanings Expert & Cultural Consultant"
        bgColor="bg-gray-50"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <section
            className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl p-8 sm:p-12 mb-12 relative overflow-hidden"
            aria-label="Introduction"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
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

          <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12" aria-label="Highlights">
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

          <section className="mb-12" aria-labelledby="mission-heading">
            <h2 id="mission-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 text-center">
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
                  Our consultations are tailored to your family&apos;s values and preferences.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-3">Authentic Sources</h3>
                <p className="text-gray-600">
                  Information is aligned with authentic religious texts and scholarly naming references where
                  applicable.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl p-8 sm:p-12 shadow-sm mb-12" aria-labelledby="journey-heading">
            <h2 id="journey-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              My Journey
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                As-salamu alaykum! I&apos;m Zakriya Khan, and my passion for names began with a simple question:
                &quot;What does my name really mean?&quot; This curiosity led me on a journey through Islamic
                history, Arabic linguistics, and cultural anthropology.
              </p>
              <p>
                Over the years, I&apos;ve dedicated myself to understanding the profound significance behind names
                across multiple cultures and religions. Each name carries a story, a blessing, and a hope for the
                future.
              </p>
              <p className="font-semibold text-indigo-600 not-prose">
                &quot;A name is the first gift you give your child—make it meaningful.&quot;
              </p>
            </div>
          </section>

          <section className="mb-12" aria-labelledby="services-heading">
            <h2 id="services-heading" className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 text-center">
              What I Offer
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Name Research',
                  desc: 'In-depth analysis of name meanings, origins, and cultural significance.',
                },
                {
                  title: 'Personal Consultation',
                  desc: 'One-on-one guidance to help you choose the perfect name.',
                },
                {
                  title: 'Cultural Context',
                  desc: 'Understanding names across Islamic, Arabic, and Urdu traditions.',
                },
                {
                  title: 'Numerology Analysis',
                  desc: 'Discover numerological significance and symbolic associations where requested.',
                },
                {
                  title: 'Spiritual Guidance',
                  desc: 'Understanding spiritual symbolism and faith-aligned naming choices.',
                },
                {
                  title: 'Family Support',
                  desc: 'Helping families find names that honor their heritage.',
                },
              ].map((service, idx) => (
                <div
                  key={service.title}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section
            className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-2xl p-8 sm:p-12 text-center mb-12"
            aria-labelledby="cta-heading"
          >
            <h2 id="cta-heading" className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Find the Perfect Name?
            </h2>
            <p className="text-lg mb-8 text-white/90">
              Let&apos;s work together to discover a name that carries meaning, beauty, and blessings.
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

          <article className="bg-white rounded-xl p-8 sm:p-12 shadow-sm mt-12 border border-gray-100">
            <header className="mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" id="naming-knowledge-hub">
                {aboutNamingGuideHubTitle}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                The guide below breaks naming advice into clear sections. Each topic uses short paragraphs so you can
                scan quickly, compare traditions, and build a shortlist that fits your family.
              </p>
              <p className="text-gray-600 mt-4 leading-relaxed">
                Whether you are focused on Islamic baby names, Hindu and Sanskrit options, Christian biblical names, or
                modern multicultural choices, the same principles apply: verify meaning, respect culture, test
                pronunciation, and choose with long-term confidence.
              </p>
            </header>

            {namingGuideSections.map((section) => (
              <section
                key={section.id}
                className="mt-12 pt-10 border-t border-gray-100 first:mt-0 first:pt-0 first:border-t-0"
                aria-labelledby={`heading-${section.id}`}
              >
                <h2 id={`heading-${section.id}`} className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
                  {section.title}
                </h2>
                <div className="space-y-10">
                  {section.topics.map((topic) => (
                    <div key={topic.id}>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">{topic.title}</h3>
                      <div className="space-y-3 text-gray-700 leading-relaxed">
                        {topic.paragraphs.map((paragraph, pi) => (
                          <p key={`${topic.id}-p${pi}`}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}

            <section className="mt-14 pt-10 border-t border-gray-200" aria-labelledby="faq-heading">
              <h2 id="faq-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                Frequently asked questions
              </h2>
              <dl className="space-y-6">
                {aboutFaqItems.map((item) => (
                  <div key={item.question}>
                    <dt className="font-semibold text-gray-900 mb-2">{item.question}</dt>
                    <dd className="text-gray-700 leading-relaxed pl-0">{item.answer}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </article>
        </div>
      </PageLayout>
    </>
  );
}
