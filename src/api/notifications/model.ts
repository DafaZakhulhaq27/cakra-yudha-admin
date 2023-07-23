import { MainResponse, PagedResponse } from '../response'

export type Notification = {
  _id: string
  title: string
  desc: string
  status: string
}

export type GetNotifications = {
  data: Notification[]
} & PagedResponse

export type GetDetailNotification = {
  data: Notification
} & MainResponse
