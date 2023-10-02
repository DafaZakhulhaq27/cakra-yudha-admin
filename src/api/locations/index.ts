import { fetcher } from '@/utils/fetcher'
import { filter } from '../filter'
import { MainResponse } from '../response'
import { GetDetaiLocation, GetLocation } from './model'

type LocationParams = filter

export const getLocation = async (params: LocationParams) =>
  fetcher<GetLocation>({ path: '/v1/location', params: params })

export const getLocationDropdown = async (params: LocationParams) =>
  fetcher<GetLocation>({ path: '/api/v1/location', params: params })

export const getDetailLocation = async (id: string) =>
  fetcher<GetDetaiLocation>({
    path: `/v1/location`,
    params: { _id: id },
  })

export const createLocation = async (form: {}) =>
  fetcher<MainResponse>({
    path: '/api/v1/location',
    options: {
      method: 'POST',
      body: form,
    },
  })

export const editLocation = async (id: string, form: {}) =>
  fetcher<MainResponse>({
    path: `/api/v1/location`,
    params: {
      _id: id,
    },
    options: {
      method: 'PUT',
      body: form,
    },
  })

export const deleteLocation = async (id: string) =>
  fetcher<MainResponse>({
    path: `/api/v1/location`,
    params: {
      _id: id,
    },
    options: {
      method: 'DELETE',
    },
  })
