import { getDetailQualification } from '@/api/qualification'
import Form from '../_components/Form'

type Props = {
  params: { id: string }
}

export default async function page({ params }: Props) {
  const { data } = await getDetailQualification(params.id)

  if (!data) {
    return null
  }

  return <Form prefill={data} />
}
