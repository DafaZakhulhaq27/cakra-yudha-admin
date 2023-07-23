import { Schema, string } from 'zod'

export const NonEmptyErrorMsg = 'Cant be Empty'
export const stringRequired = string().nonempty(NonEmptyErrorMsg)

const phoneNumberRegex = /^0\d{9,12}$/

const validateIndonesianPhoneNumber = (value: string) =>
  phoneNumberRegex.test(value)

export const phoneNumberSchema: Schema<string> = string().refine(
  validateIndonesianPhoneNumber,
  {
    message: 'Invalid Indonesian phone number',
  },
)

export const PositiveNumberErrorMsg = 'must be a positive number and not zero'
export const NumberErrorMsg = 'value must number'

export const isPositiveNonZero = (value: string) => parseInt(value) > 0
export const isNumber = (val: string) => !Number.isNaN(parseInt(val, 10))
