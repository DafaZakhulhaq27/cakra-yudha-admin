import { TimezoneModel } from '@/app/(dashboard)/master/timezone/_components/Model'
import { fetcher } from '@/utils/fetcher'
import { filter } from '../filter'
import { MainResponse } from '../response'
import { GetCompanyType, GetDetaiCompanyType } from './model'
import { CompanyTypeModel } from '@/app/(dashboard)/master/company_type/_components/Model'

type CompanyTypeParams = filter

export const getCompanyType = async (params: CompanyTypeParams) =>
  fetcher<GetCompanyType>({ path: '/v1/company_type', params: params })

export const getCompanyTypeDropdown = async (params: CompanyTypeParams) =>
  fetcher<GetCompanyType>({ path: '/api/v1/company_type', params: params })

export const getDetailCompanyType = async (id: string) =>
  fetcher<GetDetaiCompanyType>({
    path: `/v1/company_type`,
    params: { _id: id },
  })

export const createCompanyType = async (form: CompanyTypeModel) =>
  fetcher<MainResponse>({
    path: '/api/v1/company_type',
    options: {
      method: 'POST',
      body: form,
    },
  })

export const editCompanyType = async (id: string, form: CompanyTypeModel) =>
  fetcher<MainResponse>({
    path: `/api/v1/company_type`,
    params: {
      _id: id,
    },
    options: {
      method: 'PUT',
      body: form,
    },
  })

export const deleteCompanyType = async (id: string) =>
  fetcher<MainResponse>({
    path: `/api/v1/company_type`,
    params: {
      _id: id,
    },
    options: {
      method: 'DELETE',
    },
  })
