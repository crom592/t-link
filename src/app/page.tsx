//app/page.tsx
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    // <main className="flex min-h-[calc(100vh-64px)] flex-col items-start justify-center p-24 bg-cover" style={{backgroundImage: 'url(/images/sky.avif)'}}>
    <main className="flex min-h-[calc(100vh-64px)] flex-col items-start justify-center p-24 bg-cover">
      <Link href="/main">
        <div className="flex flex-col items-start justify-center mb-4">
          <h1 className="text-3xl font-bold text-white mb-4">
            <p>
              Welcome to T-LINK
            </p>
            <p>For the One Who Will Use You</p>
          </h1>
        </div>
      </Link>
      <Link href="/about">
        <button className="text-2xl font-semibold border-2 border-white px-4 py-2 hover:bg-white hover:text-black transition-colors">
          About
        </button>
      </Link>
    </main>
  );
}
