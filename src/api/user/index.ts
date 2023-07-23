import { UserModel } from '@/app/(dashboard)/user/_components/Model'
import { fetcher } from '@/utils/fetcher'
import { filter } from '../filter'
import { MainResponse, dummyAPIResponse, dummyMainResponse } from '../response'
import { GetDetailUser, GetUser } from './model'

export const getUser = async (params: filter) =>
  fetcher<GetUser>({ path: '/v1/user', params: params })

export const getDetailUser = async (id: string) =>
  fetcher<GetDetailUser>({ path: `/v1/user`, params: { _id: id } })

export const createUser = async (form: UserModel) =>
  fetcher<MainResponse>({
    path: '/api/v1/user',
    options: {
      method: 'POST',
      body: form,
    },
  })

export const editUser = async (id: string, form: UserModel) =>
  //   fetcher<MainResponse>({
  //     path: `/v1/user/${id}`,
  //     options: {
  //       method: 'PUT',
  //       body: form,
  //     },
  //   })
  dummyAPIResponse<MainResponse>(dummyMainResponse)

export const deleteUser = async (id: string) =>
  fetcher<MainResponse>({
    path: `/v1/user`,
    params: {
      _id: id,
    },
    options: {
      method: 'DELETE',
    },
  })
