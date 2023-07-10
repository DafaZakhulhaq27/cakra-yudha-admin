import { dummyAPIResponse } from '../response'
import { LoginData, dummyLoginResponse } from './model'

type Login = {
  email: string
  password: string
}

export const login = async ({ email, password }: Login) =>
  // fetcher<LoginData>({
  //   path: '/v1/login',
  //   options: {
  //     method: 'POST',
  //     body: { email, password },
  //   },
  // })
  dummyAPIResponse<LoginData>(dummyLoginResponse)
