import MainLayout from '@/components/layouts'
import { getSession } from '@/utils/session'
import { redirect } from 'next/navigation'

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession()
  if (!session) redirect('/logout')

  return <MainLayout>{children}</MainLayout>
}

export default DashboardLayout
