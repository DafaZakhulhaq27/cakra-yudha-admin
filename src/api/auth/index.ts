import { fetcher } from '@/utils/fetcher'
import { LoginData } from './model'

type Login = {
  email: string
  password: string
}

export const login = async ({ email, password }: Login) =>
  fetcher<LoginData>({
    path: '/v1/auth/login',
    options: {
      method: 'POST',
      body: { email, password },
    },
  })
