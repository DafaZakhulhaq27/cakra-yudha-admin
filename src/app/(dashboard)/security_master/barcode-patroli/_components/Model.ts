import { numberRequired, stringRequired } from '@/config/form'
import { object, string, z } from 'zod'

export const barcodePatroliModel = object({
  id: string().optional(),
  name: stringRequired,
  project_id: stringRequired,
  project_id_name: stringRequired,
  group_id: stringRequired,
  group_id_name: stringRequired,
  alamat: stringRequired,
  lat: stringRequired,
  long: stringRequired,
  keterangan: stringRequired,
  radius: numberRequired,
})

export type BarcodePatroliModel = z.infer<typeof barcodePatroliModel>
