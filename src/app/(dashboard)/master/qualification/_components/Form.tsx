'use client'

import { createCompanyType, editCompanyType } from '@/api/companyType'
import { Qualification } from '@/api/qualification/model'
import Button from '@/components/forms/button'
import Input from '@/components/forms/input'
import LayoutPage from '@/components/layouts/layoutPage'
import { QUALIFICATION_PAGE_TITLE } from '@/constant/page'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { startTransition } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { QualificationModel, qualificationModel } from './Model'
import { createQualification, editQualification } from '@/api/qualification'

type Props = {
  prefill?: Qualification
}

export default function Form({ prefill }: Props) {
  const router = useRouter()
  const methods = useForm<QualificationModel>({
    mode: 'onTouched',
    resolver: zodResolver(qualificationModel),
    defaultValues: {
      id: prefill?._id,
      name: prefill?.name,
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = async (data: QualificationModel, e: any) => {
    e.preventDefault()
    const res = prefill
      ? await editQualification(prefill._id, data)
      : await createQualification(data)
    if (res.status) {
      toast.success(
        `${prefill ? 'Edit' : 'Create'} ${QUALIFICATION_PAGE_TITLE} Success `,
      )
      startTransition(() => {
        router.push(`/master/qualification`)
        router.refresh()
      })
    } else {
      toast.error(
        `${prefill ? 'Edit' : 'Create'} ${QUALIFICATION_PAGE_TITLE} Failed ${
          res.message
        }`,
      )
    }
  }

  return (
    <LayoutPage
      name={`${prefill ? 'Edit' : 'Add'} ${QUALIFICATION_PAGE_TITLE}`}
    >
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
