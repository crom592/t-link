//app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'T-LINK',
  description: '당신을 사용하실 그 분을 위하여',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white`}>
        <div className="relative min-h-screen flex flex-col">
          <nav className="sticky top-0 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 shadow-lg z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <Link href="/" className="flex items-center">
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                      T-LINK
                    </span>
                  </Link>
                </div>
                <div className="flex items-center space-x-4">
                  <Link href="/about" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors">
                    About
                  </Link>
                  <Link href="/main" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors">
                    Links
                  </Link>
                  <Link href="/auth" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors">
                    Login
                  </Link>
                  <a href="/api/auth/signin/google" 
                     className="bg-white text-gray-900 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors">
                    Sign in with Google
                  </a>
                </div>
              </div>
            </div>
          </nav>

          <main className="flex-grow">
            {children}
          </main>

          <footer className="bg-gray-900/95 border-t border-gray-800 py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="text-sm text-gray-400">
                  대표자 : 김원열 | 사업자등록번호 : 123-45-67890
                </div>
                <div className="text-sm text-gray-400">
                  Copyright ⓒ 2023 T-LINK All Rights Reserved
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
