'use client'

import Button from '@/components/forms/button'
import Input from '@/components/forms/input'
import LayoutPage from '@/components/layouts/layoutPage'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { startTransition } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { BarcodePatroliDetail } from '@/api/barcodePatroli/model'
import { barcodePatroliModel, BarcodePatroliModel } from './Model'
import { createBarcodePatroli, editBarcodePatroli } from '@/api/barcodePatroli'
import { BARCODE_PATROLI_PAGE_TITLE } from '@/constant/page'
import SelectProject from '@/components/forms/selectAsync/selectProject'
import SelectGroup from '@/components/forms/selectAsync/selectGroup'
import Textarea from '@/components/forms/textarea'
import { QRCode } from 'react-qrcode-logo'

type Props = {
  prefill?: BarcodePatroliDetail
}

export default function Form({ prefill }: Props) {
  const router = useRouter()
  const methods = useForm<BarcodePatroliModel>({
    mode: 'onTouched',
    resolver: zodResolver(barcodePatroliModel),
    defaultValues: {
      id: prefill?._id,
      name: prefill?.name,
      project_id: prefill?.project_id?._id,
      project_id_name: prefill?.project_id?.name,
      group_id: prefill?.group_id?._id,
      group_id_name: prefill?.group_id?.name,
      alamat: prefill?.alamat,
      lat: prefill?.lat,
      long: prefill?.long,
      keterangan: prefill?.keterangan,
      radius: prefill?.radius,
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = async (data: BarcodePatroliModel, e: any) => {
    e.preventDefault()

    const formValue = data

    const res = prefill
      ? await editBarcodePatroli(prefill._id, formValue)
      : await createBarcodePatroli(formValue)
    if (res.status) {
      toast.success(
        `${prefill ? 'Edit' : 'Create'} ${BARCODE_PATROLI_PAGE_TITLE} Success `,
      )
      startTransition(() => {
        router.push(`/security_master/barcode-patroli`)
        router.refresh()
      })
    } else {
      toast.error(
        `${prefill ? 'Edit' : 'Create'} ${BARCODE_PATROLI_PAGE_TITLE} Failed ${
          res.message
        }`,
      )
    }
  }

  return (
    <LayoutPage
      name={`${prefill ? 'Edit' : 'Add'} ${BARCODE_PATROLI_PAGE_TITLE}`}
    >
      <FormProvider {...methods}>
        {prefill && (
          <>
            <p className="text-2xl mt-5">Detail Information</p>
            <div className="flex flex-row gap-5">
              {/* <iframe
                width="150"
                height="150"
                loading="lazy"
                allowFullScreen
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCCi9mL8ZbkdQi7fwp7W4IJze9_gQ46mfE
    &q=Space+Needle,Seattle+WA"
              ></iframe> */}
              <QRCode value={prefill?.id_barcode} logoImage="/logo.jpg" />
            </div>
          </>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 mt-4"
          noValidate
        >
          <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 gap-5">
            <Input
              label="Nama Titik Barcode"
              name="name"
              placeholder="Nama Titik Barcode"
              required
            />
            <Input label="Alamat" name="alamat" placeholder="Alamat" required />
            <SelectProject name="project_id" />
            <Input label="Lat" name="lat" placeholder="Lat" required />
            <SelectGroup name="group_id" />
            <Input label="Long" name="long" placeholder="Long" required />
            <Textarea name="keterangan" label="Keterangan" />
            <Input
              label="Radius"
              name="radius"
              placeholder="Radius"
              type="number"
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
