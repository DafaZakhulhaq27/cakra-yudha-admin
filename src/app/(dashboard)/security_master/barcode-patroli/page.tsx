import { SearchParamsProps } from '@/config/constant'
import List from './_components/List'
import { getBarcodePatroli } from '@/api/barcodePatroli'

export default async function BarcodePatroliPage({
  searchParams,
}: SearchParamsProps) {
  const res = await getBarcodePatroli({
    limit: String(searchParams?.limit ?? 10),
    page: String(searchParams?.page ?? 1),
    search: String(searchParams?.search ?? ''),
  })

  return <List res={res} />
}
