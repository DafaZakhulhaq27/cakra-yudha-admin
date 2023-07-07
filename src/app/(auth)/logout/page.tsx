'use client'

import LoadingMain from '@/components/loading'
import { signOut } from 'next-auth/react'
import { useEffect } from 'react'

export default function LogoutPage() {
  function cleanup() {
    window.localStorage.clear()
  }

  useEffect(() => {
    signOut({ callbackUrl: '/login' })
      .then(() => {
        cleanup()
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <div className="flex items-center justify-center w-screen h-screen ">
      <LoadingMain />
    </div>
  )
}
