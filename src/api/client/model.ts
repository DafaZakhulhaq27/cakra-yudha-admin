import { MainResponse, PagedResponse } from '../response'

export type Client = {
  _id: string
  company: string
  client_code: string
  contact_person: string
  city: string
  province: string
}

export type ClientDetail = {
  _id: string
  company: {
    _id: string
    name: string
  }
  client_code: string
  type: 'security' | 'valet'
  client_name: string
  director_name: string
  contact_person: string
  fax: string
  email: string
  address: string
  province: string
  city: string
  postal_code: string
  desc: string
  lat: string
  long: string
}

export type GetClient = {
  data: Client[]
} & PagedResponse

export type GetDetaiClient = {
  data: ClientDetail
} & MainResponse
