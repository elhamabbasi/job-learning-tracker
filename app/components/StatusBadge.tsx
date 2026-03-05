import { JobStatus } from '@/app/generated/prisma/client'
import { statusColors, statusLabels } from '@/lib/constants/job-status'

interface StatusBadgeProps {
  status: JobStatus
  showLabel?: boolean
  className?: string
}

/**
 * Displays a styled badge for job application status
 *
 * @example
 * <StatusBadge status="APPLIED" />
 * <StatusBadge status="INTERVIEW" showLabel={false} />
 */
export default function StatusBadge({
  status,
  showLabel = true,
  className = ''
}: StatusBadgeProps) {
  const colorClasses = statusColors[status]
  const label = showLabel ? statusLabels[status] : status

  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
        ${colorClasses}
        ${className}
      `}
    >
      {label}
    </span>
  )
}
