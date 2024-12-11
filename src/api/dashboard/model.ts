import { MainResponse } from '../response'

export type ReportCard = {
  p_absen: number
  t_personil: number
  t_project: number
}

export type GetReportCard = {
  data: ReportCard
} & MainResponse

export type GetGraphAbsence = {
  data: string[]
  value: number[]
} & MainResponse

export type AbsencePercentage = {
  masuk: number
  sakit: number
  izin: number
}

export type GetAbsencePercentage = {
  data: AbsencePercentage
} & MainResponse
