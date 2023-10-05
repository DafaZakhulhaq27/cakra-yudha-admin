'use client'

import { createPositionLevel, editPositionLevel } from '@/api/positionLevel'
import { PositionLevel } from '@/api/positionLevel/model'
import Button from '@/components/forms/button'
import Input from '@/components/forms/input'
import LayoutPage from '@/components/layouts/layoutPage'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { startTransition } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { PositionLevelModel, positionLevelModel } from './Model'
import { POSITION_LEVEL_PAGE_TITLE } from '@/constant/page'

type Props = {
  prefill?: PositionLevel
}

export default function Form({ prefill }: Props) {
  const router = useRouter()
  const methods = useForm<PositionLevelModel>({
    mode: 'onTouched',
    resolver: zodResolver(positionLevelModel),
    defaultValues: {
      id: prefill?._id,
      name: prefill?.name,
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = async (data: PositionLevelModel, e: any) => {
    e.preventDefault()
    const res = prefill
      ? await editPositionLevel(prefill._id, data)
      : await createPositionLevel(data)
    if (res.status) {
      toast.success(
        `${prefill ? 'Edit' : 'Create'} ${POSITION_LEVEL_PAGE_TITLE} Success `,
      )
      startTransition(() => {
        router.push(`/master/position_level`)
        router.refresh()
      })
    } else {
      toast.error(
        `${prefill ? 'Edit' : 'Create'} ${POSITION_LEVEL_PAGE_TITLE} Failed ${
          res.message
        }`,
      )
    }
  }

  return (
    <LayoutPage
      name={`${prefill ? 'Edit' : 'Add'} ${POSITION_LEVEL_PAGE_TITLE}`}
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
