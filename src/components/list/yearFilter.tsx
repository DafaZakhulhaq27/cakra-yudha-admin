'use client'

import { useQueryNavigation } from '@/hooks/navigation'
import { ChangeEvent, useCallback } from 'react'

export default function YearFilter({ name }: { name: string }) {
  const { appendQuery, currentParams } = useQueryNavigation()
  const value = currentParams.get(name) ?? new Date().getFullYear()

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const _value = event.target.value

      appendQuery({ [name]: _value })
    },
    [appendQuery, name],
  )

  return (
    <input
      type="number"
      min="1900"
      max={new Date().getFullYear()}
      step="1"
      onChange={handleOnChange}
      value={value}
      className="block w-[200px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6 ring-gray-300 focus:ring-primary]"
    />
  )
}
