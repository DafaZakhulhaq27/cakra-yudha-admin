import { CompanyType } from '../companyType/model'
import { Currency } from '../currency/model'
import { MainResponse, PagedResponse } from '../response'
import { Timezone } from '../timezone/model'

export type Company = {
  _id: string
  username: string
  company_type: string
  contact_number: string
  website: string
  email: string
  city: string
  country: string
  currency: string
  timezone: string
}

export type CompanyDetail = {
  _id: string
  username: string
  company_name: string
  tax_number: string
  company_type: CompanyType
  legal_trading_name: string
  address_1: string
  address_2: string
  city: string
  email: string
  province: string
  zip_code: string
  country: string
  regis_number: string
  contact_number: string
  website: string
  currency: Currency
  timezone: Timezone
  company_logo: string
}

export type GetCompany = {
  data: Company[]
} & PagedResponse

export type GetDetaiCompany = {
  data: CompanyDetail
} & MainResponse
