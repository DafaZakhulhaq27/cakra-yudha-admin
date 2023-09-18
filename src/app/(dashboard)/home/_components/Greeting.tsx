'use client'

import { useUserContext } from '@/hooks/context'

export default function Greeting() {
  const { currentUser } = useUserContext()

  return (
    <h2 className="text-4xl font-extrabold dark:text-white">
      Hi {currentUser?.first_name},
    </h2>
  )
}
