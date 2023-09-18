import { getCompanyType } from '@/api/companyType'
import { SearchParamsProps } from '@/config/constant'
import List from './_components/List'

export default async function CompanyTypePage({
  searchParams,
}: SearchParamsProps) {
  const res = await getCompanyType({
    limit: String(searchParams?.limit ?? 10),
    page: String(searchParams?.page ?? 1),
    search: String(searchParams?.search ?? ''),
  })

  return <List res={res} />
}
