import { useNameData } from '../NameDataContext'

export default function MeaningPage() {
  const nameData = useNameData()

  // Collect all language variations
  const languageVariations = []
  if (nameData.in_arabic) languageVariations.push({ lang: 'Arabic', ...nameData.in_arabic })
  if (nameData.in_urdu) languageVariations.push({ lang: 'Urdu', ...nameData.in_urdu })
  if (nameData.in_hindi) languageVariations.push({ lang: 'Hindi', ...nameData.in_hindi })
  if (nameData.in_sanskrit) languageVariations.push({ lang: 'Sanskrit', ...nameData.in_sanskrit })
  if (nameData.in_tamil) languageVariations.push({ lang: 'Tamil', ...nameData.in_tamil })
  if (nameData.in_telugu) languageVariations.push({ lang: 'Telugu', ...nameData.in_telugu })
  if (nameData.in_marathi) languageVariations.push({ lang: 'Marathi', ...nameData.in_marathi })
  if (nameData.in_bengali) languageVariations.push({ lang: 'Bengali', ...nameData.in_bengali })

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border border-indigo-200 rounded-3xl p-8 shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{nameData.name} Meaning</h1>
            <p className="text-gray-600 text-lg">Discover the deep significance and origins</p>
          </div>
        </div>

        {/* Pronunciation */}
        {nameData.pronunciation && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/50">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
              Pronunciation
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {nameData.pronunciation.english && nameData.pronunciation.english !== 'Unknown' && (
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-1">English</div>
                  <div className="text-lg font-mono font-semibold text-gray-900">{nameData.pronunciation.english}</div>
                </div>
              )}
              {nameData.pronunciation.hindi && nameData.pronunciation.hindi !== 'Unknown' && (
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-1">Hindi</div>
                  <div className="text-lg font-mono font-semibold text-gray-900">{nameData.pronunciation.hindi}</div>
                </div>
              )}
              {nameData.pronunciation.ipa && nameData.pronunciation.ipa !== 'Unknown' && (
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-1">IPA</div>
                  <div className="text-lg font-mono font-semibold text-gray-900">{nameData.pronunciation.ipa}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Quick Summary */}
        {nameData.short_meaning && nameData.short_meaning !== 'Name meaning not available' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/50">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Quick Summary
            </h3>
            <p className="text-gray-700 leading-relaxed text-xl font-medium">{nameData.short_meaning}</p>
          </div>
        )}

        {/* Detailed Meaning */}
        {nameData.long_meaning && nameData.long_meaning !== 'This name is not currently in our database. Please check back later for updates.' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/50">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Detailed Meaning
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg">{nameData.long_meaning}</p>
          </div>
        )}

        {/* Spiritual Meaning */}
        {nameData.spiritual_meaning && nameData.spiritual_meaning !== 'Spiritual meaning not available' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              Spiritual Significance
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg">{nameData.spiritual_meaning}</p>
          </div>
        )}
      </div>

      {/* Origin and Religion */}
      <div className="grid md:grid-cols-2 gap-6">
        {nameData.origin && nameData.origin !== 'Unknown' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Origin
            </h3>
            <p className="text-gray-700 text-lg">{nameData.origin}</p>
          </div>
        )}

        {nameData.religion && nameData.religion !== 'Unknown' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Religion
            </h3>
            <p className="text-gray-700 text-lg capitalize">{nameData.religion}</p>
          </div>
        )}
      </div>

      {/* Vedic Reference */}
      {nameData.vedic_reference && nameData.vedic_reference.is_vedic && (
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Vedic Reference
          </h3>
          <div className="space-y-3">
            {nameData.vedic_reference.root_origin && nameData.vedic_reference.root_origin !== 'Unknown' && (
              <div>
                <span className="font-medium text-gray-900">Root Origin:</span>
                <span className="ml-2 text-gray-700">{nameData.vedic_reference.root_origin}</span>
              </div>
            )}
            {nameData.vedic_reference.note && nameData.vedic_reference.note !== 'Unknown' && (
              <div>
                <span className="font-medium text-gray-900">Note:</span>
                <p className="mt-1 text-gray-700">{nameData.vedic_reference.note}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Language Variations */}
      {languageVariations.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-9 0V1m10 3V1m0 3l1 1v16a2 2 0 01-2 2H6a2 2 0 01-2-2V5l1-1z" />
            </svg>
            Name in Different Languages
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {languageVariations.map((variation, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200 hover:shadow-md transition-shadow">
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide">{variation.lang}</div>
                  {variation.name && variation.name !== 'Unknown' && (
                    <div className="text-xl font-bold text-gray-900 mb-2">{variation.name}</div>
                  )}
                  {variation.meaning && variation.meaning !== 'Unknown' && (
                    <div className="text-sm text-gray-600 mb-2">{variation.meaning}</div>
                  )}
                  {variation.long_meaning && variation.long_meaning !== 'Unknown' && (
                    <div className="text-xs text-gray-500 leading-relaxed">{variation.long_meaning}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Name Variations */}
      {nameData.name_variations && nameData.name_variations.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Name Variations
          </h3>
          <div className="flex flex-wrap gap-3">
            {nameData.name_variations.map((variation, index) => (
              <span key={index} className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-200 transition-colors">
                {variation}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Social Tags */}
      {nameData.social_tags && nameData.social_tags.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            Popular Tags
          </h3>
          <div className="flex flex-wrap gap-3">
            {nameData.social_tags.map((tag, index) => (
              <span key={index} className="bg-pink-100 text-pink-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-pink-200 transition-colors">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Meaning Summary */}
      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Meaning Summary
        </h3>
        <p className="text-gray-700 leading-relaxed">
          The name <strong>{nameData.name}</strong> carries deep significance and meaning. Understanding its origins,
          pronunciations, and variations across different languages helps us appreciate the rich cultural heritage
          and spiritual depth that names can embody. Each variation and interpretation adds layers to the name's
          overall significance and impact.
        </p>
      </div>
    </div>
  )
}