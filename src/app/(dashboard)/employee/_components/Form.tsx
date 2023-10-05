'use client'

import { createGroup, editGroup } from '@/api/group'
import { GroupDetail } from '@/api/group/model'
import Button from '@/components/forms/button'
import Input from '@/components/forms/input'
import SelectCompany from '@/components/forms/selectAsync/selectCompany'
import Textarea from '@/components/forms/textarea'
import LayoutPage from '@/components/layouts/layoutPage'
import { GROUP_PAGE_TITLE } from '@/constant/page'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { startTransition } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { GroupModel, groupModel } from './Model'
import SelectProject from '@/components/forms/selectAsync/selectProject'
import Select from '@/components/forms/select'

type Props = {
  prefill?: GroupDetail
}

export default function Form({ prefill }: Props) {
  const router = useRouter()
  const methods = useForm<GroupModel>({
    mode: 'onTouched',
    resolver: zodResolver(groupModel),
    defaultValues: {
      id: prefill?._id,
      project_id: prefill?.project_id._id,
      project_id_name: prefill?.project_id.name,
      geo_status: prefill?.geo_status ?? 'Active',
      group_code: prefill?.group_code,
      group_name: prefill?.group_name,
      contact_person: prefill?.contact_person,
      total_personil: prefill?.total_personil,
      desc: prefill?.desc,
      shift_validate_status: prefill?.shift_validate_status,
      lat: prefill?.lat,
      long: prefill?.long,
      radius: prefill?.radius,
      waktu_kerja: prefill?.waktu_kerja,
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = async (data: GroupModel, e: any) => {
    e.preventDefault()

    const formValue = {
      type: 'security',
      ...data,
    }

    const res = prefill
      ? await editGroup(prefill._id, formValue)
      : await createGroup(formValue)
    if (res.status) {
      toast.success(
        `${prefill ? 'Edit' : 'Create'} ${GROUP_PAGE_TITLE} Success `,
      )
      startTransition(() => {
        router.push(`/security_master/groups`)
        router.refresh()
      })
    } else {
      toast.error(
        `${prefill ? 'Edit' : 'Create'} ${GROUP_PAGE_TITLE} Failed ${
          res.message
        }`,
      )
    }
  }

  return (
    <LayoutPage name={`${prefill ? 'Edit' : 'Add'} ${GROUP_PAGE_TITLE}`}>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 mt-4"
          noValidate
        >
          <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 gap-5">
            <SelectProject name="project_id" type={'security'} />
            <Select
              placeHolder={'Select Geo Status'}
              label={'Geo Status'}
              name="geo_status"
              data={[
                {
                  label: 'Active',
                  value: 'Active',
                },
                {
                  label: 'Non Active',
                  value: 'Non Active',
                },
              ]}
            />
            <Input
              label="Group Code"
              name="group_code"
              placeholder="Group Code"
              required
            />
            <Input
              label="Group Name"
              name="group_name"
              placeholder="Group Name"
              required
            />
            <Input
              type="number"
              label="Contact Person"
              name="contact_person"
              placeholder="Contact Person"
              required
            />
            <Input
              type="number"
              label="Total Personil"
              name="total_personil"
              placeholder="Total Personil"
              required
            />{' '}
            <Textarea
              label="Description"
              name="desc"
              placeholder="Description"
              required
            />
            <Select
              placeHolder={'Select Shift Validate Status'}
              label={'Shift Validate Status'}
              name="shift_validate_status"
              data={[
                {
                  label: 'Active',
                  value: 'Active',
                },
                {
                  label: 'Non Active',
                  value: 'Non Active',
                },
              ]}
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
            <Input
              type="time"
              label="Time Working"
              name="waktu_kerja"
              placeholder="Time Working"
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
