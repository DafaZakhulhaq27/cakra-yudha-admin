import { MainResponse, PagedResponse } from '../response'

export type CompanyType = {
  _id: string
  name: string
}
export type GetCompanyType = {
  data: CompanyType[]
} & PagedResponse

export type GetDetaiCompanyType = {
  data: CompanyType
} & MainResponse
