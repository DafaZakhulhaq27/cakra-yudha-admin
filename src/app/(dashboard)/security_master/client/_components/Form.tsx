'use client'

import { createClient, editClient } from '@/api/client'
import { ClientDetail } from '@/api/client/model'
import Button from '@/components/forms/button'
import Input from '@/components/forms/input'
import SelectCompany from '@/components/forms/selectAsync/selectCompany'
import Textarea from '@/components/forms/textarea'
import LayoutPage from '@/components/layouts/layoutPage'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { startTransition } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { ClientModel, clientModel } from './Model'
import { CLIENT_PAGE_TITLE } from '@/constant/page'
import { ValetSecurityEnum } from '@/constant/valetSecurity'

type Props = {
  prefill?: ClientDetail
}

export default function Form({ prefill }: Props) {
  const router = useRouter()
  const methods = useForm<ClientModel>({
    mode: 'onTouched',
    resolver: zodResolver(clientModel),
    defaultValues: {
      id: prefill?._id,
      company_id: prefill?.company._id,
      company_id_name: prefill?.company.name,
      client_code: prefill?.client_code,
      client_name: prefill?.client_name,
      director_name: prefill?.director_name,
      contact_person: prefill?.contact_person,
      address: prefill?.address,
      province: prefill?.province,
      city: prefill?.city,
      postal_code: prefill?.postal_code,
      desc: prefill?.desc,
      lat: prefill?.lat,
      long: prefill?.long,
      type: ValetSecurityEnum.Security,
      email: prefill?.email,
      password: prefill ? undefined : '',
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = async (data: ClientModel, e: any) => {
    e.preventDefault()

    const formValue = data

    const res = prefill
      ? await editClient(prefill._id, formValue)
      : await createClient(formValue)
    if (res.status) {
      toast.success(
        `${prefill ? 'Edit' : 'Create'} ${CLIENT_PAGE_TITLE} Success `,
      )
      startTransition(() => {
        router.push(`/security_master/client`)
        router.refresh()
      })
    } else {
      toast.error(
        `${prefill ? 'Edit' : 'Create'} ${CLIENT_PAGE_TITLE} Failed ${
          res.message
        }`,
      )
    }
  }

  return (
    <LayoutPage name={`${prefill ? 'Edit' : 'Add'} ${CLIENT_PAGE_TITLE}`}>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 mt-4"
          noValidate
        >
          <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 gap-5">
            <SelectCompany name="company_id" />
            <Input
              label="Client Code"
              name="client_code"
              placeholder="Client Code"
              required
            />
            <Input
              label="Client Name"
              name="client_name"
              placeholder="Client Name"
              required
            />
            <Input
              label="Director Name"
              name="director_name"
              placeholder="Director Name"
              required
            />
            <Input
              type="number"
              label="Contact Person"
              name="contact_person"
              placeholder="Contact Person"
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
              label="Postal Code"
              name="postal_code"
              placeholder="Postal Code"
              required
            />
            <Textarea
              label="Description"
              name="desc"
              placeholder="Description"
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
            <Input label="Email" name="email" placeholder="Email" required />
            <Input
              type="password"
              label="Password"
              name="password"
              placeholder="Password"
              required
            />{' '}
            <Input
              type="password"
              label="Password Confirmation"
              name="password_confirmation"
              placeholder="Password Confirmation"
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
