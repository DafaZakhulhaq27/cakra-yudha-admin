import { SearchParamsProps } from '@/config/constant'
import List from './_components/List'
import { getCurrency } from '@/api/currency'

export default async function CurrencyPage({
  searchParams,
}: SearchParamsProps) {
  const res = await getCurrency({
    limit: String(searchParams?.limit ?? 10),
    page: String(searchParams?.page ?? 1),
    search: String(searchParams?.search ?? ''),
  })

  return <List res={res} />
}
