export type PagedResponse = {
  page: number
  limit: number
  total_data: number
  total_page: number
} & MainResponse

export type MainResponse = {
  status: boolean
  message: string
}

export function dummyAPIResponse<T>(data: T, delay: number = 2000): Promise<T> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data)
    }, delay)
  })
}

// TODO : delete when api ready
export const dummyMainResponse = {
  status: true,
  message: 'Success',
}
