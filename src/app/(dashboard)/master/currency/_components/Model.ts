import { stringRequired } from '@/config/form'
import { object, string, z } from 'zod'

export const currencyModel = object({
  id: string().optional(),
  name: stringRequired,
})

export type CurrencyModel = z.infer<typeof currencyModel>
