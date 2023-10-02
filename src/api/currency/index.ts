import { CurrencyModel } from '@/app/(dashboard)/master/currency/_components/Model'
import { fetcher } from '@/utils/fetcher'
import { filter } from '../filter'
import { MainResponse } from '../response'
import { GetCurrency, GetDetaiCurrency } from './model'

type CurrencyParams = filter

export const getCurrency = async (params: CurrencyParams) =>
  fetcher<GetCurrency>({ path: '/v1/currency', params: params })

export const getCurrencyDropdown = async (params: CurrencyParams) =>
  fetcher<GetCurrency>({ path: '/api/v1/currency', params: params })

export const getDetailCurrency = async (id: string) =>
  fetcher<GetDetaiCurrency>({ path: `/v1/currency`, params: { _id: id } })

export const createCurrency = async (form: CurrencyModel) =>
  fetcher<MainResponse>({
    path: '/api/v1/currency',
    options: {
      method: 'POST',
      body: form,
    },
  })

export const editCurrency = async (id: string, form: CurrencyModel) =>
  fetcher<MainResponse>({
    path: `/api/v1/currency`,
    params: {
      _id: id,
    },
    options: {
      method: 'PUT',
      body: form,
    },
  })

export const deleteCurrency = async (id: string) =>
  fetcher<MainResponse>({
    path: `/api/v1/currency`,
    params: {
      _id: id,
    },
    options: {
      method: 'DELETE',
    },
  })
