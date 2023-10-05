import { MainResponse, PagedResponse } from '../response'

export type Employee = {
  _id: string
  first_name: string
  email: string
  contact_number: string
  username: string
  company: string | null
  group: string | null
}

export type EmployeeDetail = Employee & {
  join_date: string
  employe_id: string
  last_name: string
  nik: string
  npwp: string
  gender: string
  status: string
  is_new_login: boolean
  company_id: {
    _id: string
    name: string
  }
  location_id: {
    _id: string
    name: string
  }
  project_id: {
    _id: string
    name: string
  }
  group_id: {
    _id: string
    name: string
  }
  qualification_id: {
    _id: string
    name: string
  }
  position_level_id: {
    _id: string
    name: string
  }
  role: string
  date_of_birth: string
  report_to_id?: string
  leave_category_id: string
  address: string
}

export type GetEmployee = {
  data: Employee[]
} & PagedResponse

export type GetDetaiEmployee = {
  data: EmployeeDetail
} & MainResponse
