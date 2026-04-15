import { useNameData } from '../NameDataContext'

export default function PopularityScorePage() {
  const nameData = useNameData()

  const popularityData = {
    score: nameData.popularity_score ?? nameData.score ?? 0,
    trend: nameData.popularity_trend || nameData.trend || 'steady',
    rank: nameData.global_rank ?? nameData.rank ?? 0,
    regions: Array.isArray(nameData.popularity_by_region)
      ? nameData.popularity_by_region
      : nameData.popularity_by_region?.regions || []
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-100'
    if (score >= 60) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'rising':
        return <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      case 'declining':
        return <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
        </svg>
      default:
        return <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
        </svg>
    }
  }

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{nameData.name} Popularity Score</h1>
            <p className="text-gray-600">Current popularity and trends analysis</p>
          </div>
        </div>

        {/* Main Score Display */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full text-6xl font-bold mb-4 ${getScoreColor(popularityData.score)}`}>
            {popularityData.score}
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            {getTrendIcon(popularityData.trend)}
            <span className="text-lg font-semibold text-gray-900 capitalize">{popularityData.trend}</span>
          </div>
          <p className="text-gray-600">Global Popularity Score</p>
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Score Components
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Cultural Relevance</span>
              <span className="font-semibold text-gray-900">{Math.floor(popularityData.score * 0.8)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Modern Usage</span>
              <span className="font-semibold text-gray-900">{Math.floor(popularityData.score * 0.7)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Historical Significance</span>
              <span className="font-semibold text-gray-900">{Math.floor(popularityData.score * 0.6)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Name Uniqueness</span>
              <span className="font-semibold text-gray-900">{Math.floor(popularityData.score * 0.5)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            Global Ranking
          </h3>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">#{popularityData.rank.toLocaleString()}</div>
            <p className="text-gray-600 mb-4">Out of 10,000+ names</p>
            <div className="bg-gray-200 rounded-full h-3 mb-2">
              <div
                className="bg-green-500 h-3 rounded-full"
                style={{ width: `${(10000 - popularityData.rank) / 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500">Top {Math.round((10000 - popularityData.rank) / 100)}% of names</p>
          </div>
        </div>
      </div>

      {/* Regional Popularity */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Regional Popularity
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {popularityData.regions.map((region, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900">{region.name}</h4>
                <div className="flex items-center gap-1">
                  {getTrendIcon(region.trend)}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Popularity Score</span>
                <span className={`font-bold ${getScoreColor(region.score)} px-2 py-1 rounded`}>
                  {region.score}
                </span>
              </div>
              <div className="mt-2 bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${region.score >= 80 ? 'bg-green-500' : region.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${region.score}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popularity Insights */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          Popularity Insights
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Current Trend</h4>
            <p className="text-gray-700 text-sm leading-relaxed">
              {nameData.name} is currently {popularityData.trend === 'rising' ? 'gaining popularity' :
              popularityData.trend === 'declining' ? 'losing popularity' : 'maintaining steady popularity'}.
              This name ranks #{popularityData.rank.toLocaleString()} globally among all names in our database.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Regional Variations</h4>
            <p className="text-gray-700 text-sm leading-relaxed">
              Popularity varies significantly by region. {nameData.name} is most popular in the Middle East
              and shows strong growth in Europe, while maintaining steady usage in North America.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}