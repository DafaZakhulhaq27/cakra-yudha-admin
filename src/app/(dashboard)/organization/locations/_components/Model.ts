import { phoneNumberSchema, stringRequired } from '@/config/form'
import { object, string, z } from 'zod'

export const locationModel = object({
  id: string().optional(),
  company_id: stringRequired,
  company_id_name: string().optional(),
  location_name: stringRequired,
  address_1: stringRequired,
  city: stringRequired,
  province: stringRequired,
  zip_code: stringRequired,
  country: stringRequired,
  email: string().email(),
  phone_number: phoneNumberSchema,
  fax_number: stringRequired,
})

export type LocationModel = z.infer<typeof locationModel>
