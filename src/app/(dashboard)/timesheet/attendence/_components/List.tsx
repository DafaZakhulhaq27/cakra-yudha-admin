'use client'

import { GetAttendence } from '@/api/attendence/model'
import { deleteLocation } from '@/api/locations'
import { Location } from '@/api/locations/model'
import LayoutPage from '@/components/layouts/layoutPage'
import MainPagination from '@/components/list/pagination'
import Search from '@/components/list/search'
import Table from '@/components/list/table'
import { ATTENDENCE_PAGE_TITLE } from '@/constant/page'
import useLoading from '@/hooks/loading'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

type Props = {
  res: GetAttendence
}

export default function List({ res }: Props) {
  const router = useRouter()
  const { data, limit, total_data, total_page } = res
  const { setLoading, LoadingOverlay } = useLoading()

  return (
    <LoadingOverlay>
      <LayoutPage name={ATTENDENCE_PAGE_TITLE}>
        <div className="flex flex-col xl:flex-row items-center justify-between space-y-3 xl:space-y-0 xl:space-x-4 p-4">
          <div className="w-full xl:w-1/2 flex gap-5">
            <Search />
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table
            columns={[
              {
                column: 'Employee',
                name: 'employe',
              },
              {
                column: 'Employee Id',
                name: 'employe_id',
              },
              {
                column: 'Date',
                name: 'date',
              },
              {
                column: 'Clock In',
                name: 'checkin',
              },
              {
                column: 'Clock Out',
                name: 'checkout',
              },
              {
                column: 'Total Work',
                name: 'total_work',
              },
            ]}
            data={data}
            onDelete={null}
            onEdit={null}
          />
        </div>
        <MainPagination
          totalPage={total_page}
          totalData={total_data}
          currentData={limit}
        />
      </LayoutPage>
    </LoadingOverlay>
  )
}
