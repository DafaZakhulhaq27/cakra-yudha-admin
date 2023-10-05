import { fetcher } from '@/utils/fetcher'
import { filter } from '../filter'
import { MainResponse } from '../response'
import { GetDetaiEmployee, GetEmployee } from './model'
import { EmployeeModel } from '@/app/(dashboard)/employee/_components/Model'

type EmployeeParams = filter

export const getEmployee = async (params: EmployeeParams) =>
  fetcher<GetEmployee>({ path: '/v1/employe', params: params })

export const getDetailEmployee = async (id: string) =>
  fetcher<GetDetaiEmployee>({ path: `/v1/employe`, params: { _id: id } })

export const createEmployee = async (form: EmployeeModel) =>
  fetcher<MainResponse>({
    path: '/api/v1/employe',
    options: {
      method: 'POST',
      body: form,
    },
  })

export const editEmployee = async (id: string, form: EmployeeModel) =>
  fetcher<MainResponse>({
    path: `/api/v1/employe`,
    params: {
      _id: id,
    },
    options: {
      method: 'PUT',
      body: form,
    },
  })

export const deleteEmployee = async (id: string) =>
  fetcher<MainResponse>({
    path: `/api/v1/employe`,
    params: {
      user_id: id,
    },
    options: {
      method: 'DELETE',
    },
  })
