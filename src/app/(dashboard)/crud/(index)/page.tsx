import { getAllProducts } from '@/api/product'
import List from '../_components/List'

interface Props {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function CRUDPage({ searchParams }: Props) {
  const res = await getAllProducts({
    limit: String(searchParams?.limit ?? 10),
    skip: String(searchParams?.skip ?? 0),
    search: String(searchParams?.search ?? ''),
  })

  console.log(res, 'res')

  return <List res={res} />
}
