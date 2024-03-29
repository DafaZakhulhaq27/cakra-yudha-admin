import { fetcher } from '@/utils/fetcher'
import { filter } from '../filter'
import { GetBarcodePatroli, GetDetaiBarcodePatroli } from './model'
import { MainResponse } from '../response'
import { BarcodePatroliModel } from '@/app/(dashboard)/security_master/barcode-patroli/_components/Model'

type BarcodePatroliParams = filter

export const getBarcodePatroli = async (params: BarcodePatroliParams) =>
  fetcher<GetBarcodePatroli>({ path: '/v1/barcode_patroli', params: params })

export const getDetailBarcodePatroli = async (id: string) =>
  fetcher<GetDetaiBarcodePatroli>({
    path: `/v1/barcode_patroli`,
    params: { _id: id },
  })

export const createBarcodePatroli = async (form: BarcodePatroliModel) =>
  fetcher<MainResponse>({
    path: '/api/v1/barcode_patroli',
    options: {
      method: 'POST',
      body: form,
    },
  })

export const editBarcodePatroli = async (
  id: string,
  form: BarcodePatroliModel,
) =>
  fetcher<MainResponse>({
    path: `/api/v1/barcode_patroli`,
    params: {
      _id: id,
    },
    options: {
      method: 'PUT',
      body: form,
    },
  })
