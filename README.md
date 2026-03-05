# Job & Learning Tracker

A modern job application tracking system built with Next.js, GraphQL, and Prisma. Track your job applications, monitor status changes, and manage your job search effectively.

## Features

- 🔐 **Authentication** - Secure JWT-based user authentication
- 📝 **Job Application Tracking** - Add, update, and manage job applications
- 📊 **Status Management** - Track application progress (Applied → Interview → Offer, etc.)
- 🎨 **Modern UI** - Built with Tailwind CSS v4
- 🔍 **GraphQL API** - Type-safe queries and mutations
- 💾 **PostgreSQL Database** - Powered by Supabase with Prisma ORM

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **API**: GraphQL (graphql-yoga)
- **Database**: PostgreSQL via Supabase
- **ORM**: Prisma
- **State Management**: Redux Toolkit
- **Authentication**: JWT with bcryptjs

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (Supabase recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd job-learning-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy `.env.example` to `.env` and fill in your values:
   ```bash
   cp .env.example .env
   ```

   Required variables:
   - `DATABASE_URL` - PostgreSQL connection string
   - `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
   - `JWT_SECRET` - Secret key for JWT signing (optional in dev)

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## Available Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint

# Prisma commands
npx prisma generate       # Generate Prisma client
npx prisma migrate dev    # Run migrations
npx prisma studio         # Open Prisma Studio (database GUI)
```

## Project Structure

```
job-learning-tracker/
├── app/
│   ├── api/graphql/       # GraphQL API endpoint
│   ├── dashboard/         # Dashboard page (protected)
│   ├── login/             # Login page
│   ├── generated/prisma/  # Generated Prisma client (custom location)
│   └── layout.tsx         # Root layout
├── lib/
│   ├── graphql/           # GraphQL schema and resolvers
│   ├── redux/             # Redux store and slices
│   ├── prisma.ts          # Prisma client singleton
│   └── supabase.ts        # Supabase client
├── prisma/
│   └── schema.prisma      # Database schema
└── .claude/
    └── skills/            # Custom Claude Code skills
```

## Database Schema

- **User** - User accounts with authentication
- **JobApplication** - Job applications with status tracking
- **JobStatus** enum - Application lifecycle stages

See [prisma/schema.prisma](prisma/schema.prisma) for the complete schema.

## GraphQL API

The GraphQL API is available at `/api/graphql`. Main operations:

**Queries:**
- `me` - Get current user
- `jobApplications` - List all user's applications
- `jobApplication(id)` - Get single application

**Mutations:**
- `register(username, password)` - Create account
- `login(username, password)` - Authenticate
- `createJobApplication(input)` - Add new application
- `updateJobApplication(id, input)` - Update application
- `deleteJobApplication(id)` - Delete application

## Development

See [CLAUDE.md](CLAUDE.md) for detailed development guidelines and architecture documentation.

## License

MIT
