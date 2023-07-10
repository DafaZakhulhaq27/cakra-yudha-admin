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

// TODO : Remove it when api ready
export const dummyCategoriesListResponse: GetCategories = {
  status: true,
  message: 'Success',
  data: [
    {
      _id: '1',
      icon: 'https://robohash.org/autquiaut.png?size=50x50&set=set1',
      name: 'Robot',
    },
    {
      _id: '2',
      icon: 'https://robohash.org/autquiaut.png?size=50x50&set=set1',
      name: 'Robit',
    },
  ],
  page: 1,
  limit: 10,
  total_data: 100,
  total_page: 10,
}

// TODO : Remove it when api ready
export const dummyCategoryResponse: GetDetailCategory = {
  status: true,
  message: 'Success',
  data: {
    _id: '1',
    icon: 'https://robohash.org/autquiaut.png?size=50x50&set=set1',
    name: 'Robot',
  },
}
