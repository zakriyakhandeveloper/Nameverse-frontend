import { cache } from 'react'
import Link from 'next/link'
import { fetchNameDetail } from '@/lib/api/names'
import NameDataContext from './NameDataContext'
import TabNavigation from './TabNavigation'

// Cache the API call using React cache() - this ensures only ONE request per render cycle
const getNameData = cache(async (religion, name) => {
  console.log(`🔍 LAYOUT CALLING API: /api/v1/names/${religion}/${name}`)
  
  // Use the actual API endpoint /api/v1/names/:religion/:slug
  const result = await fetchNameDetail(religion, name)
  
  // Handle null response gracefully
  if (!result) {
    return {
      name: name,
      religion: religion,
      short_meaning: 'Name meaning not available',
      long_meaning: 'This name is not currently in our database. Please check back later for updates.',
      origin: 'Unknown',
      gender: 'Unknown',
      popularity_score: 0,
      lucky_number: 0,
      lucky_day: 'Unknown',
      lucky_colors: [],
      lucky_stone: 'Unknown',
      life_path_number: 0,
      numerology_meaning: 'Numerology information not available',
      pronunciation: { english: 'Unknown', hindi: 'Unknown', ipa: 'Unknown' },
      hidden_personality_traits: [],
      emotional_traits: [],
      spiritual_meaning: 'Spiritual meaning not available',
      in_sanskrit: { name: 'Unknown', meaning: 'Unknown', long_meaning: 'Unknown' },
      in_hindi: { name: 'Unknown', meaning: 'Unknown', long_meaning: 'Unknown' },
      in_tamil: { name: 'Unknown', meaning: 'Unknown', long_meaning: 'Unknown' },
      in_telugu: { name: 'Unknown', meaning: 'Unknown', long_meaning: 'Unknown' },
      in_marathi: { name: 'Unknown', meaning: 'Unknown', long_meaning: 'Unknown' },
      in_bengali: { name: 'Unknown', meaning: 'Unknown', long_meaning: 'Unknown' },
      celebrity_usage: [],
      similar_sounding_names: [],
      social_tags: [],
      name_variations: [],
      popularity_by_region: [],
      vedic_reference: { is_vedic: false, root_origin: 'Unknown', note: 'Unknown' },
      cultural_impact: 'Cultural impact not available',
      spiritual_significance: 'Spiritual significance not available',
      historical_references: [],
      modern_usage: { trends: [], platforms: [], modern_context: '' }
    }
  }
  
  return result
})

export async function generateStaticParams() {
  // Return common name parameters to pre-render popular routes
  // This prevents 404 errors on first access
  return [
    { religion: 'islamic', name: 'ali' },
    { religion: 'islamic', name: 'muhammad' },
    { religion: 'islamic', name: 'ahmed' },
    { religion: 'islamic', name: 'omar' },
    { religion: 'islamic', name: 'fatima' },
    { religion: 'christian', name: 'john' },
    { religion: 'christian', name: 'mary' },
    { religion: 'christian', name: 'james' },
    { religion: 'hindu', name: 'ram' },
    { religion: 'hindu', name: 'sita' },
    { religion: 'hindu', name: 'krishna' },
  ]
}

// Enable dynamic rendering for names not in the static list
export const dynamicParams = true

export async function generateMetadata({ params }) {
  const p = await params
  console.log('✅ RAW PARAMS OBJECT:', Object.keys(p), p)

  const { religion, name } = p
  const nameData = await getNameData(religion, name)
  
  if (!nameData) {
    return {
      title: 'Name Not Found | NameVerse',
      description: 'The requested name could not be found.'
    }
  }

  return {
    title: `${nameData.name} Name Meaning | NameVerse`,
    description: nameData.short_meaning || `Discover the meaning, origin, personality traits and numerology of ${nameData.name}`,
    alternates: {
      canonical: `/names/${religion}/${name}`
    }
  }
}

export default async function NameLayout({ params, children }) {
  const { religion, name } = await params
  
  // Single API fetch - cached automatically for all child pages
  const nameData = await getNameData(religion, name)

  if (!nameData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Name not found</h1>
      </div>
    )
  }

  const tabRoutes = [
    { path: `/names/${religion}/${name}`, label: 'Overview' },
    { path: `/names/${religion}/${name}/meaning`, label: 'Meaning' },
    { path: `/names/${religion}/${name}/numerology`, label: 'Numerology' },
    { path: `/names/${religion}/${name}/personality`, label: 'Personality' },
    { path: `/names/${religion}/${name}/cultural`, label: 'Cultural' },
    { path: `/names/${religion}/${name}/hidden-traits`, label: 'Hidden Traits' },
    { path: `/names/${religion}/${name}/lucky-attributes`, label: 'Lucky Attributes' },
  ]

  return (
    <NameDataContext.Provider value={nameData}>
      <div className="min-h-screen bg-gray-50">

        {/* Breadcrumb Navigation */}
        <nav className="bg-white border-b px-4 py-3">
          <div className="max-w-6xl mx-auto">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
              <li>/</li>
              <li><Link href={`/names/${religion}`} className="hover:text-blue-600 capitalize">{religion} Names</Link></li>
              <li>/</li>
              <li className="text-gray-900 font-medium">{nameData.name}</li>
            </ol>
          </div>
        </nav>

        {/* Name Header */}
        <header className="bg-white border-b shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{nameData.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-600">
              {nameData.origin && <span className="bg-blue-50 px-3 py-1 rounded-full text-blue-700 text-sm">{nameData.origin}</span>}
              {nameData.religion && <span className="bg-green-50 px-3 py-1 rounded-full text-green-700 text-sm capitalize">{nameData.religion}</span>}
              {nameData.pronunciation && <span className="text-gray-500 italic">/{nameData.pronunciation}/</span>}
            </div>
          </div>
        </header>

        {/* Tab Navigation */}
        <TabNavigation tabRoutes={tabRoutes} />

        {/* Page Content - Child Pages Render Here */}
        <main className="max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>
      </div>
    </NameDataContext.Provider>
  )
}