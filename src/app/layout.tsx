// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'T-LINK',
  description: '당신을 사용하실 그 분을 위하여',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-gray-200 p-4 text-center">
          <Link className="mx-2 font-semibold text-black no-underline" href="/">
            Home
          </Link>
          <Link className="mx-2 font-semibold text-black no-underline" href="/auth">
            Login/Sign Up
          </Link>
          {/* Additional navigation items */}
        </nav>
        {children}
         {/* Footer Section */}
         <footer className="bg-gray-300 mt-8 p-4 text-center">
          <p>대표자 : 김원열 | 사업자등록번호 : 123-45-67890</p>
          <p>Copyright ⓒ 2023 Juice All Rights Reserved</p>
        </footer>
      </body>
    </html>
  );
}


