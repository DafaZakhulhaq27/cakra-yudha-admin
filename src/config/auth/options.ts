import { NextAuthOptions } from 'next-auth'

import { providers } from './providers'

export const options: NextAuthOptions = {
  providers,
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    jwt: async jwt => {
      const { token, user } = jwt


      if (user?.bearerToken && !token.bearerToken) {
        token.bearerToken = user?.bearerToken
      }

      return token
    },
    session: context => {
      const { session, token } = context

      if (!token.bearerToken) {
        throw new Error('bearer token is undefined')
      }

      session.user.bearerToken = token.bearerToken
      return session
    },
  },
}
