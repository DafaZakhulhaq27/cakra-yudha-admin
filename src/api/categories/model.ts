import { MainResponse, PagedResponse } from '../response'

export type Category = {
  _id: string
  icon: string
  name: string
}

export type GetCategories = {
  data: Category[]
} & PagedResponse

export type GetDetailCategory = {
  data: Category
} & MainResponse
