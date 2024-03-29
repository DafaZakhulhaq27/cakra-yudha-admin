import { MainResponse, PagedResponse } from '../response'

export type Timezone = {
  _id: string
  name: string
}
export type GetTimezone = {
  data: Timezone[]
} & PagedResponse

export type GetDetaiTimezone = {
  data: Timezone
} & MainResponse
