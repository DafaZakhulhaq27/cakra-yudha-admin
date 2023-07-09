'use client'

import { GetAllProduct } from '@/api/product/model'
import Button from '@/components/forms/button'
import MainPagination from '@/components/list/pagination'
import Search from '@/components/list/search'
import SelectFilter from '@/components/list/selectFilter'
import Table from '@/components/list/table'
import Link from 'next/link'
import { HiPlus } from 'react-icons/hi'

type Props = {
  res: GetAllProduct
}

export default function List({ res }: Props) {
  const { products, limit, skip, total } = res

  return (
    <section>
      <div className="flex flex-col xl:flex-row items-center justify-between space-y-3 xl:space-y-0 xl:space-x-4 p-4">
        <div className="w-full xl:w-1/2 flex gap-5">
          <Search />
          <SelectFilter
            name="category"
            placeHolder="Select Category"
            data={[
              {
                label: 'cat 1',
                value: 'cat1',
              },
              {
                label: 'cat 2',
                value: 'cat2',
              },
            ]}
          />
        </div>
        <div className="w-full xl:w-auto flex flex-col xl:flex-row space-y-2 xl:space-y-0 items-stretch xl:items-center justify-end xl:space-x-3 flex-shrink-0">
          <Link href="/crud/create">
            <Button>
              <HiPlus />
              Add product
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
              name: 'description',
            },
            {
              column: 'Price',
              name: 'price',
            },
            {
              column: 'Discount',
              name: 'discountPercentage',
              render: v => <p>{v} %</p>,
            },
          ]}
          data={products}
          onDelete={() => alert('hapus')}
          onEdit={() => {}}
          onView={() => {}}
        />
      </div>
      <MainPagination
        totalPage={total / limit}
        totalData={total}
        currentData={limit}
      />
    </section>
  )
}
