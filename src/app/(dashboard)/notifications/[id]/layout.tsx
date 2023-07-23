import { ReactNode } from 'react'

export default function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <p className="text-4xl font-bold text-gray-900 mb-4">Edit Notification</p>
      <div className="w-full lg:w-1/2 "> {children}</div>
    </>
  )
}
