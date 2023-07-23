import { ProductModel } from '@/app/(dashboard)/products/_components/Model'
import { fetcher } from '@/utils/fetcher'
import { filter } from '../filter'
import { MainResponse } from '../response'
import { GetDetaiProduct, GetProducts } from './model'

export type FilterProduct = { category: string } & filter

export const getProduct = async (params: FilterProduct) =>
  fetcher<GetProducts>({ path: '/v1/product', params: params })

export const getDetailProduct = async (id: string) =>
  fetcher<GetDetaiProduct>({
    path: `/v1/product`,
    params: {
      _id: id,
    },
  })

export const createProduct = async (form: ProductModel) =>
  fetcher<MainResponse>({
    path: '/api/v1/product',
    options: {
      method: 'POST',
      body: form,
    },
  })

export const editProduct = async (id: string, form: ProductModel) =>
  fetcher<MainResponse>({
    path: `/api/v1/product`,
    params: {
      _id: id,
    },
    options: {
      method: 'PUT',
      body: form,
    },
  })

export const deleteProduct = async (id: string) =>
  fetcher<MainResponse>({
    path: `/api/v1/product`,
    params: {
      _id: id,
    },
    options: {
      method: 'DELETE',
    },
  })
