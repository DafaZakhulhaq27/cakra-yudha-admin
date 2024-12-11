'use client'

import { GetGraphAbsence } from '@/api/dashboard/model'
import { getProjectDropdown } from '@/api/projects'
import SelectFilter from '@/components/list/selectFilter'
import { useEffect, useState } from 'react'
import YearFilter from '@/components/list/yearFilter'
import { getEmployeeDropdown } from '@/api/employee'
import { Chart } from 'react-chartjs-2'
import { Chart as ChartJS, registerables } from 'chart.js'

ChartJS.register(...registerables)

type Props = {
  data: GetGraphAbsence['data']
  value: GetGraphAbsence['value']
}

export default function GraphAbsenceSection({ data, value }: Props) {
  const [projectsDropdown, setProjectsDropdown] = useState<SelectItem[]>([])
  const [userDropdown, setUserDropdown] = useState<SelectItem[]>([])

  const fetchData = async () => {
    const [resProject, resEmployee] = await Promise.all([
      getProjectDropdown({ page: '1', limit: '9999' }),
      getEmployeeDropdown({ page: '1', limit: '9999' }),
    ])

    if (resProject && resProject.data) {
      setProjectsDropdown(
        resProject.data.map(_ => ({ label: _.project_name, value: _._id })),
      )
    }

    if (resEmployee && resEmployee.data) {
      setUserDropdown(
        resEmployee.data.map(_ => ({ label: _.first_name, value: _._id })),
      )
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <div className="flex gap-3 mb-5">
        <YearFilter name={'tahun'} />
        <SelectFilter
          data={projectsDropdown}
          placeHolder={'All Project'}
          name={'project_id'}
        />
        <SelectFilter
          data={userDropdown}
          placeHolder={'All Users'}
          name={'user_id'}
        />
      </div>
      <Chart
        data={{
          labels: data,
          datasets: [
            {
              label: 'Total Absen',
              data: value,
              fill: false,
              borderColor: 'black',
              tension: 0.1,
            },
          ],
        }}
        type={'line'}
      />
    </div>
  )
}
