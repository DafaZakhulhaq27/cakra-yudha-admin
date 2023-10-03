'use client'

import { createCompanyType, editCompanyType } from '@/api/companyType'
import { CompanyType } from '@/api/companyType/model'
import Button from '@/components/forms/button'
import Input from '@/components/forms/input'
import LayoutPage from '@/components/layouts/layoutPage'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { startTransition } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { CompanyTypeModel, companyTypeModel } from './Model'
import { COMPANY_TYPE_PAGE_TITLE } from '@/constant/page'
import { error } from 'console'

type Props = {
  prefill?: CompanyType
}

export default function Form({ prefill }: Props) {
  const router = useRouter()
  const methods = useForm<CompanyTypeModel>({
    mode: 'onTouched',
    resolver: zodResolver(companyTypeModel),
    defaultValues: {
      id: prefill?._id,
      name: prefill?.name,
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = async (data: CompanyTypeModel, e: any) => {
    e.preventDefault()
    const res = prefill
      ? await editCompanyType(prefill._id, data)
      : await createCompanyType(data)
    if (res.status) {
      toast.success(
        `${prefill ? 'Edit' : 'Create'} ${COMPANY_TYPE_PAGE_TITLE} Success `,
      )
      startTransition(() => {
        router.push(`/master/company_type`)
        router.refresh()
      })
    } else {
      toast.error(
        `${prefill ? 'Edit' : 'Create'} ${COMPANY_TYPE_PAGE_TITLE} Failed ${
          res.message
        }`,
      )
    }
  }

  return (
    <LayoutPage name={`${prefill ? 'Edit' : 'Add'} ${COMPANY_TYPE_PAGE_TITLE}`}>
      <div className="w-full lg:w-1/2 mt-4">
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-3"
            noValidate
          >
            <Input label="Name" name="name" placeholder="name" required />
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
      </div>
    </LayoutPage>
  )
}
