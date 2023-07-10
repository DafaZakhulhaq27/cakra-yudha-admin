import { ReactNode } from 'react'

export default function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <p className="text-4xl font-bold text-gray-900">Categories</p>
      {children}
    </>
  )
}
