'use client';
import { signIn, signOut, useSession } from "next-auth/react";

const LoginPage = () => {
  const { data: session } = useSession();

  return (
    <div>
      {!session ? (
        <button onClick={() => signIn("google")}>구글로 로그인</button>
      ) : (
        <button onClick={() => signOut()}>로그아웃</button>
      )}
    </div>
  );
};

export default LoginPage;