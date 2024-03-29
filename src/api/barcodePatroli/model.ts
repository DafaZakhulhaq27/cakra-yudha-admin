import { MainResponse, PagedResponse } from '../response'

export type BarcodePatroli = {
  _id: string
  id_barcode: string
  name: string
  project_id: {
    _id: string
    name: string
  }
  group_id: {
    _id: string
    name: string
  }
  alamat: string
  lat: string
  long: string
  radius: number
  keterangan: string
}

export type BarcodePatroliDetail = BarcodePatroli

export type GetBarcodePatroli = {
  data: BarcodePatroli[]
} & PagedResponse

export type GetDetaiBarcodePatroli = {
  data: BarcodePatroliDetail
} & MainResponse
