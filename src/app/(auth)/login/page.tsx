'use client'

import Button from '@/components/forms/button'
import Input from '@/components/forms/input'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { FormProvider, useForm } from 'react-hook-form'
import { object, string, z } from 'zod'

export const loginModel = object({
  email: string().email().nonempty(),
  password: string().nonempty(),
})

export type LoginModel = z.infer<typeof loginModel>

const Login = () => {
  const methods = useForm<LoginModel>({
    mode: 'onTouched',
    resolver: zodResolver(loginModel),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { handleSubmit } = methods

  const onSubmit = (data: LoginModel) => console.log(data)

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 mt-20 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          width={40}
          height={40}
          className="mx-auto h-10 w-auto"
          src="./vercel.svg"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input label="Email" name="email" placeholder="email" />
            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="password"
            />
            <Button text="Sign In" type="submit" className="mt-8" />
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

export default Login
