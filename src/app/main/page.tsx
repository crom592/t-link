'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import data from '../mockData.json';  // JSON 파일의 경로를 수정해주세요.
type Post = {
  id: number;
  type: string;
  title: string;
  location: string;
  date: string;
  language: string;
  description: string;
  image: string;
  mapInfo: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
};

export default function MainPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Math.ceil(data.length / 5));
  const [visiblePosts, setVisiblePosts] = useState<Post[]>([]);


  useEffect(() => {
    const startIdx = (currentPage - 1) * 5;
    const endIdx = startIdx + 5;
    setVisiblePosts(data.slice(startIdx, endIdx));
  }, [currentPage]);


  return (
    <main className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-4">Main</h1>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
        {visiblePosts.map((post) => (
          <div key={post.id} className="border rounded-lg p-4 hover:bg-gray-100">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="mb-1"><strong>Type:</strong> {post.type}</p>
            <p className="mb-1"><strong>Location:</strong> {post.location}</p>
            <p className="mb-3"><strong>Date:</strong> {post.date}</p>
            <Link href={`/main/${post.id}`}>
              <p className="text-purple-500 hover:underline">Read more</p>
            </Link>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            className={`mr-2 px-3 py-1 border rounded ${idx + 1 === currentPage ? 'bg-purple-500 text-white' : 'bg-white text-purple-500'}`}
            onClick={() => setCurrentPage(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </main>
  );
}