//app/layout.tsx

import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import LayoutContent from './LayoutContent'

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} relative min-h-screen bg-white text-gray-900`}>
        <Providers>
          <LayoutContent />
          <main className="flex-grow">
            {children}
          </main>
          <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="text-sm text-gray-600">
                  대표자 : 김원열 | 사업자등록번호 : 123-45-67890
                </div>
                <div className="text-sm text-gray-600">
                  Copyright ⓒ 2023 T-LINK All Rights Reserved
                </div>
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  )
}
