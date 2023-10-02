import {
  imageRequired,
  numberRequired,
  phoneNumberSchema,
  stringRequired,
} from '@/config/form'
import { any, object, string, z } from 'zod'

export const companyModel = object({
  id: string().optional(),
  username: stringRequired,
  company_name: stringRequired,
  tax_number: stringRequired,
  company_type: stringRequired,
  legal_trading_name: stringRequired,
  address_1: stringRequired,
  address_2: string().optional(),
  city: stringRequired,
  province: stringRequired,
  zip_code: stringRequired,
  country: stringRequired,
  regis_number: stringRequired,
  contact_number: phoneNumberSchema,
  email: string().email().nonempty(),
  website: string().url().trim(),
  currency: stringRequired,
  timezone: stringRequired,
  company_logo: any(),
  company_type_name: string().optional(),
  currency_name: string().optional(),
  timezone_name: string().optional(),
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

export type CompanyModel = z.infer<typeof companyModel>
