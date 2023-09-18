import { getTimezone } from '@/api/timezone'
import { SearchParamsProps } from '@/config/constant'
import List from './_components/List'

export default async function TimezonePage({
  searchParams,
}: SearchParamsProps) {
  const res = await getTimezone({
    limit: String(searchParams?.limit ?? 10),
    page: String(searchParams?.page ?? 1),
    search: String(searchParams?.search ?? ''),
  })

  return <List res={res} />
}
