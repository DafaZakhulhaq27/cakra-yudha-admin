import { getDetailGroup } from '@/api/group'
import Form from '../_components/Form'

type Props = {
  params: { id: string }
}

export default async function page({ params }: Props) {
  const { data } = await getDetailGroup(params.id, 'security')

  if (!data) {
    return null
  }

  return <Form prefill={data} />
}
