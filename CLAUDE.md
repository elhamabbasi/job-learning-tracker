# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Job and learning tracker application built with Next.js 16, GraphQL, Prisma, and Redux. Tracks job applications with authentication and status management.

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, TailwindCSS v4
- **API**: GraphQL (graphql-yoga) at `/api/graphql`
- **Database**: PostgreSQL via Supabase with Prisma ORM
- **State**: Redux Toolkit (auth and jobs slices)
- **Auth**: JWT tokens with bcryptjs password hashing

## Development Commands

```bash
# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Generate Prisma client (after schema changes)
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Open Prisma Studio (database GUI)
npx prisma studio

# Reset database (WARNING: destructive)
npx prisma migrate reset
```

## Environment Setup

Required environment variables (copy `.env.example` to `.env`):
- `DATABASE_URL` - PostgreSQL connection string (Supabase)
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `JWT_SECRET` - JWT signing secret (optional, defaults to dev value)

## Architecture

### Database Layer (Prisma)
- **Custom output directory**: Prisma client generated to `app/generated/prisma/` instead of `node_modules/.prisma`
- **PostgreSQL adapter**: Uses `@prisma/adapter-pg` with connection pooling
- **Models**: `User`, `JobApplication` with cascade delete
- **Enums**: `JobStatus` (APPLIED, SCREENING, INTERVIEW, TECHNICAL, OFFER, ACCEPTED, REJECTED, WITHDRAWN)
- Import Prisma client from `@/app/generated/prisma/client`, not `@prisma/client`

### GraphQL API
- **Endpoint**: `/api/graphql` (GET and POST)
- **Schema**: [lib/graphql/schema.ts](lib/graphql/schema.ts)
- **Resolvers**: [lib/graphql/resolvers.ts](lib/graphql/resolvers.ts)
- **Authentication**: JWT token in `Authorization` header, decoded in GraphQL context
- **Context**: Contains `userId` extracted from JWT token for authenticated requests

### State Management (Redux)
- **Store**: [lib/redux/store.ts](lib/redux/store.ts)
- **Slices**:
  - `auth` - User authentication state ([lib/redux/slices/authSlice.ts](lib/redux/slices/authSlice.ts))
  - `jobs` - Job applications state ([lib/redux/slices/jobsSlice.ts](lib/redux/slices/jobsSlice.ts))
- **Typed hooks**: Use `useAppDispatch` and `useAppSelector` from [lib/redux/hooks.ts](lib/redux/hooks.ts)

### Route Structure
- `/` - Landing page
- `/login` - Authentication
- `/dashboard` - Job applications dashboard (protected)
- `/api/graphql` - GraphQL API endpoint

## Key Patterns

### Prisma Client Singleton
Prisma client is initialized with PostgreSQL adapter and SSL in [lib/prisma.ts](lib/prisma.ts). Uses global singleton pattern to prevent connection exhaustion in development.

### Authentication Flow
1. User registers/logins via GraphQL mutations (`register`, `login`)
2. Server returns JWT token signed with `JWT_SECRET`
3. Client stores token and includes in `Authorization: Bearer <token>` header
4. GraphQL context extracts `userId` from token for protected queries/mutations
5. Resolvers check `context.userId` and throw if authentication required

### GraphQL Operations
All job application operations require authentication:
- Query `me` - Get current user with job applications
- Query `jobApplications` - List all user's job applications
- Mutation `createJobApplication` - Create new application
- Mutation `updateJobApplication` - Update existing application
- Mutation `deleteJobApplication` - Delete application

## Static Assets & Images

### Static Images (logos, icons, etc.)
- Store in `public/images/` with organized subdirectories:
  - `public/images/logos/` - Company logos, app branding
  - `public/images/icons/` - UI icons, status indicators
  - `public/images/avatars/` - Default avatars
  - `public/images/screenshots/` - Design references
- Reference with `/images/...` (public is implicit)
- Use Next.js `<Image>` component for automatic optimization
- Prefer SVG for icons/logos, WebP for photos

### User-Uploaded Images
- Use Supabase Storage buckets (not `public/` folder)
- Store file URLs in database, files in cloud storage
- See [lib/supabase.ts](lib/supabase.ts) for storage client

### Helper Components
- `CompanyLogo` - Shows company logo or initials fallback
- Import from `@/app/components/CompanyLogo`

## Important Notes

- Always run `npx prisma generate` after modifying [prisma/schema.prisma](prisma/schema.prisma)
- Prisma types are imported from `@/app/generated/prisma/client`, not `@prisma/client`
- All GraphQL mutations/queries requiring auth will throw "Authentication required" if no valid token
- Database uses Supabase PostgreSQL with SSL enabled
- Path alias `@/*` maps to project root (configured in [tsconfig.json](tsconfig.json))
- Shared constants live in `lib/constants/` (e.g., job status colors, labels)
- Reusable components in `app/components/` (e.g., StatusBadge, CompanyLogo)
