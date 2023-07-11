import {
  NonEmptyErrorMsg,
  NumberErrorMsg,
  PositiveNumberErrorMsg,
  isNumber,
  isPositiveNonZero,
} from '@/config/form'
import { object, string, z } from 'zod'

export const scheduleModel = object({
  date: string().nonempty(NonEmptyErrorMsg),
  code_flight_schedule: string().nonempty(NonEmptyErrorMsg),
  boarding_passcode: string().nonempty(NonEmptyErrorMsg),
  departure_time: string().nonempty(NonEmptyErrorMsg),
  arrived_time: string().nonempty(NonEmptyErrorMsg),
})

export const productModel = object({
  id: string().optional(),
  schedule: scheduleModel.array().nonempty(NonEmptyErrorMsg),
  seat: string()
    .refine(isNumber, { message: NumberErrorMsg })
    .refine(isPositiveNonZero, { message: PositiveNumberErrorMsg }),
  program: string().nonempty(NonEmptyErrorMsg),
  price: string()
    .refine(isNumber, { message: NumberErrorMsg })
    .refine(isPositiveNonZero, { message: PositiveNumberErrorMsg }),
  category: string().nonempty(NonEmptyErrorMsg),
})

export type ScheduleModel = z.infer<typeof scheduleModel>
export type ProductModel = z.infer<typeof productModel>
