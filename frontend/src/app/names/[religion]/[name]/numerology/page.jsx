import { useNameData } from '../NameDataContext'

export default function NumerologyPage() {
  const nameData = useNameData()

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{nameData.name} Numerology</h1>
            <p className="text-gray-600">Unlock the mystical numbers behind your name</p>
          </div>
        </div>

        {nameData.numerology_meaning && (
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Numerological Significance</h3>
            <p className="text-gray-700 leading-relaxed">{nameData.numerology_meaning}</p>
          </div>
        )}
      </div>

      {/* Key Numbers Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {nameData.lucky_number && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-yellow-600">{nameData.lucky_number}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Lucky Number</h3>
            <p className="text-gray-600 text-sm">Your fortunate digit</p>
          </div>
        )}

        {nameData.life_path_number && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">{nameData.life_path_number}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Life Path Number</h3>
            <p className="text-gray-600 text-sm">Your destiny number</p>
          </div>
        )}

        {nameData.lucky_day && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Lucky Day</h3>
            <p className="text-gray-600 text-sm">{nameData.lucky_day}</p>
          </div>
        )}

        {nameData.lucky_stone && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Lucky Stone</h3>
            <p className="text-gray-600 text-sm">{nameData.lucky_stone}</p>
          </div>
        )}
      </div>

      {/* Lucky Colors */}
      {nameData.lucky_colors && nameData.lucky_colors.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
            </svg>
            Lucky Colors
          </h3>
          <div className="flex flex-wrap gap-3">
            {nameData.lucky_colors.map((color, index) => (
              <div key={index} className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
                <div
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: color.toLowerCase() }}
                ></div>
                <span className="text-gray-700 font-medium capitalize">{color}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Numerology Explanation */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          How Numerology Works
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Name Number Calculation</h4>
            <p className="text-gray-700 text-sm leading-relaxed">
              Your name number is calculated by converting each letter to its corresponding number
              (A=1, B=2, C=3, etc.) and then reducing the sum to a single digit.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Life Path Number</h4>
            <p className="text-gray-700 text-sm leading-relaxed">
              The life path number reveals your life's purpose and the challenges you'll face.
              It's calculated from your birth date and influences your personality.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}