import { SearchParamsProps } from '@/config/constant'
import List from './_components/List'
import { getBarcodePatroli, getGenerateBarcode } from '@/api/barcodePatroli'

export default async function BarcodePatroliPage({
  searchParams,
}: SearchParamsProps) {
  const res = await getBarcodePatroli({
    limit: String(searchParams?.limit ?? 10),
    page: String(searchParams?.page ?? 1),
    search: String(searchParams?.search ?? ''),
  })

  const resGenerateBarcode = await getGenerateBarcode({
    search: String(searchParams?.search ?? ''),
    start_date: String(searchParams?.start_date ?? ''),
    end_date: String(searchParams?.end_date ?? ''),
    project_id: String(searchParams?.project_id ?? ''),
  })

  return <List res={res} generateBarcode={resGenerateBarcode} />
}
