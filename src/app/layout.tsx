//app/layout.tsx
'use client';

import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { Providers } from './providers'
import { signIn, useSession } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  const handleSignIn = () => {
    signIn('google', { callbackUrl: '/' });
  };

  return (
    <html lang="en">
      <body className={`${inter.className} relative min-h-screen bg-white text-gray-900`}>
        <Providers>
          <div className="relative min-h-screen flex flex-col">
            <nav className="sticky top-0 bg-white border-b border-gray-200 z-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                  <div className="flex items-center">
                    <Link href="/" className="flex items-center">
                      <span className="text-xl font-bold text-blue-600">
                        T-LINK
                      </span>
                    </Link>
                  </div>
                  <div className="flex items-center space-x-6">
                    <Link href="/about" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all">
                      About
                    </Link>
                    <Link href="/main" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all">
                      Links
                    </Link>
                    {!session ? (
                      <button
                        onClick={handleSignIn}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium transition-all"
                      >
                        Sign in with Google
                      </button>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <img src={session.user?.image || ''} alt="Profile" className="w-8 h-8 rounded-full" />
                        <span className="text-sm font-medium text-gray-700">{session.user?.name}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </nav>

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
          </div>
        </Providers>
      </body>
    </html>
  )
}
