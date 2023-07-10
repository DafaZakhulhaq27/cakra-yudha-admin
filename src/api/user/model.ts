import { UserProfile } from '@/app/(auth)/login/Models'
import { MainResponse, PagedResponse } from '../response'

export type GetUser = {
  data: UserProfile[]
} & PagedResponse

export type GetDetailUser = {
  data: UserProfile
} & MainResponse

// TODO : Remove it when api ready
export const dummyUserListResponse: GetUser = {
  status: true,
  message: 'Success',
  data: [
    {
      _id: '1',
      email: 'dafa@gmail.com',
      name: 'dafa',
      company_name: 'dafa company',
      phone_number: '081123456789',
      status: 'active',
      role: 'user',
      address: 'jakarta',
      is_new_login: true,
    },
    {
      _id: '2',
      email: 'dafa@gmail.com',
      name: 'dafa',
      company_name: 'dafa company',
      phone_number: '081123456789',
      status: 'suspend',
      role: 'user',
      address: 'jakarta',
      is_new_login: true,
    },
  ],
  page: 1,
  limit: 10,
  total_data: 100,
  total_page: 10,
}

// TODO : Remove it when api ready
export const dummyUserResponse: GetDetailUser = {
  status: true,
  message: 'Success',
  data: {
    _id: '1',
    email: 'dafa@gmail.com',
    name: 'dafa',
    company_name: 'dafa company',
    phone_number: '081123456789',
    status: 'active',
    role: 'user',
    address: 'jakarta',
    is_new_login: true,
  },
}
