import NameClient from './ClientComponent'
import { fetchNameDetail, fetchNames } from '@/lib/api/names'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'

// ISR
export const revalidate = 3600
export const dynamicParams = true

// Fetch name data
async function getNameData(religion, slug) {
  try {
    return await fetchNameDetail(religion, slug)
  } catch (error) {
    console.error('Error fetching name data:', error)
    return null
  }
}

// Fetch popular names for ISR
async function getPopularNames(religion, limit = 150) {
  try {
    const { data } = await fetchNames({ 
      religion, 
      limit,
      sort: 'popular'
    })
    return data || []
  } catch (error) {
    console.error(`Error fetching popular names for ${religion}:`, error)
    return []
  }
}

// Generate static paths
export async function generateStaticParams() {
  const staticParams = []
  const religions = ['islamic', 'hindu', 'christian']
  const languages = ['english', 'arabic', 'urdu', 'hindi', 'pashto', 'hebrew', 'greek', 'sanskrit', 'tamil', 'telugu']

  try {
    for (const religion of religions) {
      const names = await getPopularNames(religion, 150)
      names.forEach((name, index) => {
        const nameSlug = name.slug || name.name?.toLowerCase()
        if (!nameSlug) return

        // English route
        staticParams.push({ religion, lang: 'english', slug: nameSlug })

        // Language-specific routes (top 30 names)
        if (index < 30) {
          languages.forEach(lang => {
            if (lang !== 'english') {
              staticParams.push({ religion, lang, slug: nameSlug })
            }
          })
        }
      })
    }

    console.log(`✅ Generated ${staticParams.length} static paths for ISR`)
    return staticParams
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

// SEO Metadata
export async function generateMetadata({ params }) {
  const { religion, lang, slug } = params
  const actualLang = lang || 'english'
  const nameSlug = slug || lang

  const data = await getNameData(religion, nameSlug)
  if (!data) return { title: 'Name Not Found', description: 'The requested name could not be found.' }

  const religionTitle = religion.charAt(0).toUpperCase() + religion.slice(1)
  const translatedData = data[`in_${actualLang}`] || data
  const displayName = translatedData.name || data.name
  const displayMeaning = translatedData.meaning || data.short_meaning

  const localeMap = {
    arabic: 'ar_SA', urdu: 'ur_PK', hindi: 'hi_IN', pashto: 'ps_AF',
    hebrew: 'he_IL', greek: 'el_GR', sanskrit: 'sa_IN',
    tamil: 'ta_IN', telugu: 'te_IN', english: 'en_US'
  }
  const locale = localeMap[actualLang] || 'en_US'

  return {
    title: `${displayName} Meaning | ${religionTitle} ${actualLang.charAt(0).toUpperCase() + actualLang.slice(1)} Names`,
    description: `${displayName} meaning: ${displayMeaning}. Discover the spiritual significance, lucky numbers, colors, and cultural importance of this ${religionTitle} name.`,
    keywords: [
      displayName, `${displayName} meaning`, `${religionTitle} names`, `${actualLang} names`,
      data.gender, data.origin, ...(data.themes || []), 'baby names', 'name meanings', `${religionTitle} baby names`
    ].filter(Boolean).join(', '),
    authors: [{ name: 'Names Meaning Guide' }],
    openGraph: {
      title: `${displayName} - ${religionTitle} Name Meaning`,
      description: displayMeaning,
      type: 'article',
      locale,
      siteName: 'Names Meaning Guide',
      images: [{
        url: `${SITE_URL}/api/og?name=${encodeURIComponent(displayName)}&religion=${religion}`,
        width: 1200,
        height: 630,
        alt: `${displayName} name meaning`
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${displayName} - ${religionTitle} Name`,
      description: displayMeaning,
      images: [`${SITE_URL}/api/og?name=${encodeURIComponent(displayName)}&religion=${religion}`]
    },
    alternates: {
      canonical: `/names/${religion}/${actualLang}/${nameSlug}`,
      languages: Object.fromEntries(languages.map(l => [l.slice(0, 2), `/names/${religion}/${l}/${nameSlug}`]))
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 }
    }
  }
}

// Page Component
export default async function NamePage({ params }) {
  const { religion, lang, slug } = params
  const actualLang = lang || 'english'
  const nameSlug = slug || lang

  const data = await getNameData(religion, nameSlug)

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center">
            <span className="text-4xl">😔</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Name Not Found</h1>
          <p className="text-gray-600 mb-6">We couldn't find the name you're looking for in our database.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={`/names/${religion}`} className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-xl transition-all">
              Browse {religion.charAt(0).toUpperCase() + religion.slice(1)} Names
            </a>
            <button onClick={() => window.history.back()} className="px-6 py-3 border-2 border-gray-300 text-gray-900 font-bold rounded-xl hover:border-indigo-400 hover:bg-indigo-50 transition-all">
              Go Back
            </button>
          </div>
        </div>
      </div>
    )
  }

  return <NameClient data={data} initialLanguage={actualLang} />
}
