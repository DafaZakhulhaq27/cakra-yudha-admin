import { phoneNumberSchema, stringRequired } from '@/config/form'
import { object, string, z } from 'zod'

export const employeeModel = object({
  id: string().optional(),
  first_name: stringRequired,
  last_name: stringRequired,
  employe_id: stringRequired,
  join_date: stringRequired,
  nik: stringRequired,
  npwp: stringRequired,
  gender: stringRequired,
  company_id: stringRequired,
  company_id_name: stringRequired,
  location_id: stringRequired,
  location_id_name: stringRequired,
  password: stringRequired,
  password_confirmation: string().optional(),
  project_id: stringRequired,
  project_id_name: stringRequired,
  group_id: stringRequired,
  group_id_name: stringRequired,
  date_of_birth: stringRequired,
  contact_number: phoneNumberSchema,
  qualification_id: stringRequired,
  qualification_id_name: stringRequired,
  position_level_id: stringRequired,
  position_level_id_name: stringRequired,
  role: stringRequired,
  report_to_id: string().optional(),
  report_to_id_name: string().optional(),
  leave_category_id: stringRequired,
  address: stringRequired,
})

export type EmployeeModel = z.infer<typeof employeeModel>
