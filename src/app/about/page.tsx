import Link from 'next/link'

export default function About() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-8 bg-white">
      <div className="text-center max-w-xl">
        <h1 className="text-5xl mb-8 font-semibold">About 티 링크(가칭) 시스템</h1>
        <p className="text-xl mb-6">
          티 링크 시스템은 지역 선교사님과 단기선교사들을 매칭하기 위한 플랫폼입니다.
        </p>
        <h2 className="text-4xl mt-6 mb-6 font-semibold">기능 소개</h2>
        <ul className="list-none pl-8 text-xl">
          <li>단체가입, 개인 가입 가능 (SNS 로그인 포함)</li>
          <li>회원 레벨 관리</li>
          <li>단기 선교사 및 선교사 이력 등록</li>
          <li>단기 선교 요청 및 선교사 찾기 등록</li>
          <li>소통은 채팅방에서 (자동 통역 기능 포함)</li>
          <li>검색 시 지도 기반으로 지역별 검색 가능</li>
          {/* 추가로 필요한 기능들을 이곳에 나열할 수 있습니다. */}
        </ul>
        <h2 className="text-4xl mt-6 mb-6 font-semibold">추후 공개 기능</h2>
        <ul className="list-none pl-8 text-xl">
          <li>단기 선교 프로그램 소개 페이지 제공</li>
          <li>커뮤니티 및 블로그 기능 제공</li>
          {/* 추가로 필요한 기능들을 이곳에 나열할 수 있습니다. */}
        </ul>
        <div className="mt-10">
          <Link href="/">
            <p className="text-blue-600 hover:underline text-xl">Go back to Home</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
