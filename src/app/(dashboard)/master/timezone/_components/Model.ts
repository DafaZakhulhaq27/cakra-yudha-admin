import { stringRequired } from '@/config/form'
import { object, string, z } from 'zod'

export const timezoneModel = object({
  id: string().optional(),
  name: stringRequired,
})

export type TimezoneModel = z.infer<typeof timezoneModel>
