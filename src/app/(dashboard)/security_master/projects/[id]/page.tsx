import { getDetailProject } from '@/api/projects'
import Form from '../_components/Form'
import { ValetSecurityEnum } from '@/constant/valetSecurity'

type Props = {
  params: { id: string }
}

export default async function page({ params }: Props) {
  const { data } = await getDetailProject(params.id, ValetSecurityEnum.Security)

  if (!data) {
    return null
  }

  return <Form prefill={data} />
}
