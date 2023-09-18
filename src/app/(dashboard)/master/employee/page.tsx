import { getEmployee } from '@/api/employee'
import { SearchParamsProps } from '@/config/constant'
import List from './_components/List'

export default async function EmployeePage({
  searchParams,
}: SearchParamsProps) {
  const res = await getEmployee({
    limit: String(searchParams?.limit ?? 10),
    page: String(searchParams?.page ?? 1),
    search: String(searchParams?.search ?? ''),
  })

  return <List res={res} />
}
