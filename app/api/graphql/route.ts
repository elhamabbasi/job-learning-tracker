import { createSchema, createYoga } from 'graphql-yoga'
import { typeDefs } from '@/lib/graphql/schema'
import { resolvers, getUserFromToken } from '@/lib/graphql/resolvers'

const yoga = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
  }),
  graphqlEndpoint: '/api/graphql',
  fetchAPI: { Response },
  context: async ({ request }) => {
    const authHeader = request.headers.get('authorization')
    const userId = getUserFromToken(authHeader)
    return { userId }
  },
})

export { yoga as GET, yoga as POST }
