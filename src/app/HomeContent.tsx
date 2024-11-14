'use client';

import Link from 'next/link'
import { useSession } from 'next-auth/react'

export default function HomeContent() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Welcome to T-LINK
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Connecting local missionaries with short-term missionaries worldwide
        </p>
        {!session ? (
          <Link
            href="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors"
          >
            Get Started
          </Link>
        ) : (
          <Link
            href="/main"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors"
          >
            Go to Links
          </Link>
        )}
      </div>
    </div>
  )
}
