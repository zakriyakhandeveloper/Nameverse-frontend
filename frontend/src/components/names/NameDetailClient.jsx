"use client"

import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import {
  Sparkles, BookOpen, Book, Heart, Brain, Gem, Calendar, Palette, Hash,
  Languages, Volume2, Users, Link2, Share2, Bookmark,
  Globe, ChevronDown, ChevronUp, Home, History, Star,
  MessageCircle, Copy, Check, ExternalLink, ArrowLeft
} from 'lucide-react'

const religionThemes = {
  islamic: {
    primary: "#059669",
    gradient: "from-emerald-600 to-teal-600",
    text: "text-emerald-700",
    bg: "bg-emerald-50",
    ring: "ring-emerald-500"
  },
  christian: {
    primary: "#2563eb",
    gradient: "from-blue-600 to-indigo-600",
    text: "text-blue-700",
    bg: "bg-blue-50",
    ring: "ring-blue-500"
  },
  hindu: {
    primary: "#ea580c",
    gradient: "from-orange-600 to-amber-600",
    text: "text-orange-700",
    bg: "bg-orange-50",
    ring: "ring-orange-500"
  }
}

const Badge = ({ children, className = '', ...props }) => (
  <span 
    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${className}`}
    {...props}
  >
    {children}
  </span>
)

const Card = ({ children, className = '' }) => (
  <div 
    className={`bg-white rounded-2xl p-5 shadow-sm border border-gray-100 ${className}`}
  >
    {children}
  </div>
)

export default function NameDetailClient({ data }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [copied, setCopied] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState('all')

  const religion = data.religion?.toLowerCase() || 'islamic'
  const theme = religionThemes[religion] || religionThemes.islamic
  const nativeScriptName = data.in_arabic?.name || data.in_hebrew?.name || data.in_sanskrit?.name || data.name

  useEffect(() => {
    setMounted(true)
    try {
      const favorites = JSON.parse(localStorage.getItem('favoriteNames') || '[]')
      setIsFavorite(favorites.includes(data.slug || data.name.toLowerCase()))
    } catch (e) {}
  }, [data])

  const handleFavoriteToggle = useCallback(() => {
    try {
      const favorites = JSON.parse(localStorage.getItem('favoriteNames') || '[]')
      const nameId = data.slug || data.name.toLowerCase()
      if (favorites.includes(nameId)) {
        localStorage.setItem('favoriteNames', JSON.stringify(favorites.filter(id => id !== nameId)))
        setIsFavorite(false)
      } else {
        favorites.push(nameId)
        localStorage.setItem('favoriteNames', JSON.stringify(favorites))
        setIsFavorite(true)
      }
    } catch (e) {}
  }, [data])

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(data.name)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (e) {}
  }, [data.name])

  const handleShare = useCallback(async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${data.name} - Baby Name`,
          text: `${data.name}: ${data.short_meaning}`,
          url: window.location.href
        })
      } else {
        await navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch (e) {}
  }, [data])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-emerald-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Top Navigation */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href={`/names/${religion}`} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
            <ArrowLeft size={20} className="text-gray-600" />
          </a>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Share"
            >
              <Share2 size={20} className="text-gray-600" />
            </button>
            <button
              onClick={handleFavoriteToggle}
              className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${isFavorite ? 'text-red-500' : 'text-gray-600'}`}
              aria-label="Favorite"
            >
              <Bookmark size={20} className={isFavorite ? 'fill-current' : ''} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-8 pb-6">
        {/* Hero Name Section */}
        <div className="text-center mb-10">
          <div className="mb-4">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight mb-1">
              {data.name}
            </h1>
            {nativeScriptName !== data.name && (
              <p className="text-2xl md:text-3xl text-gray-500 font-arabic">
                {nativeScriptName}
              </p>
            )}
          </div>

          <p className="text-xl md:text-2xl text-gray-700 font-medium max-w-2xl mx-auto mb-6">
            "{data.short_meaning || data.meaning}"
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <Badge className={`${theme.bg} ${theme.text}`}>
              <Globe size={14} />
              {data.origin || 'Ancient'}
            </Badge>
            <Badge className="bg-gray-100 text-gray-700">
              <Users size={14} />
              {data.gender || 'Unisex'}
            </Badge>
            <Badge className="bg-gray-100 text-gray-700 capitalize">
              {religion}
            </Badge>
            {data.luckyNumber && (
              <Badge className="bg-amber-50 text-amber-700">
                <Star size={14} />
                {data.luckyNumber}
              </Badge>
            )}
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={handleCopy}
              className={`px-5 py-2.5 rounded-full font-medium transition-all flex items-center gap-2 ${copied ? 'bg-emerald-500 text-white' : 'bg-gray-900 text-white hover:bg-gray-800'}`}
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? 'Copied' : 'Copy Name'}
            </button>
            <button
              onClick={handleFavoriteToggle}
              className={`px-5 py-2.5 rounded-full font-medium transition-all flex items-center gap-2 border-2 ${
                isFavorite 
                  ? 'bg-red-500 border-red-500 text-white' 
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              <Bookmark size={18} className={isFavorite ? 'fill-white' : ''} />
              {isFavorite ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {data.gender && (
            <Card className="text-center">
              <div className="text-xs font-medium text-gray-500 uppercase mb-1">Gender</div>
              <div className="text-lg font-semibold text-gray-900 capitalize">{data.gender}</div>
            </Card>
          )}
          {data.origin && (
            <Card className="text-center">
              <div className="text-xs font-medium text-gray-500 uppercase mb-1">Origin</div>
              <div className="text-lg font-semibold text-gray-900">{data.origin}</div>
            </Card>
          )}
          {data.luckyNumber && (
            <Card className="text-center">
              <div className="text-xs font-medium text-gray-500 uppercase mb-1">Lucky #</div>
              <div className="text-lg font-semibold text-amber-600">{data.luckyNumber}</div>
            </Card>
          )}
          {data.lucky_day && (
            <Card className="text-center">
              <div className="text-xs font-medium text-gray-500 uppercase mb-1">Lucky Day</div>
              <div className="text-lg font-semibold text-gray-900">{data.lucky_day}</div>
            </Card>
          )}
        </div>

        {/* Main Meaning */}
        <Card className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <BookOpen size={18} className={theme.text} />
            Meaning
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {data.long_meaning || data.short_meaning}
          </p>
        </Card>

        {/* Additional Info Grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {data.spiritual_meaning && (
            <Card>
              <h3 className="text-md font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Heart size={16} className="text-rose-500" />
                Spiritual
              </h3>
              <p className="text-gray-700 text-sm">{data.spiritual_meaning}</p>
            </Card>
          )}
          {data.numerology_meaning && (
            <Card>
              <h3 className="text-md font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Sparkles size={16} className="text-amber-500" />
                Numerology
              </h3>
              <p className="text-gray-700 text-sm">{data.numerology_meaning}</p>
            </Card>
          )}
        </div>

        {/* Categories & Themes */}
        {(data.category?.length || data.themes?.length) && (
          <Card className="mb-6">
            <div className="grid md:grid-cols-2 gap-4">
              {data.category?.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {data.category.map((cat, i) => (
                      <Badge key={i} className="bg-gray-100 text-gray-700">{cat}</Badge>
                    ))}
                  </div>
                </div>
              )}
              {data.themes?.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">Themes</h3>
                  <div className="flex flex-wrap gap-2">
                    {data.themes.map((t, i) => (
                      <Badge key={i} className="bg-purple-50 text-purple-700">{t}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Pronunciation */}
        {data.pronunciation && (
          <Card className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Volume2 size={18} className={theme.text} />
              Pronunciation
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className={`p-4 rounded-xl ${theme.bg}`}>
                <div className="text-xs font-medium text-gray-500 uppercase mb-1">English</div>
                <div className="text-xl font-semibold text-gray-900">
                  {data.pronunciation.english || data.pronunciation}
                </div>
              </div>
              {data.pronunciation.urdu && (
                <div className="p-4 rounded-xl bg-gray-50 text-right">
                  <div className="text-xs font-medium text-gray-500 uppercase mb-1">Urdu</div>
                  <div className="text-xl font-semibold text-gray-900 font-arabic">
                    {data.pronunciation.urdu}
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Personality Traits */}
        {(data.emotional_traits?.length || data.hidden_personality_traits?.length) && (
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {data.emotional_traits?.length > 0 && (
              <Card>
                <h3 className="text-md font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Heart size={16} className="text-rose-500" />
                  Emotional Traits
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.emotional_traits.map((t, i) => (
                    <Badge key={i} className="bg-rose-50 text-rose-700">{t}</Badge>
                  ))}
                </div>
              </Card>
            )}
            {data.hidden_personality_traits?.length > 0 && (
              <Card>
                <h3 className="text-md font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Sparkles size={16} className="text-amber-500" />
                  Hidden Traits
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.hidden_personality_traits.map((t, i) => (
                    <Badge key={i} className="bg-amber-50 text-amber-700">{t}</Badge>
                  ))}
                </div>
              </Card>
            )}
          </div>
        )}

        {/* Lucky Colors */}
        {data.lucky_colors?.length > 0 && (
          <Card className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Palette size={18} className={theme.text} />
              Lucky Colors
            </h2>
            <div className="flex flex-wrap gap-4">
              {data.lucky_colors.map((color, i) => {
                const colors = {
                  red: '#EF4444', blue: '#3B82F6', green: '#10B981', yellow: '#F59E0B',
                  purple: '#A855F7', pink: '#EC4899', orange: '#F97316', teal: '#14B8A6'
                }
                return (
                  <div key={i} className="text-center">
                    <div
                      className="w-12 h-12 rounded-full shadow-sm border-2 border-white"
                      style={{ backgroundColor: colors[color?.toLowerCase()] || '#6B7280' }}
                    />
                    <div className="text-xs text-gray-600 capitalize mt-1">{color}</div>
                  </div>
                )
              })}
            </div>
          </Card>
        )}

        {/* Translations */}
        {Object.keys(data).filter(k => k.startsWith('in_') && data[k]?.name).length > 0 && (
          <Card className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Languages size={18} className={theme.text} />
              Translations
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {Object.entries(data)
                .filter(([key]) => key.startsWith('in_') && data[key]?.name)
                .map(([key, val]) => {
                  const langNames = { in_arabic: 'Arabic', in_urdu: 'Urdu', in_hindi: 'Hindi', 
                    in_pashto: 'Pashto', in_hebrew: 'Hebrew', in_greek: 'Greek', 
                    in_latin: 'Latin', in_sanskrit: 'Sanskrit', in_tamil: 'Tamil', in_telugu: 'Telugu' }
                  return (
                    <div key={key} className="p-3 bg-gray-50 rounded-xl">
                      <div className="text-xs font-medium text-gray-500 uppercase mb-1">{langNames[key] || key.replace('in_', '')}</div>
                      <div className="text-lg font-semibold text-gray-900">{val.name}</div>
                      {val.meaning && <div className="text-sm text-gray-600 mt-1">{val.meaning}</div>}
                    </div>
                  )
                }
            </div>
          </Card>
        )}

        {/* Origin & History */}
        {data.origin && (
          <Card className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <History size={18} className={theme.text} />
              Origin & History
            </h2>
            <p className="text-gray-700 leading-relaxed">
              The name <strong>{data.name}</strong> originates from {data.origin} and has been used for generations within {religion} communities for centuries. It carries deep cultural significance and traditional meaning.
            </p>
          </Card>
        )}

        {/* Celebrity Usage */}
        {data.celebrity_usage?.length > 0 && (
          <Card className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Users size={18} className={theme.text} />
              Famous People Named {data.name}
            </h2>
            <div className="flex flex-wrap gap-3">
              {data.celebrity_usage.map((person, i) => (
                <Badge key={i} className="bg-gray-100 text-gray-700">{person}</Badge>
              ))}
            </div>
          </Card>
        )}

        {/* Similar Names */}
        {(data.related_names?.length || data.similar_sounding_names?.length) && (
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {data.related_names?.length > 0 && (
              <Card>
                <h3 className="text-md font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Link2 size={16} className={theme.text} />
                  Related Names
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.related_names.map((name, i) => (
                    <a
                      key={i}
                      href={`/names/${religion}/${name.toLowerCase()}`}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors`}
                    >
                      {name}
                    </a>
                  ))}
                </div>
              </Card>
            )}
            {data.similar_sounding_names?.length > 0 && (
              <Card>
                <h3 className="text-md font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Volume2 size={16} className={theme.text} />
                  Similar Sounding
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.similar_sounding_names.map((name, i) => (
                    <a
                      key={i}
                      href={`/names/${religion}/${name.toLowerCase()}`}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors`}
                    >
                      {name}
                    </a>
                  ))}
                </div>
              </Card>
            )}
          </div>
        )}
        )}

        {/* Footer CTA */}
        <div className="mt-8 text-center bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Found the perfect name?</h2>
          <p className="text-gray-600 mb-4">Share with family or save for later</p>
          <div className="flex justify-center gap-3">
            <button
              onClick={handleShare}
              className={`px-6 py-2.5 rounded-full font-medium bg-gray-900 text-white hover:bg-gray-800 transition-all flex items-center gap-2`}
            >
              <Share2 size={18} />
              Share
            </button>
            <button
              onClick={handleFavoriteToggle}
              className={`px-6 py-2.5 rounded-full font-medium transition-all flex items-center gap-2 border-2 ${
                isFavorite
                  ? 'bg-red-500 border-red-500 text-white'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              <Bookmark size={18} className={isFavorite ? 'fill-white' : ''} />
              {isFavorite ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        .font-arabic {
          font-family: 'Noto Sans Arabic', 'Noto Nastaliq Urdu', serif;
        }
      `}</style>
    </div>
  )
}
