"use client";
import dynamic from 'next/dynamic';

const DynamicCreatePage = dynamic(() => import('./CreatePageComponent'), {
  ssr: false,
});

export default function CreatePage() {
  return <DynamicCreatePage />;
}
