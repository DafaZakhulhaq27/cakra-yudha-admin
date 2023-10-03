import { redirect } from 'next/navigation'

export interface ErrorJson {
  // error: string === error.message
  // statusCode: number === error.code
  message: string
}

export class BackendError extends Error {
  code: number

  constructor(message: string, code: number) {
    super(message)
    this.name = 'BackendError'
    this.code = code
  }
}

export async function catchBackendError<T>(res: Response) {
  if (!res.ok) {
    const isJson = res.headers.get('content-type')?.includes('application/json')
    let message = res.statusText
    if (isJson) {
      const json = (await res.json()) as ErrorJson
      message = json.message
    }

    if (message === 'jwt expired') {
      redirect('/logout')
    }

    const error = new BackendError(message, res.status)

    return Promise.reject(error)
  }

  return (await res.json()) as T
}
