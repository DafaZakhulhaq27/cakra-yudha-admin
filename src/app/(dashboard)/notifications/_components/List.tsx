'use client'

import { GetNotifications } from '@/api/notifications/model'
import { UserProfile } from '@/app/(auth)/login/Models'
import Button from '@/components/forms/button'
import MainPagination from '@/components/list/pagination'
import Search from '@/components/list/search'
import Table from '@/components/list/table'
import useLoading from '@/hooks/loading'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { HiPlus } from 'react-icons/hi'

type Props = {
  res: GetNotifications
}

export default function List({ res }: Props) {
  const router = useRouter()
  const { data, limit, total_data, total_page } = res
  const { setLoading, LoadingOverlay } = useLoading()

  return (
    <LoadingOverlay>
      <div className="flex flex-col xl:flex-row items-center justify-between space-y-3 xl:space-y-0 xl:space-x-4 p-4">
        <div className="w-full xl:w-1/2 flex gap-5">
          <Search />
        </div>
        <div className="w-full xl:w-auto flex flex-col xl:flex-row space-y-2 xl:space-y-0 items-stretch xl:items-center justify-end xl:space-x-3 flex-shrink-0">
          <Link href="/notifications/create">
            <Button>
              <HiPlus />
              Add Notification
            </Button>
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table
          columns={[
            {
              column: 'Title',
              name: 'title',
            },
            {
              column: 'Desc',
              name: 'desc',
            },
            {
              column: 'Status',
              name: 'status',
              render: v => (
                <span
                  className={`bg-${
                    v === 'Publish' ? 'green' : 'red'
                  }-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded `}
                >
                  {v}
                </span>
              ),
            },
          ]}
          data={data}
          onEdit={(item: UserProfile) =>
            router.push(`/notifications/${item._id}`)
          }
        />
      </div>
      <MainPagination
        totalPage={total_page}
        totalData={total_data}
        currentData={limit}
      />
    </LoadingOverlay>
  )
}
