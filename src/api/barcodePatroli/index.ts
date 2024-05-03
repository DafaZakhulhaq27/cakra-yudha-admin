import { fetcher } from '@/utils/fetcher'
import { filter } from '../filter'
import {
  GetBarcodeGenerate,
  GetBarcodePatroli,
  GetBarcodeScanMobile,
  GetDetaiBarcodePatroli,
} from './model'
import { MainResponse } from '../response'
import { BarcodePatroliModel } from '@/app/(dashboard)/security_master/barcode-patroli/_components/Model'

type BarcodePatroliParams = filter

type GenerateBarcodeParams = {
  search?: string
  start_date?: string
  end_date?: string
  project_id?: string
}

export const getBarcodePatroli = async (params: BarcodePatroliParams) =>
  fetcher<GetBarcodePatroli>({ path: '/v1/barcode_patroli', params: params })

export const getGenerateBarcode = async (params: GenerateBarcodeParams) =>
  fetcher<GetBarcodeGenerate>({
    path: '/v1/barcode_patroli/show_all_barcode',
    params: params,
  })

export const getBarcodeScanMobile = async (
  params: GenerateBarcodeParams & filter,
) =>
  fetcher<GetBarcodeScanMobile>({
    path: '/v1/barcode_patroli/result_scan_barcode_mobile',
    params: params,
  })

export const getAllBarcodeScanMobile = async (project_id?: string | null) =>
  fetcher<GetBarcodeScanMobile>({
    path: '/api/v1/barcode_patroli/result_scan_barcode_mobile',
    params: { limit: '99999', project_id: project_id },
  })

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
