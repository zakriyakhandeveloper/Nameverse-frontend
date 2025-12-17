"use client"

import { useState, useEffect, useMemo, useCallback, memo } from 'react'
import { Heart, Share2, ChevronLeft, Star, Hash, Gem, Palette, Calendar, Users, Sparkles, Globe } from 'lucide-react'
import { fetchRelatedNames, fetchSimilarNames } from '@/lib/api/names'

const StatCard = memo(({ value, label, icon: Icon, gradient }) => (
  <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow">
    <div className={`w-10 h-10 mb-3 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center`}>
      <Icon className="w-5 h-5 text-white" />
    </div>
    <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
    <div className="text-xs font-medium text-gray-500 uppercase">{label}</div>
  </div>
))
StatCard.displayName = 'StatCard'

const InfoSection = memo(({ title, icon: Icon, children, gradient }) => (
  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
    <div className="px-5 py-4 border-b border-gray-100">
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
      </div>
    </div>
    <div className="p-5">{children}</div>
  </div>
))
InfoSection.displayName = 'InfoSection'

export default function NameClient({ data, initialLanguage }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [relatedNames, setRelatedNames] = useState([])
  const [similarNames, setSimilarNames] = useState([])
  const [loadingRelated, setLoadingRelated] = useState(false)
  const [loadingSimilar, setLoadingSimilar] = useState(false)

  const getReligionPath = useCallback(() => {
    const rel = data.religion?.toLowerCase() || 'islamic'
    if (rel === 'islam') return 'islamic'
    if (rel === 'hinduism') return 'hindu'
    if (rel === 'christianity') return 'christian'
    return rel
  }, [data.religion])

  useEffect(() => {
    try {
      const favorites = JSON.parse(localStorage.getItem('favoriteNames') || '[]')
      setIsFavorite(favorites.includes(data.slug || data.name.toLowerCase()))
    } catch (error) {
      
    }
  }, [data])

  useEffect(() => {
    const loadRelatedAndSimilarNames = async () => {
      const religionPath = getReligionPath()
      const slug = data.slug || data.name.toLowerCase()

      setLoadingRelated(true)
      try {
        const relatedResponse = await fetchRelatedNames(religionPath, slug, { limit: 10 })
        if (relatedResponse.success && relatedResponse.data) {
          setRelatedNames(relatedResponse.data)
        }
      } catch (error) {
        
      } finally {
        setLoadingRelated(false)
      }

      setLoadingSimilar(true)
      try {
        const similarResponse = await fetchSimilarNames(religionPath, slug, { limit: 8 })
        if (similarResponse.success && similarResponse.data) {
          setSimilarNames(similarResponse.data)
        }
      } catch (error) {
        
      } finally {
        setLoadingSimilar(false)
      }
    }

    loadRelatedAndSimilarNames()
  }, [data, getReligionPath])

  const languageConfig = useMemo(() => ({
    arabic: { name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
    urdu: { name: 'اردو', flag: '🇵🇰', dir: 'rtl' },
    hindi: { name: 'हिन्दी', flag: '🇮🇳', dir: 'ltr' },
    pashto: { name: 'پښتو', flag: '🇦🇫', dir: 'rtl' },
    english: { name: 'English', flag: '🇺🇸', dir: 'ltr' },
    hebrew: { name: 'עברית', flag: '🇮🇱', dir: 'rtl' },
    greek: { name: 'Ελληνικά', flag: '🇬🇷', dir: 'ltr' },
    latin: { name: 'Latina', flag: '🏛️', dir: 'ltr' },
    sanskrit: { name: 'संस्कृत', flag: '🇮🇳', dir: 'ltr' },
    tamil: { name: 'தமிழ்', flag: '🇮🇳', dir: 'ltr' },
    telugu: { name: 'తెలుగు', flag: '🇮🇳', dir: 'ltr' }
  }), [])

  const availableLanguages = useMemo(() => {
    const languages = new Set()
    const languageFields = ['in_arabic', 'in_urdu', 'in_hindi', 'in_pashto', 'in_english', 'in_hebrew', 'in_greek', 'in_latin', 'in_sanskrit', 'in_tamil', 'in_telugu']

    languageFields.forEach(field => {
      if (data[field]?.name) {
        languages.add(field.replace('in_', ''))
      }
    })

    if (data.language) {
      data.language.forEach(lang => languages.add(lang.toLowerCase()))
    }

    languages.add('english')

    return Array.from(languages)
  }, [data])

  const religion = useMemo(() => data.religion?.toLowerCase() || 'islamic', [data.religion])

  const religionConfig = useMemo(() => ({
    islamic: { gradient: 'from-emerald-500 to-teal-600', emoji: '☪️' },
    islam: { gradient: 'from-emerald-500 to-teal-600', emoji: '☪️' },
    hindu: { gradient: 'from-orange-500 to-red-600', emoji: '🕉️' },
    hinduism: { gradient: 'from-orange-500 to-red-600', emoji: '🕉️' },
    christian: { gradient: 'from-blue-500 to-indigo-600', emoji: '✝️' },
    christianity: { gradient: 'from-blue-500 to-indigo-600', emoji: '✝️' },
  }), [])

  const config = religionConfig[religion] || religionConfig.islamic

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
        
      }
    }
  }, [data])

  const handleRelatedNameClick = useCallback((nameObj) => {
    const religionPath = getReligionPath()
    const slug = typeof nameObj === 'string' ? nameObj.toLowerCase() : (nameObj.slug || nameObj.name.toLowerCase())
    window.location.href = `/names/${religionPath}/${slug}`
  }, [getReligionPath])

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Star },
    { id: 'languages', label: 'All Languages', icon: Globe },
    { id: 'lucky', label: 'Lucky Details', icon: Sparkles },
    { id: 'related', label: 'Related Names', icon: Users },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => window.history.back()}
              className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              aria-label="Go back"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                aria-label="Share"
              >
                <Share2 className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={handleFavoriteToggle}
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                  isFavorite
                    ? `bg-gradient-to-r ${config.gradient} shadow-md`
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-white text-white' : 'text-gray-700'}`} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`inline-flex w-24 h-24 mb-6 rounded-2xl bg-gradient-to-br ${config.gradient} items-center justify-center shadow-lg`}>
              <span className="text-4xl font-bold text-white">{data.name.charAt(0)}</span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-4">
              {data.name}
            </h1>

            <p className="text-xl text-gray-600 mb-6">{data.short_meaning}</p>

            <div className="flex flex-wrap justify-center gap-3">
              <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r ${config.gradient} text-white shadow-sm`}>
                {config.emoji} {religion.charAt(0).toUpperCase() + religion.slice(1)}
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700">
                {data.gender === 'female' || data.gender === 'Female' ? '👧' : '👦'} {data.gender}
              </span>
              {data.origin && (
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700">
                  📍 {data.origin}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-[73px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-semibold text-sm whitespace-nowrap border-b-2 transition-all ${
                  activeTab === tab.id
                    ? `border-current bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Tab Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fadeIn">
            {data.long_meaning && (
              <InfoSection title="Deep Meaning" icon={Heart} gradient={config.gradient}>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {data.long_meaning}
                </p>
              </InfoSection>
            )}

            {(data.lucky_number || data.lucky_day || data.lucky_stone || data.lucky_colors?.length > 0) && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {data.lucky_number && (
                  <StatCard value={data.lucky_number} label="Lucky Number" icon={Hash} gradient={config.gradient} />
                )}
                {data.lucky_day && (
                  <StatCard value={data.lucky_day} label="Lucky Day" icon={Calendar} gradient={config.gradient} />
                )}
                {data.lucky_stone && (
                  <StatCard value={data.lucky_stone} label="Lucky Stone" icon={Gem} gradient={config.gradient} />
                )}
                {data.lucky_colors?.length > 0 && (
                  <StatCard
                    value={data.lucky_colors.length}
                    label={`Lucky Color${data.lucky_colors.length > 1 ? 's' : ''}`}
                    icon={Palette}
                    gradient={config.gradient}
                  />
                )}
              </div>
            )}

            {data.celebrity_usage?.length > 0 && (
              <InfoSection title="Notable Personalities" icon={Users} gradient={config.gradient}>
                <div className="space-y-3">
                  {data.celebrity_usage.map((celebrity, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-yellow-400 flex items-center justify-center flex-shrink-0">
                        <Star className="w-5 h-5 text-white fill-white" />
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed pt-1">{celebrity}</p>
                    </div>
                  ))}
                </div>
              </InfoSection>
            )}
          </div>
        )}

        {/* Languages Tab - All Languages in One View */}
        {activeTab === 'languages' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Name in All Languages</h2>

              <div className="grid md:grid-cols-2 gap-6">
                {availableLanguages.map(lang => {
                  const langField = `in_${lang}`
                  const translation = data[langField] || data.meanings_by_language?.[lang] || {}
                  const langConfig = languageConfig[lang] || { name: lang, flag: '🌐', dir: 'ltr' }

                  if (!translation.name && lang !== 'english') return null

                  return (
                    <div key={lang} className={`p-5 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-all bg-gradient-to-br from-white to-gray-50`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{langConfig.flag}</span>
                          <span className="font-bold text-gray-900">{langConfig.name}</span>
                        </div>
                        <Globe className="w-5 h-5 text-gray-400" />
                      </div>

                      <div className={`space-y-3 ${langConfig.dir === 'rtl' ? 'text-right' : 'text-left'}`} dir={langConfig.dir}>
                        <div>
                          <span className="text-xs font-semibold text-gray-500 uppercase block mb-1">Name</span>
                          <p className="text-2xl font-bold text-gray-900">
                            {lang === 'english' ? data.name : (translation.name || data.name)}
                          </p>
                        </div>

                        <div>
                          <span className="text-xs font-semibold text-gray-500 uppercase block mb-1">Meaning</span>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {lang === 'english'
                              ? (data.short_meaning || data.meaning)
                              : (translation.meaning || data.short_meaning)}
                          </p>
                        </div>

                        {translation.long_meaning && (
                          <div>
                            <span className="text-xs font-semibold text-gray-500 uppercase block mb-1">Detailed Meaning</span>
                            <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">
                              {translation.long_meaning}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Lucky Details Tab */}
        {activeTab === 'lucky' && (
          <div className="space-y-6 animate-fadeIn">
            {data.lucky_colors?.length > 0 && (
              <InfoSection title="Lucky Colors" icon={Palette} gradient={config.gradient}>
                <div className="flex flex-wrap gap-6">
                  {data.lucky_colors.map((color, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <div
                        className="w-24 h-24 rounded-xl shadow-md border-2 border-white ring-1 ring-gray-200 transition-transform hover:scale-105"
                        style={{ backgroundColor: color.toLowerCase() }}
                      />
                      <span className="text-sm font-medium text-gray-600">{color}</span>
                    </div>
                  ))}
                </div>
              </InfoSection>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {data.lucky_number && (
                <InfoSection title="Lucky Number" icon={Hash} gradient={config.gradient}>
                  <div className="text-center py-6">
                    <div className={`inline-flex w-24 h-24 rounded-2xl bg-gradient-to-br ${config.gradient} items-center justify-center shadow-lg mb-4`}>
                      <span className="text-4xl font-bold text-white">{data.lucky_number}</span>
                    </div>
                    {data.numerology_meaning && (
                      <p className="text-sm text-gray-600 mt-4">{data.numerology_meaning}</p>
                    )}
                  </div>
                </InfoSection>
              )}

              {data.lucky_day && (
                <InfoSection title="Lucky Day" icon={Calendar} gradient={config.gradient}>
                  <div className="text-center py-6">
                    <p className="text-3xl font-bold text-gray-900 mb-2">{data.lucky_day}</p>
                    <p className="text-sm text-gray-600">Best day for important decisions</p>
                  </div>
                </InfoSection>
              )}

              {data.lucky_stone && (
                <InfoSection title="Lucky Stone" icon={Gem} gradient={config.gradient}>
                  <div className="text-center py-6">
                    <div className="inline-flex w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 items-center justify-center shadow-lg mb-4">
                      <Gem className="w-10 h-10 text-white" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{data.lucky_stone}</p>
                  </div>
                </InfoSection>
              )}
            </div>
          </div>
        )}

        {/* Related Names Tab */}
        {activeTab === 'related' && (
          <div className="space-y-6 animate-fadeIn">
            {(relatedNames.length > 0 || data.related_names?.length > 0) && (
              <InfoSection title="Related Names" icon={Users} gradient={config.gradient}>
                {loadingRelated ? (
                  <div className="flex gap-2 animate-pulse">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-9 w-20 bg-gray-200 rounded-lg" />
                    ))}
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {(relatedNames.length > 0 ? relatedNames : data.related_names || []).map((name, i) => {
                      const displayName = typeof name === 'string' ? name : name.name
                      const meaning = typeof name === 'object' ? name.short_meaning : null
                      return (
                        <button
                          key={i}
                          onClick={() => handleRelatedNameClick(name)}
                          className={`group relative p-4 rounded-lg text-left bg-gradient-to-r ${config.gradient} text-white shadow-sm hover:shadow-md transition-all hover:scale-105`}
                        >
                          <div className="font-bold text-lg mb-1">{displayName}</div>
                          {meaning && <div className="text-sm text-white/80">{meaning}</div>}
                        </button>
                      )
                    })}
                  </div>
                )}
              </InfoSection>
            )}

            {similarNames.length > 0 && (
              <InfoSection title="Similar Names" icon={Sparkles} gradient={config.gradient}>
                {loadingSimilar ? (
                  <div className="flex gap-2 animate-pulse">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-9 w-20 bg-gray-200 rounded-lg" />
                    ))}
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {similarNames.map((name, i) => (
                      <button
                        key={i}
                        onClick={() => handleRelatedNameClick(name)}
                        className="group relative p-4 rounded-lg text-left border-2 border-gray-300 bg-white text-gray-700 hover:border-gray-400 shadow-sm hover:shadow-md transition-all hover:scale-105"
                      >
                        <div className="font-bold text-lg mb-1">{name.name}</div>
                        {name.short_meaning && <div className="text-sm text-gray-600">{name.short_meaning}</div>}
                      </button>
                    ))}
                  </div>
                )}
              </InfoSection>
            )}
          </div>
        )}
      </main>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  )
}
