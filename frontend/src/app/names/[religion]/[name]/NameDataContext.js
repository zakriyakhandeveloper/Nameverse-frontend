'use client'

import { createContext, useContext } from 'react'

const NameDataContext = createContext(null)

export function useNameData() {
  const context = useContext(NameDataContext)
  if (!context) {
    throw new Error('useNameData must be used within NameLayout')
  }
  return context
}

export default NameDataContext