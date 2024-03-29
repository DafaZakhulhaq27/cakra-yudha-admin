import { useQueryNavigation } from '@/hooks/navigation'
import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker'

export default function DateRangeFilter() {
  const { appendQuery, currentParams } = useQueryNavigation()
  const selectedStartDate = currentParams.get('start_date')
  const selectedEndDate = currentParams.get('end_date')

  const selectedDate = {
    startDate: selectedStartDate,
    endDate: selectedEndDate,
  }

  const handleValueChange = (v: DateValueType) => {
    if (v?.startDate && v?.endDate) {
      appendQuery({
        ['start_date']: v.startDate.toString(),
        ['end_date']: v.endDate.toString(),
        page: '1',
      })
    } else {
      appendQuery({
        ['start_date']: '',
        ['end_date']: '',
        page: '1',
      })
    }
  }

  return (
    <div className="w-72">
      <Datepicker value={selectedDate} onChange={handleValueChange} />
    </div>
  )
}
