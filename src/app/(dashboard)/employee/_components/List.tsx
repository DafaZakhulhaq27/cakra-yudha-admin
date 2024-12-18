'use client'

import { deleteEmployee } from '@/api/employee'
import { GetEmployee } from '@/api/employee/model'
import { Group } from '@/api/group/model'
import Button from '@/components/forms/button'
import LayoutPage from '@/components/layouts/layoutPage'
import MainPagination from '@/components/list/pagination'
import Search from '@/components/list/search'
import Table from '@/components/list/table'
import { EMPLOYEE_PAGE_TITLE } from '@/constant/page'
import { useUserContext } from '@/hooks/context'
import useLoading from '@/hooks/loading'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { HiPlus } from 'react-icons/hi'

type Props = {
  res: GetEmployee
}

export default function List({ res }: Props) {
  const router = useRouter()
  const { data, limit, total_data, total_page } = res
  const { setLoading, LoadingOverlay } = useLoading()
  const { currentUser } = useUserContext()

  console.log(currentUser, 'currentUser')

  const isSuperAdmin =
    currentUser?.role.toLowerCase().replace(/\s/g, '') === 'superadmin'

  return (
    <LoadingOverlay>
      <LayoutPage name={EMPLOYEE_PAGE_TITLE}>
        <div className="flex flex-col xl:flex-row items-center justify-between space-y-3 xl:space-y-0 xl:space-x-4 p-4">
          <div className="w-full xl:w-1/2 flex gap-5">
            <Search />
          </div>
          {isSuperAdmin && (
            <div className="w-full xl:w-auto flex flex-col xl:flex-row space-y-2 xl:space-y-0 items-stretch xl:items-center justify-end xl:space-x-3 flex-shrink-0">
              <Link href="/employee/create">
                <Button>
                  <HiPlus />
                  Add {EMPLOYEE_PAGE_TITLE}
                </Button>
              </Link>
            </div>
          )}
        </div>
        <div className="overflow-x-auto">
          <Table
            isNotMaster
            columns={[
              {
                column: 'First Name',
                name: 'first_name',
              },
              {
                column: 'Email',
                name: 'email',
              },
              {
                column: 'Contact Number',
                name: 'contact_number',
              },
              {
                column: 'User Name',
                name: 'username',
              },
              {
                column: 'Company',
                name: 'company',
              },
              {
                column: 'Group',
                name: 'group',
              },
            ]}
            data={data}
            onDelete={
              isSuperAdmin
                ? async (item: Group) => {
                    try {
                      setLoading(true)
                      const { status } = await deleteEmployee(item._id)
                      if (status) {
                        router.refresh()
                        toast.success(`Delete ${EMPLOYEE_PAGE_TITLE} Success `)
                      } else {
                        toast.error(`Delete ${EMPLOYEE_PAGE_TITLE} Failed `)
                      }
                    } catch (error) {
                      toast.error(`Delete ${EMPLOYEE_PAGE_TITLE} Failed `)
                    } finally {
                      setLoading(false)
                    }
                  }
                : null
            }
            onView={
              !isSuperAdmin
                ? (item: Group) => router.push(`/employee/${item._id}`)
                : null
            }
            onEdit={
              isSuperAdmin
                ? (item: Group) => router.push(`/employee/${item._id}`)
                : null
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
