import { UserProfile } from '@/app/(auth)/login/Models'
import { MainResponse, PagedResponse } from '../response'

export type Employee = {
  _id: string
  first_name: string
  email: string
  contact_number: string
  username: string
  company: string | null
  group: string | null
}
export type GetEmployee = {
  data: Employee[]
} & PagedResponse

export type GetDetaiEmployee = {
  data: Employee
} & MainResponse
