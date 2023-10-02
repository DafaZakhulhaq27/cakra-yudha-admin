import { Schema, any, number, string } from 'zod'

export const NonEmptyErrorMsg = 'Cant be Empty'
export const stringRequired = string().nonempty(NonEmptyErrorMsg)
export const numberRequired = number().min(0)

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

const MAX_FILE_SIZE = 500000
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

export const imageRequired = any()
  .refine(file => {
    return file[0]?.size <= MAX_FILE_SIZE
  }, `Max image size is 5MB.`)
  .refine(
    file => ACCEPTED_IMAGE_TYPES.includes(file[0]?.type),
    'Only .jpg, .jpeg, .png and .webp formats are supported.',
  )
