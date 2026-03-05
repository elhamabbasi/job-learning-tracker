# Project Coding Standards

These rules apply to all code in this repository.

## Prisma & Database

- ✅ Always import Prisma from `@/app/generated/prisma/client`, NOT `@prisma/client`
- ✅ After schema changes: run `npx prisma generate` AND update GraphQL schema
- ✅ Use descriptive migration names: `npx prisma migrate dev --name add_user_resume_field`
- ✅ All models use `cuid()` for IDs
- ✅ Include cascade deletes where appropriate (`onDelete: Cascade`)

## GraphQL

- ✅ All mutations/queries requiring user data MUST check `context.userId`
- ✅ Throw `new Error('Authentication required')` if not authenticated
- ✅ Keep schema in sync with Prisma models
- ✅ Use proper GraphQL types (ID!, String!, Int, etc.)
- ✅ JWT tokens passed via `Authorization: Bearer <token>` header

## Redux

- ✅ Use typed hooks: `useAppDispatch()` and `useAppSelector()` from `lib/redux/hooks.ts`
- ✅ Create slices in `lib/redux/slices/` directory
- ✅ Export both actions and reducer from slices
- ✅ Keep state normalized and minimal

## React & Next.js

- ✅ Use App Router (not Pages Router)
- ✅ Server Components by default, add `'use client'` only when needed
- ✅ Use Next.js `<Link>` for internal navigation
- ✅ Import with `@/` alias (configured in tsconfig.json)

## Tailwind CSS

- ✅ Use Tailwind classes directly (don't create custom CSS unless necessary)
- ✅ Use CSS variables from `globals.css` for theme colors
- ✅ This project uses Tailwind v4 (new `@theme` syntax)
- ✅ Prefer utility classes over custom components
- ✅ Use responsive classes: `sm:`, `md:`, `lg:`, etc.

## TypeScript

- ✅ Enable strict mode (already enabled in tsconfig.json)
- ✅ Define interfaces for all GraphQL inputs/outputs
- ✅ Use proper typing for Redux (RootState, AppDispatch)
- ✅ No `any` types unless absolutely necessary

## Authentication

- ✅ Hash passwords with bcryptjs (salt rounds: 10)
- ✅ JWT tokens include `userId` in payload
- ✅ Protected routes check authentication in GraphQL context
- ✅ Never expose JWT_SECRET or store it in client code
