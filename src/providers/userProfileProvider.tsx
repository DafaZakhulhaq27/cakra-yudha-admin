'use client'

import { UserProfile } from '@/app/(auth)/login/Models'
import { UserContext } from '@/context/user'
import { ReactNode, useMemo, useState } from 'react'

interface Props {
  user: UserProfile | null
  children: ReactNode
}

export default function UserProfileProvider({ user, children }: Props) {
  const [currentUser] = useState(user)
  const providerValue = useMemo(
    () => ({
      currentUser,
    }),
    [currentUser],
  )

  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  )
}
