'use client'

import ButtonMain from '@/components/forms/button'

export default function Error() {
  return (
    <div className="flex items-center justify-center flex-col h-screen w-screen">
      <p className="text-4xl font-bold">Something Wrong</p>
      <p className="my-3 font-extralight text-gray-900">Click Refresh</p>
      <ButtonMain
        onClick={() =>
          typeof window !== 'undefined' && window.location.reload()
        }
      >
        Refresh
      </ButtonMain>
    </div>
  )
}
