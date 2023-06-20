/* eslint-disable @typescript-eslint/no-unused-vars */
import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth/jwt' {
  interface JWT {
    bearerToken?: string
  }
}

declare module 'next-auth' {
  interface User {
    bearerToken?: string
  }

  interface Session {
    user: User & {
      bearerToken?: string
    }
  }
}
