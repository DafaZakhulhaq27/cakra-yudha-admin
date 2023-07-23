import { fetcher } from '@/utils/fetcher'
import { filter } from '../filter'
import { MainResponse } from '../response'
import { GetCategories, GetDetailCategory } from './model'

export const getCategory = async (params: filter) =>
  fetcher<GetCategories>({ path: '/v1/category', params: params })

export const getCategoryDropdown = async (params: filter) =>
  fetcher<GetCategories>({ path: '/api/v1/category', params: params })

export const getDetailCategory = async (id: string) =>
  fetcher<GetDetailCategory>({
    path: `/v1/category`,
    params: {
      _id: id,
    },
  })

type CategoryForm = {
  icon: string
  name: string
}

export const createCategory = async (form: CategoryForm) => {
  return fetcher<MainResponse>({
    path: '/api/v1/category',
    options: {
      method: 'POST',
      body: form,
    },
  })
}

export const editCategory = async (id: string, form: CategoryForm) => {
  return fetcher<MainResponse>({
    path: '/api/v1/category',
    params: {
      _id: id,
    },
    options: {
      method: 'PUT',
      body: form,
    },
  })
}

export const deleteCategory = async (id: string) =>
  fetcher<MainResponse>({
    path: `/api/v1/category`,
    params: {
      _id: id,
    },
    options: {
      method: 'DELETE',
    },
  })
