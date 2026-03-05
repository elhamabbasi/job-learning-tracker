import { prisma } from '@/lib/prisma'
import { JobStatus } from '@/app/generated/prisma/client'
import { hash, compare } from 'bcryptjs'
import { sign, verify } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

interface Context {
  userId: string | null
}

interface AuthPayload {
  user: { id: string; username: string; createdAt: Date; updatedAt: Date }
  token: string
}

type JobStatusType = keyof typeof JobStatus

export function getUserFromToken(token: string | null): string | null {
  if (!token) return null
  try {
    const decoded = verify(token.replace('Bearer ', ''), JWT_SECRET) as { userId: string }
    return decoded.userId
  } catch {
    return null
  }
}

export const resolvers = {
  Query: {
    me: async (_: unknown, __: unknown, context: Context) => {
      if (!context.userId) return null
      return prisma.user.findUnique({
        where: { id: context.userId },
        include: { jobApplications: true },
      })
    },

    jobApplications: async (_: unknown, __: unknown, context: Context) => {
      if (!context.userId) {
        throw new Error('Authentication required')
      }
      return prisma.jobApplication.findMany({
        where: { userId: context.userId },
        orderBy: { applicationDate: 'desc' },
      })
    },

    jobApplication: async (_: unknown, args: { id: string }, context: Context) => {
      if (!context.userId) {
        throw new Error('Authentication required')
      }
      return prisma.jobApplication.findFirst({
        where: { id: args.id, userId: context.userId },
      })
    },
  },

  Mutation: {
    register: async (_: unknown, args: { username: string; password: string }): Promise<AuthPayload> => {
      const existingUser = await prisma.user.findUnique({
        where: { username: args.username },
      })
      if (existingUser) {
        throw new Error('Username already taken')
      }

      const hashedPassword = await hash(args.password, 12)
      const user = await prisma.user.create({
        data: {
          username: args.username,
          password: hashedPassword,
        },
      })

      const token = sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' })
      return { user, token }
    },

    login: async (_: unknown, args: { username: string; password: string }): Promise<AuthPayload> => {
      const user = await prisma.user.findUnique({
        where: { username: args.username },
      })
      if (!user) {
        throw new Error('Invalid username or password')
      }

      const isValid = await compare(args.password, user.password)
      if (!isValid) {
        throw new Error('Invalid username or password')
      }

      const token = sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' })
      return { user, token }
    },

    createJobApplication: async (
      _: unknown,
      args: { input: {
        companyName: string
        jobTitle: string
        jobLink?: string
        location?: string
        applicationDate?: string
        status?: JobStatusType
        salaryMin?: number
        salaryMax?: number
        jobDescription?: string
        notes?: string
      }},
      context: Context
    ) => {
      if (!context.userId) {
        throw new Error('Authentication required')
      }

      const { status, applicationDate, ...rest } = args.input

      return prisma.jobApplication.create({
        data: {
          ...rest,
          status: status as JobStatus | undefined,
          applicationDate: applicationDate ? new Date(applicationDate) : new Date(),
          userId: context.userId,
        },
      })
    },

    updateJobApplication: async (
      _: unknown,
      args: { id: string; input: Record<string, unknown> },
      context: Context
    ) => {
      if (!context.userId) {
        throw new Error('Authentication required')
      }

      const existing = await prisma.jobApplication.findFirst({
        where: { id: args.id, userId: context.userId },
      })
      if (!existing) {
        throw new Error('Job application not found')
      }

      const data = { ...args.input }
      if (data.applicationDate) {
        data.applicationDate = new Date(data.applicationDate as string)
      }

      return prisma.jobApplication.update({
        where: { id: args.id },
        data,
      })
    },

    deleteJobApplication: async (_: unknown, args: { id: string }, context: Context) => {
      if (!context.userId) {
        throw new Error('Authentication required')
      }

      const existing = await prisma.jobApplication.findFirst({
        where: { id: args.id, userId: context.userId },
      })
      if (!existing) {
        throw new Error('Job application not found')
      }

      await prisma.jobApplication.delete({ where: { id: args.id } })
      return true
    },
  },

  User: {
    jobApplications: (parent: { id: string }) => {
      return prisma.jobApplication.findMany({
        where: { userId: parent.id },
      })
    },
  },

  JobApplication: {
    user: (parent: { userId: string }) => {
      return prisma.user.findUnique({
        where: { id: parent.userId },
      })
    },
  },
}
