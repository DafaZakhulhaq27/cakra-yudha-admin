import { UserProfileToken } from '@/app/(auth)/login/Models'
import MainLayout from '@/components/layouts'
import UserProfileProvider from '@/providers/userProfileProvider'
import { decodeJwt } from '@/utils/jwtDecode'
import { getSession } from '@/utils/session'
import { redirect } from 'next/navigation'

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession()
  if (!session) redirect('/logout')

  const userProfile = decodeJwt<UserProfileToken>(
    session.user.bearerToken ?? '',
  )

  return (
    <UserProfileProvider user={userProfile}>
      <MainLayout>{children}</MainLayout>
    </UserProfileProvider>
  )
}

export default DashboardLayout
