export const getReportCard = async () =>
  //   fetcher<GetReportCard>({ path: '/v1/dashboard/report-card' })
  ({
    status: true,
    message: 'success',
    data: {
      p_absen: 0,
      t_personil: 100,
      t_project: 100,
    },
  })

type GraphAbsenceParams = {
  project_id?: string
  tahun?: string
  user_id?: string
}

/*eslint no-unused-vars: "off"*/
export const getGraphAbsence = async (params: GraphAbsenceParams) =>
  //   fetcher<GetGraphAbsence>({
  //     path: '/v1/dashboard/grafik-absen',
  //     params: params,
  //   })
  ({
    status: true,
    message: 'Sukses',
    data: [
      'jan',
      'feb',
      'mar',
      'apr',
      'may',
      'jun',
      'jul',
      'aug',
      'sep',
      'oct',
      'nov',
      'dec',
    ],
    value: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12],
  })

export const getAbsencePercentage = async () =>
  //   fetcher<GetReportCard>({ path: '/v1/dashboard/persentasi_absen' })
  ({
    Status: true,
    message: 'Sukese',
    data: {
      masuk: 50,
      sakit: 2,
      izin: 4,
    },
  })
