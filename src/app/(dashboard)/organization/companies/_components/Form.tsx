'use client'

import { createCompany, editCompany } from '@/api/companies'
import { CompanyDetail } from '@/api/companies/model'
import Button from '@/components/forms/button'
import Input from '@/components/forms/input'
import SelectCustomerType from '@/components/forms/selectAsync/selectCustomerType'
import Textarea from '@/components/forms/textarea'
import LayoutPage from '@/components/layouts/layoutPage'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { startTransition } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { CompanyModel, companyModel } from './Model'
import SelectCurrency from '@/components/forms/selectAsync/selectCurrency'
import SelectTimezone from '@/components/forms/selectAsync/selectTimezone'
import InputFile from '@/components/forms/inputFile'
import { COMPANY_PAGE_TITLE } from '@/constant/page'

type Props = {
  prefill?: CompanyDetail
}

export default function Form({ prefill }: Props) {
  const router = useRouter()
  const methods = useForm<CompanyModel>({
    mode: 'onTouched',
    resolver: zodResolver(companyModel),
    defaultValues: {
      id: prefill?._id,
      username: prefill?.username,
      company_name: prefill?.company_name,
      tax_number: prefill?.tax_number,
      company_type: prefill?.company_type._id,
      company_type_name: prefill?.company_type.name,
      legal_trading_name: prefill?.legal_trading_name,
      address_1: prefill?.address_1,
      address_2: prefill?.address_2,
      city: prefill?.city,
      province: prefill?.province,
      zip_code: prefill?.zip_code,
      country: prefill?.country,
      regis_number: prefill?.regis_number,
      contact_number: prefill?.contact_number,
      email: prefill?.email,
      website: prefill?.website,
      currency: prefill?.currency._id,
      currency_name: prefill?.currency.name,
      timezone: prefill?.timezone._id,
      timezone_name: prefill?.timezone.name,
      company_logo: prefill?.company_logo,
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods

  const onSubmit = async (data: CompanyModel, e: any) => {
    e.preventDefault()
    let formData = new FormData()

    formData.append('username', data.username)
    if (data.password) {
      formData.append('password', data.password)
    }
    formData.append('company_name', data.company_name)
    formData.append('tax_number', data.tax_number)
    formData.append('company_type', data.company_type)
    formData.append('legal_trading_name', data.legal_trading_name)
    formData.append('address_1', data.address_1)
    if (data.address_2) {
      formData.append('address_2', data.address_2)
    }
    formData.append('city', data.city)
    formData.append('province', data.province)
    formData.append('zip_code', data.zip_code)
    formData.append('country', data.country)
    formData.append('regis_number', data.regis_number)
    formData.append('contact_number', data.contact_number)
    formData.append('email', data.email)
    formData.append('website', data.website)
    formData.append('timezone', data.timezone)
    formData.append('currency', data.currency)
    if (typeof data.company_logo !== 'string' && data.company_logo.length) {
      formData.append('company_logo', data.company_logo[0])
    }

    const res = prefill
      ? await editCompany(prefill._id, formData)
      : await createCompany(formData)
    if (res.status) {
      toast.success(
        `${prefill ? 'Edit' : 'Create'} ${COMPANY_PAGE_TITLE} Success `,
      )
      startTransition(() => {
        router.push(`/organization/companies`)
        router.refresh()
      })
    } else {
      toast.error(
        `${prefill ? 'Edit' : 'Create'} ${COMPANY_PAGE_TITLE} Failed ${
          res.message
        }`,
      )
    }
  }

  return (
    <LayoutPage name={`${prefill ? 'Edit' : 'Add'} ${COMPANY_PAGE_TITLE}`}>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 mt-4"
          noValidate
        >
          <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 gap-5">
            <Input
              label="Username"
              name="username"
              placeholder="Username"
              required
            />
            <Input
              label="Company Name"
              name="company_name"
              placeholder="Company Name"
              required
            />
            <Input
              type="number"
              label="Tax Number"
              name="tax_number"
              placeholder="Tax Number"
              required
            />
            <SelectCustomerType name="company_type" />
            <Input
              label="Legal Trading Name"
              name="legal_trading_name"
              placeholder="Legal Trading Name"
              required
            />
            <Input
              type="number"
              label="Contact Number"
              name="contact_number"
              placeholder="Contact Number"
              required
            />
            <Textarea
              label="Address 1"
              name="address_1"
              placeholder="Address 1"
              required
            />
            <Textarea
              label="Address 2"
              name="address_2"
              placeholder="Address 2"
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
            <Input
              label="Regis Number"
              name="regis_number"
              placeholder="Regis Number"
              required
            />
            <Input label="Email" name="email" placeholder="Email" required />
            <Input
              label="Website"
              name="website"
              placeholder="Example : https://www.google.com/?hl=id"
              required
            />
            <SelectCurrency name="currency" />
            <SelectTimezone name="timezone" />{' '}
            <InputFile
              label="Company Logo"
              name="company_logo"
              placeholder="Company Logo"
              required
            />
            <Input
              type="password"
              label="Password"
              name="password"
              placeholder="Password"
              required
            />
            <Input
              type="password"
              label="Password Confirmation"
              name="password_confirmation"
              placeholder="Password"
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
