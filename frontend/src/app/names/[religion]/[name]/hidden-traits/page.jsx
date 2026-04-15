
import { useNameData } from '../NameDataContext'

export default function HiddenTraitsPage() {
  const nameData = useNameData()

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Hidden Personality Traits</h1>
            <p className="text-gray-500">The true nature you don't show everyone</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {nameData.hidden_personality_traits?.map((trait, index) => (
            <div key={index} className="bg-amber-50 border border-amber-100 rounded-xl p-5">
              <div className="text-xl font-semibold text-amber-900">{trait}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Emotional Characteristics</h3>
          <div className="flex flex-wrap gap-3">
            {nameData.emotional_traits?.map((trait, index) => (
              <span key={index} className="bg-gray-100 px-4 py-2 rounded-full text-gray-700 font-medium">
                {trait}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}