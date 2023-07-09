import { fetcher } from '@/utils/fetcher'
import { LoginData } from './model'

type Login = {
  username: string
  password: string
}

export const login = async ({ username, password }: Login) =>
  fetcher<LoginData>({
    path: '/auth/login',
    options: {
      method: 'POST',
      body: { username, password },
    },
  })
