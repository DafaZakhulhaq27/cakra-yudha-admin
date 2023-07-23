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

// TODO : Remove it when api ready
export const dummyProductListResponse: GetProducts = {
  status: true,
  message: 'Success',
  data: [
    {
      _id: '1',
      schedule: [
        {
          date: '1-aug',
          code_flight_schedule: 'WY-850',
          boarding_passcode: 'CGKMCT',
          departure_time: '14:50',
          arrived_time: '15:50',
        },
        {
          date: '1-aug',
          code_flight_schedule: 'WY-850',
          boarding_passcode: 'CGKMCT',
          departure_time: '14:50',
          arrived_time: '15:50',
        },
      ],
      seat: 40,
      program: '10D',
      price: 1000,
      category: {
        _id: '1',
        icon: 'xxx',
        name: 'xxx',
      },
      is_sold: false,
    },
  ],
  page: 1,
  limit: 10,
  total_data: 100,
  total_page: 10,
}

// TODO : Remove it when api ready
export const dummyUProductResponse: GetDetaiProduct = {
  status: true,
  message: 'Success',
  data: {
    _id: '1',
    schedule: [
      {
        date: '1-aug',
        code_flight_schedule: 'WY-850',
        boarding_passcode: 'CGKMCT',
        departure_time: '14:50',
        arrived_time: '15:50',
      },
      {
        date: '1-aug',
        code_flight_schedule: 'WY-850',
        boarding_passcode: 'CGKMCT',
        departure_time: '14:50',
        arrived_time: '15:50',
      },
    ],
    seat: 40,
    program: '10D',
    price: 1000,
    category: {
      _id: '1',
      icon: 'xxx',
      name: 'xxx',
    },
    is_sold: false,
  },
}
