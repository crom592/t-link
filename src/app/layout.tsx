//app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'T-LINK',
  description: '당신을 사용하실 그 분을 위하여',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} relative min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 text-white`}>
        <Providers>
          <div className="relative min-h-screen flex flex-col">
            <nav className="sticky top-0 bg-black/30 backdrop-blur-md border-b border-white/10 shadow-lg z-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                  <div className="flex items-center">
                    <Link href="/" className="flex items-center">
                      <span className="text-xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent hover:from-pink-400 hover:via-purple-400 hover:to-indigo-400 transition-all">
                        T-LINK
                      </span>
                    </Link>
                  </div>
                  <div className="flex items-center space-x-6">
                    <Link href="/about" className="px-3 py-2 rounded-md text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all">
                      About
                    </Link>
                    <Link href="/main" className="px-3 py-2 rounded-md text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all">
                      Links
                    </Link>
                    <a href="/api/auth/signin/google" 
                       className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-400 hover:via-purple-400 hover:to-indigo-400 text-white px-6 py-2 rounded-md text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl">
                      Sign in with Google
                    </a>
                  </div>
                </div>
              </div>
            </nav>

            <main className="flex-grow">
              {children}
            </main>

            <footer className="bg-black/30 backdrop-blur-md border-t border-white/10 py-8 mt-auto">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                  <div className="text-sm text-white/60">
                    대표자 : 김원열 | 사업자등록번호 : 123-45-67890
                  </div>
                  <div className="text-sm text-white/60">
                    Copyright ⓒ 2023 T-LINK All Rights Reserved
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  )
}
