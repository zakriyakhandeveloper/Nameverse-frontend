/**
 * 🧪 API TEST FILE
 * This file bypasses all caches and returns raw API response
 * First run this to confirm API is actually working
 */

'use server'

import { fetchNameDetail } from '@/lib/api/names'

export async function testNameApi(religion, name) {
  console.log('\n🧪 TEST API CALL START =====================')
  console.log('Input: religion =', religion)
  console.log('Input: name =', name)

  try {
    // Direct API call - no cache, no deduplication, no layers
    const result = await fetchNameDetail(religion, name)

    console.log('✅ API CALL FINISHED:')
    console.log('Success:', result !== null)
    
    if (result) {
      console.log('Result keys:', Object.keys(result))
      console.log('Full response:', JSON.stringify(result, null, 2))
    } else {
      console.log('❌ API RETURNED NULL')
    }

    console.log('==========================================\n')

    return result
  } catch (error) {
    console.log('❌ API THREW ERROR:')
    console.log(error)
    return null
  }
}