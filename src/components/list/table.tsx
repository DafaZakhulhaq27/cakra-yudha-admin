import { Tooltip } from 'flowbite-react'
import { HiEye, HiPencil, HiTrash } from 'react-icons/hi'

type Column = {
  column: string
  name: string
  render?: (value: string | number) => React.ReactNode
}

type Data = {
  [key: string]: string
}

type TableProps = {
  columns: Column[]
  data: Data[]
  onDelete?: () => void
  onEdit?: () => void
  onView?: () => void
}

export default function Table({
  columns,
  data,
  onDelete,
  onEdit,
  onView,
}: TableProps) {
  const hasAction = !!onDelete || !!onEdit || !!onView

  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          {columns.map((column, index) => (
            <th scope="col" className="px-4 py-3" key={index}>
              {column.column}
            </th>
          ))}
          {hasAction && (
            <th scope="col" className="px-4 py-3 text-right">
              Actions
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr className="border-b hover:bg-gray-100" key={index}>
            {columns.map((column, colIndex) => (
              <td className="px-4 py-3" key={`${column.column}-${index}`}>
                {column.render
                  ? column.render(item[column.name])
                  : item[column.name]}
              </td>
            ))}
            {hasAction && (
              <td className="px-4 py-3 flex items-center justify-end gap-3">
                {!!onView && (
                  <Tooltip content="View">
                    <HiEye
                      color="green"
                      cursor="pointer"
                      onClick={onDelete}
                      size={20}
                    />
                  </Tooltip>
                )}
                {!!onEdit && (
                  <Tooltip content="Edit">
                    <HiPencil
                      color="blue"
                      cursor="pointer"
                      onClick={onDelete}
                      size={20}
                    />
                  </Tooltip>
                )}
                {!!onDelete && (
                  <Tooltip content="Delete">
                    <HiTrash
                      color="red"
                      cursor="pointer"
                      onClick={onDelete}
                      size={20}
                    />
                  </Tooltip>
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
