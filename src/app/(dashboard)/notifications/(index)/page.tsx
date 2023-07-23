import { getNotifications } from '@/api/notifications'
import List from '../_components/List'

interface Props {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function NotificationPage({ searchParams }: Props) {
  const res = await getNotifications({
    limit: String(searchParams?.limit ?? 10),
    page: String(searchParams?.page ?? 1),
    search: String(searchParams?.search ?? ''),
  })

  return <List res={res} />
}
