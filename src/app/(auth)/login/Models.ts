import { NonEmptyErrorMsg } from '@/config/form'
import { object, string, z } from 'zod'

export const loginModel = object({
  email: string().email().nonempty(NonEmptyErrorMsg),
  password: string().nonempty(NonEmptyErrorMsg),
})

export type LoginModel = z.infer<typeof loginModel>

export const initLoginForm = {
  email: '',
  password: '',
}

export type UserProfile = {
  _id: string
  email: string
  name: string
  company_name: string
  phone_number: string
  status: 'active' | 'suspend'
  role: 'user' | 'admin' | 'master'
  address: string
  is_new_login: boolean
}
