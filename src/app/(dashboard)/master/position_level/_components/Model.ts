import { stringRequired } from '@/config/form'
import { object, string, z } from 'zod'

export const positionLevelModel = object({
  id: string().optional(),
  name: stringRequired,
})

export type PositionLevelModel = z.infer<typeof positionLevelModel>
