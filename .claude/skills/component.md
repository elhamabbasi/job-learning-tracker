# Component Creation Skill

**Command**: `/component` or `/new-component`

## What This Does
Creates a new React component following project patterns:
1. TypeScript component file with proper typing
2. Tailwind CSS styling using project theme variables
3. Client/Server component directive as needed
4. Optional Redux integration
5. Optional GraphQL query/mutation integration

## Usage Examples
- `/component JobCard` - Create a card component for displaying job applications
- `/component ApplicationForm` - Create a form for adding/editing applications
- `/component StatusBadge` - Create a reusable status indicator component

## Component Patterns

### Server Component (default)
```tsx
// app/components/JobCard.tsx
interface JobCardProps {
  job: JobApplication
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className="bg-background text-foreground p-4 rounded-lg">
      {/* ... */}
    </div>
  )
}
```

### Client Component (with state/interactivity)
```tsx
'use client'

import { useState } from 'react'

export default function ApplicationForm() {
  const [status, setStatus] = useState('APPLIED')

  return (
    <form className="space-y-4">
      {/* ... */}
    </form>
  )
}
```

### With Redux
```tsx
'use client'

import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks'
import { updateJobStatus } from '@/lib/redux/slices/jobsSlice'

export default function StatusUpdater() {
  const dispatch = useAppDispatch()
  const jobs = useAppSelector(state => state.jobs.applications)
  // ...
}
```

## Styling Guidelines
- Use theme variables: `bg-background`, `text-foreground`
- Responsive design: `sm:`, `md:`, `lg:` breakpoints
- Spacing: use Tailwind's spacing scale (p-4, gap-2, etc.)
- Dark mode: handled automatically via CSS variables
