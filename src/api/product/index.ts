import { fetcher } from '@/utils/fetcher'
import { filter } from '../filter'
import { GetAllProduct } from './model'

export const getAllProducts = async (params: filter) =>
  fetcher<GetAllProduct>('/products', params)
