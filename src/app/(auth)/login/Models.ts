import { object, string, z } from 'zod'

export const loginModel = object({
  username: string().nonempty(),
  password: string().nonempty(),
})

export type LoginModel = z.infer<typeof loginModel>

export const initLoginForm = {
  username: '',
  password: '',
}

export type UserProfile = {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  token: string
}
