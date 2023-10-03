import { fetcher } from '@/utils/fetcher'
import { filter } from '../filter'
import { MainResponse } from '../response'
import { GetDetaiProject, GetProject } from './model'

type ProjectParams = {
  type?: string
} & filter

export const getProject = async (params: ProjectParams) =>
  fetcher<GetProject>({ path: '/v1/project', params: params })

export const getProjectDropdown = async (params: ProjectParams) =>
  fetcher<GetProject>({ path: '/api/v1/project', params: params })

export const getDetailProject = async (id: string) =>
  fetcher<GetDetaiProject>({
    path: `/v1/project`,
    params: { _id: id },
  })

export const createProject = async (form: {}) =>
  fetcher<MainResponse>({
    path: '/api/v1/project',
    options: {
      method: 'POST',
      body: form,
    },
  })

export const editProject = async (id: string, form: {}) =>
  fetcher<MainResponse>({
    path: `/api/v1/project`,
    params: {
      _id: id,
    },
    options: {
      method: 'PUT',
      body: form,
    },
  })

export const deleteProject = async (id: string) =>
  fetcher<MainResponse>({
    path: `/api/v1/project`,
    params: {
      _id: id,
    },
    options: {
      method: 'DELETE',
    },
  })
