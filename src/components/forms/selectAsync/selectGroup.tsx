import { getGroupDropdown } from '@/api/group'
import { ValetSecurityType } from '@/constant/valetSecurity'
import { SelectHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'
import AsyncSelect from 'react-select/async'

type Props = {
  type?: ValetSecurityType
} & SelectHTMLAttributes<HTMLSelectElement>

export default function SelectGroup({ type, ...props }: Props) {
  const {
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext()
  const errorMessage = errors[props.name ?? '']?.message

  const getData = async (search: string) => {
    const data = await getGroupDropdown({
      search,
      limit: '30',
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
        Group {props.required && <span className="text-red-500">*</span>}
      </label>
      <AsyncSelect
        instanceId={props.name}
        placeholder="Select Group"
        cacheOptions
        getOptionValue={_ => _._id}
        getOptionLabel={_ => `${_.group_name}`}
        loadOptions={getData}
        value={
          id
            ? {
                _id: id,
                group_name: name,
              }
            : undefined
        }
        onChange={v => {
          setValue(props.name ?? '', v?._id)
          setValue(`${props.name}_name` ?? '', v?.group_name)
        }}
        defaultOptions
        isDisabled={props.disabled}
      />
      {errorMessage && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500 font-medium">
          <>{errorMessage}</>
        </p>
      )}
    </div>
  )
}
