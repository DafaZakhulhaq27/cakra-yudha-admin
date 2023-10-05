import { MainResponse, PagedResponse } from '../response'

export type PositionLevel = {
  _id: string
  name: string
}
export type GetPositionLevel = {
  data: PositionLevel[]
} & PagedResponse

export type GetDetaiPositionLevel = {
  data: PositionLevel
} & MainResponse
