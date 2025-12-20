'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, BookOpen, CheckCircle } from 'lucide-react';

const ComprehensiveFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      category: 'General Questions',
      icon: HelpCircle,
      questions: [
        {
          q: 'How many baby names does NameVerse have?',
          a: 'NameVerse features over 60,000 verified baby names from Islamic, Hindu, and Christian traditions with complete meanings in multiple languages including English, Urdu, Arabic, and Hindi. Our database includes 25,000+ Islamic baby names, 20,000+ Hindu baby names, and 15,000+ Christian baby names, making it one of the most comprehensive multilingual baby name resources in the world.'
        },
        {
          q: 'Are the baby name meanings verified and authentic?',
          a: 'Yes, absolutely! Every baby name on NameVerse is verified by cultural and religious experts to ensure authentic meanings and accurate origins. Our team includes Islamic scholars for Muslim baby names from Quran, Sanskrit experts for Hindu baby names from Vedas, and theologians for Biblical baby names. We cross-reference multiple authoritative sources including ancient texts, religious scriptures, and academic linguistic databases to guarantee accuracy. Unlike generic baby name sites that often contain mistranslations, we provide verified, authentic meanings you can trust.'
        },
        {
          q: 'Can I find baby names in languages other than English?',
          a: 'Absolutely! NameVerse provides baby name meanings and pronunciations in English, Urdu, Arabic, Hindi, Pashto, and other languages. Each Islamic baby name includes Arabic script and Urdu translations, Hindu baby names show Devanagari script with Hindi meanings, and Christian baby names include original Hebrew or Greek etymologies. We also provide pronunciation guides in IPA (International Phonetic Alphabet) format and audio pronunciations for proper name pronunciation. This multilingual support makes NameVerse unique among baby name websites and particularly valuable for families who want their child\'s name to be properly understood in multiple cultural contexts.'
        },
        {
          q: 'What makes NameVerse different from other baby name websites?',
          a: 'NameVerse stands out with four unique advantages: (1) Multilingual verified meanings in Urdu, Arabic, and Hindi - no major competitor offers this; (2) Deep religious and cultural authenticity verified by experts in Islamic, Hindu, and Christian traditions; (3) Comprehensive information including numerology, lucky numbers, spiritual significance, and personality traits; (4) Pronunciation guides in multiple languages with IPA notation. While sites like Nameberry focus on trends and Behind the Name emphasizes etymology, NameVerse combines cultural depth, religious authenticity, and multilingual accessibility for families worldwide.'
        }
      ]
    },
    {
      category: 'Islamic Baby Names',
      icon: BookOpen,
      questions: [
        {
          q: 'What are Quranic baby names and how are they different from other Islamic names?',
          a: 'Quranic baby names are names that appear directly in the Holy Quran or are derived from Quranic verses and concepts. These include names of Prophets (like Muhammad, Ibrahim, Musa, Isa), names of companions (Sahaba), and names with meanings found in Quranic ayahs. NameVerse features over 8,500+ authentic Quranic baby names for boys and girls with verse references and spiritual significance. Non-Quranic Islamic names are also beautiful and meaningful, coming from Arabic language, Islamic history, or Muslim cultural traditions. Both types of Muslim baby names are blessed and appropriate for Muslim babies - the key is choosing a name with good meaning that honors Islamic values.'
        },
        {
          q: 'How do I choose the perfect Islamic baby name for my child?',
          a: 'Choosing an Islamic baby name involves several considerations: (1) Meaning - Select a name with beautiful, positive meaning that reflects Islamic values like faith, wisdom, kindness, or strength; (2) Pronunciation - Ensure the name is easy to pronounce in your local language and cultural context; (3) Cultural fit - Consider how the name sounds with your family surname; (4) Spiritual significance - Many parents prefer Quranic names or names of Prophets and Sahaba for their blessed nature; (5) Modern appeal - Balance traditional Islamic authenticity with contemporary usability. Our database helps by showing each name\'s meaning in Urdu and Arabic, pronunciation guide, spiritual significance, and cultural origin. You can filter by gender, starting letter, and meaning themes to find the perfect match.'
        },
        {
          q: 'What are the most popular Islamic baby names in 2025?',
          a: 'The most popular Islamic baby names in 2025 blend traditional Quranic names with modern appeal. For boys: Muhammad (praised one), Ali (exalted), Omar (long-lived), Zain (beauty), Ibrahim (father of nations), Yusuf (God increases), and Adam (first man). For girls: Aisha (living), Fatima (captivating), Zara (princess), Maryam (beloved), Layla (night beauty), Amira (princess), and Sara (pure). These trending Muslim baby names are popular because they carry deep spiritual meanings, are mentioned in Islamic tradition, and work well across different cultures and languages. NameVerse provides complete details for each including Quranic references, Arabic script, Urdu meanings, and pronunciation guides.'
        }
      ]
    },
    {
      category: 'Hindu Baby Names',
      icon: BookOpen,
      questions: [
        {
          q: 'What are Sanskrit baby names and why are they significant?',
          a: 'Sanskrit baby names come from the ancient Sanskrit language, which is the liturgical language of Hinduism and the source of most Hindu baby names. Sanskrit names carry deep philosophical and spiritual meanings rooted in Vedic literature, Hindu scriptures like the Bhagavad Gita and Ramayana, and Indian cultural wisdom spanning thousands of years. Examples include Arjun (bright, warrior from Mahabharata), Priya (beloved), Ananya (unique), and Aarav (peaceful wisdom). NameVerse features over 12,000 authentic Sanskrit baby names with meanings in Hindi and English, Devanagari script, pronunciation guides, and connections to Hindu deities, Vedic concepts, and Indian philosophy. Sanskrit names are chosen by Hindu families for their spiritual depth, cultural heritage, and timeless beauty.'
        },
        {
          q: 'Can you explain Hindu baby names inspired by deities?',
          a: 'Many Hindu baby names are inspired by Hindu gods and goddesses, reflecting divine qualities and seeking blessings. Popular deity-inspired names include: From Lord Krishna - Krishna, Govind, Madhav, Murari for boys and Radha, Rukmini for girls; From Lord Shiva - Shiva, Shankar, Mahadev for boys and Parvati, Uma, Gauri for girls; From Goddess Lakshmi - Lakshmi, Kamalini, Shri for girls; From Lord Vishnu - Vishnu, Hari, Narayana for boys; From Goddess Saraswati - Saraswati, Vani, Vagdevi for girls. These Hindu baby names carry the divine attributes of the deities - like wisdom from Saraswati, prosperity from Lakshmi, or strength from Hanuman. NameVerse provides detailed information about each deity connection, the spiritual significance, and the qualities associated with each name.'
        },
        {
          q: 'What are the trending Hindu baby names for 2025?',
          a: 'Trending Hindu baby names in 2025 include modern Sanskrit names that are easy to pronounce globally while maintaining cultural roots. Popular boy names: Aarav (peaceful), Arjun (bright), Advait (unique), Vihaan (dawn), Reyansh (ray of light), Dhruv (pole star), and Atharv (Vedic knowledge). Popular girl names: Ananya (unique), Aaradhya (worshipped), Diya (lamp), Saanvi (goddess Lakshmi), Kiara (dark haired), Ishani (goddess Parvati), and Aanya (gracious). These trending Hindu baby names work well for families in India, diaspora communities, and anyone appreciating Sanskrit philosophy. They balance traditional Hindu values with contemporary appeal, making them perfect for modern parents seeking meaningful names with cultural authenticity.'
        }
      ]
    },
    {
      category: 'Christian Baby Names',
      icon: BookOpen,
      questions: [
        {
          q: 'What are Biblical baby names and where do they come from?',
          a: 'Biblical baby names come directly from the Bible - both the Old Testament (Hebrew Bible) and New Testament (Christian scriptures). These include names of prophets, apostles, saints, and biblical characters. Popular Biblical boy names include Noah (rest), David (beloved), Daniel (God is my judge), Matthew (gift of God), Joshua (God is salvation), and Samuel (God has heard). Popular Biblical girl names include Sarah (princess), Hannah (grace), Mary (beloved), Elizabeth (God is my oath), Ruth (companion), and Abigail (father\'s joy). NameVerse features 15,000+ Christian baby names with Biblical origins, complete with verse references from Genesis, Psalms, Gospels, and other books, showing exactly where each name appears in scripture. We provide the original Hebrew, Greek, or Aramaic meanings, spiritual significance, and stories of biblical figures who bore these names.'
        },
        {
          q: 'What are saint names and why do Christian families choose them?',
          a: 'Saint names are names of Catholic and Orthodox Christian saints who lived holy lives and are venerated in Christian tradition. Choosing a saint name is a meaningful tradition in many Christian families, as it provides a spiritual role model and patron saint for the child. Popular saint names include: Patrick (nobleman - St. Patrick of Ireland), Francis (Frenchman - St. Francis of Assisi), Teresa (harvester - St. Teresa of Avila), Catherine (pure - St. Catherine of Siena), Anthony (priceless - St. Anthony of Padua), and Cecilia (blind - St. Cecilia, patron of music). NameVerse provides detailed information about each saint\'s life, feast day, patronage, and spiritual legacy. These Christian baby names carry centuries of faith tradition and offer children a blessed namesake to aspire to throughout their lives.'
        },
        {
          q: 'What are popular Christian baby names for 2025?',
          a: 'Popular Christian baby names in 2025 blend Biblical tradition with contemporary style. Trending boy names: Noah (rest, comfort), Liam (strong-willed warrior), Elijah (Yahweh is God), Benjamin (son of right hand), Ethan (strong, enduring), Lucas (light-bringing), and Gabriel (God is my strength). Trending girl names: Sophia (wisdom), Olivia (olive tree, peace), Ava (life), Emma (universal), Grace (divine grace), Hannah (favor), and Isabella (devoted to God). These popular Christian baby names work beautifully across denominations (Catholic, Protestant, Orthodox) and are easily pronounced in multiple languages. NameVerse shows each name\'s Biblical references, saint connections, spiritual meaning, and cultural usage, helping Christian parents choose names that honor their faith while fitting modern life.'
        }
      ]
    },
    {
      category: 'Using NameVerse',
      icon: CheckCircle,
      questions: [
        {
          q: 'How do I search for baby names on NameVerse?',
          a: 'NameVerse offers multiple ways to find your perfect baby name: (1) Search Bar - Type any name or keyword to find matches instantly; (2) Browse by Religion - Filter by Islamic, Hindu, or Christian traditions; (3) Browse by Letter (A-Z) - Click any letter to see all names starting with that letter; (4) Gender Filter - Select boy names, girl names, or unisex names; (5) Origin Filter - Search by Arabic, Sanskrit, Hebrew, Greek, Urdu, Hindi origins; (6) Meaning Search - Find names by meaning themes like "peaceful," "strong," "blessed," or "beautiful"; (7) Popular Names - Browse trending names for 2025; (8) Advanced Filters - Combine multiple criteria for precise results. Each name page provides complete information including pronunciation, numerology, spiritual significance, and similar name suggestions.'
        },
        {
          q: 'What information does each baby name page include?',
          a: 'Every baby name detail page on NameVerse provides comprehensive information: (1) Meaning - Complete meaning in English plus translations in Urdu, Arabic, and/or Hindi; (2) Origin - Cultural and linguistic origins (Arabic, Sanskrit, Hebrew, etc.); (3) Religion - Islamic, Hindu, Christian, or multicultural; (4) Gender - Boy, girl, or unisex usage; (5) Pronunciation - Audio guide and IPA (International Phonetic Alphabet) notation; (6) Spiritual Significance - Religious context, Quranic verses, Vedic references, or Biblical citations; (7) Numerology - Lucky number, lucky day, lucky stone, and lucky colors; (8) Personality Traits - Characteristics associated with the name; (9) Cultural Context - Historical usage and famous bearers; (10) Similar Names - Related and alternative name suggestions; (11) Variations - Different spellings and cultural variants. This depth of information helps parents make informed, confident naming decisions.'
        },
        {
          q: 'How can I find unique baby names that aren\'t overused?',
          a: 'Finding unique baby names while maintaining meaning and cultural authenticity requires strategic searching on NameVerse: (1) Browse less common letters - Try names starting with Q, X, Z, or V for naturally unique options; (2) Explore variations - Look at alternate spellings or pronunciations of popular names (e.g., Zara vs Zahra, Aryan vs Arihan); (3) Deep religious names - Search lesser-known Quranic names, Vedic names, or Biblical names beyond the top 100; (4) Regional variations - Explore names from specific cultures (Bengali, Tamil, Persian, Aramaic); (5) Meaning-based search - Find names with unique meanings like "ray of light" (Reyansh), "unparalleled" (Advait), or "captivating" (Fatima); (6) Historical names - Discover names of historical figures, scholars, or saints. NameVerse\'s 60,000+ name database includes thousands of rare, unique baby names 2025 that are authentic and meaningful but not overused. Each unique name maintains cultural significance while standing out.'
        }
      ]
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-gray-50 via-white to-indigo-50/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 border border-indigo-200 rounded-full mb-4"
          >
            <HelpCircle className="w-5 h-5 text-indigo-600" />
            <span className="text-sm font-bold text-indigo-800">Frequently Asked Questions</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4"
          >
            Everything You Need to Know About Baby Names
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Complete guide to finding the perfect <span className="font-semibold text-indigo-600">baby name</span> with answers to common questions about <span className="font-semibold text-indigo-600">Islamic baby names</span>, <span className="font-semibold text-indigo-600">Hindu baby names</span>, <span className="font-semibold text-indigo-600">Christian baby names</span>, meanings, origins, and choosing names for your baby boy or baby girl.
          </motion.p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-6">
          {faqs.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * categoryIndex }}
                className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              >
                {/* Category Header */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b-2 border-gray-100 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{category.category}</h3>
                  </div>
                </div>

                {/* Questions */}
                <div className="divide-y divide-gray-100">
                  {category.questions.map((faq, faqIndex) => {
                    const globalIndex = `${categoryIndex}-${faqIndex}`;
                    const isOpen = openIndex === globalIndex;

                    return (
                      <div key={faqIndex}>
                        <button
                          onClick={() => toggleFAQ(globalIndex)}
                          className="w-full text-left px-6 py-5 hover:bg-gray-50 transition-colors focus:outline-none focus:bg-indigo-50/50"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <h4 className="font-bold text-base sm:text-lg text-gray-900 pr-4 flex-1">
                              {faq.q}
                            </h4>
                            <motion.div
                              animate={{ rotate: isOpen ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                              className="flex-shrink-0"
                            >
                              <ChevronDown className={`w-6 h-6 ${isOpen ? 'text-indigo-600' : 'text-gray-400'}`} />
                            </motion.div>
                          </div>
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-6 pt-2">
                                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                  {faq.a}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-8 text-white"
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-3">
            Still Have Questions About Baby Names?
          </h3>
          <p className="text-base sm:text-lg mb-6 opacity-90 max-w-2xl mx-auto">
            Explore our comprehensive database of 60,000+ verified baby names with meanings in English, Urdu, Arabic, and Hindi. Find the perfect name for your baby today!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/names"
              className="px-8 py-3 bg-white text-indigo-600 font-bold rounded-xl hover:bg-gray-100 hover:shadow-lg transition-all"
            >
              Browse All Names
            </a>
            <a
              href="/names/islamic"
              className="px-8 py-3 bg-indigo-500 text-white font-bold rounded-xl hover:bg-indigo-400 border-2 border-white/20 hover:shadow-lg transition-all"
            >
              Explore Islamic Names
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComprehensiveFAQ;
