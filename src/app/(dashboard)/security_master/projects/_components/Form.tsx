'use client'

import { createProject, editProject } from '@/api/projects'
import { ProjectDetail } from '@/api/projects/model'
import Button from '@/components/forms/button'
import Input from '@/components/forms/input'
import InputFile from '@/components/forms/inputFile'
import Select from '@/components/forms/select'
import SelectClient from '@/components/forms/selectAsync/selectClient'
import Textarea from '@/components/forms/textarea'
import LayoutPage from '@/components/layouts/layoutPage'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { startTransition } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { ProjectModel, projectModel } from './Model'
import { PROJECT_PAGE_TITLE } from '@/constant/page'

type Props = {
  prefill?: ProjectDetail
}

export default function Form({ prefill }: Props) {
  const router = useRouter()
  const methods = useForm<ProjectModel>({
    mode: 'onTouched',
    resolver: zodResolver(projectModel),
    defaultValues: {
      id: prefill?._id,
      project_name: prefill?.Project_name,
      project_code: prefill?.Project_code,
      client_id: prefill?.client_id._id,
      client_id_name: prefill?.client_id.name,
      phone_number: prefill?.phone_number,
      address: prefill?.address,
      province: prefill?.province,
      city: prefill?.city,
      postal_code: prefill?.postal_code,
      desc: prefill?.desc,
      lat: prefill?.lat,
      long: prefill?.long,
      radius: prefill?.radius,
      attachment: prefill?.attachment,
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = async (data: ProjectModel, e: any) => {
    e.preventDefault()
    let formData = new FormData()

    formData.append('Project_name', data.project_name)
    formData.append('Project_code', data.project_code)
    formData.append('client_id', data.client_id)
    formData.append('phone_number', data.phone_number)
    formData.append('address', data.address)
    formData.append('province', data.province)
    formData.append('city', data.city)
    formData.append('postal_code', data.postal_code)
    formData.append('desc', data.desc)
    formData.append('lat', data.lat)
    formData.append('long', data.long)
    formData.append('radius', data.radius.toString())
    if (data.attachment.length) {
      formData.append('attachment', data.attachment[0])
    }

    formData.append('type', 'security')

    const res = prefill
      ? await editProject(prefill._id, formData)
      : await createProject(formData)

    if (res.status) {
      toast.success(
        `${prefill ? 'Edit' : 'Create'} ${PROJECT_PAGE_TITLE} Success `,
      )
      startTransition(() => {
        router.push(`/security_master/projects`)
        router.refresh()
      })
    } else {
      toast.error(
        `${prefill ? 'Edit' : 'Create'} ${PROJECT_PAGE_TITLE} Failed ${
          res.message
        } `,
      )
    }
  }

  return (
    <LayoutPage name={`${prefill ? 'Edit' : 'Add'} ${PROJECT_PAGE_TITLE}`}>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 mt-4"
          noValidate
        >
          <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 gap-5">
            <Input
              label="Project Name"
              name="project_name"
              placeholder="Project Name"
              required
            />
            <Input
              label="Project Code"
              name="project_code"
              placeholder="Project Code"
              required
            />
            <SelectClient name="client_id" type="security" />
            <Input
              type="number"
              label="Phone Number"
              name="phone_number"
              placeholder="Phone Number"
              required
            />
            <Textarea
              label="Address"
              name="address"
              placeholder="Address"
              required
            />
            <Input
              label="Province"
              name="province"
              placeholder="Province"
              required
            />
            <Input label="City" name="city" placeholder="City" required />
            <Input
              type="number"
              label="Postal Code"
              name="postal_code"
              placeholder="Postal Code"
              required
            />
            <Textarea label="Desc" name="desc" placeholder="Desc" required />
            <InputFile
              label="Attachment"
              name="attachment"
              placeholder="Attachment"
              required
            />
            <Input
              type="number"
              label="Lat"
              name="lat"
              placeholder="Lat"
              required
            />
            <Input
              type="number"
              label="Long"
              name="long"
              placeholder="Long"
              required
            />
            <Input
              type="number"
              label="Radius"
              name="radius"
              placeholder="Radius"
              required
            />
          </div>
          <Button
            type="submit"
            className="mt-8 w-full lg:w-1/2"
            isProcessing={isSubmitting}
            disabled={isSubmitting}
          >
            {prefill ? 'Edit' : 'Save'}
          </Button>
        </form>
      </FormProvider>
    </LayoutPage>
  )
}
