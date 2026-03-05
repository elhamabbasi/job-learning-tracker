# GraphQL Feature Skill

**Command**: `/graphql-feature` or `/gql-add`

## What This Does
Creates a complete GraphQL feature with:
1. Type definitions in `lib/graphql/schema.ts`
2. Resolvers in `lib/graphql/resolvers.ts`
3. Client-side GraphQL query/mutation
4. Optional Redux slice integration
5. TypeScript types

## Usage Examples
- `/gql-add search jobs` - Add job search query with filters
- `/gql-add export applications` - Add mutation to export job applications as CSV
- `/gql-add update user profile` - Add user profile update mutation

## Standard Pattern
- Queries: Read operations (jobApplications, me, etc.)
- Mutations: Write operations (create, update, delete)
- All operations require authentication via JWT in context
- Check `context.userId` and throw if not authenticated
- Return proper error messages
