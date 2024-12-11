import { getSession } from '@/utils/session'
import Form from '../_components/Form'
import { redirect } from 'next/navigation'
import { decodeJwt } from '@/utils/jwtDecode'
import { UserProfileToken } from '@/app/(auth)/login/Models'

export default async function page() {
  const session = await getSession()
  if (!session) redirect('/logout')

  const userProfile = decodeJwt<UserProfileToken>(
    session.user.bearerToken ?? '',
  )

  if (userProfile.role.toLowerCase().replace(/\s/g, '') !== 'superadmin') {
    redirect('/security_master/projects')
  }

  return <Form />
}
