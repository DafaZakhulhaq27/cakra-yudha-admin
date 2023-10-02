import { CurrencyModel } from '@/app/(dashboard)/master/currency/_components/Model'
import { fetcher } from '@/utils/fetcher'
import { filter } from '../filter'
import { MainResponse } from '../response'
import { GetDetaiTimezone, GetTimezone } from './model'
import { TimezoneModel } from '@/app/(dashboard)/master/timezone/_components/Model'

type TimezoneParams = filter

export const getTimezone = async (params: TimezoneParams) =>
  fetcher<GetTimezone>({ path: '/v1/timezone', params: params })

export const getTimezoneDropdown = async (params: TimezoneParams) =>
  fetcher<GetTimezone>({ path: '/api/v1/timezone', params: params })

export const getDetailTimezone = async (id: string) =>
  fetcher<GetDetaiTimezone>({ path: `/v1/timezone`, params: { _id: id } })

export const createTimezone = async (form: TimezoneModel) =>
  fetcher<MainResponse>({
    path: '/api/v1/timezone',
    options: {
      method: 'POST',
      body: form,
    },
  })

export const editTimezone = async (id: string, form: TimezoneModel) =>
  fetcher<MainResponse>({
    path: `/api/v1/timezone`,
    params: {
      _id: id,
    },
    options: {
      method: 'PUT',
      body: form,
    },
  })

export const deleteTimezone = async (id: string) =>
  fetcher<MainResponse>({
    path: `/api/v1/timezone`,
    params: {
      _id: id,
    },
    options: {
      method: 'DELETE',
    },
  })
