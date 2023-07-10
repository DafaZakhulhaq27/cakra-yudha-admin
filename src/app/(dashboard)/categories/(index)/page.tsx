import { getCategory } from '@/api/categories'
import List from '../_components/List'

interface Props {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function CategoryPage({ searchParams }: Props) {
  const res = await getCategory({
    limit: String(searchParams?.limit ?? 10),
    page: String(searchParams?.page ?? 1),
    search: String(searchParams?.search ?? ''),
  })

  return <List res={res} />
}
