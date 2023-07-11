import { useQueryNavigation } from '@/hooks/navigation'
import { Button, Modal, Tooltip } from 'flowbite-react'
import { useRef, useState } from 'react'
import {
  HiEye,
  HiOutlineExclamationCircle,
  HiPencil,
  HiTrash,
} from 'react-icons/hi'

type Column = {
  column: string
  name: string
  render?: (value: any) => React.ReactNode
}

type Data =
  | {
      [key: string]: string
    }
  | any

type TableProps = {
  columns: Column[]
  data: Data[]
  onDelete?: ((v: any) => void) | null
  onEdit?: ((v: any) => void) | null
  onView?: ((v: any) => void) | null
}

export default function Table({
  columns,
  data,
  onDelete,
  onEdit,
  onView,
}: TableProps) {
  const hasAction = !!onDelete || !!onEdit || !!onView
  const [openModal, setOpenModal] = useState<boolean>(false)
  const currentRow = useRef<any>({})
  const selectedNo = useRef<string>('1')

  const { currentParams } = useQueryNavigation()

  const initialPage = parseInt(currentParams.get('page')!) || 1
  const initialLimit = parseInt(currentParams.get('limit')!) || 10

  return (
    <>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3">
              No
            </th>
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
              <td className="px-4 py-3">
                {(initialPage - 1) * initialLimit + index + 1}
              </td>
              {columns.map((column, colIndex) => (
                <td className="px-4 py-3" key={`${column.column}-${index}`}>
                  {column.render
                    ? column.render(item[column.name])
                    : item[column.name]}
                </td>
              ))}
              {hasAction && (
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-3 h-full">
                    {!!onView && (
                      <Tooltip content="View">
                        <HiEye
                          color="green"
                          cursor="pointer"
                          onClick={() => onView(item)!}
                          size={20}
                        />
                      </Tooltip>
                    )}
                    {!!onEdit && (
                      <Tooltip content="Edit">
                        <HiPencil
                          color="blue"
                          cursor="pointer"
                          onClick={() => onEdit(item)!}
                          size={20}
                        />
                      </Tooltip>
                    )}
                    {!!onDelete && (
                      <Tooltip content="Delete">
                        <HiTrash
                          color="red"
                          cursor="pointer"
                          onClick={() => {
                            selectedNo.current = `${
                              (initialPage - 1) * initialLimit + index + 1
                            }`
                            currentRow.current = item
                            setOpenModal(true)
                          }}
                          size={20}
                        />
                      </Tooltip>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        show={openModal}
        size="md"
        popup
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Apakah kamu ingin menghapus item dengan nomor {selectedNo.current}{' '}
              ?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  !!onDelete && onDelete(currentRow.current)
                  setOpenModal(false)
                }}
              >
                Hapus
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Batal
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>{' '}
    </>
  )
}
