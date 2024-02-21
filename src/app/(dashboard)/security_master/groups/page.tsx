import { getGroup } from '@/api/group'
import { SearchParamsProps } from '@/config/constant'
import List from './_components/List'
import { ValetSecurityEnum } from '@/constant/valetSecurity'

export default async function GroupPage({ searchParams }: SearchParamsProps) {
  const res = await getGroup({
    limit: String(searchParams?.limit ?? 10),
    page: String(searchParams?.page ?? 1),
    search: String(searchParams?.search ?? ''),
    type: ValetSecurityEnum.Security,
  })

  return <List res={res} />
}
