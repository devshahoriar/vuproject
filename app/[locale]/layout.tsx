import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { ReactElement } from 'react'
import { I18nProviderClient } from '@/locales/client'
import { Toaster } from 'sonner'
import NextTopLoader from 'nextjs-toploader'
import { Poppins, Hind_Siliguri } from 'next/font/google'

export const metadata: Metadata = {
  title: 'Fitzon',
  description:
    'Fitzon Gym: Premium fitness center offering workouts, training, and wellness.',
}

const pop = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin-ext'],
})

const hind = Hind_Siliguri({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['bengali'],
})

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
        <body className={`antialiased ${pop.className} ${hind.className}`}>
          <NextTopLoader showSpinner={false} color="#b91c1c" />
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
