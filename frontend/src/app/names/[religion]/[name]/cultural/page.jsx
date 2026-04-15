import { useNameData } from '../NameDataContext'

export default function CulturalPage() {
  const nameData = useNameData()

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{nameData.name} Cultural Significance</h1>
            <p className="text-gray-600">Explore the cultural impact and historical context</p>
          </div>
        </div>
      </div>

      {/* Cultural Impact */}
      {nameData.cultural_impact && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Cultural Impact</h2>
              <p className="text-gray-500">How this name has shaped culture and society</p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed text-lg">{nameData.cultural_impact}</p>
        </div>
      )}

      {/* Spiritual Significance */}
      {nameData.spiritual_significance && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Spiritual Significance</h2>
              <p className="text-gray-500">The deeper spiritual meaning and symbolism</p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed text-lg">{nameData.spiritual_significance}</p>
        </div>
      )}

      {/* Historical References */}
      {nameData.historical_references && nameData.historical_references.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Historical References</h2>
              <p className="text-gray-500">Famous figures and historical connections</p>
            </div>
          </div>

          <div className="space-y-4">
            {nameData.historical_references.map((reference, index) => (
              <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-gray-700 leading-relaxed">{reference}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Celebrity Usage */}
      {nameData.celebrity_usage && nameData.celebrity_usage.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Celebrity Usage</h2>
              <p className="text-gray-500">Famous people who share this name</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {nameData.celebrity_usage.map((celebrity, index) => (
              <div key={index} className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-200 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{celebrity}</div>
                    <div className="text-sm text-gray-600">Celebrity</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modern Usage */}
      {nameData.modern_usage && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Modern Usage</h2>
              <p className="text-gray-500">Contemporary trends and popularity</p>
            </div>
          </div>

          <div className="space-y-4">
            {nameData.modern_usage.trends && nameData.modern_usage.trends.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Current Trends</h3>
                <div className="flex flex-wrap gap-2">
                  {nameData.modern_usage.trends.map((trend, index) => (
                    <span key={index} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                      {trend}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {nameData.modern_usage.platforms && nameData.modern_usage.platforms.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Popular Platforms</h3>
                <div className="flex flex-wrap gap-2">
                  {nameData.modern_usage.platforms.map((platform, index) => (
                    <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {nameData.modern_usage.modern_context && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Modern Context</h3>
                <p className="text-gray-700 leading-relaxed">{nameData.modern_usage.modern_context}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Cultural Summary */}
      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Cultural Legacy
        </h3>
        <p className="text-gray-700 leading-relaxed">
          Names carry the weight of history and culture. {nameData.name} represents not just an identity,
          but a connection to traditions, values, and the collective human experience. Understanding its
          cultural significance helps us appreciate the deeper meaning behind the names we choose.
        </p>
      </div>
    </div>
  )
}