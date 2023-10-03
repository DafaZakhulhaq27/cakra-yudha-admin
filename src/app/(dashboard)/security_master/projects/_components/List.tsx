'use client'

import { deleteProject } from '@/api/projects'
import { GetProject, Project } from '@/api/projects/model'
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
  res: GetProject
}

export default function List({ res }: Props) {
  const router = useRouter()
  const { data, limit, total_data, total_page } = res
  const { setLoading, LoadingOverlay } = useLoading()

  return (
    <LoadingOverlay>
      <LayoutPage name="Projects">
        <div className="flex flex-col xl:flex-row items-center justify-between space-y-3 xl:space-y-0 xl:space-x-4 p-4">
          <div className="w-full xl:w-1/2 flex gap-5">
            <Search />
          </div>
          <div className="w-full xl:w-auto flex flex-col xl:flex-row space-y-2 xl:space-y-0 items-stretch xl:items-center justify-end xl:space-x-3 flex-shrink-0">
            <Link href="/security_master/projects/create">
              <Button>
                <HiPlus />
                Add Project
              </Button>
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table
            columns={[
              {
                column: 'Project Code',
                name: 'project_code',
              },
              {
                column: 'Project Name',
                name: 'project_name',
              },
              {
                column: 'Client',
                name: 'client_id',
              },
              {
                column: 'Phone Number',
                name: 'phone_number',
              },
            ]}
            data={data}
            onDelete={async (item: Project) => {
              try {
                setLoading(true)
                const { status } = await deleteProject(item._id)
                if (status) {
                  router.refresh()
                  toast.success(`Delete Project Success `)
                } else {
                  toast.error(`Delete Project Failed `)
                }
              } catch (error) {
                toast.error(`Delete Project Failed `)
              } finally {
                setLoading(false)
              }
            }}
            onEdit={(item: Project) =>
              router.push(`/security_master/projects/${item._id}`)
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
