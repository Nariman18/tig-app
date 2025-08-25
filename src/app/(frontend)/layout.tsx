import React from 'react'
import '../global.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import Header from '@/components/header'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <main>
          <ThemeProvider>
            <section className="relative w-full flex">
              {' '}
              <Header />
            </section>

            {children}
          </ThemeProvider>
        </main>
      </body>
    </html>
  )
}
