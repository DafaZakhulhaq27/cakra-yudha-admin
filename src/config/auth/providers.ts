import { login } from '@/api/auth'
import { LoginModel } from '@/app/(auth)/login/Models'
import { Provider } from 'next-auth/providers'
import CredentialProvider from 'next-auth/providers/credentials'

export const providers: Provider[] = [
  CredentialProvider({
    name: 'credential',
    credentials: {},
    async authorize(credentials) {
      const { email, password } = credentials as LoginModel
      const res = await login({ email, password })

      console.log(res, 'res')
      if (res.status) {
        return {
          id: 'nextToken',
          email,
          password,
          bearerToken: res.data.token,
        }
      }

      return null
    },
  }),
]
