'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { graphqlFetch } from '@/lib/graphql/client'

interface User {
  id: string
  username: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (username: string, password: string) => Promise<void>
  register: (username: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const LOGIN_MUTATION = `
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      user {
        id
        username
      }
      token
    }
  }
`

const REGISTER_MUTATION = `
  mutation Register($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      user {
        id
        username
      }
      token
    }
  }
`

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    if (savedToken && savedUser) {
      setToken(savedToken)
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (username: string, password: string) => {
    const data = await graphqlFetch<{
      login: { user: User; token: string }
    }>(LOGIN_MUTATION, { username, password })

    setUser(data.login.user)
    setToken(data.login.token)
    localStorage.setItem('token', data.login.token)
    localStorage.setItem('user', JSON.stringify(data.login.user))
  }

  const register = async (username: string, password: string) => {
    const data = await graphqlFetch<{
      register: { user: User; token: string }
    }>(REGISTER_MUTATION, { username, password })

    setUser(data.register.user)
    setToken(data.register.token)
    localStorage.setItem('token', data.register.token)
    localStorage.setItem('user', JSON.stringify(data.register.user))
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
