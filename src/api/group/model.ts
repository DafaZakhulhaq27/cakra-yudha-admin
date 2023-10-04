import { MainResponse, PagedResponse } from '../response'

export type Group = {
  _id: string
  group_code: string
  group_name: string
  shift_validate_status: string
  project_id: {
    _id: string
    name: string
  }
  client_id: {
    _id: string
    name: string
  }
}

export type GroupDetail = Group & {
  type: string
  geo_status: string
  contact_person: string
  total_personil: number
  desc: string
  shift_validate_status: string
  lat: string
  long: string
  radius: number
  waktu_kerja: string
}

export type GetGroup = {
  data: Group[]
} & PagedResponse

export type GetDetaiGroup = {
  data: GroupDetail
} & MainResponse
