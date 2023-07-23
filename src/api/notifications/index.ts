import { fetcher } from '@/utils/fetcher'
import { filter } from '../filter'
import { MainResponse } from '../response'
import { GetDetailNotification, GetNotifications } from './model'

export const getNotifications = async (params: filter) =>
  fetcher<GetNotifications>({ path: '/v1/notification', params: params })

export const getDetailNotification = async (id: string) =>
  fetcher<GetDetailNotification>({
    path: `/v1/notification`,
    params: {
      _id: id,
    },
  })

type NotificationForm = {
  title: string
  desc: string
  status: string
}

export const createNotification = async (form: NotificationForm) => {
  return fetcher<MainResponse>({
    path: '/api/v1/notification',
    options: {
      method: 'POST',
      body: form,
    },
  })
}

export const editNotification = async (id: string, form: NotificationForm) => {
  return fetcher<MainResponse>({
    path: '/api/v1/notification',
    params: {
      _id: id,
    },
    options: {
      method: 'PUT',
      body: form,
    },
  })
}

export const deleteNotification = async (id: string) =>
  fetcher<MainResponse>({
    path: `/api/v1/notification`,
    params: {
      _id: id,
    },
    options: {
      method: 'DELETE',
    },
  })
