/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.unsplash.com','www.dorim.net'],
      },
    async rewrites() {
      return [
        {
          // 클라이언트에서 이 URL로 요청을 보냅니다.
          source: '/api-:path*',
          // 실제 요청이 전달될 서버의 URL입니다.
          destination: process.env.NEXT_PUBLIC_API_URL+'/api-:path*',
        },
      ];
    },
  };
  
  module.exports = nextConfig;
  