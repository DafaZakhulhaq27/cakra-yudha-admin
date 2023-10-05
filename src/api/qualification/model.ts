import { MainResponse, PagedResponse } from '../response'

export type Qualification = {
  _id: string
  name: string
}
export type GetQualification = {
  data: Qualification[]
} & PagedResponse

export type GetDetaiQualification = {
  data: Qualification
} & MainResponse
