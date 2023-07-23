import { MainResponse } from '../response'

export type LoginData = {
  data: {
    token: string
  }
} & MainResponse
