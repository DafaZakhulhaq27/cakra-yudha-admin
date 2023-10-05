import { QualificationModel } from '@/app/(dashboard)/master/qualification/_components/Model'
import { fetcher } from '@/utils/fetcher'
import { filter } from '../filter'
import { MainResponse } from '../response'
import { GetDetaiQualification, GetQualification } from './model'

type QualificationParams = filter

export const getQualification = async (params: QualificationParams) =>
  fetcher<GetQualification>({ path: '/v1/qualification', params: params })

export const getQualificationDropdown = async (params: QualificationParams) =>
  fetcher<GetQualification>({ path: '/api/v1/qualification', params: params })

export const getDetailQualification = async (id: string) =>
  fetcher<GetDetaiQualification>({
    path: `/v1/qualification`,
    params: { _id: id },
  })

export const createQualification = async (form: QualificationModel) =>
  fetcher<MainResponse>({
    path: '/api/v1/qualification',
    options: {
      method: 'POST',
      body: form,
    },
  })

export const editQualification = async (id: string, form: QualificationModel) =>
  fetcher<MainResponse>({
    path: `/api/v1/qualification`,
    params: {
      _id: id,
    },
    options: {
      method: 'PUT',
      body: form,
    },
  })

export const deleteQualification = async (id: string) =>
  fetcher<MainResponse>({
    path: `/api/v1/qualification`,
    params: {
      _id: id,
    },
    options: {
      method: 'DELETE',
    },
  })
