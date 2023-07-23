import { getDetailProduct } from '@/api/products'
import Form from '../_components/Form'

type Props = {
  params: { id: string }
}

export default async function page({ params }: Props) {
  const { data } = await getDetailProduct(params.id)

  if (!data) {
    return null
  }

  return <Form prefill={data} />
}
