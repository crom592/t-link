//app/page.tsx
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="relative min-h-[calc(100vh-64px)] flex items-center justify-center">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-[url('/images/sky.avif')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <h1 className="text-5xl sm:text-6xl font-bold">
            <span className="block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
              Welcome to T-LINK
            </span>
            <span className="block text-3xl sm:text-4xl text-gray-300 mt-4">
              For the One Who Will Use You
            </span>
          </h1>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Connect, share, and discover meaningful links in a beautiful space designed just for you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Link href="/main" 
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg 
                           hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200 
                           shadow-lg hover:shadow-xl">
              Get Started
            </Link>
            <Link href="/about" 
                  className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg
                           hover:bg-white/20 transform hover:scale-105 transition-all duration-200 
                           shadow-lg hover:shadow-xl border border-white/20">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
