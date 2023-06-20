import { getServerSession } from 'next-auth/next'

import { authOptions } from '@/config/auth'

export async function getSession() {
  return getServerSession(authOptions)
}
