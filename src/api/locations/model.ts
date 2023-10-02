import { MainResponse, PagedResponse } from '../response'

export type Location = {
  _id: string
  company: string
  location_name: string
  location_head: string
  city: string
  country: string
}
export type LocationDetail = {
  _id: string
  company_id: {
    _id: string
    name: string
  }
  location_name: string
  address_1: string
  address_2: string
  city: string
  province: string
  zip_code: string
  country: string
  email: string
  phone_number: string
  fax_number: string
}
export type GetLocation = {
  data: Location[]
} & PagedResponse

export type GetDetaiLocation = {
  data: LocationDetail
} & MainResponse
