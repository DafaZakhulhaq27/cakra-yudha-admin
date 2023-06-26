import { getTest } from '@/api/outbound/test'

export default async function Home() {
  const res = await getTest()
  console.log(res, 'res')

  return <div>Home</div>
}
