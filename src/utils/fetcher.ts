import { API_KEY } from '@/config/constant'
import { catchBackendError } from './error'
import { getSession } from './session'

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
  let url = ''
  let baseURL = ''
  let token = ''

  if (typeof path === 'string' && path.includes('api')) {
    baseURL = process.env.NEXTAUTH_URL!
    if (!baseURL) {
      throw new Error('Base URL not found')
    }
  } else {
    baseURL = process.env.API_URL!
    if (!baseURL) {
      throw new Error('Base URL not found')
    }
    const session = await getSession()
    token = `Bearer ${session?.user.bearerToken ?? ''}`
  }
  const paramsUrl = params ? '?' + new URLSearchParams(params).toString() : ''

  url = (typeof path === 'string' ? baseURL + path : path.fullUrl) + paramsUrl
  const headers: HeadersInit = {
    accept: 'application/json',
    'X-API-KEY': API_KEY,
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
