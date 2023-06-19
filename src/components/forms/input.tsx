import { InputHTMLAttributes, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi'

type Props = {
  label: string
} & InputHTMLAttributes<HTMLInputElement>

const Input = ({ label, ...props }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const [showPassword, setShowPassword] = useState(false)

  const errorMessage = errors[props.name ?? '']?.message
  const type =
    props.type === 'password'
      ? showPassword
        ? 'text'
        : 'password'
      : props.type ?? 'text'

  return (
    <div>
      <label
        htmlFor={props.name}
        className={`block text-sm font-medium leading-6  ${
          errorMessage ? 'text-red-600' : 'text-gray-900'
        }`}
      >
        {label}
      </label>
      <div className="mt-2">
        <div className="relative">
          <input
            id={props.name}
            className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6 ${
              errorMessage
                ? 'focus:ring-red-500 ring-red-600'
                : 'ring-gray-300 focus:ring-primary'
            }`}
            {...props}
            type={type}
            {...register(props.name ?? '')}
          />
          {props.type === 'password' &&
            (showPassword ? (
              <HiOutlineEyeOff
                className="absolute top-1/2 right-3 cursor-pointer transform -translate-y-1/2 focus:outline-nonesolute"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <HiOutlineEye
                className="absolute top-1/2 right-3 cursor-pointer transform -translate-y-1/2 focus:outline-nonesolute"
                onClick={() => setShowPassword(true)}
              />
            ))}
        </div>

        {errorMessage && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500 font-medium">
            <>{errorMessage}</>
          </p>
        )}
      </div>
    </div>
  )
}

export default Input
