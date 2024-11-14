import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export async function GET(request: NextRequest) {
  const authOptions = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID || "",
        clientSecret: process.env.GOOGLE_SECRET || "",
      }),
    ],
    pages: {
      signIn: '/auth/signin',
    },
  };

  const response = await NextAuth(authOptions);
  return NextResponse.json(response);
}
