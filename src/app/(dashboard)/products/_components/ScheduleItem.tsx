import Button from '@/components/forms/button'

type Props = {
  onEdit: () => void
  onRemove: () => void
}

export default function ScheduleItem({ onEdit, onRemove }: Props) {
  return (
    <div className=" w-full p-6 space-y-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        WY-850 | CGKMCT
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Date : 1-aug
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Arrival Time : 14:50
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Departure Time : 15:50
      </p>
      <div className="flex space-x-2">
        <Button className="w-1/2 bg-blue-500">Edit</Button>
        <Button className="w-1/2 bg-red-500">Remove</Button>
      </div>
    </div>
  )
}
