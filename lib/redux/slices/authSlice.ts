import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { graphqlFetch } from '@/lib/graphql/client'

// Types
interface User {
  id: string
  username: string
}

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  error: string | null
}

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
}

// GraphQL mutations
const LOGIN_MUTATION = `
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      user { id username }
      token
    }
  }
`

const REGISTER_MUTATION = `
  mutation Register($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      user { id username }
      token
    }
  }
`

// Async thunks (actions that do async work like API calls)
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ username, password }: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const data = await graphqlFetch<{ login: { user: User; token: string } }>(
        LOGIN_MUTATION,
        { username, password }
      )
      // Save to localStorage
      localStorage.setItem('token', data.login.token)
      localStorage.setItem('user', JSON.stringify(data.login.user))
      return data.login
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Login failed')
    }
  }
)

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ username, password }: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const data = await graphqlFetch<{ register: { user: User; token: string } }>(
        REGISTER_MUTATION,
        { username, password }
      )
      // Save to localStorage
      localStorage.setItem('token', data.register.token)
      localStorage.setItem('user', JSON.stringify(data.register.user))
      return data.register
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Registration failed')
    }
  }
)

// The slice - contains reducers (functions that update state)
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Sync actions (instant state updates)
    logout: (state) => {
      state.user = null
      state.token = null
      state.error = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
    // Load auth from localStorage on app start
    initializeAuth: (state) => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token')
        const user = localStorage.getItem('user')
        if (token && user) {
          state.token = token
          state.user = JSON.parse(user)
        }
      }
    },
    clearError: (state) => {
      state.error = null
    },
  },
  // Handle async thunk states
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.isLoading = false
        state.user = action.payload.user
        state.token = action.payload.token
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.isLoading = false
        state.user = action.payload.user
        state.token = action.payload.token
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

// Export actions and reducer
export const { logout, initializeAuth, clearError } = authSlice.actions
export default authSlice.reducer
