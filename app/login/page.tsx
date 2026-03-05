'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { loginUser, registerUser, clearError } from '@/lib/redux/slices/authSlice'

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const dispatch = useAppDispatch()
  const { user, isLoading, error } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (user) router.push('/dashboard')
  }, [user, router])

  useEffect(() => {
    dispatch(clearError())
  }, [isRegister, dispatch])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isRegister) dispatch(registerUser({ username, password }))
    else dispatch(loginUser({ username, password }))
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/screenshots/find-Job.png"
        alt="Find your dream job"
        fill
        className="object-cover"
        priority
      />

      {/* Modern overlay (better than flat black/40) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/35 to-black/60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.10),transparent_40%)]" />

      {/* Card */}
      <div className="relative z-10 w-full px-4">
        <div className="mx-auto w-full max-w-md rounded-2xl border border-white/15 bg-white/10 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <h1 className="mb-1 text-center text-2xl font-semibold tracking-tight text-white">
            {isRegister ? 'Create Account' : 'Sign In'}
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm text-white/70">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition
                           focus:border-teal-300/60 focus:ring-4 focus:ring-teal-300/15"
                placeholder="yourname"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm text-white/70">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition
                           focus:border-teal-300/60 focus:ring-4 focus:ring-teal-300/15"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 w-full rounded-xl bg-teal-600 px-4 py-3 font-semibold text-white
                         shadow-lg transition hover:bg-teal-800 disabled:opacity-50"
            >
              {isLoading ? 'Loading...' : isRegister ? 'Register' : 'Sign In'}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-white/70">
            {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="font-semibold text-teal-800 hover:text-teal-500 hover:underline"
              type="button"
            >
              {isRegister ? 'Sign In' : 'Register'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}