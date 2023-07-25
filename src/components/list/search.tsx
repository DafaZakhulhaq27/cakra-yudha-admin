'use client'

import { useQueryNavigation } from '@/hooks/navigation'
import { useForm } from 'react-hook-form'
import { HiSearch } from 'react-icons/hi'

type FormProps = {
  search: string
}

export default function Search() {
  const { appendQuery, currentParams } = useQueryNavigation()
  const { register, handleSubmit } = useForm<FormProps>({
    defaultValues: {
      search: currentParams.get('search') ?? '',
    },
  })

  const onSubmit = ({ search }: FormProps) => appendQuery({ search, page: '1' })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center">
      <label htmlFor="simple-search" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <HiSearch />
        </div>
        <input
          type="text"
          id="simple-search"
          className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="Search"
          {...register('search')}
        />
      </div>
    </form>
  )
}
