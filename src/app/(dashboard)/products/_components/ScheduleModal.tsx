'use client'

import { Schedule } from '@/api/products/model'
import Button from '@/components/forms/button'
import Input from '@/components/forms/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Modal } from 'flowbite-react'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { ScheduleModel, scheduleModel } from './Model'

type Props = {
  prefill?: Schedule
  showModal: boolean
  onClose: () => void
  onSubmit: (data: ScheduleModel) => void
}

export default function ScheduleModal({
  showModal,
  prefill,
  onClose,
  onSubmit: onSubmited,
}: Props) {
  const methods = useForm<ScheduleModel>({
    mode: 'onTouched',
    resolver: zodResolver(scheduleModel),
  })

  const {
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods

  useEffect(() => {
    if (prefill) {
      setValue('date', prefill.date)
      setValue('code_flight_schedule', prefill.code_flight_schedule)
      setValue('boarding_passcode', prefill.boarding_passcode)
      setValue('departure_time', prefill.departure_time)
      setValue('arrived_time', prefill.arrived_time)
    } else {
      reset()
    }
  }, [prefill])

  const onSubmit = async (data: ScheduleModel, e: any) => {
    e.stopPropagation()
    onSubmited(data)
    onClose()
    reset()
  }

  return (
    <Modal show={showModal} onClose={onClose}>
      <FormProvider {...methods}>
        <form noValidate>
          <Modal.Header>{prefill ? 'Edit' : 'Add'} Schedule</Modal.Header>
          <Modal.Body className="space-y-3">
            <Input
              type="date"
              label="Date"
              name="date"
              placeholder="date"
              required
            />
            <Input
              label="Code Flight Schedule"
              name="code_flight_schedule"
              placeholder="Code Flight Schedule"
              required
            />
            <Input
              label="Boarding Passcode"
              name="boarding_passcode"
              placeholder="Boarding Passcode"
              required
            />
            <Input
              label="Departure Time"
              name="departure_time"
              type="time"
              placeholder="Departure Time"
              required
            />
            <Input
              label="Arrived Time"
              name="arrived_time"
              placeholder="Arrived Time"
              type="time"
              required
            />
            <div className="pt-5 flex space-x-3">
              <Button
                onClick={handleSubmit(onSubmit)}
                isProcessing={isSubmitting}
                disabled={isSubmitting}
              >
                {prefill ? 'Edit' : 'Add'}
              </Button>
              <Button className=" bg-red-500" onClick={() => onClose()}>
                Cancel
              </Button>
            </div>
          </Modal.Body>
        </form>
      </FormProvider>
    </Modal>
  )
}
