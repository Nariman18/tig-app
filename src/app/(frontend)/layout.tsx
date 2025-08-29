import React from 'react'
import '../global.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import Header from '@/components/header'

export const metadata = {
  description:
    'A marketing agency that connects brands with the right influencers to create meaningful and effective campaigns. With over 50 ad integrations every day, we combine smart targeting, creative ideas, and smooth execution to boost brand visibility and engagement.',
  title: 'Trend Influence Group',
  icons: {
    icon: 'IMG_3359.png',
  },
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
