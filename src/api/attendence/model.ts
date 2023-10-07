import { MainResponse, PagedResponse } from '../response'

export type Attendence = {
  _id: string
  employe: string
  employe_id: string
  date: string
  checkin: string
  checkout: string
  late: string
  total_work: string
}
export type GetAttendence = {
  data: Attendence[]
} & PagedResponse

export type GetDetaiAttendence = {
  data: Attendence
} & MainResponse
