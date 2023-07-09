import { PagedResponse } from '../response'

export type Product = {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

export type GetAllProduct = {
  products: Product[]
} & PagedResponse
