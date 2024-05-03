import { SearchParamsProps } from '@/config/constant'
import List from './_components/List'
import { getBarcodeScanMobile } from '@/api/barcodePatroli'

export default async function BarcodeScanMobilePage({
  searchParams,
}: SearchParamsProps) {
  const res = await getBarcodeScanMobile({
    limit: String(searchParams?.limit ?? 10),
    page: String(searchParams?.page ?? 1),
    search: String(searchParams?.search ?? ''),
    project_id: String(searchParams?.project_id ?? ''),
    start_date: String(searchParams?.start_date ?? ''),
    end_date: String(searchParams?.end_date ?? ''),
  })

  return <List res={res} />
}
