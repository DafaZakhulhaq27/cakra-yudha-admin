import { fetcher } from '@/utils/fetcher'
import { filter } from '../filter'
import { GetAttendence } from './model'
import { API_URL } from '@/config/constant'

type AttendenceParams = filter & { project_id?: string }

export const getAttendence = async (params: AttendenceParams) =>
  fetcher<GetAttendence>({ path: '/v1/attandance', params: params })

export const exportExcelAttendence = async () =>
  fetch(`${API_URL}/web/v1/attandance/export_excel`)
