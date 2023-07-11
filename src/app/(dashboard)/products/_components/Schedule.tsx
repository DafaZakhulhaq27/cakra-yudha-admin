import Button from '@/components/forms/button'
import { useState } from 'react'
import ScheduleItem from './ScheduleItem'
import ScheduleModal from './ScheduleModal'

export default function Schedule() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <p className="text-xl font-bold mt-5">Schedule</p>
      <div className="w-1/2">
        <Button onClick={() => setShowModal(true)} className="bg-yellow-500">
          Create Schedule +{' '}
        </Button>
      </div>
      <div className="mt-4 w-full space-y-3">
        <ScheduleItem onRemove={() => {}} onEdit={() => {}} />
      </div>
      <ScheduleModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  )
}
