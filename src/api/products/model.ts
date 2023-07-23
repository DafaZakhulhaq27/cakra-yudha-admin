import { ProductModel } from '@/app/(dashboard)/products/_components/Model'
import { MainResponse, PagedResponse } from '../response'

export type Schedule = {
  date: string
  code_flight_schedule: string
  boarding_passcode: string
  departure_time: string
  arrived_time: string
}

export type Product = Omit<ProductModel, 'category' | 'seat' | 'price'> & {
  _id: string
  category: {
    _id: string
    icon: string
    name: string
  }
  schedule: Schedule[]
  is_sold: boolean
  seat: number
  price: number
}

export type GetProducts = {
  data: Product[]
} & PagedResponse

export type GetDetaiProduct = {
  data: Product
} & MainResponse
