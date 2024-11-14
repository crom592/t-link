'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import FeatureList from './FeatureList';

export default function AboutContent() {
  const [showFutureFeatures, toggleFutureFeatures] = useState(false);

  const handleToggle = () => {
    toggleFutureFeatures(prev => !prev);
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8 text-gray-900">
            About T-LINK
          </h1>
          <p className="text-xl mb-12 text-gray-600">
            T-LINK connects local missionaries with short-term missionaries worldwide.
          </p>
        </div>

        <div className="mb-16">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <Image
              src="/images/mission-connection.svg"
              alt="Mission Connection"
              width={800}
              height={400}
              className="w-full h-auto"
            />
          </div>
        </div>

        <div className="mb-16">
          <FeatureList
            title="Key Features"
            features={[
              'Simple sign-up process for organizations and individuals',
              'Smart mission field matching system',
              'Real-time communication platform',
              'Resource sharing and collaboration tools'
            ]}
          />
        </div>

        <div className="mb-16">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <Image
              src="/images/mission-workflow.svg"
              alt="Mission Workflow"
              width={800}
              height={400}
              className="w-full h-auto"
            />
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleToggle}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors"
          >
            {showFutureFeatures ? 'Hide Future Features' : 'Show Future Features'}
          </button>

          {showFutureFeatures && (
            <FeatureList
              title="Coming Soon"
              features={[
                'Interactive mission program showcase',
                'Community forums and blogs',
                'Resource library and training materials',
                'Mobile application for on-the-go access'
              ]}
            />
          )}
        </div>
      </div>
    </div>
  );
}
