import { UserModel } from '@/app/(dashboard)/user/_components/Model'
import { filter } from '../filter'
import { MainResponse, dummyAPIResponse, dummyMainResponse } from '../response'
import {
  GetDetailUser,
  GetUser,
  dummyUserListResponse,
  dummyUserResponse,
} from './model'

export const getUser = async (params: filter) =>
  //   fetcher<GetUser>({ path: '/v1/user', params: params })
  dummyAPIResponse<GetUser>(dummyUserListResponse)

export const getDetailUser = async (id: string) =>
  //   fetcher<GetDetailUser>({ path: `/v1/user/${id}` })
  dummyAPIResponse<GetDetailUser>(dummyUserResponse)

export const createUser = async (form: UserModel) =>
  //   fetcher<GetUser>({
  //     path: '/v1/user',
  //     options: {
  //       method: 'POST',
  //       body: form,
  //     },
  //   })
  dummyAPIResponse<MainResponse>(dummyMainResponse)

export const editUser = async (id: string, form: UserModel) =>
  //   fetcher<GetUser>({
  //     path: `/v1/user/${id}`,
  //     options: {
  //       method: 'PUT',
  //       body: form,
  //     },
  //   })
  dummyAPIResponse<MainResponse>(dummyMainResponse)

export const deleteUser = async (id: string) =>
  //   fetcher<GetUser>({
  //     path: `/v1/user/${id}`,
  //     options: {
  //       method: 'DELETE',
  //     },
  //   })
  dummyAPIResponse<MainResponse>(dummyMainResponse)
