import { LoginModel } from '@/models/auth'
import { Provider } from 'next-auth/providers'
import CredentialProvider from 'next-auth/providers/credentials'


export const providers: Provider[] = [
  CredentialProvider({
    name : 'credential',
    credentials: {},
    async authorize(credentials) {
      const { email, password } = credentials as LoginModel

      if(email === 'dafa@gmail.com' && password === '12345678'){
        return {
          id: 'nextToken',
          email,
          password,
          bearerToken : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkpvaG4gRG9lIiwibmFtZSI6MTUxNjIzOTAyMn0.4mVg9GSDxsPktDs2Lro8rpX7clBAlgY907bqJ65BYKk'
        }
      }

      return null
    },
  }),
]
