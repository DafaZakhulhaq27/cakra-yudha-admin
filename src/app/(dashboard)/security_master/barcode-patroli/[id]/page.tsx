import Form from '../_components/Form'
import { getDetailBarcodePatroli } from '@/api/barcodePatroli'

type Props = {
  params: { id: string }
}

export default async function page({ params }: Props) {
  const { data } = await getDetailBarcodePatroli(params.id)

  if (!data) {
    return null
  }

  return <Form prefill={data} />
}
