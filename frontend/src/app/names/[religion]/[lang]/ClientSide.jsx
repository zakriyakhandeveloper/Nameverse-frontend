'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { 
  BookOpen, Star, Heart, Share2, Calendar, Gem, Users, Sparkles, 
  Crown, Award, Lightbulb, TrendingUp, History, Globe, MessageCircle,
  ChevronDown, ChevronUp, Check 
} from 'lucide-react';

// Sample data for demonstration
const sampleData = {
  name: "Aisha",
  religion: "Islamic",
  origin: "Arabic",
  gender: "Female",
  short_meaning: "Living, Alive, Life",
  long_meaning: "Aisha is a beautiful name with deep spiritual significance, meaning 'alive', 'living', or 'life'. It represents vitality, prosperity, and a blessed existence.",
  spiritual_meaning: "The name carries profound spiritual significance, symbolizing a life filled with divine blessings and grace.",
  spiritual_symbolism: "Represents vitality, growth, and the continuous renewal of faith and spirit.",
  pronunciation: { english: "AH-ee-shah", ipa: "/ˈɑːiʃɑː/" },
  lucky_number: 7,
  lucky_day: "Friday",
  lucky_stone: "Emerald",
  lucky_colors: ["Green", "Blue"],
  life_path_number: 7,
  numerology_meaning: "Number 7 represents spiritual awakening, inner wisdom, and deep introspection.",
  emotional_traits: ["Compassionate", "Intuitive", "Creative", "Empathetic"],
  themes: ["Life", "Vitality", "Spirituality", "Grace"],
  cultural_impact: "A widely cherished name across Muslim communities worldwide, representing life and prosperity.",
  in_arabic: { name: "عائشة", meaning: "Living, Alive" },
  in_urdu: { name: "عائشہ", meaning: "Living, Alive" },
  historical_references: [
    {
      time_period: "7th Century",
      context: "Islamic History",
      reference: "Aisha bint Abu Bakr was the wife of Prophet Muhammad and a prominent scholar."
    }
  ],
  celebrity_usage: ["Aisha Tyler - Actress", "Aisha Hinds - Actress"],
  related_names: ["Ayesha", "Aishah", "Aishat"],
  similar_sounding_names: ["Alisha", "Anisha", "Aiza"],
  seo: {
    faq: [
      { q: "What does Aisha mean?", a: "Aisha means 'living', 'alive', or 'life' in Arabic." },
      { q: "Is Aisha a common name?", a: "Yes, Aisha is very popular in Muslim communities worldwide." }
    ]
  },
  category: ["Islamic Names", "Arabic Names", "Popular Names"],
  language: ["Arabic", "Urdu", "English"]
};

const NameDetailsClient = ({ data = sampleData }) => {
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const [activeTab, setActiveTab] = useState('overview');

  // Memoize language meanings
  const languageMeanings = useMemo(() => {
    const meanings = [];
    if (data.in_arabic) meanings.push({ lang: 'Arabic', data: data.in_arabic, color: 'emerald' });
    if (data.in_urdu && data.in_urdu.name !== data.in_arabic?.name) {
      meanings.push({ lang: 'Urdu', data: data.in_urdu, color: 'blue' });
    }
    if (data.in_hindi) meanings.push({ lang: 'Hindi', data: data.in_hindi, color: 'orange' });
    if (data.in_sanskrit) meanings.push({ lang: 'Sanskrit', data: data.in_sanskrit, color: 'purple' });
    if (data.in_hebrew) meanings.push({ lang: 'Hebrew', data: data.in_hebrew, color: 'indigo' });
    return meanings;
  }, [data]);

  // Tab configuration
  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'meanings', label: 'Languages', icon: Globe },
    { id: 'personality', label: 'Traits', icon: Sparkles },
    { id: 'lucky', label: 'Lucky', icon: Gem },
    { id: 'cultural', label: 'Cultural', icon: History },
  ];

  const handleSave = useCallback(() => {
    setSaved(prev => !prev);
  }, []);

  const handleShare = useCallback(async () => {
    const shareData = {
      title: `${data.name} - Name Meaning`,
      text: data.short_meaning,
      url: typeof window !== 'undefined' ? window.location.href : '',
    };

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        if (error.name !== 'AbortError') copyToClipboard(shareData.url);
      }
    } else {
      copyToClipboard(shareData.url);
    }
  }, [data.name, data.short_meaning]);

  const copyToClipboard = useCallback((text) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  }, []);

  const toggleSection = useCallback((section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  }, []);

  const renderColorIndicator = useCallback((color) => {
    const colorMap = {
      'Blue': 'bg-blue-500', 'Purple': 'bg-purple-500', 'Gold': 'bg-yellow-500',
      'Green': 'bg-green-500', 'Pink': 'bg-pink-500', 'Red': 'bg-red-500', 'Orange': 'bg-orange-500',
    };
    return colorMap[color] || 'bg-gray-500';
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Enhanced */}
      <header className="bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 text-white relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16 md:py-20 relative">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full mb-4 text-xs font-semibold border border-white/30 shadow-lg">
              <Crown className="w-4 h-4" />
              {data.religion?.toUpperCase() || 'NAME'}
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight drop-shadow-lg">{data.name}</h1>
            
            {(data.in_arabic || data.in_urdu) && (
              <div className="flex flex-wrap justify-center gap-4 mb-4 text-2xl sm:text-3xl md:text-4xl font-medium opacity-95 drop-shadow">
                {data.in_arabic && <span>{data.in_arabic.name}</span>}
                {data.in_urdu && data.in_urdu.name !== data.in_arabic?.name && <span>{data.in_urdu.name}</span>}
              </div>
            )}
            
            <p className="text-lg sm:text-xl md:text-2xl font-medium mb-3 text-white/95 px-4 max-w-2xl mx-auto drop-shadow">{data.short_meaning}</p>
            
            {data.pronunciation && (
              <p className="text-sm sm:text-base opacity-80 mb-6 font-medium">{data.pronunciation.english}</p>
            )}

            <div className="flex flex-wrap justify-center gap-3">
              <button 
                onClick={handleSave}
                className={`px-6 py-2.5 ${saved ? 'bg-white text-blue-600' : 'bg-white/20'} backdrop-blur-sm font-semibold rounded-lg transition-all flex items-center gap-2 text-sm hover:bg-white hover:text-blue-600 border border-white/30 shadow-lg hover:shadow-xl hover:scale-105`}
              >
                <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
                {saved ? 'Saved' : 'Save'}
              </button>
              <button 
                onClick={handleShare}
                className="px-6 py-2.5 bg-white/20 backdrop-blur-sm font-semibold rounded-lg transition-all flex items-center gap-2 text-sm hover:bg-white hover:text-blue-600 border border-white/30 shadow-lg hover:shadow-xl hover:scale-105"
              >
                {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                {copied ? 'Copied' : 'Share'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Quick Stats */}
      <div className="bg-white border-b sticky top-0 z-30 shadow-md">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 sm:gap-6 py-5 text-center">
            <div className="group">
              <div className="text-gray-500 mb-1.5 font-semibold text-xs uppercase tracking-wider">Origin</div>
              <div className="font-bold text-gray-900 text-base sm:text-lg group-hover:text-blue-600 transition-colors">{data.origin || 'N/A'}</div>
            </div>
            <div className="group">
              <div className="text-gray-500 mb-1.5 font-semibold text-xs uppercase tracking-wider">Gender</div>
              <div className="font-bold text-gray-900 text-base sm:text-lg group-hover:text-blue-600 transition-colors">{data.gender || 'N/A'}</div>
            </div>
            <div className="group">
              <div className="text-gray-500 mb-1.5 font-semibold text-xs uppercase tracking-wider">Number</div>
              <div className="font-bold text-blue-600 text-xl sm:text-2xl">{data.lucky_number || 'N/A'}</div>
            </div>
            <div className="hidden sm:block group">
              <div className="text-gray-500 mb-1.5 font-semibold text-xs uppercase tracking-wider">Day</div>
              <div className="font-bold text-gray-900 text-base sm:text-lg group-hover:text-blue-600 transition-colors">{data.lucky_day || 'N/A'}</div>
            </div>
            <div className="hidden sm:block group">
              <div className="text-gray-500 mb-1.5 font-semibold text-xs uppercase tracking-wider">Stone</div>
              <div className="font-bold text-gray-900 text-base sm:text-lg group-hover:text-blue-600 transition-colors">{data.lucky_stone || 'N/A'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b sticky top-[73px] z-20 shadow-sm">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex overflow-x-auto hide-scrollbar">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3.5 text-sm font-semibold whitespace-nowrap transition-all border-b-2 ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 pb-12">
        
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            {data.long_meaning && (
              <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-200/60 hover:shadow-md transition-shadow">
                <h2 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2.5">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  Detailed Meaning
                </h2>
                <p className="text-gray-700 leading-relaxed text-sm">{data.long_meaning}</p>
              </section>
            )}
            
            {data.spiritual_meaning && (
              <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-200/60 hover:shadow-md transition-shadow">
                <h2 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2.5">
                  <Star className="w-5 h-5 text-purple-600" />
                  Spiritual Significance
                </h2>
                <p className="text-gray-700 leading-relaxed text-sm">{data.spiritual_meaning}</p>
              </section>
            )}

            {data.spiritual_symbolism && (
              <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-200/60 hover:shadow-md transition-shadow">
                <h2 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2.5">
                  <Lightbulb className="w-5 h-5 text-amber-600" />
                  Spiritual Symbolism
                </h2>
                <p className="text-gray-700 leading-relaxed text-sm">{data.spiritual_symbolism}</p>
              </section>
            )}

            {data.life_path_number && data.numerology_meaning && (
              <section className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-xl font-bold flex-shrink-0 backdrop-blur-sm">
                    {data.life_path_number}
                  </div>
                  <div>
                    <h2 className="text-base font-bold">Life Path Number</h2>
                    <p className="text-xs opacity-90">Numerological Significance</p>
                  </div>
                </div>
                <p className="text-white/95 leading-relaxed text-sm">{data.numerology_meaning}</p>
              </section>
            )}
          </div>
        )}

        {/* Meanings Tab */}
        {activeTab === 'meanings' && languageMeanings.length > 0 && (
          <div className="space-y-4">
            {languageMeanings.map((item, idx) => (
              <section key={idx} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200/60 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-bold text-gray-900">{item.lang}</h3>
                  <span className="text-2xl font-semibold text-gray-700">{item.data.name}</span>
                </div>
                <p className="text-gray-900 font-semibold mb-2 text-sm">{item.data.meaning}</p>
                {item.data.long_meaning && (
                  <p className="text-gray-600 text-sm leading-relaxed">{item.data.long_meaning}</p>
                )}
              </section>
            ))}
          </div>
        )}

        {/* Personality Tab */}
        {activeTab === 'personality' && (
          <div className="space-y-4">
            {data.emotional_traits && data.emotional_traits.length > 0 && (
              <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-200/60 hover:shadow-md transition-shadow">
                <h2 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2.5">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  Personality Traits
                </h2>
                <div className="flex flex-wrap gap-2">
                  {data.emotional_traits.map((trait, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-purple-50 text-purple-700 text-sm font-semibold rounded-lg border border-purple-200/50 hover:bg-purple-100 transition-colors">
                      {trait}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {data.themes && data.themes.length > 0 && (
              <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-200/60 hover:shadow-md transition-shadow">
                <h2 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2.5">
                  <Star className="w-5 h-5 text-amber-600" />
                  Core Themes
                </h2>
                <div className="flex flex-wrap gap-2">
                  {data.themes.map((theme, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-amber-50 text-amber-700 text-sm font-semibold rounded-lg border border-amber-200/50 hover:bg-amber-100 transition-colors">
                      {theme}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {data.related_names && data.related_names.length > 0 && (
              <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-200/60 hover:shadow-md transition-shadow">
                <h2 className="text-base font-bold text-gray-900 mb-3">Related Names</h2>
                <div className="flex flex-wrap gap-2">
                  {data.related_names.map((name, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-200 transition-colors cursor-pointer border border-gray-200">
                      {name}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {data.similar_sounding_names && data.similar_sounding_names.length > 0 && (
              <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-200/60 hover:shadow-md transition-shadow">
                <h2 className="text-base font-bold text-gray-900 mb-3">Similar Sounding</h2>
                <div className="flex flex-wrap gap-2">
                  {data.similar_sounding_names.map((name, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-200 transition-colors cursor-pointer border border-gray-200">
                      {name}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* Lucky Elements Tab */}
        {activeTab === 'lucky' && (
          <div className="space-y-4">
            <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-200/60 hover:shadow-md transition-shadow">
              <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2.5">
                <Gem className="w-5 h-5 text-amber-600" />
                Lucky Elements
              </h2>
              
              <div className="space-y-3">
                {data.lucky_day && (
                  <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200/50">
                    <Calendar className="w-5 h-5 text-amber-600 flex-shrink-0" />
                    <div>
                      <div className="text-xs text-gray-600 mb-0.5 font-medium uppercase tracking-wide">Lucky Day</div>
                      <div className="text-sm font-bold text-gray-900">{data.lucky_day}</div>
                    </div>
                  </div>
                )}
                
                {data.lucky_stone && (
                  <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200/50">
                    <Gem className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <div>
                      <div className="text-xs text-gray-600 mb-0.5 font-medium uppercase tracking-wide">Lucky Stone</div>
                      <div className="text-sm font-bold text-gray-900">{data.lucky_stone}</div>
                    </div>
                  </div>
                )}
                
                {data.lucky_colors && data.lucky_colors.length > 0 && (
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200/50">
                    <div className="text-xs text-gray-600 mb-2 font-medium uppercase tracking-wide">Lucky Colors</div>
                    <div className="flex items-center gap-2">
                      {data.lucky_colors.map((color, idx) => (
                        <div key={idx} className={`w-8 h-8 rounded-full ${renderColorIndicator(color)} shadow-md border-2 border-white`} />
                      ))}
                      <div className="text-sm font-bold text-gray-900 ml-1">
                        {data.lucky_colors.join(', ')}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}

        {/* Cultural Tab */}
        {activeTab === 'cultural' && (
          <div className="space-y-4">
            {data.cultural_impact && (
              <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-200/60 hover:shadow-md transition-shadow">
                <h2 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2.5">
                  <TrendingUp className="w-5 h-5 text-rose-600" />
                  Cultural Impact
                </h2>
                <p className="text-gray-700 leading-relaxed text-sm">{data.cultural_impact}</p>
              </section>
            )}

            {data.historical_references && data.historical_references.length > 0 && (
              <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-200/60 hover:shadow-md transition-shadow">
                <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2.5">
                  <History className="w-5 h-5 text-indigo-600" />
                  Historical References
                </h2>
                <div className="space-y-3">
                  {data.historical_references.map((ref, idx) => (
                    <div key={idx} className="p-4 bg-indigo-50 rounded-lg border border-indigo-200/50">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="px-2.5 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded">
                          {ref.time_period}
                        </span>
                        <span className="text-xs text-indigo-600 font-semibold">{ref.context}</span>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">{ref.reference}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {data.celebrity_usage && data.celebrity_usage.length > 0 && (
              <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-200/60 hover:shadow-md transition-shadow">
                <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2.5">
                  <Users className="w-5 h-5 text-blue-600" />
                  Famous Personalities
                </h2>
                <div className="space-y-2">
                  {data.celebrity_usage.map((celebrity, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 p-3 bg-blue-50 rounded-lg border border-blue-200/50">
                      <Award className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <p className="text-gray-900 font-semibold text-sm">{celebrity}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {data.seo?.faq && data.seo.faq.length > 0 && (
              <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-200/60 hover:shadow-md transition-shadow">
                <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2.5">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                  FAQs
                </h2>
                <div className="space-y-2">
                  {data.seo.faq.map((faq, idx) => {
                    const isExpanded = expandedSections[`faq-${idx}`];
                    return (
                      <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => toggleSection(`faq-${idx}`)}
                          className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                          <h3 className="text-sm font-bold text-gray-900 pr-4">{faq.q}</h3>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-gray-500 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
                          )}
                        </button>
                        {isExpanded && (
                          <div className="px-4 pb-3">
                            <p className="text-gray-700 leading-relaxed text-sm">{faq.a}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
          </div>
        )}

      </main>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default NameDetailsClient;