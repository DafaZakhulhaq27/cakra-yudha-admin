import Button from '@/components/forms/button'
import Input from '@/components/forms/input'
import { Modal } from 'flowbite-react'

type Props = {
  showModal: boolean
  onClose: () => void
}

export default function ScheduleModal({ showModal, onClose }: Props) {
  return (
    <Modal show={showModal} onClose={onClose}>
      <Modal.Header>Add Schedule</Modal.Header>
      <Modal.Body>
        <form action="#" noValidate className="space-y-3">
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
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => onClose()}>Submit</Button>
        <Button className=" bg-red-500" onClick={() => onClose()}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
