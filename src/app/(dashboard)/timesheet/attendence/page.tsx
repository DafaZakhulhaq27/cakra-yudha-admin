import { getAttendence } from '@/api/attendence'
import { SearchParamsProps } from '@/config/constant'
import List from './_components/List'

export default async function AttendencePage({
  searchParams,
}: SearchParamsProps) {
  const res = await getAttendence({
    limit: String(searchParams?.limit ?? 10),
    page: String(searchParams?.page ?? 1),
    search: String(searchParams?.search ?? ''),
    project_id: String(searchParams?.project_id ?? ''),
  })

  return <List res={res} />
}
