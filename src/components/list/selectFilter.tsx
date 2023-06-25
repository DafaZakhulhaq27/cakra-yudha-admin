'use client'

import { useQueryNavigation } from '@/hooks/navigation'

export default function SelectFilter({ data, placeHolder, name }: SelectProps) {
  const { appendQuery, currentParams } = useQueryNavigation()
  const defaultSelected = currentParams.get(name)

  return (
    <select
      defaultValue={`${defaultSelected}`}
      onChange={e => {
        const value = e.target.value

        appendQuery({ [name]: value })
      }}
      className="block py-2.5 px-0 w-1/2 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer"
    >
      <option value={''}>{placeHolder}</option>
      {data.map((option, index) => (
        <option value={option.value} key={index}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
