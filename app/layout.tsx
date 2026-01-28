import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import CosmicBadge from '@/components/CosmicBadge'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Temitope Glover - Full-Stack Developer Portfolio',
  description: 'Premium 3D animated portfolio showcasing full-stack development projects, skills, and experience. Built with Next.js, React Three Fiber, and Cosmic CMS.',
  keywords: ['portfolio', 'full-stack developer', 'react', 'next.js', '3D animation', 'web development'],
  openGraph: {
    title: 'Temitope Glover - Full-Stack Developer',
    description: 'Premium 3D animated portfolio showcasing full-stack development projects, skills, and experience.',
    url: 'https://your-deployed-site.com',
    siteName: 'Temitope Glover Portfolio',
    images: [
      {
        url: 'https://your-deployed-site.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Temitope Glover Portfolio Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Temitope Glover - Full-Stack Developer',
    description: 'Premium 3D animated portfolio showcasing full-stack development projects, skills, and experience.',
    images: ['https://your-deployed-site.com/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script src="/dashboard-console-capture.js" />
      </head>
      <body className={inter.className}>
        {children}
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}