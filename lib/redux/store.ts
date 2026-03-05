import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import jobsReducer from './slices/jobsSlice'

// Create the Redux store
export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,    // Handles user authentication state
      jobs: jobsReducer,    // Handles job applications state
    },
  })
}

// Types for TypeScript
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
