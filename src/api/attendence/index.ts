import { fetcher } from '@/utils/fetcher'
import { filter } from '../filter'
import { GetAttendence } from './model'

type AttendenceParams = filter

export const getAttendence = async (params: AttendenceParams) =>
  fetcher<GetAttendence>({ path: '/v1/attandance', params: params })
