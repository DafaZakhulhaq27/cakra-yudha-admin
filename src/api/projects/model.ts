import { ValetType } from '@/constant/valetSecurity'
import { MainResponse, PagedResponse } from '../response'
import { Client } from '../client/model'

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
  client_id: {
    _id: string
    name: string
  }
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
