import { ProductModel } from '@/app/(dashboard)/products/_components/Model'
import { filter } from '../filter'
import { MainResponse, dummyAPIResponse, dummyMainResponse } from '../response'
import {
  GetDetaiProduct,
  GetProducts,
  dummyProductListResponse,
  dummyUProductResponse,
} from './model'

export type FilterProduct = { category: string } & filter

export const getProduct = async (params: FilterProduct) =>
  // fetcher<GetProducts>({ path: '/v1/product', params: params })
  dummyAPIResponse<GetProducts>(dummyProductListResponse)

export const getDetailUser = async (id: string) =>
  //   fetcher<GetDetaiProduct>({ path: `/v1/product/${id}` })
  dummyAPIResponse<GetDetaiProduct>(dummyUProductResponse)

export const createProduct = async (form: ProductModel) =>
  //   fetcher<MainResponse>({
  //     path: '/v1/product',
  //     options: {
  //       method: 'POST',
  //       body: form,
  //     },
  //   })
  dummyAPIResponse<MainResponse>(dummyMainResponse)

export const editProduct = async (id: string, form: ProductModel) =>
  //   fetcher<MainResponse>({
  //     path: `/v1/product/${id}`,
  //     options: {
  //       method: 'PUT',
  //       body: form,
  //     },
  //   })
  dummyAPIResponse<MainResponse>(dummyMainResponse)

export const deleteProduct = async (id: string) =>
  //   fetcher<MainResponse>({
  //     path: `/v1/product/${id}`,
  //     options: {
  //       method: 'DELETE',
  //     },
  //   })
  dummyAPIResponse<MainResponse>(dummyMainResponse)
