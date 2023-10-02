import { fetcher } from '@/utils/fetcher'
import { filter } from '../filter'
import { MainResponse } from '../response'
import { GetClient, GetDetaiClient } from './model'
import { ClientModel } from '@/app/(dashboard)/valet_master/client/_components/Model'

type ClientParams = {
  type?: string
} & filter

export const getClient = async (params: ClientParams) =>
  fetcher<GetClient>({ path: '/v1/client', params: params })

export const getClientDropdown = async (params: ClientParams) =>
  fetcher<GetClient>({ path: '/api/v1/client', params: params })

export const getDetailClient = async (id: string) =>
  fetcher<GetDetaiClient>({
    path: `/v1/client`,
    params: { _id: id },
  })

export const createClient = async (form: ClientModel) =>
  fetcher<MainResponse>({
    path: '/api/v1/client',
    options: {
      method: 'POST',
      body: form,
    },
  })

export const editClient = async (id: string, form: ClientModel) =>
  fetcher<MainResponse>({
    path: `/api/v1/client`,
    params: {
      _id: id,
    },
    options: {
      method: 'PUT',
      body: form,
    },
  })

export const deleteClient = async (id: string) =>
  fetcher<MainResponse>({
    path: `/api/v1/client`,
    params: {
      _id: id,
    },
    options: {
      method: 'DELETE',
    },
  })
