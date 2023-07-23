'use client'

import { createCategory, editCategory } from '@/api/categories'
import { Category } from '@/api/categories/model'
import Button from '@/components/forms/button'
import InputFile from '@/components/forms/fileInput'
import Input from '@/components/forms/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { startTransition } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { CategoryModel, categoryModel } from './Model'

type Props = {
  prefill?: Category
}

export default function Form({ prefill }: Props) {
  const router = useRouter()
  const methods = useForm<CategoryModel>({
    mode: 'onTouched',
    resolver: zodResolver(categoryModel),
    defaultValues: {
      id: prefill?._id,
      name: prefill?.name,
      icon: prefill?.icon,
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = async (data: CategoryModel) => {
    try {
      const res = prefill
        ? await editCategory(prefill._id, data)
        : await createCategory(data)
      if (res.status) {
        toast.success(`${prefill ? 'Edit' : 'Create'} Category Success `)
        startTransition(() => {
          router.push(`/categories`)
          router.refresh()
        })
      } else {
        toast.error(`${prefill ? 'Edit' : 'Create'} Category Failed `)
      }
    } catch (error) {
      toast.error(`${prefill ? 'Edit' : 'Create'} Category Failed `)
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>
        <Input label="Name" name="name" placeholder="name" required />
        <InputFile
          disabled={isSubmitting}
          label="Icon"
          name="icon"
          allowedTypes={['image/png', 'image/jpg', 'image/jpeg']}
          required
        />
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
