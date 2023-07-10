import { InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'

type Props = {
  label: string
} & InputHTMLAttributes<HTMLInputElement>

export default function InputFile({ label, ...props }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext()
  const errorMessage = errors[props.name ?? '']?.message

  return (
    <>
      <label
        htmlFor={props.name}
        className={`block text-sm font-medium leading-6  ${
          errorMessage ? 'text-red-600' : 'text-gray-900'
        }`}
      >
        {label} {props.required && <span className="text-red-500">*</span>}
      </label>
      <input
        className="block w-full text-sm text-primary border border-gray-300 rounded-lg cursor-pointer bg-gray-50 "
        aria-describedby="file_input_help"
        id="file_input"
        type="file"
        {...props}
        {...register(props.name ?? '')}
      />
      <p className="mt-1 text-sm text-gray-500 " id="file_input_help">
        SVG, PNG, JPG
      </p>
    </>
  )
}
