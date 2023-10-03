'use client'

import LayoutPage from '@/components/layouts/layoutPage'
import { useRouter } from 'next/navigation'
import { FormProvider, useForm } from 'react-hook-form'
import { CurrencyModel, currencyModel } from './Model'
import { zodResolver } from '@hookform/resolvers/zod'
import { Currency } from '@/api/currency/model'
import { createCurrency, editCurrency } from '@/api/currency'
import toast from 'react-hot-toast'
import { startTransition } from 'react'
import Input from '@/components/forms/input'
import Button from '@/components/forms/button'
import { CURRENCY_PAGE_TITLE } from '@/constant/page'

type Props = {
  prefill?: Currency
}

export default function Form({ prefill }: Props) {
  const router = useRouter()
  const methods = useForm<CurrencyModel>({
    mode: 'onTouched',
    resolver: zodResolver(currencyModel),
    defaultValues: {
      id: prefill?._id,
      name: prefill?.name,
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = async (data: CurrencyModel, e: any) => {
    e.preventDefault()
    const res = prefill
      ? await editCurrency(prefill._id, data)
      : await createCurrency(data)
    if (res.status) {
      toast.success(
        `${prefill ? 'Edit' : 'Create'} ${CURRENCY_PAGE_TITLE} Success `,
      )
      startTransition(() => {
        router.push(`/master/currency`)
        router.refresh()
      })
    } else {
      toast.error(
        `${prefill ? 'Edit' : 'Create'} ${CURRENCY_PAGE_TITLE} Failed ${
          res.message
        }`,
      )
    }
  }

  return (
    <LayoutPage name={`${prefill ? 'Edit' : 'Add'} ${CURRENCY_PAGE_TITLE}`}>
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
