import Image from 'next/image'
import { InputHTMLAttributes, useEffect, useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

type Props = {
  name: string
  label: string
} & InputHTMLAttributes<HTMLInputElement>

const InputFile = ({ label, ...props }: Props) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext()
  const errorMessage = errors[props.name]?.message
  const [fileValue] = useWatch({ control, name: [props.name] })
  const [previewImage, setPreviewImage] = useState<string>('')

  useEffect(() => {
    if (fileValue) {
      if (typeof fileValue !== 'string') {
        let reader = new FileReader()
        reader.readAsDataURL(fileValue[0])
        reader.onload = e => {
          setPreviewImage((e.target!.result as unknown as string) ?? '')
        }
      } else {
        setPreviewImage(fileValue)
      }
    }
  }, [fileValue])

  return (
    <div>
      <label
        htmlFor={props.name}
        className={`block text-sm font-medium leading-6  ${
          errorMessage ? 'text-red-600' : 'text-gray-900'
        }`}
      >
        {label} {props.required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-2">
        <div className="relative">
          {previewImage && (
            <Image
              src={previewImage}
              height={100}
              width={100}
              alt="Preview Image"
            />
          )}
          <input
            id={props.name}
            className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6 ${
              errorMessage
                ? 'focus:ring-red-500 ring-red-600'
                : 'ring-gray-300 focus:ring-primary'
            }`}
            {...props}
            type={'file'}
            {...register(props.name ?? '')}
          />
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

export default InputFile
