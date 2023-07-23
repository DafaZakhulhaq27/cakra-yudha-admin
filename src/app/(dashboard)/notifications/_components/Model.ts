import { stringRequired } from '@/config/form'
import { object, string, z } from 'zod'

export const notificationModel = object({
  id: string().optional(),
  title: stringRequired,
  desc: stringRequired,
  status: stringRequired,
})

export type NotificationModel = z.infer<typeof notificationModel>
