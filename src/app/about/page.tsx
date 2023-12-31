//this file location: /src/app/about/page.tsx
// /src/app/about/page.tsx
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import FeatureList from './FeatureList';

export default function About() {
  const [showFutureFeatures, toggleFutureFeatures] = useState(false);

  const handleToggle = () => {
    toggleFutureFeatures(prev => !prev);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-8 bg-slate-400 bg-cover bg-no-repeat text-white">
      <div className="text-center max-w-xl">
        <h1 className="text-5xl mb-8 font-semibold mt-12">About T-LINK</h1>
        <p className="text-xl mb-6">
          {/* T-LINK는 지역 선교사님과 단기선교사들을 매칭하기 위한 플랫폼입니다. */}
          T-LINK is a platform for matching local missionaries with short-term missionaries.
        </p>
         {/* Center the image */}
         <div className="flex justify-center items-center">
        <Image
          src="/images/t-link-about.png" // 이미지 경로
          alt="About Image"
          width={500}
          height={500}
        />
        </div>
        <FeatureList
          // title="기능 소개"
          title="Features"
          features={[
            // '단체가입, 개인 가입 가능 (SNS 로그인 포함)',
            // '선교지 매칭'
            'Organizations and individuals can sign up (including social media logins) Mission Matching'
            // ...기타 기능들
          ]}
        />
         <div className="flex justify-center items-center">
         <Image
          src="/images/Links.png" // 이미지 경로
          alt="Links"
          width={500}
          height={500}
        />
        </div>
        <button
          className="mt-6 mb-6 text-xl bg-blue-600 text-white py-2 px-4 rounded"
          onClick={handleToggle}
        >
          {showFutureFeatures ? 'Hide Future Features' : 'Show Future Features'}
        </button>
        {showFutureFeatures && (
          <FeatureList
            // title="추후 공개 기능"
            title="Coming Soon"
            features={[
              // '단기 선교 프로그램 소개 페이지 제공',
              // '커뮤니티 및 블로그 기능 제공',
              'Provide an About page for your short-term mission program',
              'Provide community and blogging features'
              // ...기타 기능들
            ]}
          />
        )}
      </div>
    </div>
  );
}
