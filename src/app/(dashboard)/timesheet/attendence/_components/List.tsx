'use client'

import { getAllAttendenceClient } from '@/api/attendence'
import { GetAttendence } from '@/api/attendence/model'
import { getProjectDropdown } from '@/api/projects'
import Button from '@/components/forms/button'
import LayoutPage from '@/components/layouts/layoutPage'
import DateRangeFilter from '@/components/list/dateRangeFilter'
import MainPagination from '@/components/list/pagination'
import Search from '@/components/list/search'
import SelectFilter from '@/components/list/selectFilter'
import Table from '@/components/list/table'
import { ATTENDENCE_PAGE_TITLE } from '@/constant/page'
import useLoading from '@/hooks/loading'
import { useQueryNavigation } from '@/hooks/navigation'
import { ExportExcel } from '@/utils/exportFiles'
import { useEffect, useState } from 'react'
import Datepicker from 'react-tailwindcss-datepicker'

type Props = {
  res: GetAttendence
}

export default function List({ res }: Props) {
  const { data, limit, total_data, total_page } = res
  const { LoadingOverlay } = useLoading()
  const { currentParams } = useQueryNavigation()

  // Get Projects Dropdown
  const [isLoadingProject, setIsLoadingProject] = useState(false)
  const [projectsDropdown, setProjectsDropdown] = useState<SelectItem[]>([])

  const fetchData = async () => {
    setIsLoadingProject(true)
    const res = await getProjectDropdown({ page: '1', limit: '9999' })
    if (res && res.data) {
      setProjectsDropdown(
        res.data.map(_ => ({ label: _.project_name, value: _._id })),
      )
    }
    setIsLoadingProject(false)
  }

  const onExportExcel = async () => {
    const projectId = currentParams.get('project_id')
    const { data } = await getAllAttendenceClient(projectId ?? '')

    ExportExcel(data, 'attendence-data')
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <LoadingOverlay>
      <LayoutPage name={ATTENDENCE_PAGE_TITLE}>
        <div className="flex flex-col xl:flex-row items-center justify-between space-y-3 xl:space-y-0 xl:space-x-4 p-4">
          <div className="d-flex flex-col xl:flex-row w-full flex gap-5">
            <Search />
            <SelectFilter
              data={projectsDropdown}
              placeHolder={'All Project'}
              name={'project_id'}
            />
            <DateRangeFilter />

            <Button onClick={onExportExcel}>Export Excel</Button>
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
