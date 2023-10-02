import { getLocation } from '@/api/locations'
import { SearchParamsProps } from '@/config/constant'
import List from './_components/List'

export default async function LocationsPage({
  searchParams,
}: SearchParamsProps) {
  const res = await getLocation({
    limit: String(searchParams?.limit ?? 10),
    page: String(searchParams?.page ?? 1),
    search: String(searchParams?.search ?? ''),
  })

  return <List res={res} />
}
