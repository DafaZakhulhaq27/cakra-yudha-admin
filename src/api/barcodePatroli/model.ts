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

export type BarcodeGenerate = {
  _id: string
  id_barcode: string
  name: string
  created_at: string
}

export type BarcodeScanMobile = {
  _id: string
  id_barcode: string
  user_id: {
    _id: string
    name: string
  }
  project_id: {
    _id: string
    name: string
  }
  group_id: {
    _id: string
    name: string
  }
  desc: string
  createdAt: string
  image: string
}

export type BarcodePatroliDetail = BarcodePatroli

export type GetBarcodePatroli = {
  data: BarcodePatroli[]
} & PagedResponse

export type GetBarcodeGenerate = {
  data: BarcodeGenerate[]
}

export type GetDetaiBarcodePatroli = {
  data: BarcodePatroliDetail
} & MainResponse

export type GetBarcodeScanMobile = {
  data: BarcodeScanMobile[]
} & PagedResponse
