import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/main">
      <h1 className="text-6xl font-bold">
      Welcome to T-LINK.
      </h1>
        <Image src="/sky.avif" alt="t-link" width={500} height={500}/> 
      </Link>

    </main>
  );
}
