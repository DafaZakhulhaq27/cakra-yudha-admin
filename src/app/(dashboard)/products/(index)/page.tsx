import { getProduct } from '@/api/products'
import List from '../_components/List'

interface Props {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function UserPage({ searchParams }: Props) {
  const res = await getProduct({
    category: String(searchParams?.category ?? ''),
    limit: String(searchParams?.limit ?? 10),
    page: String(searchParams?.page ?? 1),
    search: String(searchParams?.search ?? ''),
  })

  return <List res={res} />
}
