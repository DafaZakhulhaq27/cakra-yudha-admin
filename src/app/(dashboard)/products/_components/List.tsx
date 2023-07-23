'use client'

import { Category } from '@/api/categories/model'
import { GetProducts, Product } from '@/api/products/model'
import Button from '@/components/forms/button'
import MainPagination from '@/components/list/pagination'
import Search from '@/components/list/search'
import Table from '@/components/list/table'
import useLoading from '@/hooks/loading'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { HiPlus } from 'react-icons/hi'
import { ScheduleModel } from './Model'

type Props = {
  res: GetProducts
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
          <Link href="/products/create">
            <Button>
              <HiPlus />
              Add Product
            </Button>
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table
          columns={[
            {
              column: 'Program',
              name: 'program',
            },
            {
              column: 'Schedule',
              name: 'schedule',
              render: (v: ScheduleModel[]) => {
                return (
                  <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside ">
                    {v.map((item, index) => (
                      <li key={index}>
                        {item.date} {item.code_flight_schedule}{' '}
                        {item.boarding_passcode} {item.departure_time}{' '}
                        {item.arrived_time}
                      </li>
                    ))}
                  </ul>
                )
              },
            },
            {
              column: 'Seat',
              name: 'seat',
            },
            {
              column: 'Price',
              name: 'price',
              render: (v: number) => <span>USD {v.toLocaleString()}</span>,
            },
            {
              column: 'Category',
              name: 'category',
              render: (v: Category) => <span>{v.name}</span>,
            },
            {
              column: 'Status',
              name: 'is_sold',
              render: v => (
                <span
                  className={`bg-${
                    v ? 'red' : 'green'
                  }-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded `}
                >
                  {v ? 'Sold' : 'Avaible'}
                </span>
              ),
            },
          ]}
          data={data}
          // onDelete={async (item: UserProfile) => {
          //   try {
          //     setLoading(true)
          //     const { status } = await deleteProduct(item._id)
          //     if (status) {
          //       router.refresh()
          //       toast.success(`Delete Product Success `)
          //     } else {
          //       toast.error(`Delete Product Failed `)
          //     }
          //   } catch (error) {
          //     toast.error(`Delete Product Failed `)
          //   } finally {
          //     setLoading(false)
          //   }
          // }}
          onEdit={(item: Product) => router.push(`/products/${item._id}`)}
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
