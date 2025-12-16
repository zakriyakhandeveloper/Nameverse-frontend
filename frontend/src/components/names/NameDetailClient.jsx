"use client"

import { useState, useEffect, useMemo, useCallback, memo } from 'react'
import { Heart, Share2, ChevronLeft, Star, Hash, Gem, Palette, Calendar, Users } from 'lucide-react'

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

const LanguageButton = memo(({ lang, config, isSelected, gradient, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
      isSelected 
        ? `bg-gradient-to-r ${gradient} text-white shadow-md` 
        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    }`}
  >
    <span>{config.flag}</span>
    <span>{config.name}</span>
  </button>
))
LanguageButton.displayName = 'LanguageButton'

export default function NameClient({ data, initialLanguage }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState(initialLanguage)

  useEffect(() => {
    try {
      const favorites = JSON.parse(localStorage.getItem('favoriteNames') || '[]')
      setIsFavorite(favorites.includes(data.slug || data.name.toLowerCase()))
    } catch (error) {
      console.error('Error loading favorites:', error)
    }
  }, [data])

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
    
    if (languageConfig[selectedLanguage]) {
      languages.add(selectedLanguage)
    }
    
    return Array.from(languages)
  }, [data, selectedLanguage, languageConfig])

  const translation = useMemo(() => {
    const langField = `in_${selectedLanguage}`
    
    if (data[langField]?.name) {
      return {
        name: data[langField].name,
        meaning: data[langField].meaning,
        longMeaning: data[langField].long_meaning
      }
    }
    
    if (data.meanings_by_language?.[selectedLanguage]) {
      return {
        name: data.meanings_by_language[selectedLanguage].name || data.name,
        meaning: data.meanings_by_language[selectedLanguage].meaning || data.short_meaning,
        longMeaning: data.meanings_by_language[selectedLanguage].long_meaning || data.long_meaning
      }
    }
    
    return {
      name: data.name,
      meaning: data.short_meaning,
      longMeaning: data.long_meaning
    }
  }, [data, selectedLanguage])

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

  const getReligionPath = useCallback(() => {
    const rel = data.religion?.toLowerCase() || 'islamic'
    if (rel === 'islam') return 'islamic'
    if (rel === 'hinduism') return 'hindu'
    if (rel === 'christianity') return 'christian'
    return rel
  }, [data.religion])

  const handleLanguageChange = useCallback((lang) => {
    const religionPath = getReligionPath()
    const namePath = data.slug || data.name.toLowerCase()
    
    const newUrl = lang === 'english'
      ? `/names/${religionPath}/${namePath}`
      : `/names/${religionPath}/${lang}/${namePath}`
    
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = newUrl
    document.head.appendChild(link)
    
    setTimeout(() => {
      window.location.href = newUrl
    }, 50)
  }, [data, getReligionPath])

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
          title: `${translation.name} - Name Meaning`,
          text: translation.meaning,
          url: window.location.href
        })
      } else {
        await navigator.clipboard.writeText(window.location.href)
        alert('Link copied to clipboard!')
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.log('Share cancelled or failed')
      }
    }
  }, [translation])

  const handleRelatedNameClick = useCallback((name) => {
    const religionPath = getReligionPath()
    window.location.href = `/names/${religionPath}/${name.toLowerCase()}`
  }, [getReligionPath])

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={() => window.history.back()} 
              className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              aria-label="Go back"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button 
              onClick={handleFavoriteToggle}
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                isFavorite 
                  ? `bg-gradient-to-r ${config.gradient} shadow-md` 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-white text-white' : 'text-gray-700'}`} />
            </button>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {availableLanguages.map(lang => (
              <LanguageButton
                key={lang}
                lang={lang}
                config={languageConfig[lang] || { name: lang, flag: '🌐' }}
                isSelected={selectedLanguage === lang}
                gradient={config.gradient}
                onClick={() => setSelectedLanguage(lang)}
              />
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col items-center text-center">
            <div className={`w-20 h-20 mb-5 rounded-2xl bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-lg`}>
              <span className="text-3xl font-bold text-white">{translation.name.charAt(0)}</span>
            </div>
            
            <h1 
              className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2" 
              dir={languageConfig[selectedLanguage]?.dir}
            >
              {translation.name}
            </h1>
            
            <p className="text-lg text-gray-600 mb-6 max-w-2xl">{translation.meaning}</p>
            
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-gradient-to-r ${config.gradient} text-white shadow-sm`}>
                {config.emoji} {religion.charAt(0).toUpperCase() + religion.slice(1)}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-700">
                {data.gender === 'female' || data.gender === 'Female' ? '👧' : '👦'} {data.gender}
              </span>
              {data.origin && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-700">
                  📍 {data.origin}
                </span>
              )}
            </div>

            <div className="flex gap-3 w-full max-w-sm">
              <button 
                onClick={handleFavoriteToggle}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  isFavorite 
                    ? `bg-gradient-to-r ${config.gradient} text-white shadow-md` 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
                {isFavorite ? 'Saved' : 'Save Name'}
              </button>
              <button 
                onClick={handleShare}
                className="px-4 py-2.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                aria-label="Share"
              >
                <Share2 className="w-4 h-4 text-gray-700" />
              </button>
            </div>
          </div>
        </div>

        {translation.longMeaning && (
          <InfoSection title="Deep Meaning" icon={Heart} gradient={config.gradient}>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {translation.longMeaning}
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

        {data.lucky_colors?.length > 0 && (
          <InfoSection title="Lucky Colors" icon={Palette} gradient={config.gradient}>
            <div className="flex flex-wrap gap-5">
              {data.lucky_colors.map((color, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div 
                    className="w-20 h-20 rounded-xl shadow-md border-2 border-white ring-1 ring-gray-200 transition-transform hover:scale-105" 
                    style={{ backgroundColor: color.toLowerCase() }} 
                  />
                  <span className="text-xs font-medium text-gray-600">{color}</span>
                </div>
              ))}
            </div>
          </InfoSection>
        )}

        {data.celebrity_usage?.length > 0 && (
          <InfoSection title="Notable Personalities" icon={Users} gradient={config.gradient}>
            <div className="space-y-3">
              {data.celebrity_usage.map((celebrity, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200 hover:border-amber-300 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-400 to-yellow-400 flex items-center justify-center flex-shrink-0">
                    <Star className="w-5 h-5 text-white fill-white" />
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed pt-1">{celebrity}</p>
                </div>
              ))}
            </div>
          </InfoSection>
        )}

        {data.related_names?.length > 0 && (
          <InfoSection title="Related Names" icon={Users} gradient={config.gradient}>
            <div className="flex flex-wrap gap-2">
              {data.related_names.map((name, i) => (
                <button
                  key={i}
                  onClick={() => handleRelatedNameClick(name)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r ${config.gradient} text-white shadow-sm hover:shadow-md transition-all hover:scale-105`}
                >
                  {name}
                </button>
              ))}
            </div>
          </InfoSection>
        )}
      </main>
    </div>
  )
}
