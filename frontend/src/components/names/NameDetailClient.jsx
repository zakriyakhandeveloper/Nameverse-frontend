"use client"

import { useState, useEffect, useMemo, useCallback } from 'react'
import {
  Sparkles, BookOpen, Heart, Brain, Gem, Calendar, Palette, Hash,
  Languages, Volume2, Users, Link2, Tag, Book, Share2, Bookmark,
  TrendingUp, Globe, Star, MessageCircle, ChevronDown, ChevronUp
} from 'lucide-react'

// Religion-based theme configuration
const religionThemes = {
  Islam: {
    primary: "#10B981",
    secondary: "#059669",
    accent: "#D97706",
    gradient: "from-emerald-600 to-teal-600",
    light: "bg-emerald-50",
    border: "border-emerald-200",
    iconColor: "text-emerald-600",
    bgGradient: "bg-gradient-to-br from-emerald-500 to-teal-600"
  },
  islamic: {
    primary: "#10B981",
    secondary: "#059669",
    accent: "#D97706",
    gradient: "from-emerald-600 to-teal-600",
    light: "bg-emerald-50",
    border: "border-emerald-200",
    iconColor: "text-emerald-600",
    bgGradient: "bg-gradient-to-br from-emerald-500 to-teal-600"
  },
  Christianity: {
    primary: "#3B82F6",
    secondary: "#1D4ED8",
    accent: "#DC2626",
    gradient: "from-blue-600 to-indigo-600",
    light: "bg-blue-50",
    border: "border-blue-200",
    iconColor: "text-blue-600",
    bgGradient: "bg-gradient-to-br from-blue-500 to-indigo-600"
  },
  christian: {
    primary: "#3B82F6",
    secondary: "#1D4ED8",
    accent: "#DC2626",
    gradient: "from-blue-600 to-indigo-600",
    light: "bg-blue-50",
    border: "border-blue-200",
    iconColor: "text-blue-600",
    bgGradient: "bg-gradient-to-br from-blue-500 to-indigo-600"
  },
  Hinduism: {
    primary: "#F97316",
    secondary: "#EA580C",
    accent: "#FDE047",
    gradient: "from-orange-600 to-amber-600",
    light: "bg-orange-50",
    border: "border-orange-200",
    iconColor: "text-orange-600",
    bgGradient: "bg-gradient-to-br from-orange-500 to-amber-600"
  },
  hindu: {
    primary: "#F97316",
    secondary: "#EA580C",
    accent: "#FDE047",
    gradient: "from-orange-600 to-amber-600",
    light: "bg-orange-50",
    border: "border-orange-200",
    iconColor: "text-orange-600",
    bgGradient: "bg-gradient-to-br from-orange-500 to-amber-600"
  }
}

// Badge Component
const Badge = ({ children, icon: Icon, className = "" }) => (
  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${className}`}>
    {Icon && <Icon size={16} />}
    {children}
  </div>
)

// Section Header Component
const SectionHeader = ({ icon: Icon, title, theme }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${theme.gradient} flex items-center justify-center shadow-lg`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
  </div>
)

// Meaning Card Component
const MeaningCard = ({ icon: Icon, title, content, theme }) => (
  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
    <div className="flex items-center gap-3 mb-4">
      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${theme.gradient} flex items-center justify-center`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <h3 className="text-lg font-bold text-gray-900">{title}</h3>
    </div>
    <p className="text-gray-700 leading-relaxed">{content}</p>
  </div>
)

// Translation Card Component
const TranslationCard = ({ language, nativeName, meaning, longMeaning, flag }) => {
  const [expanded, setExpanded] = useState(false)
  const isRTL = ['Arabic', 'Urdu', 'Pashto', 'Hebrew'].includes(language)

  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{flag}</span>
          <div>
            <h4 className="font-bold text-gray-900">{language}</h4>
          </div>
        </div>
        <Globe className="text-gray-400" size={20} />
      </div>

      <div className={`space-y-3 ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        <div>
          <span className="text-xs font-semibold text-gray-500 uppercase block mb-1">Name</span>
          <p className={`text-2xl font-bold text-gray-900 ${isRTL ? 'font-arabic' : ''}`}>{nativeName}</p>
        </div>

        <div>
          <span className="text-xs font-semibold text-gray-500 uppercase block mb-1">Meaning</span>
          <p className="text-sm text-gray-700 leading-relaxed">{meaning}</p>
        </div>

        {longMeaning && (
          <div>
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              {expanded ? 'Show Less' : 'Show More'}
            </button>
            {expanded && (
              <p className="text-sm text-gray-600 leading-relaxed mt-2">{longMeaning}</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// Insight Card Component
const InsightCard = ({ icon: Icon, title, items, value, description, color }) => (
  <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-all">
    <div className="flex items-center gap-3 mb-4">
      <div className={`w-10 h-10 rounded-lg bg-${color}-100 flex items-center justify-center`}>
        <Icon className={`w-5 h-5 text-${color}-600`} />
      </div>
      <h4 className="font-bold text-gray-900">{title}</h4>
    </div>

    {items && (
      <div className="flex flex-wrap gap-2">
        {items.map((item, idx) => (
          <span key={idx} className={`px-3 py-1 rounded-full text-xs font-medium bg-${color}-50 text-${color}-700`}>
            {item}
          </span>
        ))}
      </div>
    )}

    {value && (
      <div className="text-center">
        <div className={`text-4xl font-bold text-${color}-600 mb-2`}>{value}</div>
        {description && <p className="text-sm text-gray-600">{description}</p>}
      </div>
    )}
  </div>
)

// FAQ Accordion Component
const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-6 py-4 text-left font-semibold text-gray-900 hover:bg-gray-50 flex justify-between items-center"
      >
        <span>{question}</span>
        {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {open && (
        <div className="px-6 py-4 bg-gray-50 text-gray-700 leading-relaxed border-t border-gray-200">
          {answer}
        </div>
      )}
    </div>
  )
}

// Main Component
export default function NameClient({ data, initialLanguage }) {
  const [isFavorite, setIsFavorite] = useState(false)

  // Get religion theme
  const religion = data.religion?.toLowerCase() || 'islamic'
  const theme = religionThemes[religion] || religionThemes.islamic

  // Get native script name
  const nativeScriptName = data.in_arabic?.name || data.in_hebrew?.name || data.in_sanskrit?.name || data.name

  // Available translations
  const availableTranslations = useMemo(() => {
    const translations = []

    if (data.in_arabic) translations.push({ key: 'in_arabic', language: 'Arabic', flag: '🇸🇦', ...data.in_arabic })
    if (data.in_urdu) translations.push({ key: 'in_urdu', language: 'Urdu', flag: '🇵🇰', ...data.in_urdu })
    if (data.in_hindi) translations.push({ key: 'in_hindi', language: 'Hindi', flag: '🇮🇳', ...data.in_hindi })
    if (data.in_pashto) translations.push({ key: 'in_pashto', language: 'Pashto', flag: '🇦🇫', ...data.in_pashto })
    if (data.in_hebrew) translations.push({ key: 'in_hebrew', language: 'Hebrew', flag: '🇮🇱', ...data.in_hebrew })
    if (data.in_greek) translations.push({ key: 'in_greek', language: 'Greek', flag: '🇬🇷', ...data.in_greek })
    if (data.in_latin) translations.push({ key: 'in_latin', language: 'Latin', flag: '🏛️', ...data.in_latin })
    if (data.in_sanskrit) translations.push({ key: 'in_sanskrit', language: 'Sanskrit', flag: '🕉️', ...data.in_sanskrit })
    if (data.in_tamil) translations.push({ key: 'in_tamil', language: 'Tamil', flag: '🇮🇳', ...data.in_tamil })
    if (data.in_telugu) translations.push({ key: 'in_telugu', language: 'Telugu', flag: '🇮🇳', ...data.in_telugu })

    return translations
  }, [data])

  useEffect(() => {
    try {
      const favorites = JSON.parse(localStorage.getItem('favoriteNames') || '[]')
      setIsFavorite(favorites.includes(data.slug || data.name.toLowerCase()))
    } catch (error) {
      console.error('Error loading favorites:', error)
    }
  }, [data])

  const handleFavoriteToggle = useCallback(() => {
    try {
      const favorites = JSON.parse(localStorage.getItem('favoriteNames') || '[]')
      const nameId = data.slug || data.name.toLowerCase()

      if (favorites.includes(nameId)) {
        const updated = favorites.filter(id => id !== nameId)
        localStorage.setItem('favoriteNames', JSON.stringify(updated))
        setIsFavorite(false)
      } else {
        favorites.push(nameId)
        localStorage.setItem('favoriteNames', JSON.stringify(favorites))
        setIsFavorite(true)
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
    }
  }, [data])

  const handleShare = useCallback(async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${data.name} - Name Meaning`,
          text: data.short_meaning,
          url: window.location.href
        })
      } else {
        await navigator.clipboard.writeText(window.location.href)
        alert('Link copied to clipboard!')
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error sharing:', error)
      }
    }
  }, [data])

  const getColorHex = (colorName) => {
    const colors = {
      red: '#EF4444', blue: '#3B82F6', green: '#10B981', yellow: '#F59E0B',
      purple: '#A855F7', pink: '#EC4899', orange: '#F97316', teal: '#14B8A6',
      indigo: '#6366F1', emerald: '#10B981', rose: '#F43F5E', amber: '#F59E0B'
    }
    return colors[colorName.toLowerCase()] || '#6B7280'
  }

  // Generate FAQ data
  const faqData = data.seo?.faq || [
    {
      q: `What does the name ${data.name} mean?`,
      a: data.long_meaning || data.short_meaning || `${data.name} is a beautiful ${religion} name.`
    },
    {
      q: `What is the origin of ${data.name}?`,
      a: `${data.name} originates from ${data.origin || 'ancient traditions'} and is commonly used in ${religion} cultures.`
    },
    {
      q: `Is ${data.name} a ${data.gender} name?`,
      a: `Yes, ${data.name} is traditionally used as a ${data.gender} name.`
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className={`bg-gradient-to-br ${theme.gradient} py-12 sm:py-16 px-4`}>
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="text-sm mb-6 text-white/80">
            <a href="/" className="hover:text-white">Home</a> &gt;
            <a href={`/names/${religion}`} className="hover:text-white ml-1">{religion} Names</a> &gt;
            <a href={`/names/${religion}/${data.gender?.toLowerCase()}`} className="hover:text-white ml-1">{data.gender}</a> &gt;
            <span className="text-white ml-1">{data.name}</span>
          </nav>

          {/* Main Name Display */}
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-6xl font-bold mb-4 text-white">
              {data.name}
            </h1>

            {/* Native Script */}
            <p className="text-3xl sm:text-4xl mb-6 text-white/90" style={{ fontFamily: 'serif' }}>
              {nativeScriptName}
            </p>

            {/* Quick Info Pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <Badge icon={Globe} className="bg-white/20 text-white backdrop-blur-sm">
                {data.origin || 'Ancient'}
              </Badge>
              <Badge icon={Users} className="bg-white/20 text-white backdrop-blur-sm">
                {data.gender || 'Unisex'}
              </Badge>
              <Badge className="bg-white/20 text-white backdrop-blur-sm">
                {religion}
              </Badge>
              <Badge icon={TrendingUp} className="bg-white/20 text-white backdrop-blur-sm">
                Popular
              </Badge>
            </div>

            {/* Short Meaning */}
            <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              "{data.short_meaning || data.meaning}"
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={handleShare}
                className="px-6 py-3 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all flex items-center gap-2 shadow-lg"
              >
                <Share2 size={20} />
                Share
              </button>
              <button
                onClick={handleFavoriteToggle}
                className={`px-6 py-3 rounded-full font-semibold transition-all flex items-center gap-2 shadow-lg ${
                  isFavorite
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-white text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Bookmark size={20} className={isFavorite ? 'fill-white' : ''} />
                {isFavorite ? 'Saved' : 'Save'}
              </button>
              {data.pronunciation && (
                <button className="px-6 py-3 bg-white/20 text-white backdrop-blur-sm rounded-full font-semibold hover:bg-white/30 transition-all flex items-center gap-2">
                  <Volume2 size={20} />
                  Pronounce
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Meanings Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <MeaningCard
              icon={BookOpen}
              title="Meaning"
              content={data.long_meaning || data.short_meaning}
              theme={theme}
            />
            {data.spiritual_meaning && (
              <MeaningCard
                icon={Heart}
                title="Spiritual Significance"
                content={data.spiritual_meaning}
                theme={theme}
              />
            )}
            {data.themes && data.themes.length > 0 && (
              <MeaningCard
                icon={Sparkles}
                title="Symbolism"
                content={data.themes.join(", ")}
                theme={theme}
              />
            )}
          </div>
        </div>
      </section>

      {/* Multilingual Translations */}
      {availableTranslations.length > 0 && (
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <SectionHeader icon={Languages} title="Translations" theme={theme} />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableTranslations.map(trans => (
                <TranslationCard
                  key={trans.key}
                  language={trans.language}
                  nativeName={trans.name}
                  meaning={trans.meaning}
                  longMeaning={trans.long_meaning}
                  flag={trans.flag}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pronunciation Guide */}
      {data.pronunciation && (
        <section className="py-12 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <SectionHeader icon={Volume2} title="How to Pronounce" theme={theme} />

            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">English</h3>
                  <p className="text-3xl font-bold text-purple-600 mb-2">
                    {data.pronunciation.english || data.pronunciation}
                  </p>
                  {data.pronunciation.ipa && (
                    <p className="text-gray-600">IPA: {data.pronunciation.ipa}</p>
                  )}
                </div>

                {data.pronunciation.urdu && (
                  <div className="text-right">
                    <h3 className="text-lg font-semibold mb-3 text-gray-900">Urdu</h3>
                    <p className="text-2xl font-arabic text-purple-600">
                      {data.pronunciation.urdu}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Personality & Numerology */}
      {(data.emotional_traits || data.hidden_personality_traits || data.life_path_number || data.lucky_day) && (
        <section className="py-12 px-4 bg-gradient-to-br from-indigo-50 to-purple-50">
          <div className="max-w-6xl mx-auto">
            <SectionHeader icon={Brain} title="Personality Insights" theme={theme} />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.emotional_traits && data.emotional_traits.length > 0 && (
                <InsightCard
                  icon={Heart}
                  title="Emotional Traits"
                  items={data.emotional_traits}
                  color="rose"
                />
              )}

              {data.hidden_personality_traits && data.hidden_personality_traits.length > 0 && (
                <InsightCard
                  icon={Sparkles}
                  title="Hidden Traits"
                  items={data.hidden_personality_traits}
                  color="amber"
                />
              )}

              {data.life_path_number && (
                <InsightCard
                  icon={Hash}
                  title="Life Path Number"
                  value={data.life_path_number}
                  description={data.numerology_meaning}
                  color="blue"
                />
              )}

              {data.lucky_day && (
                <InsightCard
                  icon={Calendar}
                  title="Lucky Day"
                  value={data.lucky_day}
                  color="green"
                />
              )}
            </div>

            {/* Lucky Colors & Stone */}
            {(data.lucky_colors || data.lucky_stone) && (
              <div className="mt-8 grid md:grid-cols-2 gap-6">
                {data.lucky_colors && data.lucky_colors.length > 0 && (
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <Palette className="text-pink-600" size={28} />
                      <h3 className="text-xl font-bold text-gray-900">Lucky Colors</h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {data.lucky_colors.map((color, idx) => (
                        <div key={idx} className="text-center">
                          <div
                            className="w-16 h-16 rounded-full shadow-md mb-2"
                            style={{ backgroundColor: getColorHex(color) }}
                            title={color}
                          />
                          <span className="text-xs text-gray-600">{color}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {data.lucky_stone && (
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center gap-3 mb-4">
                      <Gem className="text-purple-600" size={28} />
                      <h3 className="text-xl font-bold text-gray-900">Lucky Stone</h3>
                    </div>
                    <p className="text-2xl font-semibold text-purple-600">
                      {data.lucky_stone}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Biblical/Vedic Reference */}
      {data.biblical_reference && data.biblical_reference.is_biblical && (
        <section className="py-12 px-4 bg-blue-50">
          <div className="max-w-4xl mx-auto">
            <SectionHeader icon={Book} title="Biblical Reference" theme={theme} />

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="mb-4">
                <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                  {data.biblical_reference.verse_reference}
                </span>
              </div>
              <p className="text-lg text-gray-700 mb-4">
                {data.biblical_reference.origin_scripture}
              </p>
              <p className="text-gray-600 italic">
                {data.biblical_reference.note}
              </p>
            </div>
          </div>
        </section>
      )}

      {data.vedic_reference && data.vedic_reference.is_vedic && (
        <section className="py-12 px-4 bg-orange-50">
          <div className="max-w-4xl mx-auto">
            <SectionHeader icon={Book} title="Vedic Origin" theme={theme} />

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="mb-4">
                <span className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold">
                  {data.vedic_reference.root_origin}
                </span>
              </div>
              <p className="text-lg text-gray-700">
                {data.vedic_reference.note}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Celebrity Usage */}
      {data.celebrity_usage && data.celebrity_usage.length > 0 && (
        <section className="py-12 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <SectionHeader icon={Users} title={`Famous People Named ${data.name}`} theme={theme} />

            <div className="grid md:grid-cols-3 gap-6">
              {data.celebrity_usage.map((celebrity, idx) => (
                <div key={idx} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className={`w-16 h-16 bg-gradient-to-br ${theme.gradient} rounded-full mb-4 flex items-center justify-center text-white text-2xl font-bold`}>
                    {celebrity.charAt(0)}
                  </div>
                  <h4 className="font-semibold text-lg text-gray-900">{celebrity}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related & Similar Names */}
      {((data.related_names && data.related_names.length > 0) || (data.similar_sounding_names && data.similar_sounding_names.length > 0)) && (
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {data.related_names && data.related_names.length > 0 && (
                <div>
                  <SectionHeader icon={Link2} title="Related Names" theme={theme} />
                  <div className="flex flex-wrap gap-3">
                    {data.related_names.map((relatedName, idx) => (
                      <a
                        key={idx}
                        href={`/names/${religion}/${relatedName.toLowerCase()}`}
                        className={`px-4 py-2 bg-white rounded-full border-2 ${theme.border} hover:bg-gradient-to-r hover:${theme.gradient} hover:text-white transition font-semibold`}
                      >
                        {relatedName}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {data.similar_sounding_names && data.similar_sounding_names.length > 0 && (
                <div>
                  <SectionHeader icon={Volume2} title="Similar Sounding Names" theme={theme} />
                  <div className="flex flex-wrap gap-3">
                    {data.similar_sounding_names.map((similarName, idx) => (
                      <a
                        key={idx}
                        href={`/names/${religion}/${similarName.toLowerCase()}`}
                        className="px-4 py-2 bg-white rounded-full border-2 border-gray-200 hover:border-green-500 hover:text-green-600 transition font-semibold"
                      >
                        {similarName}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {faqData.length > 0 && (
        <section className="py-12 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <SectionHeader icon={MessageCircle} title="Frequently Asked Questions" theme={theme} />

            <div className="space-y-4">
              {faqData.map((faq, idx) => (
                <FAQItem key={idx} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Social Sharing Section */}
      {data.social_tags && data.social_tags.length > 0 && (
        <section className="py-12 px-4 bg-gradient-to-r from-pink-50 to-purple-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Share This Beautiful Name</h2>

            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {data.social_tags.map((tag, idx) => (
                <span key={idx} className="px-4 py-2 bg-white rounded-full text-sm font-semibold text-gray-700 shadow">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleShare}
                className={`px-6 py-3 bg-gradient-to-r ${theme.gradient} text-white rounded-full font-semibold hover:shadow-lg transition-all`}
              >
                <Share2 size={20} className="inline mr-2" />
                Share Now
              </button>
            </div>
          </div>
        </section>
      )}

      <style jsx>{`
        .font-arabic {
          font-family: 'Noto Sans Arabic', 'Noto Nastaliq Urdu', serif;
        }
      `}</style>
    </div>
  )
}
