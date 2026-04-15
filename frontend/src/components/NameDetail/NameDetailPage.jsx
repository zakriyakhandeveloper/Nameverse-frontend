'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Heart, Share2, Copy, Facebook, Twitter, MessageCircle,
  ChevronRight, Star, Globe, BookOpen, Users, Sparkles, Hash,
  Bookmark, Gem, Award, TrendingUp, Music, Clock, Calendar,
  Menu, X, Search, ArrowUp, Zap, Target, Crown, Shield, Eye,
  Volume2, Info, ChevronDown
} from 'lucide-react';

export default function NameDetailPage({ data, religion }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [relatedNames, setRelatedNames] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Fetch related names for smooth navigation
    const fetchRelated = async () => {
      try {
        setLoadingRelated(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/api/v1/names/${religion}/${data.slug}/related?limit=6`
        );
        if (response.ok) {
          const results = await response.json();
          setRelatedNames(results.data || results);
        }
      } catch (err) {
        console.error('Failed to fetch related names:', err);
      } finally {
        setLoadingRelated(false);
      }
    };

    if (data?.slug) {
      fetchRelated();
    }
  }, [data?.slug, religion]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = (platform) => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const text = `🎀 Discover "${data.name}": ${data.short_meaning} 📚 #NameVerse`;

    const platforms = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else if (platforms[platform]) {
      window.open(platforms[platform], '_blank');
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'meaning', label: 'Meaning', icon: Sparkles },
    { id: 'numerology', label: 'Numerology', icon: Star },
    { id: 'traits', label: 'Traits', icon: Target },
    { id: 'cultural', label: 'Cultural', icon: Globe },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {data.short_meaning && (
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-600" />
                  Quick Summary
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {data.short_meaning}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.origin && (
                <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition">
                  <p className="text-sm text-gray-600 mb-1">Origin</p>
                  <p className="text-lg font-semibold text-gray-900">{data.origin}</p>
                </div>
              )}
              {data.religion && (
                <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition">
                  <p className="text-sm text-gray-600 mb-1">Religion</p>
                  <p className="text-lg font-semibold text-gray-900 capitalize">{data.religion}</p>
                </div>
              )}
              {data.gender && (
                <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition">
                  <p className="text-sm text-gray-600 mb-1">Gender</p>
                  <p className="text-lg font-semibold text-gray-900 capitalize">{data.gender}</p>
                </div>
              )}
              {data.category?.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition">
                  <p className="text-sm text-gray-600 mb-2">Categories</p>
                  <div className="flex flex-wrap gap-2">
                    {data.category.slice(0, 3).map((cat, i) => (
                      <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'meaning':
        return (
          <div className="space-y-6">
            {data.long_meaning && (
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Full Meaning</h3>
                <p className="text-gray-700 leading-relaxed">
                  {data.long_meaning}
                </p>
              </div>
            )}

            {data.spiritual_meaning && (
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  Spiritual Meaning
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {data.spiritual_meaning}
                </p>
              </div>
            )}

            {data.etymology && (
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Etymology</h3>
                <p className="text-gray-700 leading-relaxed">
                  {data.etymology}
                </p>
              </div>
            )}

            {/* Language variants */}
            {(data.in_arabic || data.in_urdu || data.in_hindi) && (
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  In Other Languages
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.in_arabic && (
                    <div className="p-3 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl border border-blue-200">
                      <p className="font-semibold text-blue-900">Arabic</p>
                      <p className="text-lg text-blue-700 font-bold mt-1" dir="rtl">
                        {data.in_arabic.name || data.in_arabic.meaning}
                      </p>
                    </div>
                  )}
                  {data.in_urdu && (
                    <div className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                      <p className="font-semibold text-green-900">Urdu</p>
                      <p className="text-lg text-green-700 font-bold mt-1" dir="rtl">
                        {data.in_urdu.name || data.in_urdu.meaning}
                      </p>
                    </div>
                  )}
                  {data.in_hindi && (
                    <div className="p-3 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl border border-orange-200">
                      <p className="font-semibold text-orange-900">Hindi</p>
                      <p className="text-lg text-orange-700 font-bold mt-1">
                        {data.in_hindi.name || data.in_hindi.meaning}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );

      case 'numerology':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.lucky_number && (
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl p-6">
                  <p className="text-sm font-medium opacity-90">Lucky Number</p>
                  <p className="text-5xl font-bold mt-2">{data.lucky_number}</p>
                </div>
              )}
              {data.life_path_number && (
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl p-6">
                  <p className="text-sm font-medium opacity-90">Life Path Number</p>
                  <p className="text-5xl font-bold mt-2">{data.life_path_number}</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.lucky_day && (
                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <p className="text-sm text-gray-600 font-medium mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Lucky Day
                  </p>
                  <p className="text-2xl font-bold text-gray-900">{data.lucky_day}</p>
                </div>
              )}
              {data.lucky_stone && (
                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <p className="text-sm text-gray-600 font-medium mb-2 flex items-center gap-2">
                    <Gem className="w-4 h-4" />
                    Lucky Stone
                  </p>
                  <p className="text-2xl font-bold text-gray-900">{data.lucky_stone}</p>
                </div>
              )}
            </div>

            {data.lucky_colors?.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <p className="text-sm text-gray-600 font-medium mb-4">Lucky Colors</p>
                <div className="flex flex-wrap gap-3">
                  {data.lucky_colors.map((color, i) => (
                    <div key={i} className="text-center">
                      <div
                        className="w-12 h-12 rounded-lg shadow-md border-2 border-gray-200 mb-2"
                        style={{
                          backgroundColor: color.toLowerCase().replace(/\s+/g, ''),
                        }}
                      />
                      <p className="text-xs font-medium text-gray-600">{color}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.numerology_meaning && (
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Numerology Insight</h3>
                <p className="text-gray-700 leading-relaxed">
                  {data.numerology_meaning}
                </p>
              </div>
            )}
          </div>
        );

      case 'traits':
        return (
          <div className="space-y-6">
            {data.hidden_personality_traits?.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Personality Traits
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {data.hidden_personality_traits.map((trait, i) => (
                    <div key={i} className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                      <p className="text-sm font-semibold text-blue-900">{trait}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.emotional_traits?.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Emotional Traits
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {data.emotional_traits.map((trait, i) => (
                    <div key={i} className="p-3 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg border border-pink-200">
                      <p className="text-sm font-semibold text-pink-900">{trait}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'cultural':
        return (
          <div className="space-y-6">
            {data.celebrity_usage?.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Famous People
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {data.celebrity_usage.map((celeb, i) => (
                    <div
                      key={i}
                      className="p-3 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border border-yellow-200 hover:shadow-md transition"
                    >
                      <p className="text-sm font-semibold text-gray-900">⭐ {celeb}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.cultural_impact && (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Cultural Impact</h3>
                <p className="text-gray-700 leading-relaxed">
                  {data.cultural_impact}
                </p>
              </div>
            )}

            {data.historical_references?.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Historical References
                </h3>
                <div className="space-y-3">
                  {data.historical_references.map((ref, i) => (
                    <div key={i} className="p-3 border-l-4 border-blue-500 bg-blue-50 rounded">
                      <p className="font-semibold text-gray-900">{ref.reference}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {ref.time_period} • {ref.context}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <a href="/" className="font-bold text-2xl text-indigo-600">
              NameVerse
            </a>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setBookmarked(!bookmarked)}
                className={`p-2 rounded-lg transition ${
                  bookmarked
                    ? 'bg-yellow-100 text-yellow-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Bookmark className={`w-5 h-5 ${bookmarked ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={() => setLiked(!liked)}
                className={`p-2 rounded-lg transition ${
                  liked ? 'bg-red-100 text-red-600' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Share Menu */}
          {mobileMenuOpen && (
            <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
              <button
                onClick={() => handleShare('facebook')}
                className="flex-1 p-2 bg-blue-600 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2"
              >
                <Facebook className="w-4 h-4" />
                Share
              </button>
              <button
                onClick={() => handleShare('twitter')}
                className="flex-1 p-2 bg-sky-500 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2"
              >
                <Twitter className="w-4 h-4" />
                Tweet
              </button>
              <button
                onClick={() => handleShare('whatsapp')}
                className="flex-1 p-2 bg-green-600 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Share
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex gap-2 mb-4 flex-wrap justify-center">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                {data.religion}
              </span>
              {data.gender && (
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                  {data.gender}
                </span>
              )}
              {data.origin && (
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                  {data.origin}
                </span>
              )}
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 mb-4">
              {data.name}
            </h1>

            <p className="text-xl sm:text-2xl text-gray-700 font-semibold mb-8 max-w-2xl mx-auto">
              "{data.short_meaning}"
            </p>

            {/* Quick Stats Row */}
            <div className="flex flex-wrap justify-center gap-4">
              {data.lucky_number && (
                <div className="text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-xl flex items-center justify-center text-2xl font-bold mb-2 mx-auto">
                    {data.lucky_number}
                  </div>
                  <p className="text-xs text-gray-600 font-medium">Lucky #</p>
                </div>
              )}
              {data.lucky_day && (
                <div className="text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-teal-600 text-white rounded-xl flex items-center justify-center text-sm font-bold mb-2 mx-auto">
                    {data.lucky_day.slice(0, 3)}
                  </div>
                  <p className="text-xs text-gray-600 font-medium">Lucky Day</p>
                </div>
              )}
              {data.lucky_stone && (
                <div className="text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-600 to-orange-600 text-white rounded-xl flex items-center justify-center mb-2 mx-auto">
                    <Gem className="w-6 h-6" />
                  </div>
                  <p className="text-xs text-gray-600 font-medium">{data.lucky_stone}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <div className="sticky top-[73px] z-40 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 font-medium whitespace-nowrap border-b-2 transition ${
                    activeTab === tab.id
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
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
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Content Area */}
          <div className="lg:col-span-2">
            {renderContent()}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            {/* Share Card */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-6 sticky top-40">
              <h3 className="font-bold text-gray-900 mb-4">Share This Name</h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleShare('facebook')}
                  className="flex items-center justify-center gap-1 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm"
                >
                  <Facebook className="w-4 h-4" />
                  <span className="hidden sm:inline">Facebook</span>
                </button>
                <button
                  onClick={() => handleShare('twitter')}
                  className="flex items-center justify-center gap-1 p-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition font-medium text-sm"
                >
                  <Twitter className="w-4 h-4" />
                  <span className="hidden sm:inline">Twitter</span>
                </button>
                <button
                  onClick={() => handleShare('whatsapp')}
                  className="flex items-center justify-center gap-1 p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">WhatsApp</span>
                </button>
                <button
                  onClick={() => handleShare('copy')}
                  className={`flex items-center justify-center gap-1 p-3 rounded-lg transition font-medium text-sm ${
                    copied
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <Copy className="w-4 h-4" />
                  <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Related Names */}
            {relatedNames.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-indigo-600" />
                  Related Names
                </h3>
                <div className="space-y-3">
                  {relatedNames.slice(0, 5).map((name, i) => (
                    <a
                      key={i}
                      href={`/names/${religion}/${name.slug || name.name.toLowerCase()}`}
                      className="block p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200 hover:shadow-lg transition group"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-gray-900 group-hover:text-indigo-600 transition">
                            {name.name}
                          </p>
                          <p className="text-xs text-gray-600 mt-1">{name.short_meaning || name.meaning}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition mt-1 flex-shrink-0" />
                      </div>
                    </a>
                  ))}
                </div>
                <a
                  href={`/names/${religion}`}
                  className="block mt-4 p-3 text-center text-indigo-600 font-semibold hover:text-indigo-700 transition"
                >
                  View All {religion} Names →
                </a>
              </div>
            )}
          </aside>
        </div>
      </main>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition animate-fade-in-up"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
