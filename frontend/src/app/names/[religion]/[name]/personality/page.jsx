import { useNameData } from '../NameDataContext'

export default function PersonalityPage() {
  const nameData = useNameData()

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{nameData.name} Personality</h1>
            <p className="text-gray-600">Discover the character traits and behavioral patterns</p>
          </div>
        </div>
      </div>

      {/* Hidden Personality Traits */}
      {nameData.hidden_personality_traits && nameData.hidden_personality_traits.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Hidden Personality Traits</h2>
              <p className="text-gray-500">The true nature you don't show everyone</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {nameData.hidden_personality_traits.map((trait, index) => (
              <div key={index} className="bg-amber-50 border border-amber-100 rounded-xl p-5">
                <div className="text-xl font-semibold text-amber-900">{trait}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Emotional Characteristics */}
      {nameData.emotional_traits && nameData.emotional_traits.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Emotional Characteristics</h2>
              <p className="text-gray-500">How you express and handle emotions</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {nameData.emotional_traits.map((trait, index) => (
              <span key={index} className="bg-pink-100 text-pink-800 px-4 py-2 rounded-full font-medium">
                {trait}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Personality Overview */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Strengths</h3>
              <p className="text-gray-500 text-sm">Positive traits you naturally possess</p>
            </div>
          </div>

          <div className="space-y-3">
            {nameData.hidden_personality_traits?.filter(trait =>
              ['confident', 'intelligent', 'creative', 'ambitious', 'charismatic', 'reliable', 'honest', 'courageous'].some(strength =>
                trait.toLowerCase().includes(strength)
              )
            ).map((trait, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 font-medium">{trait}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Challenges */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Growth Areas</h3>
              <p className="text-gray-500 text-sm">Areas for personal development</p>
            </div>
          </div>

          <div className="space-y-3">
            {nameData.emotional_traits?.filter(trait =>
              ['sensitive', 'stubborn', 'impatient', 'overly critical', 'moody'].some(challenge =>
                trait.toLowerCase().includes(challenge)
              )
            ).map((trait, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span className="text-gray-700 font-medium">{trait}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Personality Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          Personality Insights
        </h3>
        <p className="text-gray-700 leading-relaxed">
          Your name reveals deep insights into your character. The traits associated with {nameData.name} suggest
          a person who is naturally inclined toward certain behaviors and emotional responses. Understanding these
          patterns can help you leverage your strengths and work on areas for growth.
        </p>
      </div>
    </div>
  )
}