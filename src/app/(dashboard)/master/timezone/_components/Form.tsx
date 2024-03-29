'use client'

import { Timezone } from '@/api/timezone/model'
import Button from '@/components/forms/button'
import Input from '@/components/forms/input'
import LayoutPage from '@/components/layouts/layoutPage'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { startTransition } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { TimezoneModel, timezoneModel } from './Model'
import { createTimezone, editTimezone } from '@/api/timezone'
import { TIMEZONE_PAGE_TITLE } from '@/constant/page'

type Props = {
  prefill?: Timezone
}

export default function Form({ prefill }: Props) {
  const router = useRouter()
  const methods = useForm<TimezoneModel>({
    mode: 'onTouched',
    resolver: zodResolver(timezoneModel),
    defaultValues: {
      id: prefill?._id,
      name: prefill?.name,
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = async (data: TimezoneModel, e: any) => {
    e.preventDefault()
    const res = prefill
      ? await editTimezone(prefill._id, data)
      : await createTimezone(data)
    if (res.status) {
      toast.success(
        `${prefill ? 'Edit' : 'Create'} ${TIMEZONE_PAGE_TITLE} Success `,
      )
      startTransition(() => {
        router.push(`/master/timezone`)
        router.refresh()
      })
    } else {
      toast.error(
        `${prefill ? 'Edit' : 'Create'} ${TIMEZONE_PAGE_TITLE} Failed ${
          res.message
        }`,
      )
    }
  }

  return (
    <LayoutPage name={`${prefill ? 'Edit' : 'Add'} ${TIMEZONE_PAGE_TITLE}`}>
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
