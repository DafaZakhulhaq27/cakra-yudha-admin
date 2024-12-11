'use client'

import { ReportCard } from '@/api/dashboard/model'
import { TbReport } from 'react-icons/tb'
import { FaUsers } from 'react-icons/fa'
import { GrProjects } from 'react-icons/gr'

type Props = {
  data: ReportCard
}

export default function TotalSection({ data }: Props) {
  return (
    <div className="flex gap-5 flex-wrap">
      <div className="border-2 px-5 py-3 rounded shadow w-[300px]">
        <TbReport size={25} />
        <h3 className="text-2xl font-bold mt-3">
          {data.p_absen.toLocaleString()} %
        </h3>
        <p>Total Absen</p>
      </div>
      <div className="border-2 px-5 py-3 rounded shadow w-[300px]">
        <FaUsers size={25} />
        <h3 className="text-2xl font-bold mt-3">
          {data.t_personil.toLocaleString()}
        </h3>
        <p>Total Personil</p>
      </div>
      <div className="border-2 px-5 py-3 rounded shadow w-[300px]">
        <GrProjects size={25} />
        <h3 className="text-2xl font-bold mt-3">
          {data.t_project.toLocaleString()}
        </h3>
        <p>Total Project</p>
      </div>
    </div>
  )
}
