'use client'

import { Currency } from '@/api/currency/model'
import { deleteLocation } from '@/api/locations'
import { GetLocation, Location } from '@/api/locations/model'
import Button from '@/components/forms/button'
import LayoutPage from '@/components/layouts/layoutPage'
import MainPagination from '@/components/list/pagination'
import Search from '@/components/list/search'
import Table from '@/components/list/table'
import { LOCATION_PAGE_TITLE } from '@/constant/page'
import useLoading from '@/hooks/loading'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { HiPlus } from 'react-icons/hi'

type Props = {
  res: GetLocation
}

export default function List({ res }: Props) {
  const router = useRouter()
  const { data, limit, total_data, total_page } = res
  const { setLoading, LoadingOverlay } = useLoading()

  return (
    <LoadingOverlay>
      <LayoutPage name={LOCATION_PAGE_TITLE}>
        <div className="flex flex-col xl:flex-row items-center justify-between space-y-3 xl:space-y-0 xl:space-x-4 p-4">
          <div className="w-full xl:w-1/2 flex gap-5">
            <Search />
          </div>
          <div className="w-full xl:w-auto flex flex-col xl:flex-row space-y-2 xl:space-y-0 items-stretch xl:items-center justify-end xl:space-x-3 flex-shrink-0">
            <Link href="/organization/locations/create">
              <Button>
                <HiPlus />
                Add {LOCATION_PAGE_TITLE}
              </Button>
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table
            columns={[
              {
                column: 'Company',
                name: 'company',
              },
              {
                column: 'Location Name',
                name: 'location_name',
              },
              {
                column: 'Location Head',
                name: 'location_head',
              },
              {
                column: 'City',
                name: 'city',
              },
              {
                column: 'Country',
                name: 'country',
              },
            ]}
            data={data}
            onDelete={async (item: Location) => {
              try {
                setLoading(true)
                const { status } = await deleteLocation(item._id)
                if (status) {
                  router.refresh()
                  toast.success(`Delete ${LOCATION_PAGE_TITLE} Success `)
                } else {
                  toast.error(`Delete ${LOCATION_PAGE_TITLE} Failed `)
                }
              } catch (error) {
                toast.error(`Delete ${LOCATION_PAGE_TITLE} Failed`)
              } finally {
                setLoading(false)
              }
            }}
            onEdit={(item: Location) =>
              router.push(`/organization/locations/${item._id}`)
            }
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
