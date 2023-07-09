import { login } from '@/api/auth'
import { LoginModel } from '@/app/(auth)/login/Models'
import { Provider } from 'next-auth/providers'
import CredentialProvider from 'next-auth/providers/credentials'

export const providers: Provider[] = [
  CredentialProvider({
    name: 'credential',
    credentials: {},
    async authorize(credentials) {
      const { username, password } = credentials as LoginModel
      const res = await login({ username, password })
      if (res.token) {
        return {
          id: 'nextToken',
          username,
          password,
          bearerToken: res.token,
        }
      }

      return null
    },
  }),
]
