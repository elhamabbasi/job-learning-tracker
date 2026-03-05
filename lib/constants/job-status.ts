import { JobStatus } from '@/app/generated/prisma/client'

/**
 * Color mappings for job application statuses
 * Used for badges, pills, and status indicators throughout the app
 */
export const statusColors: Record<JobStatus, string> = {
  APPLIED: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  SCREENING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  INTERVIEW: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  TECHNICAL: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
  OFFER: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  ACCEPTED: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300',
  REJECTED: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  WITHDRAWN: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
}

/**
 * Human-readable labels for job statuses
 */
export const statusLabels: Record<JobStatus, string> = {
  APPLIED: 'Applied',
  SCREENING: 'Screening',
  INTERVIEW: 'Interview',
  TECHNICAL: 'Technical Round',
  OFFER: 'Offer Received',
  ACCEPTED: 'Accepted',
  REJECTED: 'Rejected',
  WITHDRAWN: 'Withdrawn',
}

/**
 * Status progression order (for visual timeline/progress indicators)
 */
export const statusOrder: JobStatus[] = [
  'APPLIED',
  'SCREENING',
  'INTERVIEW',
  'TECHNICAL',
  'OFFER',
  'ACCEPTED',
]
