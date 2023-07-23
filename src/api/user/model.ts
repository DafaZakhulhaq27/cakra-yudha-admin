import { UserProfile } from '@/app/(auth)/login/Models'
import { MainResponse, PagedResponse } from '../response'

export type GetUser = {
  data: UserProfile[]
} & PagedResponse

export type GetDetailUser = {
  data: UserProfile
} & MainResponse
