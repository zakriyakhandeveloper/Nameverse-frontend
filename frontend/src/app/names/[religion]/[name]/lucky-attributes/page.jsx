'use client'

import { useNameData } from '../NameDataContext'

export default function LuckyAttributesPage() {
  const nameData = useNameData()

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Lucky Attributes</h1>
            <p className="text-gray-500">Numerology and astrological associations</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl p-6 text-center">
            <div className="text-5xl font-extrabold mb-2">{nameData.lucky_number}</div>
            <div className="text-sm opacity-90">Lucky Number</div>
          </div>

          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold mb-2">{nameData.lucky_day}</div>
            <div className="text-sm opacity-90">Lucky Day</div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-2xl p-6 text-center">
            <div className="text-2xl font-bold mb-2">{nameData.lucky_stone}</div>
            <div className="text-sm opacity-90">Lucky Gemstone</div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Lucky Colors</h3>
          <div className="flex flex-wrap gap-4">
            {nameData.lucky_colors?.map((color, index) => (
              <div key={index} className="flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-xl">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 border border-gray-200" />
                <span className="font-medium text-gray-800">{color}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Numerology Meaning</h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            {nameData.numerology_meaning}
          </p>
        </div>
      </div>
    </div>
  )
}