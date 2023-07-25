'use client'

import { createNotification, editNotification } from '@/api/notifications'
import { Notification } from '@/api/notifications/model'
import Button from '@/components/forms/button'
import Input from '@/components/forms/input'
import Select from '@/components/forms/select'
import Textarea from '@/components/forms/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { startTransition } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { NotificationModel, notificationModel } from './Model'

type Props = {
  prefill?: Notification
}

export default function Form({ prefill }: Props) {
  const router = useRouter()
  const methods = useForm<NotificationModel>({
    mode: 'onTouched',
    resolver: zodResolver(notificationModel),
    defaultValues: {
      id: prefill?._id,
      title: prefill?.title,
      desc: prefill?.desc,
      status: prefill?.status,
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = async (data: NotificationModel) => {
    try {
      const res = prefill
        ? await editNotification(prefill._id, data)
        : await createNotification(data)
      if (res.status) {
        toast.success(`${prefill ? 'Edit' : 'Create'} Notification Success `)
        startTransition(() => {
          router.push(`/notifications`)
          router.refresh()
        })
      } else {
        toast.error(`${prefill ? 'Edit' : 'Create'} Notification Failed `)
      }
    } catch (error) {
      toast.error(`${prefill ? 'Edit' : 'Create'} Notification Failed `)
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>
        <Input label="Title" name="title" placeholder="title" required />
        <Textarea label="Desc" name="desc" placeholder="desc" required />
        <Select
          label="Status"
          placeHolder="Select Status"
          name="status"
          data={[
            {
              label: 'Publish',
              value: 'Publish',
            },
            {
              label: 'Draft',
              value: 'draft',
            },
          ]}
          required
        />{' '}
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
  )
}
