'use client'

import { createLocation, editLocation } from '@/api/locations'
import { LocationDetail } from '@/api/locations/model'
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
import { LocationModel, locationModel } from './Model'
import { LOCATION_PAGE_TITLE } from '@/constant/page'

type Props = {
  prefill?: LocationDetail
}

export default function Form({ prefill }: Props) {
  const router = useRouter()
  const methods = useForm<LocationModel>({
    mode: 'onTouched',
    resolver: zodResolver(locationModel),
    defaultValues: {
      id: prefill?._id,
      location_name: prefill?.location_name,
      company_id: prefill?.company_id._id,
      company_id_name: prefill?.company_id.name,
      address_1: prefill?.address_1,
      city: prefill?.city,
      province: prefill?.province,
      zip_code: prefill?.zip_code,
      country: prefill?.country,
      email: prefill?.email,
      phone_number: prefill?.phone_number,
      fax_number: prefill?.fax_number,
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = async (data: LocationModel, e: any) => {
    e.preventDefault()
    const res = prefill
      ? await editLocation(prefill._id, data)
      : await createLocation(data)
    if (res.status) {
      toast.success(
        `${prefill ? 'Edit' : 'Create'} ${LOCATION_PAGE_TITLE} Success `,
      )
      startTransition(() => {
        router.push(`/organization/locations`)
        router.refresh()
      })
    } else {
      toast.error(
        `${prefill ? 'Edit' : 'Create'} ${LOCATION_PAGE_TITLE} Failed ${
          res.message
        }`,
      )
    }
  }

  return (
    <LayoutPage name={`${prefill ? 'Edit' : 'Add'} ${LOCATION_PAGE_TITLE}`}>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 mt-4"
          noValidate
        >
          <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 gap-5">
            <SelectCompany name="company_id" />
            <Input
              label="Location Name"
              name="location_name"
              placeholder="Location Name"
              required
            />
            <Textarea
              label="Address 1"
              name="address_1"
              placeholder="Address 1"
              required
            />
            <Input label="City" name="city" placeholder="City" required />
            <Input
              label="Province"
              name="province"
              placeholder="Province"
              required
            />
            <Input
              type="number"
              label="Zip Code"
              name="zip_code"
              placeholder="Zip Code"
              required
            />
            <Input
              label="Country"
              name="country"
              placeholder="Country"
              required
            />
            <Input label="Email" name="email" placeholder="Email" required />
            <Input
              type="number"
              label="Phone Number"
              name="phone_number"
              placeholder="Phone Number"
              required
            />
            <Input
              type="number"
              label="Fax Number"
              name="fax_number"
              placeholder="Fax Number"
              required
            />
          </div>
          <Button
            type="submit"
            className="mt-8"
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
