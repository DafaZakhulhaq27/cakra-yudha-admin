import { SelectHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

type Props = {
  placeHolder: string
  label: string
  data: {
    label: string
    value: string
  }[]
} & SelectHTMLAttributes<HTMLSelectElement>

export default function Select({ label, placeHolder, data, ...props }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const errorMessage = errors[props.name ?? '']?.message

  return (
    <div>
      <label
        htmlFor={props.name}
        className={`block text-sm font-medium leading-6 mb-2 ${
          errorMessage ? 'text-red-600' : 'text-gray-900'
        }`}
      >
        {label} {props.required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={props.name}
        className={`border border-gray-300 text-gray-900 text- rounded-lg ${
          errorMessage
            ? 'focus:ring-red-500 ring-red-600'
            : 'ring-gray-300 focus:ring-primary'
        } block w-full p-2.5 `}
        {...props}
        {...register(props.name ?? '')}
      >
        <option value="">{placeHolder}</option>
        {data.map(item => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      {errorMessage && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500 font-medium">
          <>{errorMessage}</>
        </p>
      )}
    </div>
  )
}
