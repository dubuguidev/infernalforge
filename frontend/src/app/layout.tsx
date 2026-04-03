import type { Metadata } from 'next'
import { Cinzel, Crimson_Text } from 'next/font/google'
import Providers from '@/components/Providers'
import Navbar from '@/components/Navbar'
import './globals.css'

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-cinzel',
  display: 'swap',
})

const crimson = Crimson_Text({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-crimson',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Forja Infernal — Ímpio',
  description: 'Crie, visualize e gerencie seus personagens de RPG com temática infernal',
  icons: {
    icon: '/original-sin.png',
    apple: '/original-sin.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${cinzel.variable} ${crimson.variable}`}>
      <body>
        <Providers>
          <Navbar />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 page-enter">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
