import { getServerSession } from 'next-auth/next'

import { authOptions } from '../config/auth'
import { catchBackendError } from './error'

export type MethodType = 'GET' | 'POST' | 'PUT' | 'DELETE'

type FetchProps = {
  path: string | { fullUrl: string }
  params?: any
  options?: {
    method?: MethodType
    body?: object | FormData | null // Updated type to include FormData
  }
}

export async function fetcher<T>({
  path,
  params,
  options = {
    method: 'GET',
    body: null,
  },
}: FetchProps) {
  const session = await getServerSession(authOptions)
  const token = `Bearer ${session?.user.bearerToken ?? ''}`
  const paramsUrl = params ? '?' + new URLSearchParams(params).toString() : ''

  const baseURL = process.env.API_URL
  if (!baseURL) {
    throw new Error('Base URL not found')
  }

  const url =
    (typeof path === 'string' ? baseURL + path : path.fullUrl) + paramsUrl

  const headers: HeadersInit = {
    accept: 'application/json',
    // Update Content-Type header for form data
    'Content-Type':
      options?.body instanceof FormData
        ? 'multipart/form-data'
        : 'application/json',
  }

  if (token) {
    headers.authorization = token
  }

  const isGetMethod = options?.method === 'GET'
  const body =
    options?.body instanceof FormData
      ? options.body
      : JSON.stringify(options?.body || null) // Handle form data
  const init: RequestInit = {
    method: options?.method || 'GET',
    headers,
    body: isGetMethod ? null : body,
  }

  const res = await fetch(url, init)
  return catchBackendError<T>(res)
}
