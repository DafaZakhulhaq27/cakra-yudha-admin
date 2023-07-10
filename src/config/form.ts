import { Schema, string } from 'zod'

export const NonEmptyErrorMsg = 'Cant be Empty'

const phoneNumberRegex = /^0\d{9,12}$/

const validateIndonesianPhoneNumber = (value: string) =>
  phoneNumberRegex.test(value)

export const phoneNumberSchema: Schema<string> = string().refine(
  validateIndonesianPhoneNumber,
  {
    message: 'Invalid Indonesian phone number',
  },
)
