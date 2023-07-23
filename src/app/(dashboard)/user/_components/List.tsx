'use client'

import { deleteUser } from '@/api/user'
import { GetUser } from '@/api/user/model'
import { UserProfile } from '@/app/(auth)/login/Models'
import Button from '@/components/forms/button'
import MainPagination from '@/components/list/pagination'
import Search from '@/components/list/search'
import Table from '@/components/list/table'
import { useUserContext } from '@/hooks/context'
import useLoading from '@/hooks/loading'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { HiPlus } from 'react-icons/hi'

type Props = {
  res: GetUser
}

export default function List({ res }: Props) {
  const { currentUser } = useUserContext()
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
          <Link href="/user/create">
            <Button>
              <HiPlus />
              Add User
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
              column: 'Email',
              name: 'email',
            },
            {
              column: 'Company Name',
              name: 'company_name',
            },
            {
              column: 'Phone Number',
              name: 'phone_number',
            },
            {
              column: 'Status',
              name: 'status',
              render: v => (
                <span
                  className={`bg-${
                    v === 'Active' ? 'green' : 'red'
                  }-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded `}
                >
                  {v}
                </span>
              ),
            },
            {
              column: 'Role',
              name: 'role',
            },
            {
              column: 'Address',
              name: 'address',
            },
            {
              column: 'Is Already Login',
              name: 'is_new_login',
              render: v => <p className="font-bold	"> {v ? 'No' : 'Yes'} </p>,
            },
          ]}
          data={data}
          onDelete={
            currentUser?.role === 'Master'
              ? async (item: UserProfile) => {
                  try {
                    setLoading(true)
                    const { status } = await deleteUser(item._id)
                    if (status) {
                      router.refresh()
                      toast.success(`Delete User Success `)
                    } else {
                      toast.error(`Delete User Failed `)
                    }
                  } catch (error) {
                    toast.error(`Delete User Failed `)
                  } finally {
                    setLoading(false)
                  }
                }
              : null
          }
          onEdit={(item: UserProfile) => router.push(`/user/${item._id}`)}
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
