import React from 'react'
import '../global.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import Header from '@/components/header'

import Footer from '@/components/footer'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/providers/queryClient'

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
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body>
        <main className="bg-black">
          <ThemeProvider>
            {' '}
            <Header />
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
            <Footer />
          </ThemeProvider>
        </main>
      </body>
    </html>
  )
}
