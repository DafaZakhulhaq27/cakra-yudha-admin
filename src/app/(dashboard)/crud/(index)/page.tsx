import { getTest } from '@/api/outbound/test'
import List from '../_components/List'

export default async function CRUDPage() {
  const res = await getTest()
  console.log(res, 'res')

  return <List />
}
