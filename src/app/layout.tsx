import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { BRAND_NAME } from '@/lib/config'
import { Providers } from '@/components/providers'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: {
    default: `${BRAND_NAME} — Desarrollador de Software`,
    template: `%s | ${BRAND_NAME}`,
  },
  description: 'Portafolio de proyectos: Android, Java Spring Boot, Python Odoo, React, FastAPI, .NET. Basado en Lima, Perú.',
  keywords: ['developer', 'portfolio', 'android', 'python', 'react', 'fastapi', 'odoo', 'aws'],
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    siteName: BRAND_NAME,
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-(--bg-primary) text-(--text-primary) antialiased min-h-screen flex flex-col font-sans">
        <Providers>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
