import { getCompany } from '@/api/companies'
import { SearchParamsProps } from '@/config/constant'
import List from './_components/List'
import { getProject } from '@/api/projects'

export default async function CompaniesPage({
  searchParams,
}: SearchParamsProps) {
  const res = await getProject({
    limit: String(searchParams?.limit ?? 10),
    page: String(searchParams?.page ?? 1),
    search: String(searchParams?.search ?? ''),
    type: searchParams?.type ? String(searchParams?.type) : undefined,
  })

  return <List res={res} />
}
