import { getClientDropdown } from '@/api/client'
import { ValetSecurityType } from '@/constant/valetSecurity'
import { SelectHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'
import AsyncSelect from 'react-select/async'

type Props = {
  type: ValetSecurityType
} & SelectHTMLAttributes<HTMLSelectElement>

export default function SelectClient({ type, ...props }: Props) {
  const {
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext()
  const errorMessage = errors[props.name ?? '']?.message

  const getData = async (search: string) => {
    const data = await getClientDropdown({
      search,
      limit: '100',
      page: '1',
      type: type,
    })

    return data.data
  }

  const id = getValues(props.name ?? '')
  const name = getValues(`${props.name}_name`)

  return (
    <div>
      <label
        htmlFor={props.name}
        className={`block text-sm font-medium leading-6 mb-2 ${
          errorMessage ? 'text-red-600' : 'text-gray-900'
        }`}
      >
        Client {props.required && <span className="text-red-500">*</span>}
      </label>
      <AsyncSelect
        instanceId={props.name}
        placeholder="Select Client"
        cacheOptions
        getOptionValue={_ => _._id}
        getOptionLabel={_ => `${_.client_code}`}
        loadOptions={getData}
        value={
          id
            ? {
                _id: id,
                client_code: name,
              }
            : undefined
        }
        onChange={v => {
          setValue(props.name ?? '', v?._id)
          setValue(`${props.name}_name` ?? '', v?.client_code)
        }}
        defaultOptions
      />
      {errorMessage && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500 font-medium">
          <>{errorMessage}</>
        </p>
      )}
    </div>
  )
}
