import {
  getAbsencePercentage,
  getGraphAbsence,
  getReportCard,
} from '@/api/dashboard'
import TotalSection from './_components/TotalSection'
import GraphAbsenceSection from './_components/GraphAbsenceSection'
import { SearchParamsProps } from '@/config/constant'
import AbsencePercentageSection from './_components/AbsencePercentageSection'

export default async function Home({ searchParams }: SearchParamsProps) {
  const resReportCard = await getReportCard()
  const resGraphAbsence = await getGraphAbsence({
    project_id: String(searchParams?.project_id ?? ''),
    tahun: String(searchParams?.tahun ?? new Date().getFullYear()),
    user_id: String(searchParams?.user_id ?? ''),
  })
  const resAbsencePercentage = await getAbsencePercentage()

  return (
    <>
      <TotalSection data={resReportCard.data} />
      <div className="mt-5 flex gap-5 items-center">
        <GraphAbsenceSection
          data={resGraphAbsence.data}
          value={resGraphAbsence.value}
        />
        <AbsencePercentageSection data={resAbsencePercentage.data} />
      </div>
    </>
  )
}
