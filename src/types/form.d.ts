/* eslint-disable no-unused-vars */
type SelectItem = {
  label: string
  value: string
}

type SelectProps = {
  data: SelectItem[]
  placeHolder: string
  name: string
  selected?: string | SelectItem
}

type TableItemProps = {
  column: string
  name: string
  value?: React.ReactNode
}

type TableDataProps = TableItemProps[]
