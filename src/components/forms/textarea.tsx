import { TextareaHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

type Props = {
  label: string
} & TextareaHTMLAttributes<HTMLTextAreaElement>

export default function Textarea({ label, ...props }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const errorMessage = errors[props.name ?? '']?.message

  return (
    <>
      <label
        htmlFor={props.name}
        className={`block mb-2 text-sm font-medium text-gray-900 ${
          errorMessage ? 'text-red-600' : 'text-gray-900'
        }`}
      >
        {label} {props.required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={props.name}
        className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 ${
          errorMessage
            ? 'focus:ring-red-500 ring-red-600'
            : 'ring-gray-300 focus:ring-primary'
        }`}
        {...props}
        {...register(props.name ?? '')}
      ></textarea>
      {errorMessage && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500 font-medium">
          <>{errorMessage}</>
        </p>
      )}
    </>
  )
}
