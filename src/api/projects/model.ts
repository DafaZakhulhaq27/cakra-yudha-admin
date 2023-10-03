import { ValetType } from '@/constant/valet'
import { MainResponse, PagedResponse } from '../response'

export type Project = {
  _id: string
  Project_name: string
  Project_code: string
  client_id: string
  client_id_name: string
  phone_number: string
  address: string
  province: string
  city: string
  postal_code: string
  desc: string
  lat: string
  long: string
  radius: string
  attachment: string
  type: ValetType
}

export type ProjectDetail = Project & {
  phone_number: string
  address: string
  province: string
  city: string
  postal_code: string
  desc: string
  lat: string
  long: string
  radius: string
  attachment: string
  type: ValetType
}

export type GetProject = {
  data: Project[]
} & PagedResponse

export type GetDetaiProject = {
  data: ProjectDetail
} & MainResponse
