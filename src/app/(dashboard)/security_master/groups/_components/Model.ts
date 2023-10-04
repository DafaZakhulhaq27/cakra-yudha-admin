import {
  numberRequired,
  phoneNumberSchema,
  stringRequired,
} from '@/config/form'
import { object, string, z } from 'zod'

export const groupModel = object({
  id: string().optional(),
  project_id: stringRequired,
  project_id_name: stringRequired,
  geo_status: stringRequired,
  group_code: stringRequired,
  group_name: stringRequired,
  contact_person: phoneNumberSchema,
  total_personil: numberRequired,
  desc: stringRequired,
  shift_validate_status: stringRequired,
  lat: stringRequired,
  long: stringRequired,
  radius: numberRequired,
  waktu_kerja: stringRequired,
})

export type GroupModel = z.infer<typeof groupModel>
