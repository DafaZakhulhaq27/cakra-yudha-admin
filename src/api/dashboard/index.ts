import { fetcher } from '@/utils/fetcher'
import { GetAbsencePercentage, GetGraphAbsence, GetReportCard } from './model'

export const getReportCard = async () =>
  fetcher<GetReportCard>({ path: '/v1/dashboard/report-card' })

type GraphAbsenceParams = {
  project_id?: string
  tahun?: string
  user_id?: string
}

export const getGraphAbsence = async (params: GraphAbsenceParams) =>
  fetcher<GetGraphAbsence>({
    path: '/v1/dashboard/grafik-absen',
    params: params,
  })

export const getAbsencePercentage = async () =>
  fetcher<GetAbsencePercentage>({
    path: '/v1/dashboard/grafik-persentasi-absen',
  })
