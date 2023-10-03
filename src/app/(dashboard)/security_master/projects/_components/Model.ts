import { phoneNumberSchema, stringRequired } from '@/config/form'
import { any, object, string, z } from 'zod'

export const projectModel = object({
  id: string().optional(),
  project_name: stringRequired,
  project_code: stringRequired,
  client_id: stringRequired,
  client_id_name: stringRequired,
  phone_number: phoneNumberSchema,
  address: stringRequired,
  province: stringRequired,
  city: stringRequired,
  postal_code: stringRequired,
  desc: stringRequired,
  lat: stringRequired,
  long: stringRequired,
  radius: stringRequired,
  attachment: any(),
})

export type ProjectModel = z.infer<typeof projectModel>
