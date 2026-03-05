# Prisma Migration Skill

**Command**: `/prisma-migrate` or `/db-migrate`

## What This Does
Handles the complete Prisma schema modification workflow:
1. Updates `prisma/schema.prisma` based on user requirements
2. Generates a new migration with `npx prisma migrate dev --name <description>`
3. Regenerates Prisma client with `npx prisma generate`
4. Updates GraphQL schema in `lib/graphql/schema.ts` if needed
5. Updates TypeScript types if needed

## Usage Examples
- `/prisma-migrate add-resume-field` - Add a resume URL field to User model
- `/prisma-migrate add-interview-dates` - Add interview scheduling to JobApplication

## Important Reminders
- Prisma client is generated to `app/generated/prisma/` (not default location)
- Always import from `@/app/generated/prisma/client`
- After migrations, check if GraphQL schema needs updates
- Migration names should be descriptive (e.g., `add_resume_field`)
