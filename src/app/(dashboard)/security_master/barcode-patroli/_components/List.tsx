'use client'

import {
  GetBarcodeGenerate,
  GetBarcodePatroli,
} from '@/api/barcodePatroli/model'
import { Group } from '@/api/group/model'
import Button from '@/components/forms/button'
import LayoutPage from '@/components/layouts/layoutPage'
import DateRangeFilter from '@/components/list/dateRangeFilter'
import MainPagination from '@/components/list/pagination'
import Search from '@/components/list/search'
import Table from '@/components/list/table'
import TabNav from '@/components/nav/TabNav'
import { BARCODE_PATROLI_PAGE_TITLE } from '@/constant/page'
import { ExportImageJpg } from '@/utils/exportFiles'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import { HiPlus } from 'react-icons/hi'
import { QRCode } from 'react-qrcode-logo'

type Props = {
  res: GetBarcodePatroli
  generateBarcode: GetBarcodeGenerate
}

export default function List({ res, generateBarcode }: Props) {
  const router = useRouter()
  const { data, limit, total_data, total_page } = res

  const generateBarcodeRef = useRef(null)

  return (
    <LayoutPage name={BARCODE_PATROLI_PAGE_TITLE}>
      <TabNav
        tabs={[
          {
            tab: 'Barcode Patroli Master',
            component: (
              <>
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
                      router.push(
                        `/security_master/barcode-patroli/${item._id}`,
                      )
                    }
                  />
                </div>
                <MainPagination
                  totalPage={total_page}
                  totalData={total_data}
                  currentData={limit}
                />
              </>
            ),
          },
          {
            tab: 'Generate Barcode',
            component: (
              <>
                <div className="flex flex-col xl:flex-row items-center justify-between space-y-3 xl:space-y-0 xl:space-x-4 p-4">
                  <div className="w-full xl:w-1/2 flex gap-5">
                    <Search />
                    <DateRangeFilter />
                  </div>
                  <div className="w-full xl:w-auto flex flex-col xl:flex-row space-y-2 xl:space-y-0 items-stretch xl:items-center justify-end xl:space-x-3 flex-shrink-0">
                    <Button
                      onClick={() => {
                        ExportImageJpg(generateBarcodeRef.current!, 'barcode')
                      }}
                    >
                      Export Barcode
                    </Button>
                  </div>
                </div>
                <div
                  ref={generateBarcodeRef}
                  className="flex flex-row gap-3 flex-wrap bg-white"
                >
                  {generateBarcode.data.map(_ => (
                    <div key={_._id}>
                      <QRCode value={_.id_barcode} logoImage="/logo.jpg" />
                    </div>
                  ))}
                </div>
              </>
            ),
          },
        ]}
      />
    </LayoutPage>
  )
}
