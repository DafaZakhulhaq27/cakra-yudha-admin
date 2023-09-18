import { UserProfile } from '@/app/(auth)/login/Models'
import { MainResponse, PagedResponse } from '../response'

export type Currency = {
  _id: string
  name: string
}
export type GetCurrency = {
  data: Currency[]
} & PagedResponse

export type GetDetaiCurrency = {
  data: Currency
} & MainResponse
