import { MainResponse } from '../response'

export type LoginData = {
  data: {
    token: string
  }
} & MainResponse

// TODO : Remove it when api ready
export const dummyLoginResponse: LoginData = {
  status: true,
  message: 'Success',
  data: {
    token:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiIxIiwiZW1haWwiOiJkYWZhQGdtYWlsLmNvbSIsIm5hbWUiOiJkYWZhIiwiY29tcGFueV9uYW1lIjoiZGFmYSBjb21wYW55IiwicGhvbmVfbnVtYmVyIjoiMDgxMTIzNDU2Nzg5Iiwic3RhdHVzIjoiYWN0aXZlIiwicm9sZSI6Im1hc3RlciIsImFkZHJlc3MiOiJqYWthcnRhIiwiaXNfbmV3X2xvZ2luIjp0cnVlfQ.DEwoIb0EXyMWuis-f4D7ugUjv-We_s_YnsYkd9QUUlc',
  },
}
