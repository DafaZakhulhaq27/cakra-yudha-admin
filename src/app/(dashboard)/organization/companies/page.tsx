import { getCompany } from '@/api/companies'
import { SearchParamsProps } from '@/config/constant'
import List from './_components/List'

export default async function CompaniesPage({
  searchParams,
}: SearchParamsProps) {
  const res = await getCompany({
    limit: String(searchParams?.limit ?? 10),
    page: String(searchParams?.page ?? 1),
    search: String(searchParams?.search ?? ''),
  })

  return <List res={res} />
}
