import {
  NonEmptyErrorMsg,
  phoneNumberSchema,
  stringRequired,
} from '@/config/form'
import { object, string, z } from 'zod'

const statusValues = ['Active', 'Suspend'] as const
const roleValues = ['User', 'Admin', 'Master'] as const

export const userModel = object({
  id: string().optional(),
  email: string().email().nonempty(NonEmptyErrorMsg),
  name: stringRequired,
  company_name: string().nullable().optional(),
  phone_number: phoneNumberSchema,
  status: string().refine(value =>
    statusValues.includes(value as (typeof statusValues)[number]),
  ),
  role: string().refine(value =>
    roleValues.includes(value as (typeof roleValues)[number]),
  ),
  address: string().nullable().optional(),
  // password: string().optional(),
  // password_confirmation: string().optional(),
})
  // .refine(
  //   data => {
  //     return data.password !== '' || data.id
  //   },
  //   {
  //     message: "Can't be empty",
  //     path: ['password'],
  //   },
  // )
  // .refine(
  //   data => {
  //     return data.password_confirmation !== '' || data.id
  //   },
  //   {
  //     message: "Can't be empty",
  //     path: ['password_confirmation'],
  //   },
  // )
  // .refine(
  //   data => {
  //     return data.password_confirmation === data.password || data.id
  //   },
  //   {
  //     message: "Password didn't match",
  //     path: ['password_confirmation'],
  //   },
  // )
  .refine(
    data => {
      return data.role !== 'User' || data.company_name
    },
    {
      message: NonEmptyErrorMsg,
      path: ['company_name'],
    },
  )
  .refine(
    data => {
      return data.role !== 'User' || data.address
    },
    {
      message: NonEmptyErrorMsg,
      path: ['address'],
    },
  )

export type UserModel = z.infer<typeof userModel>
