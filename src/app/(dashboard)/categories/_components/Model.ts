import { NonEmptyErrorMsg } from '@/config/form'
import { object, string, z } from 'zod'

export const categoryModel = object({
  id: string().optional(),
  name: string().nonempty(NonEmptyErrorMsg),
  icon: string({
    required_error: NonEmptyErrorMsg,
  }),
})

export type CategoryModel = z.infer<typeof categoryModel>
