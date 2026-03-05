'use client'

import { useRef, useEffect } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from './store'
import { initializeAuth } from './slices/authSlice'

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  // Create store only once
  const storeRef = useRef<AppStore | null>(null)

  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  // Initialize auth from localStorage on mount
  useEffect(() => {
    if (storeRef.current) {
      storeRef.current.dispatch(initializeAuth())
    }
  }, [])

  return <Provider store={storeRef.current}>{children}</Provider>
}
