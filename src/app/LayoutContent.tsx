'use client';

import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'

export default function LayoutContent() {
  const { data: session } = useSession();

  const handleSignIn = () => {
    signIn('google', { callbackUrl: '/' });
  };

  return (
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
    </div>
  );
}
