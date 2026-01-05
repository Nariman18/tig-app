import React from 'react'
import '../global.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import Header from '@/components/header'

import Footer from '@/components/footer'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/providers/queryClient'
import Script from 'next/script'

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
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17853996387"
          strategy="afterInteractive"
        />

        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17853996387');
          `}
        </Script>
      </head>
      <body>
        <main>
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
