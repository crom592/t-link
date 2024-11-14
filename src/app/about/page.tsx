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
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            About T-LINK
          </h1>
          <p className="text-xl mb-12 text-white/80">
            T-LINK is a platform for matching local missionaries with short-term missionaries.
          </p>
        </div>

        <div className="mb-16">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10"></div>
            <Image
              src="/images/t-link-about.png"
              alt="About Image"
              width={800}
              height={400}
              className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        <div className="mb-16">
          <FeatureList
            title="Features"
            features={[
              'Organizations and individuals can sign up (including social media logins)',
              'Mission field matching system',
              'Real-time communication',
              'Resource sharing platform'
            ]}
          />
        </div>

        <div className="mb-16">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10"></div>
            <Image
              src="/images/Links.png"
              alt="Links"
              width={800}
              height={400}
              className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleToggle}
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-400 hover:via-purple-400 hover:to-indigo-400 text-white px-8 py-3 rounded-lg text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {showFutureFeatures ? 'Hide Future Features' : 'Show Future Features'}
          </button>
        </div>

        {showFutureFeatures && (
          <FeatureList
            title="Coming Soon"
            features={[
              'Provide an About page for your short-term mission program',
              'Provide community and blogging features'
            ]}
          />
        )}
      </div>
    </div>
  );
}
