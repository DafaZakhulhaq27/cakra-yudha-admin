import RootProviders from '@/components/RootProviders'
import { getSession } from 'next-auth/react'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Cakra Yudha',
  description: 'Admin for Cakra Yudha App',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()

  return (
    <html lang="en">
      <body className={inter.className}>
        <RootProviders session={session}>{children}</RootProviders>
        <Toaster />
      </body>
      {/* Still bug when running router.refresh() */}
      {/* <Script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js" /> */}
    </html>
  )
}
