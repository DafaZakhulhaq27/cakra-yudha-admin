'use client'

import { getCategory } from '@/api/categories'
import { createProduct, editProduct } from '@/api/products'
import { Product } from '@/api/products/model'
import Button from '@/components/forms/button'
import Input from '@/components/forms/input'
import Select from '@/components/forms/select'
import LoadingMain from '@/components/loading'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { startTransition, useEffect, useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { ProductModel, productModel } from './Model'
import Schedule from './Schedule'

type Props = {
  prefill?: Product
}

export default function Form({ prefill }: Props) {
  // get categories
  const categories = useRef<
    {
      label: string
      value: string
    }[]
  >([])
  const [loadingCategory, setLoadingCateogry] = useState<boolean>(true)

  const router = useRouter()
  const methods = useForm<ProductModel>({
    mode: 'onTouched',
    resolver: zodResolver(productModel),
    defaultValues: {
      id: prefill?._id,
      schedule: prefill?.schedule,
      seat: String(prefill?.seat),
      program: prefill?.program,
      price: String(prefill?.price),
      category: prefill?.category._id,
    },
  })

  const getCategories = async () => {
    try {
      setLoadingCateogry(true)
      const { status, data } = await getCategory({
        page: '1',
        limit: '30',
        search: '',
      })

      if (status) {
        data.forEach(category => {
          categories.current.push({
            label: category.name,
            value: category._id,
          })
        })
      }
    } finally {
      setLoadingCateogry(false)
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  const {
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful },
  } = methods

  const onSubmit = async (data: ProductModel, e: any) => {
    try {
      const res = prefill
        ? await editProduct(prefill._id, data)
        : await createProduct(data)
      if (res.status) {
        toast.success(`${prefill ? 'Edit' : 'Create'} Products Success `)
        startTransition(() => {
          router.push(`/products`)
          router.refresh()
        })
      } else {
        toast.error(`${prefill ? 'Edit' : 'Create'} Products Failed `)
      }
    } catch (error) {
      toast.error(`${prefill ? 'Edit' : 'Create'} Products Failed `)
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>
        <Input label="Program" name="program" placeholder="program" required />
        <Input
          label="Seat"
          name="seat"
          placeholder="seat"
          type="number"
          required
        />
        <Input
          label="Price"
          name="price"
          placeholder="price"
          type="number"
          required
        />
        {loadingCategory ? (
          <LoadingMain />
        ) : (
          <Select
            label="Category"
            placeHolder="Select Status"
            name="category"
            data={categories.current}
            required
          />
        )}

        <Schedule />

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
