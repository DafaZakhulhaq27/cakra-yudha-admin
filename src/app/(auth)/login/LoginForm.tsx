'use client'

import {
  LoginModel,
  initLoginForm,
  loginModel,
} from '@/app/(auth)/login/Models'
import Button from '@/components/forms/button'
import Input from '@/components/forms/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Alert } from 'flowbite-react'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { HiInformationCircle } from 'react-icons/hi'

const LoginForm = () => {
  const router = useRouter()
  const [error, setError] = useState('')
  const methods = useForm<LoginModel>({
    mode: 'onTouched',
    resolver: zodResolver(loginModel),
    defaultValues: initLoginForm,
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = async (data: LoginModel, e: any) => {
    try {
      const res = await signIn('credentials', { redirect: false, ...data })
      if (res?.error) {
        setError(res?.error)
        return
      }

      router.refresh()
    } catch (_) {
      alert('error')
    }
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 mt-20 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          width={100}
          height={100}
          className="mx-auto h-40 w-auto"
          src="/logo.png"
          alt="Your Company"
        />

        <h2 className="mt-5 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        {error && (
          <Alert className="mb-4" color="failure" icon={HiInformationCircle}>
            {error}
          </Alert>
        )}

        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            noValidate
          >
            <Input label="Email" name="email" placeholder="email" required />
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="password"
              required
            />
            <Button
              type="submit"
              className="mt-8"
              isProcessing={isSubmitting}
              disabled={isSubmitting}
            >
              Sign In
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

export default LoginForm
