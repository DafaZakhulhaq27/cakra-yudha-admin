import { fetcher } from '@/utils/fetcher'
import { filter } from '../filter'
import { MainResponse } from '../response'
import { GetCompany, GetDetaiCompany } from './model'

type CompanyParams = filter

export const getCompany = async (params: CompanyParams) =>
  fetcher<GetCompany>({ path: '/v1/company', params: params })

export const getCompanyDropdown = async (params: CompanyParams) =>
  fetcher<GetCompany>({ path: '/api/v1/company', params: params })

export const getDetailCompany = async (id: string) =>
  fetcher<GetDetaiCompany>({
    path: `/v1/company`,
    params: { _id: id },
  })

export const createCompany = async (form: FormData) =>
  fetcher<MainResponse>({
    path: '/api/v1/company',
    options: {
      method: 'POST',
      body: form,
    },
  })

export const editCompany = async (id: string, form: FormData) =>
  fetcher<MainResponse>({
    path: `/api/v1/company`,
    params: {
      _id: id,
    },
    options: {
      method: 'PUT',
      body: form,
    },
  })

export const deleteCompany = async (id: string) =>
  fetcher<MainResponse>({
    path: `/api/v1/company`,
    params: {
      _id: id,
    },
    options: {
      method: 'DELETE',
    },
  })
