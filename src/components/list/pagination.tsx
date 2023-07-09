'use client'

import { useQueryNavigation } from '@/hooks/navigation'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import ReactPaginate from 'react-paginate'

type Props = {
  totalPage: number
  currentData: number
  totalData: number
}

export default function MainPagination({
  totalPage,
  currentData,
  totalData,
}: Props) {
  const { appendQuery, currentParams } = useQueryNavigation()

  const handlePageClick = (selectedItem: { selected: number }) => {
    appendQuery({
      page: (selectedItem.selected + 1).toString(),
    })
  }

  const initialPage = currentParams.get('page')
    ? parseInt(currentParams.get('page')!) - 1
    : 0
  return (
    <nav
      className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
      aria-label="Table navigation"
    >
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
        Showing
        <span className="font-semibold text-gray-900 dark:text-white mx-1">
          {currentData}
        </span>
        of
        <span className="font-semibold text-gray-900 dark:text-white mx-1">
          {totalData}
        </span>
      </span>
      {totalPage > 1 && (
        <ReactPaginate
          disableInitialCallback
          initialPage={initialPage}
          className="flex gap-2 items-center"
          pageLinkClassName="py-1 px-3 border rounded"
          activeLinkClassName="bg-primary text-white border-primary"
          breakLabel="..."
          nextLabel={<HiChevronRight />}
          previousLabel={<HiChevronLeft />}
          onPageChange={handlePageClick}
          marginPagesDisplayed={2}
          pageCount={totalPage}
          renderOnZeroPageCount={null}
        />
      )}
    </nav>
  )
}
