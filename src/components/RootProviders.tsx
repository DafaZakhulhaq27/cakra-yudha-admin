'use client'

import customTheme from '@/config/theme'
import { Flowbite } from 'flowbite-react'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  session: Session | null
}

const RootProviders = ({ children, session }: Props) => {
  return (
    <SessionProvider session={session}>
      <Flowbite theme={{ theme: customTheme }}>{children}</Flowbite>
    </SessionProvider>
  )
}

export default RootProviders
