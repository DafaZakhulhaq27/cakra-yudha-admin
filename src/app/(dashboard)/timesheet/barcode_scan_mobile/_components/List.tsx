'use client'

import { getAllBarcodeScanMobile } from '@/api/barcodePatroli'
import { GetBarcodeScanMobile } from '@/api/barcodePatroli/model'
import { getProjectDropdown } from '@/api/projects'
import Button from '@/components/forms/button'
import LayoutPage from '@/components/layouts/layoutPage'
import DateRangeFilter from '@/components/list/dateRangeFilter'
import MainPagination from '@/components/list/pagination'
import Search from '@/components/list/search'
import SelectFilter from '@/components/list/selectFilter'
import Table from '@/components/list/table'
import { BARCODE_SCAN_MOBILE_PAGE_TITLE } from '@/constant/page'
import useLoading from '@/hooks/loading'
import { useQueryNavigation } from '@/hooks/navigation'
import { ExportExcel } from '@/utils/exportFiles'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type Props = {
  res: GetBarcodeScanMobile
}

export default function List({ res }: Props) {
  const { data, limit, total_data, total_page } = res
  const { LoadingOverlay } = useLoading()
  const { currentParams } = useQueryNavigation()

  // Get Projects Dropdown
  const [projectsDropdown, setProjectsDropdown] = useState<SelectItem[]>([])

  const fetchData = async () => {
    const res = await getProjectDropdown({ page: '1', limit: '9999' })
    if (res && res.data) {
      setProjectsDropdown(
        res.data.map(_ => ({ label: _.project_name, value: _._id })),
      )
    }
  }

  const onExportExcel = async () => {
    const projectId = currentParams.get('project_id')
    const { data } = await getAllBarcodeScanMobile(projectId ?? '')

    ExportExcel(
      data.map(_ => ({
        user: _.user_id.name,
        project: _.project_id.name,
        group: _.group_id.name,
        desc: _.desc,
        createdAt: _.createdAt,
      })),
      'barcode-scan-mobile-data',
    )
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <LoadingOverlay>
      <LayoutPage name={BARCODE_SCAN_MOBILE_PAGE_TITLE}>
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
                column: 'User',
                name: 'user_id',
                render: v => {
                  return v.user_id.name
                },
              },
              {
                column: 'Project',
                name: 'project_id',
                render: v => {
                  return v.project_id.name
                },
              },
              {
                column: 'Group',
                name: 'group_id',
                render: v => {
                  return v.group_id.name
                },
              },
              {
                column: 'desc',
                name: 'desc',
              },
              {
                column: 'Image',
                name: 'image',
                render: v => {
                  return (
                    <Link href={v.image} target="_blank">
                      <Image
                        src={v.image}
                        alt={'Image Barcode'}
                        width={100}
                        height={100}
                        style={{
                          height: '100px',
                        }}
                      />
                    </Link>
                  )
                },
              },
              {
                column: 'Created At',
                name: 'createdAt',
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
