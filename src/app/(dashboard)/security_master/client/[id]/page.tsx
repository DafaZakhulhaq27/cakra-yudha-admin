import { getDetailLocation } from '@/api/locations'
import Form from '../_components/Form'
import { getDetailClient } from '@/api/client'

type Props = {
  params: { id: string }
}

export default async function page({ params }: Props) {
  const { data } = await getDetailClient(params.id, 'security')

  if (!data) {
    return null
  }

  return <Form prefill={data} />
}
