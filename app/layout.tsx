import type { Metadata } from 'next'
import { Fredoka, Baloo_2 } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { GameProvider } from '@/context/GameContext'

const _fredoka = Fredoka({ subsets: ["latin"], variable: "--font-fredoka" });
const _baloo2 = Baloo_2({ subsets: ["latin"], variable: "--font-baloo2" });

export const metadata: Metadata = {
  title: 'Pejuang Bangsa Indonesia - Game Kuis Edukasi',
  description:
    'Game kuis edukasi interaktif tentang pahlawan Indonesia. SNEMA Melesat - Melaju, Berprestasi, Hebat!',
  generator: 'khaisazumma',
  icons: {
    icon: '/logo-sekolah.png', 
    apple: '/logo-sekolah.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className={`${_fredoka.variable} ${_baloo2.variable}`}>
      <body className="font-fredoka antialiased overflow-x-hidden">
        <GameProvider>
          {children}
        </GameProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
