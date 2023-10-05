import { PositionLevelModel } from '@/app/(dashboard)/master/position_level/_components/Model'
import { fetcher } from '@/utils/fetcher'
import { filter } from '../filter'
import { MainResponse } from '../response'
import { GetDetaiPositionLevel, GetPositionLevel } from './model'

type PositionLevelParams = filter

export const getPositionLevel = async (params: PositionLevelParams) =>
  fetcher<GetPositionLevel>({ path: '/v1/position_level', params: params })

export const getPositionLevelDropdown = async (params: PositionLevelParams) =>
  fetcher<GetPositionLevel>({ path: '/api/v1/position_level', params: params })

export const getDetailPositionLevel = async (id: string) =>
  fetcher<GetDetaiPositionLevel>({
    path: `/v1/position_level`,
    params: { _id: id },
  })

export const createPositionLevel = async (form: PositionLevelModel) =>
  fetcher<MainResponse>({
    path: '/api/v1/position_level',
    options: {
      method: 'POST',
      body: form,
    },
  })

export const editPositionLevel = async (id: string, form: PositionLevelModel) =>
  fetcher<MainResponse>({
    path: `/api/v1/position_level`,
    params: {
      _id: id,
    },
    options: {
      method: 'PUT',
      body: form,
    },
  })

export const deletePositionLevel = async (id: string) =>
  fetcher<MainResponse>({
    path: `/api/v1/position_level`,
    params: {
      _id: id,
    },
    options: {
      method: 'DELETE',
    },
  })
