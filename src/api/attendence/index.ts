import { fetcher } from '@/utils/fetcher'
import { filter } from '../filter'
import { GetAttendence } from './model'

type AttendenceParams = filter & {
  project_id?: string
  start_date?: string
  end_date?: string
}

export const getAttendence = async (params: AttendenceParams) =>
  fetcher<GetAttendence>({ path: '/v1/attandance', params: params })

export const getAllAttendenceClient = async (project_id?: string | null) =>
  fetcher<{ data: unknown[] }>({
    path: '/api/v1/attandance/list_export_exce',
    params: { limit: '99999', project_id: project_id },
  })
