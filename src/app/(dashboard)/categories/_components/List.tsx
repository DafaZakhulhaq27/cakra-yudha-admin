'use client'

import { deleteCategory } from '@/api/categories'
import { Category, GetCategories } from '@/api/categories/model'
import { UserProfile } from '@/app/(auth)/login/Models'
import Button from '@/components/forms/button'
import MainPagination from '@/components/list/pagination'
import Search from '@/components/list/search'
import Table from '@/components/list/table'
import useLoading from '@/hooks/loading'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { HiPlus } from 'react-icons/hi'

type Props = {
  res: GetCategories
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
          <Link href="/categories/create">
            <Button>
              <HiPlus />
              Add Category
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
            {
              column: 'Icon',
              name: 'icon',
              render: v => (
                <Link href={v as string} target="_blank">
                  <Image width={50} height={50} src={v as string} alt={''} />
                </Link>
              ),
            },
          ]}
          data={data}
          onDelete={async (item: Category) => {
            try {
              setLoading(true)
              const { status } = await deleteCategory(item._id)
              if (status) {
                router.refresh()
                toast.success(`Delete Category Success `)
              } else {
                toast.error(`Delete Category Failed `)
              }
            } catch (error) {
              toast.error(`Delete Category Failed `)
            } finally {
              setLoading(false)
            }
          }}
          onEdit={(item: UserProfile) => router.push(`/categories/${item._id}`)}
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
