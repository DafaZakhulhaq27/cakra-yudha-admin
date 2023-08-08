'use client'

import { createUser, editUser } from '@/api/user'
import { UserProfile } from '@/app/(auth)/login/Models'
import Button from '@/components/forms/button'
import Input from '@/components/forms/input'
import Select from '@/components/forms/select'
import Textarea from '@/components/forms/textarea'
import { useUserContext } from '@/hooks/context'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { startTransition } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { UserModel, userModel } from '../_components/Model'

type Props = {
  prefill?: UserProfile
}

export default function Form({ prefill }: Props) {
  const { currentUser } = useUserContext()
  const router = useRouter()
  const methods = useForm<UserModel>({
    mode: 'onTouched',
    resolver: zodResolver(userModel),
    defaultValues: {
      id: prefill?._id,
      email: prefill?.email,
      name: prefill?.name,
      company_name: prefill?.company_name,
      phone_number: prefill?.phone_number,
      status: prefill?.status,
      role: prefill?.role,
      address: prefill?.address,
      // password: '',
      // password_confirmation: '',
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful },
  } = methods

  const onSubmit = async (data: UserModel, e: any) => {
    e.preventDefault()
    const res = prefill
      ? await editUser(prefill._id, data)
      : await createUser(data)
    if (res.status) {
      toast.success(`${prefill ? 'Edit' : 'Create'} User Success `)
      startTransition(() => {
        router.push(`/user`)
        router.refresh()
      })
    } else {
      toast.error(`${prefill ? 'Edit' : 'Create'} User Failed `)
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>
        <Input label="Email" name="email" placeholder="email" required />
        <Input label="Name" name="name" placeholder="name" required />
        <Input
          label="Company Name"
          name="company_name"
          placeholder="Company Name"
        />
        <Input
          label="Phone Number"
          name="phone_number"
          placeholder="Phone Number"
          required
        />
        <Select
          label="Status"
          placeHolder="Select Status"
          name="status"
          data={[
            {
              label: 'Active',
              value: 'Active',
            },
            {
              label: 'Suspend',
              value: 'Suspend',
            },
          ]}
          required
        />
        <Select
          label="Role"
          placeHolder="Select Role"
          name="role"
          data={
            currentUser?.role === 'Admin'
              ? [
                  {
                    label: 'User',
                    value: 'User',
                  },
                ]
              : [
                  {
                    label: 'User',
                    value: 'User',
                  },
                  {
                    label: 'Admin',
                    value: 'Admin',
                  },
                ]
          }
          required
        />

        <Textarea
          label="Address"
          name="address"
          placeholder="Write your address"
        />
        {/* {!prefill && (
          <>
            <Input
              type="password"
              label="Password"
              name="password"
              placeholder="Password"
              required
            />

            <Input
              type="password"
              label="Password Confirmation"
              name="password_confirmation"
              placeholder="Password Confirmation"
              required
            />
          </>
        )} */}

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
