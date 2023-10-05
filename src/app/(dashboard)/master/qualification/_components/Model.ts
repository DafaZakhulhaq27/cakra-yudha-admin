import { stringRequired } from '@/config/form'
import { object, string, z } from 'zod'

export const qualificationModel = object({
  id: string().optional(),
  name: stringRequired,
})

export type QualificationModel = z.infer<typeof qualificationModel>
