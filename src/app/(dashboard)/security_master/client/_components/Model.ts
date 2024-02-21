import { phoneNumberSchema, stringRequired } from '@/config/form'
import { ValetSecurityEnum } from '@/constant/valetSecurity'
import { object, string, z } from 'zod'

export const clientModel = object({
  id: string().optional(),
  company_id: stringRequired,
  company_id_name: string().optional(),
  client_code: stringRequired,
  client_name: stringRequired,
  director_name: stringRequired,
  contact_person: phoneNumberSchema,
  address: stringRequired,
  province: stringRequired,
  city: stringRequired,
  postal_code: stringRequired,
  desc: stringRequired,
  lat: stringRequired,
  long: stringRequired,
  type: z.enum([ValetSecurityEnum.Security, ValetSecurityEnum.Valet]),
  email: stringRequired,
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

export type ClientModel = z.infer<typeof clientModel>
