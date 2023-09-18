'use client'

import { deleteCurrency } from '@/api/currency'
import { Currency, GetCurrency } from '@/api/currency/model'
import Button from '@/components/forms/button'
import LayoutPage from '@/components/layouts/layoutPage'
import MainPagination from '@/components/list/pagination'
import Search from '@/components/list/search'
import Table from '@/components/list/table'
import useLoading from '@/hooks/loading'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { HiPlus } from 'react-icons/hi'

type Props = {
  res: GetCurrency
}

export default function List({ res }: Props) {
  const router = useRouter()
  const { data, limit, total_data, total_page } = res
  const { setLoading, LoadingOverlay } = useLoading()

  return (
    <LoadingOverlay>
      <LayoutPage name="Currency">
        <div className="flex flex-col xl:flex-row items-center justify-between space-y-3 xl:space-y-0 xl:space-x-4 p-4">
          <div className="w-full xl:w-1/2 flex gap-5">
            <Search />
          </div>
          <div className="w-full xl:w-auto flex flex-col xl:flex-row space-y-2 xl:space-y-0 items-stretch xl:items-center justify-end xl:space-x-3 flex-shrink-0">
            <Link href="/master/currency/create">
              <Button>
                <HiPlus />
                Add Currency
              </Button>
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table
            columns={[
              {
                column: 'Name',
                name: 'name',
              },
            ]}
            data={data}
            onDelete={async (item: Currency) => {
              try {
                setLoading(true)
                const { status } = await deleteCurrency(item._id)
                if (status) {
                  router.refresh()
                  toast.success(`Delete Currency Success `)
                } else {
                  toast.error(`Delete Currency Failed `)
                }
              } catch (error) {
                toast.error(`Delete Currency Failed `)
              } finally {
                setLoading(false)
              }
            }}
            onEdit={(item: Currency) =>
              router.push(`/master/currency/${item._id}`)
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
