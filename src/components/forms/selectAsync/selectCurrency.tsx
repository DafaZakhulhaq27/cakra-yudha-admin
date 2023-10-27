import { getCompanyTypeDropdown } from '@/api/companyType'
import { getCurrencyDropdown } from '@/api/currency'
import { SelectHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'
import AsyncSelect from 'react-select/async'

type Props = SelectHTMLAttributes<HTMLSelectElement>

export default function SelectCurrency(props: Props) {
  const {
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext()
  const errorMessage = errors[props.name ?? '']?.message

  const getData = async (search: string) => {
    const data = await getCurrencyDropdown({
      search,
      limit: '100',
      page: '1',
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
        Currency {props.required && <span className="text-red-500">*</span>}
      </label>
      <AsyncSelect
        instanceId={props.name}
        placeholder="Select Currency"
        cacheOptions
        getOptionValue={_ => _._id}
        getOptionLabel={_ => _.name}
        loadOptions={getData}
        value={
          id
            ? {
                _id: id,
                name: name,
              }
            : undefined
        }
        onChange={v => {
          setValue(props.name ?? '', v?._id)
          setValue(`${props.name}_name` ?? '', v?.name)
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
