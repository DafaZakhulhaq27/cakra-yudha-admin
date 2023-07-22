'use client'

import { Category } from '@/api/categories/model'
import Button from '@/components/forms/button'
import InputFile from '@/components/forms/fileInput'
import Input from '@/components/forms/input'
import { useUserContext } from '@/hooks/context'
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
  const { currentUser } = useUserContext()
  const router = useRouter()
  const methods = useForm<CategoryModel>({
    mode: 'onTouched',
    resolver: zodResolver(categoryModel),
    defaultValues: {
      id: prefill?._id,
      name: prefill?.name,
      icon_url: prefill?.icon,
      icon: null,
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful },
  } = methods

  const onSubmit = async (data: CategoryModel) => {
    console.log(data, 'data')
    // try {
    //   const res = prefill
    //     ? await editUser(prefill._id, data)
    //     : await createUser(data)
    //   if (res.status) {
    toast.success(`${prefill ? 'Edit' : 'Create'} User Success `)
    startTransition(() => {
      router.push(`/categories`)
      router.refresh()
    })
    //   } else {
    //     toast.error(`${prefill ? 'Edit' : 'Create'} User Failed `)
    //   }
    // } catch (error) {
    //   toast.error(`${prefill ? 'Edit' : 'Create'} User Failed `)
    // }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>
        <Input label="Name" name="name" placeholder="name" required />
        <InputFile
          label="Icon"
          name="icon"
          allowedTypes={['image/png', 'image/jpg', 'image/jpeg']}
          required
        />
        <Button
          type="submit"
          className="mt-8"
          isProcessing={isSubmitting}
          disabled={isSubmitting || isSubmitSuccessful}
        >
          {prefill ? 'Edit' : 'Save'}
        </Button>
      </form>
    </FormProvider>
  )
}
