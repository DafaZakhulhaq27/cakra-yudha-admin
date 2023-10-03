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
import { VALET_TYPE_DROPDOWN } from '@/constant/valet'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { startTransition } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { ProjectModel, projectModel } from './Model'

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
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods

  const onSubmit = async (data: ProjectModel, e: any) => {
    e.preventDefault()
    let formData = new FormData()

    const res = prefill
      ? await editProject(prefill._id, data)
      : await createProject(data)
    if (res.status) {
      toast.success(`${prefill ? 'Edit' : 'Create'} Project Success `)
      startTransition(() => {
        router.push(`/valet_master/projects`)
        router.refresh()
      })
    } else {
      toast.error(`${prefill ? 'Edit' : 'Create'} Project Failed `)
    }
  }

  return (
    <LayoutPage name={`${prefill ? 'Edit' : 'Add'} Project`}>
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
            <SelectClient name="client_id" />
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
            <Select
              placeHolder={'Select Type'}
              label={'Type'}
              name="type"
              data={VALET_TYPE_DROPDOWN}
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
