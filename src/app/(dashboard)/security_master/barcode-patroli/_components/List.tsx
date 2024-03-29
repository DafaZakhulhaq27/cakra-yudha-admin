'use client'

import { GetBarcodePatroli } from '@/api/barcodePatroli/model'
import { Group } from '@/api/group/model'
import Button from '@/components/forms/button'
import LayoutPage from '@/components/layouts/layoutPage'
import MainPagination from '@/components/list/pagination'
import Search from '@/components/list/search'
import Table from '@/components/list/table'
import { BARCODE_PATROLI_PAGE_TITLE } from '@/constant/page'
import useLoading from '@/hooks/loading'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { HiPlus } from 'react-icons/hi'

type Props = {
  res: GetBarcodePatroli
}

export default function List({ res }: Props) {
  const router = useRouter()
  const { data, limit, total_data, total_page } = res
  const { LoadingOverlay } = useLoading()

  return (
    <LoadingOverlay>
      <LayoutPage name={BARCODE_PATROLI_PAGE_TITLE}>
        <div className="flex flex-col xl:flex-row items-center justify-between space-y-3 xl:space-y-0 xl:space-x-4 p-4">
          <div className="w-full xl:w-1/2 flex gap-5">
            <Search />
          </div>
          <div className="w-full xl:w-auto flex flex-col xl:flex-row space-y-2 xl:space-y-0 items-stretch xl:items-center justify-end xl:space-x-3 flex-shrink-0">
            <Link href="/security_master/barcode-patroli/create">
              <Button>
                <HiPlus />
                Add {BARCODE_PATROLI_PAGE_TITLE}
              </Button>
            </Link>
            <Button>Generate All Barcode</Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table
            columns={[
              {
                column: 'Barcode Code',
                name: 'id_barcode',
              },
              {
                column: 'Barcode Name',
                name: 'name',
              },
              {
                column: 'Project',
                name: 'project_id',
                render: value => value.project_id.name,
              },
              {
                column: 'Group',
                name: 'group_id',
                render: value => value.group_id.name,
              },
              {
                column: 'Alamat',
                name: 'alamat',
                render: value => value.alamat,
              },
            ]}
            data={data}
            onEdit={(item: Group) =>
              router.push(`/security_master/barcode-patroli/${item._id}`)
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
