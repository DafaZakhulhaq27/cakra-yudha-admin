import { stringRequired } from '@/config/form'
import { object, string, z } from 'zod'

export const companyTypeModel = object({
  id: string().optional(),
  name: stringRequired,
})

export type CompanyTypeModel = z.infer<typeof companyTypeModel>
