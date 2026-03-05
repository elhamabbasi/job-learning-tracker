export const typeDefs = /* GraphQL */ `
  type User {
    id: ID!
    username: String!
    createdAt: String!
    updatedAt: String!
    jobApplications: [JobApplication!]!
  }

  type JobApplication {
    id: ID!
    companyName: String!
    jobTitle: String!
    jobLink: String
    location: String
    applicationDate: String!
    status: JobStatus!
    salaryMin: Int
    salaryMax: Int
    jobDescription: String
    notes: String
    createdAt: String!
    updatedAt: String!
    userId: ID!
    user: User!
  }

  enum JobStatus {
    APPLIED
    SCREENING
    INTERVIEW
    TECHNICAL
    OFFER
    ACCEPTED
    REJECTED
    WITHDRAWN
  }

  type Query {
    me: User
    jobApplications: [JobApplication!]!
    jobApplication(id: ID!): JobApplication
  }

  type Mutation {
    register(username: String!, password: String!): AuthPayload!
    login(username: String!, password: String!): AuthPayload!
    createJobApplication(input: CreateJobApplicationInput!): JobApplication!
    updateJobApplication(id: ID!, input: UpdateJobApplicationInput!): JobApplication!
    deleteJobApplication(id: ID!): Boolean!
  }

  type AuthPayload {
    user: User!
    token: String!
  }

  input CreateJobApplicationInput {
    companyName: String!
    jobTitle: String!
    jobLink: String
    location: String
    applicationDate: String
    status: JobStatus
    salaryMin: Int
    salaryMax: Int
    jobDescription: String
    notes: String
  }

  input UpdateJobApplicationInput {
    companyName: String
    jobTitle: String
    jobLink: String
    location: String
    applicationDate: String
    status: JobStatus
    salaryMin: Int
    salaryMax: Int
    jobDescription: String
    notes: String
  }
`
