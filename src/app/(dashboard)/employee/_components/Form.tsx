'use client'

import { createEmployee, editEmployee } from '@/api/employee'
import { EmployeeDetail } from '@/api/employee/model'
import Button from '@/components/forms/button'
import Input from '@/components/forms/input'
import Select from '@/components/forms/select'
import SelectProject from '@/components/forms/selectAsync/selectProject'
import Textarea from '@/components/forms/textarea'
import LayoutPage from '@/components/layouts/layoutPage'
import { EMPLOYEE_PAGE_TITLE } from '@/constant/page'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { startTransition } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { EmployeeModel, employeeModel } from './Model'
import SelectCompany from '@/components/forms/selectAsync/selectCompany'
import SelectQualification from '@/components/forms/selectAsync/selectQualification'
import SelectPositionLevel from '@/components/forms/selectAsync/selectPositionLevel'
import SelectLocation from '@/components/forms/selectAsync/selectLocation'
import SelectGroup from '@/components/forms/selectAsync/selectGroup'
import { useUserContext } from '@/hooks/context'

type Props = {
  prefill?: EmployeeDetail
}

export default function Form({ prefill }: Props) {
  const router = useRouter()
  const methods = useForm<EmployeeModel>({
    mode: 'onTouched',
    resolver: zodResolver(employeeModel),
    defaultValues: {
      id: prefill?._id,
      username: prefill?.username,
      email: prefill?.email,
      first_name: prefill?.first_name,
      last_name: prefill?.last_name,
      employe_id: prefill?.employe_id,
      join_date: prefill?.join_date,
      nik: prefill?.nik,
      npwp: prefill?.npwp,
      gender: prefill?.gender,
      company_id: prefill?.company_id._id,
      company_id_name: prefill?.company_id.name,
      location_id: prefill?.location_id._id,
      location_id_name: prefill?.location_id.name,
      project_id: prefill?.project_id._id,
      project_id_name: prefill?.project_id.name,
      group_id: prefill?.group_id._id,
      group_id_name: prefill?.group_id.name,
      qualification_id: prefill?.qualification_id._id,
      qualification_id_name: prefill?.qualification_id.name,
      position_level_id: prefill?.position_level_id._id,
      position_level_id_name: prefill?.position_level_id.name,
      role: prefill?.role,
      date_of_birth: prefill?.date_of_birth,
      report_to_id: '',
      contact_number: prefill?.contact_number,
      leave_category_id: prefill?.leave_category_id,
      address: prefill?.address,
    },
  })
  const { currentUser } = useUserContext()

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = async (data: EmployeeModel, e: any) => {
    e.preventDefault()

    const res = prefill
      ? await editEmployee(prefill._id, data)
      : await createEmployee(data)
    if (res.status) {
      toast.success(
        `${prefill ? 'Edit' : 'Create'} ${EMPLOYEE_PAGE_TITLE} Success `,
      )
      startTransition(() => {
        router.push(`/employee`)
        router.refresh()
      })
    } else {
      toast.error(
        `${prefill ? 'Edit' : 'Create'} ${EMPLOYEE_PAGE_TITLE} Failed ${
          res.message
        }`,
      )
    }
  }

  const isSuperAdmin =
    currentUser?.role.toLowerCase().replace(/\s/g, '') === 'superadmin'

  return (
    <LayoutPage name={`${prefill ? 'Edit' : 'Add'} ${EMPLOYEE_PAGE_TITLE}`}>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 mt-4"
          noValidate
        >
          <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 gap-5">
            <Input
              label="Username"
              name="username"
              placeholder="Username"
              required
              disabled={!isSuperAdmin}
            />
            <Input label="Email" name="email" placeholder="Email" required />
            <Input
              label="First Name"
              name="first_name"
              placeholder="First Name"
              required
              disabled={!isSuperAdmin}
            />
            <Input
              label="Last Name"
              name="last_name"
              placeholder="Last Name"
              required
              disabled={!isSuperAdmin}
            />
            <Input
              label="Employee Id"
              name="employe_id"
              placeholder="Employee Id"
              required
              disabled={!isSuperAdmin}
            />
            <Input
              type="date"
              label="Join Date"
              name="join_date"
              placeholder="Join Date"
              required
              disabled={!isSuperAdmin}
            />
            <Input
              type="number"
              label="Nik"
              name="nik"
              placeholder="Nik"
              required
              disabled={!isSuperAdmin}
            />
            <Input
              label="NPWP"
              name="npwp"
              placeholder="NPWP"
              required
              disabled={!isSuperAdmin}
            />
            <Input
              type="password"
              label="Password"
              name="password"
              placeholder="Password"
              required
              disabled={!isSuperAdmin}
            />
            <Input
              type="password"
              label="Password Confirmation"
              name="password_confirmation"
              placeholder="Password Confirmation"
              required
              disabled={!isSuperAdmin}
            />
            <Select
              placeHolder={'Select Gender'}
              label={'Gender'}
              name="gender"
              data={[
                {
                  label: 'Laki-Laki',
                  value: 'Laki-Laki',
                },
                {
                  label: 'Perempuan',
                  value: 'Perempuan',
                },
              ]}
              disabled={!isSuperAdmin}
            />
            <SelectCompany name="company_id" disabled={!isSuperAdmin} />
            <SelectLocation name="location_id" disabled={!isSuperAdmin} />
            <SelectProject name="project_id" disabled={!isSuperAdmin} />
            <SelectGroup name="group_id" disabled={!isSuperAdmin} />
            <Input
              type="date"
              label="Date of Birth"
              name="date_of_birth"
              placeholder="Date of Birth"
              required
              disabled={!isSuperAdmin}
            />
            <Input
              type="number"
              label="Contact Number"
              name="contact_number"
              placeholder="Contact Number"
              required
              disabled={!isSuperAdmin}
            />
            <SelectQualification
              name="qualification_id"
              disabled={!isSuperAdmin}
            />
            <SelectPositionLevel
              name="position_level_id"
              disabled={!isSuperAdmin}
            />
            <Select
              placeHolder={'Select Role'}
              label={'Role'}
              name="role"
              data={[
                {
                  label: 'Super Admin',
                  value: 'Super Admin',
                },
                {
                  label: 'Employee',
                  value: 'Employee',
                },
                {
                  label: 'Security',
                  value: 'Security',
                },
                {
                  label: 'Valet',
                  value: 'Valet',
                },
                {
                  label: 'Euser',
                  value: 'Euser',
                },
                {
                  label: 'Direktur',
                  value: 'Direktur',
                },
                {
                  label: 'HRD',
                  value: 'HRD',
                },
              ]}
              disabled={!isSuperAdmin}
            />
            <Select
              placeHolder={'Leave Category'}
              label={'Sakit'}
              name="leave_category_id"
              data={[
                {
                  label: 'Menikah',
                  value: 'Menikah',
                },
                {
                  label: 'Sakit',
                  value: 'Sakit',
                },
                {
                  label: 'Meninggal Dunia',
                  value: 'Meninggal Dunia',
                },
              ]}
              disabled={!isSuperAdmin}
            />
            <Textarea
              label="Address"
              name="address"
              placeholder="Address"
              required
              disabled={!isSuperAdmin}
            />
          </div>
          {isSuperAdmin && (
            <Button
              type="submit"
              className="mt-8 w-full lg:w-1/2"
              isProcessing={isSubmitting}
              disabled={isSubmitting}
            >
              {prefill ? 'Edit' : 'Save'}
            </Button>
          )}
        </form>
      </FormProvider>
    </LayoutPage>
  )
}
