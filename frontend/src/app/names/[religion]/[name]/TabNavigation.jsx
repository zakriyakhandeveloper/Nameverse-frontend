'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function TabNavigation({ tabRoutes }) {
  const pathname = usePathname()

  return (
    <div className="bg-white border-b sticky top-0 z-20 shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex overflow-x-auto scrollbar-hide -mb-px">
          {tabRoutes.map((tab) => {
            const isActive = pathname === tab.path || pathname.startsWith(tab.path + '/')
            return (
              <Link
                key={tab.path}
                href={tab.path}
                className={`whitespace-nowrap px-4 py-4 border-b-2 font-medium text-sm transition-colors ${
                  isActive
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                prefetch={true}
              >
                {tab.label}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}