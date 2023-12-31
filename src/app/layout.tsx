//app/layout.tsx
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

      <body className={`${inter.className} relative`}> 
      <div className="relative min-h-screen font-inter bg-none">
      <nav className="absolute top-0 left-0 w-full bg-opacity-50 p-4 text-center text-white z-10">
          <Link className="mx-2 font-semibold no-underline" href="/">
            Home
          </Link>
          <Link className="mx-2 font-semibold no-underline" href="/about">
            About
          </Link>
          <Link className="mx-2 font-semibold no-underline" href="/main">
            Links
          </Link>
          <Link className="mx-2 font-semibold no-underline" href="/auth">
            Login/Sign Up
          </Link>
        </nav>
        {children}
        <footer className="relative bottom-0 left-0 w-full bg-opacity-0 flex justify-between items-center text-sm mt-4 p-4 z-10">
          <p>대표자 : 김원열 | 사업자등록번호 : 123-45-67890</p>
          <p>Copyright ⓒ 2023 T-LINK All Rights Reserved</p>
        </footer>
        </div>
      </body>
    </html>
  );
}
