// 예: pages/auth/signin.js
import { signIn, useSession } from "next-auth/react"

export default function SignIn() {
  const { data: session } = useSession()

  if(session) {
    return (
      <div>
        <p>이미 로그인 되었습니다.</p>
      </div>
    )
  }

  return (
    <div>
      <button onClick={() => signIn('google')}>Google로 로그인</button>
      {/* 다른 소셜 로그인 버튼을 추가할 수 있습니다. */}
    </div>
  )
}
