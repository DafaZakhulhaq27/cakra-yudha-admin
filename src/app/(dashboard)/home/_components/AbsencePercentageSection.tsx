'use client'

import { AbsencePercentage } from '@/api/dashboard/model'
import { Chart } from 'react-chartjs-2'
import { Chart as ChartJS, registerables } from 'chart.js'

ChartJS.register(...registerables)

type Props = {
  data: AbsencePercentage
}

export default function AbsencePercentageSection({ data }: Props) {
  return (
    <div className="flex gap-5 flex-wrap">
      <Chart
        data={{
          labels: ['Masuk', 'Ijin', 'Sakit'],
          datasets: [
            {
              label: 'Total Absen',
              data: [data.masuk, data.izin, data.sakit],
              backgroundColor: [
                'green',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
              ],
              hoverOffset: 4,
            },
          ],
        }}
        type={'doughnut'}
      />
    </div>
  )
}
