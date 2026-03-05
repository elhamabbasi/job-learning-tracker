'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { logout } from '@/lib/redux/slices/authSlice'
import { fetchJobs, clearJobs } from '@/lib/redux/slices/jobsSlice'
import StatusBadge from '@/app/components/StatusBadge'

export default function DashboardPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()

  // Get state from Redux store
  const { user, token } = useAppSelector((state) => state.auth)
  const { jobs, isLoading, error } = useAppSelector((state) => state.jobs)

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user && !token) {
      router.push('/login')
    }
  }, [user, token, router])

  // Fetch jobs when component mounts
  useEffect(() => {
    if (token) {
      dispatch(fetchJobs())
    }
  }, [token, dispatch])

  const handleLogout = () => {
    dispatch(logout())
    dispatch(clearJobs())
    router.push('/login')
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const formatSalary = (min: number | null, max: number | null) => {
    if (!min && !max) return null
    if (min && max) return `$${min.toLocaleString()} - $${max.toLocaleString()}`
    if (min) return `$${min.toLocaleString()}+`
    return `Up to $${max!.toLocaleString()}`
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-900">
        <p className="text-zinc-600 dark:text-zinc-400">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <h1 className="text-xl font-bold text-zinc-900 dark:text-white">
            Job Tracker
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              {user.username}
            </span>
            <button
              onClick={handleLogout}
              className="rounded-md bg-black px-3 py-1.5 text-sm text-white transition-colors hover:bg-zinc-800"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">
            My Applications
          </h2>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            {jobs.length} application{jobs.length !== 1 ? 's' : ''}
          </span>
        </div>

        {error && (
          <div className="mb-4 rounded-md bg-red-100 p-4 text-red-700 dark:bg-red-900/30 dark:text-red-400">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="text-center text-zinc-600 dark:text-zinc-400">
            Loading applications...
          </div>
        ) : jobs.length === 0 ? (
          <div className="rounded-lg border border-zinc-200 bg-white p-8 text-center dark:border-zinc-700 dark:bg-zinc-800">
            <p className="text-zinc-600 dark:text-zinc-400">
              No job applications yet. Start tracking your applications!
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800">
            <table className="w-full">
              <thead className="bg-zinc-50 dark:bg-zinc-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Applied
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Salary
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                {jobs.map((job) => (
                  <tr
                    key={job.id}
                    className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="font-medium text-zinc-900 dark:text-white">
                        {job.companyName}
                      </div>
                      {job.jobLink && (
                        <a
                          href={job.jobLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                        >
                          View posting
                        </a>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-zinc-700 dark:text-zinc-300">
                      {job.jobTitle}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-zinc-600 dark:text-zinc-400">
                      {job.location || '-'}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-zinc-600 dark:text-zinc-400">
                      {formatDate(job.applicationDate)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <StatusBadge status={job.status} />
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-zinc-600 dark:text-zinc-400">
                      {formatSalary(job.salaryMin, job.salaryMax) || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}
