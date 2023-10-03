import { phoneNumberSchema, stringRequired } from '@/config/form'
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
})

export type ClientModel = z.infer<typeof clientModel>
