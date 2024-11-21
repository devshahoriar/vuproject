import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { ReactElement } from 'react'
import { I18nProviderClient } from '@/locales/client'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: 'Fitzon',
  description:
    'Fitzon Gym: Premium fitness center offering workouts, training, and wellness.',
}

export default async function RootLayout({
  params,
  children,
}: {
  params: Promise<{ locale: string }>
  children: ReactElement
}) {
  const { locale } = await params

  return (
    <html lang={locale} suppressHydrationWarning>
      <I18nProviderClient locale={locale}>
        <body className={`antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </I18nProviderClient>
    </html>
  )
}
