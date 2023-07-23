'use client'

import { Schedule } from '@/api/products/model'
import Button from '@/components/forms/button'
import Table from '@/components/list/table'
import { useRef, useState } from 'react'
import { useFieldArray } from 'react-hook-form'
import ScheduleModal from './ScheduleModal'

export default function Schedule() {
  const { fields, append, update, remove } = useFieldArray({
    name: 'schedule',
  })
  const [showModal, setShowModal] = useState(false)
  const selectedItem = useRef<Schedule | null>()
  const selectedItemIndex = useRef<number | null>(null)

  return (
    <>
      <p className="text-xl font-bold mt-5">Schedule</p>
      <div className="w-52">
        <Button
          onClick={() => {
            selectedItem.current = null
            selectedItemIndex.current = null
            setShowModal(true)
          }}
          className="bg-yellow-500"
        >
          Create Schedule +{' '}
        </Button>
      </div>
      <div className="mt-4 w-full space-y-3">
        <div className="overflow-x-auto">
          <Table
            columns={[
              {
                column: 'Date',
                name: 'date',
              },
              {
                column: 'Code Flight Schedule',
                name: 'code_flight_schedule',
              },
              {
                column: 'Boarding Passcode',
                name: 'boarding_passcode',
              },
              {
                column: 'Departure Time',
                name: 'departure_time',
              },
              {
                column: 'Arrived Time',
                name: 'arrived_time',
              },
            ]}
            data={fields}
            onDelete={(_: any, index: number) => remove(index)}
            onEdit={(item: Schedule, index: number) => {
              selectedItem.current = item
              selectedItemIndex.current = index
              setShowModal(true)
            }}
          />
        </div>
      </div>
      <ScheduleModal
        prefill={selectedItem.current!}
        onSubmit={data => {
          const currentIndex = selectedItemIndex.current
          if (currentIndex !== null) {
            console.log(currentIndex, 'edit')
            update(currentIndex, data)
          } else {
            console.log(currentIndex, 'tambah')
            append(data)
          }
        }}
        showModal={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  )
}
