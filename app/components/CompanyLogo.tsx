import Image from 'next/image'

interface CompanyLogoProps {
  src?: string | null
  companyName: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeMap = {
  sm: 32,
  md: 48,
  lg: 64,
}

/**
 * Displays a company logo with fallback to company initials
 *
 * @example
 * <CompanyLogo src="/images/logos/google.png" companyName="Google" />
 * <CompanyLogo companyName="Microsoft" size="lg" />
 */
export default function CompanyLogo({
  src,
  companyName,
  size = 'md',
  className = ''
}: CompanyLogoProps) {
  const dimension = sizeMap[size]

  // If logo exists, show it
  if (src) {
    return (
      <Image
        src={src}
        alt={`${companyName} logo`}
        width={dimension}
        height={dimension}
        className={`rounded ${className}`}
      />
    )
  }

  // Fallback: show company initials
  const initials = companyName
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div
      className={`
        flex items-center justify-center rounded bg-gradient-to-br
        from-blue-500 to-purple-600 font-semibold text-white
        ${size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base'}
        ${className}
      `}
      style={{ width: dimension, height: dimension }}
      aria-label={`${companyName} logo`}
    >
      {initials}
    </div>
  )
}
