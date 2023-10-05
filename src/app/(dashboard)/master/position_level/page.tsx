import { getPositionLevel } from '@/api/positionLevel'
import { SearchParamsProps } from '@/config/constant'
import List from './_components/List'

export default async function PositionLevelPage({
  searchParams,
}: SearchParamsProps) {
  const res = await getPositionLevel({
    limit: String(searchParams?.limit ?? 10),
    page: String(searchParams?.page ?? 1),
    search: String(searchParams?.search ?? ''),
  })

  return <List res={res} />
}
