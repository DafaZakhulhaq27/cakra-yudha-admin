import { ValetSecurityType } from '@/constant/valetSecurity'
import { MainResponse, PagedResponse } from '../response'

export type Project = {
  _id: string
  project_name: string
  project_code: string
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
  radius: number
  attachment: string
  type: ValetSecurityType
}

export type ProjectDetail = Project & {
  client_id: {
    _id: string
    name: string
  }
  Project_name: string
  Project_code: string
  phone_number: string
  address: string
  province: string
  city: string
  postal_code: string
  desc: string
  lat: string
  long: string
  radius: number
  attachment: string
  type: ValetSecurityType
}

export type GetProject = {
  data: Project[]
} & PagedResponse

export type GetDetaiProject = {
  data: ProjectDetail
} & MainResponse
