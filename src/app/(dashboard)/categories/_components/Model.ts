import { NonEmptyErrorMsg } from '@/config/form'
import { any, object, string, z } from 'zod'

export const categoryModel = object({
  id: string().optional(),
  name: string().nonempty(NonEmptyErrorMsg),
  icon_url: string().optional(),
  icon: any().refine(files => files?.length == 1, 'File is required.'),
})

export type CategoryModel = z.infer<typeof categoryModel>
