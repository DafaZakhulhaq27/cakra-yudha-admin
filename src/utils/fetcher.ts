import { getServerSession } from 'next-auth/next'

import { authOptions } from '../config/auth'
import { catchBackendError } from './error'

export type MethodType = 'GET' | 'POST' | 'PUT' | 'DELETE'

export async function fetcher<T>(
  path: string | { fullUrl: string },
  options: {
    method: MethodType
    body?: BodyInit | null
  } = {
    method: 'GET',
    body: null,
  },
) {
  const session = await getServerSession(authOptions)
  const token = `Bearer ${session?.user.bearerToken ?? ''}`

  const baseURL = process.env.API_URL

  if (!baseURL) {
    throw new Error('Base URL not found')
  }

  const url = typeof path === 'string' ? baseURL + path : path.fullUrl
  // console.log('=== URL:', url)

  const headers: HeadersInit = {
    accept: 'application/json',
    'Content-Type': 'application/json',
  }

  if (token) {
    headers.authorization = token
    // console.log('=== TOKEN:', token)
  }

  const isGetMethod = options.method === 'GET'
  const body = JSON.stringify(options.body) ?? null
  const init: RequestInit = {
    method: options.method,
    headers,
    body: isGetMethod ? null : body,
  }

  const res = await fetch(url, init)
  return catchBackendError<T>(res)
}
