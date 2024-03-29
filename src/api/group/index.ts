import { fetcher } from '@/utils/fetcher'
import { filter } from '../filter'
import { MainResponse } from '../response'
import { ValetSecurityType } from '@/constant/valetSecurity'
import { GetDetaiGroup, GetGroup } from './model'
import { GroupModel } from '@/app/(dashboard)/security_master/groups/_components/Model'

type GroupParams = {
  type?: ValetSecurityType
} & filter

export const getGroup = async (params: GroupParams) =>
  fetcher<GetGroup>({ path: '/v1/group', params: params })

export const getGroupDropdown = async (params: GroupParams) =>
  fetcher<GetGroup>({
    path: '/api/v1/group',
    params: { ...params, type: params.type ?? '' },
  })

export const getDetailGroup = async (id: string, type: ValetSecurityType) =>
  fetcher<GetDetaiGroup>({
    path: `/v1/group`,
    params: { _id: id, type },
  })

export const createGroup = async (form: GroupModel) =>
  fetcher<MainResponse>({
    path: '/api/v1/group',
    options: {
      method: 'POST',
      body: form,
    },
  })

export const editGroup = async (id: string, form: GroupModel) =>
  fetcher<MainResponse>({
    path: `/api/v1/group`,
    params: {
      _id: id,
    },
    options: {
      method: 'PUT',
      body: form,
    },
  })

export const deleteGroup = async (id: string) =>
  fetcher<MainResponse>({
    path: `/api/v1/group`,
    params: {
      _id: id,
    },
    options: {
      method: 'DELETE',
    },
  })
