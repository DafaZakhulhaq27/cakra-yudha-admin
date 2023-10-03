import { getClient } from '@/api/client'
import { SearchParamsProps } from '@/config/constant'
import List from './_components/List'

export default async function ClientPage({ searchParams }: SearchParamsProps) {
  const res = await getClient({
    limit: String(searchParams?.limit ?? 10),
    page: String(searchParams?.page ?? 1),
    search: String(searchParams?.search ?? ''),
    type: 'security',
  })

  return <List res={res} />
}
