import { ReactNode } from 'react'

export default function LayoutPage({
  children,
  name,
}: {
  children: ReactNode
  name: string
}) {
  return (
    <>
      <p className="text-4xl font-bold text-gray-900">{name}</p>
      {children}
    </>
  )
}
