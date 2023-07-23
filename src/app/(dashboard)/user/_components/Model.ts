import { NonEmptyErrorMsg, phoneNumberSchema } from '@/config/form'
import { object, string, z } from 'zod'

const statusValues = ['Active', 'Suspend'] as const
const roleValues = ['User', 'Admin', 'Master'] as const

export const userModel = object({
  id: string().optional(),
  email: string().email().nonempty(NonEmptyErrorMsg),
  name: string().nonempty(NonEmptyErrorMsg),
  company_name: string(),
  phone_number: phoneNumberSchema,
  status: string().refine(value =>
    statusValues.includes(value as (typeof statusValues)[number]),
  ),
  role: string().refine(value =>
    roleValues.includes(value as (typeof roleValues)[number]),
  ),
  address: string(),
  password: string().optional(),
  password_confirmation: string().optional(),
})
  .refine(
    data => {
      return data.password !== '' || data.id
    },
    {
      message: "Can't be empty",
      path: ['password'],
    },
  )
  .refine(
    data => {
      return data.password_confirmation !== '' || data.id
    },
    {
      message: "Can't be empty",
      path: ['password_confirmation'],
    },
  )
  .refine(
    data => {
      return data.password_confirmation === data.password || data.id
    },
    {
      message: "Password didn't match",
      path: ['password_confirmation'],
    },
  )

export type UserModel = z.infer<typeof userModel>
