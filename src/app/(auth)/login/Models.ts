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
  first_name: string
  gender: string
  role: string
  contact_number: string
  status: string
  address: string
  is_new_login: boolean
}

export type UserProfileToken = {
  _id: string
  email: string
  first_name: string
  contact_number: string
  role: string
  is_new_login: boolean
}
