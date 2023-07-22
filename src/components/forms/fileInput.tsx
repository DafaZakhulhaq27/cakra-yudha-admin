import { storage } from '@/config/firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import Image from 'next/image'
import Link from 'next/link'
import { ChangeEvent, InputHTMLAttributes, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { HiUpload, HiX } from 'react-icons/hi'
import LoadingMain from '../loading'

type Props = {
  label: string
  allowedTypes?: string[]
} & InputHTMLAttributes<HTMLInputElement>

export default function InputFile({ label, allowedTypes, ...props }: Props) {
  const [loading, setLoading] = useState(false)

  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext()
  const errorMessage = errors[props.name ?? '']?.message
  const [value] = watch([props.name!])

  const handleChange = (e: ChangeEvent<HTMLInputElement> | undefined) => {
    const file = e?.target?.files![0]

    if (file === undefined) return

    if (allowedTypes) {
      if (!allowedTypes.includes(file.type)) {
        alert('Type File Salah')
        return
      }
    }
    const storageRef = ref(storage, `${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)
    setLoading(true)
    uploadTask.on(
      'state_changed',
      snapshot => {},
      error => {
        alert(error)
        setLoading(false)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          var myHeaders = new Headers()
          myHeaders.append('Access-Control-Allow-Origin', '*')
          myHeaders.append('Content-Type', 'application/json')

          setValue(props.name!, downloadURL)
          setLoading(false)
        })
      },
    )
  }

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
      <div>
        <label
          htmlFor={props.name}
          className="flex items-center gap-2 justify-center w-full p-2 border-2 border-gray-300 border rounded-lg cursor-pointer text-sm font-medium leading-6"
        >
          {loading ? (
            <LoadingMain />
          ) : (
            <>
              {' '}
              Upload File <HiUpload />
            </>
          )}
          <input
            disabled={loading || props.disabled}
            id={props.name}
            type="file"
            className="hidden"
            onChange={handleChange}
            {...props}
          />
        </label>
      </div>
      {!!value && (
        <div className="flex flex-col  items-center justify-center gap-2">
          <Link href={value} target="_blank">
            <Image alt="image" src={value} width={100} height={100} />
          </Link>
          {loading}
          {!loading && !props.disabled && (
            <div
              className="text-white p-3 bg-red-600 rounded-full cursor-pointer"
              onClick={() => setValue(props.name!, '')}
            >
              {' '}
              <HiX />
            </div>
          )}
        </div>
      )}
    </>
  )
}
