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
  requestType: "missionaryRequest" | "shortTermRequest";
};
const postData: Post[] = (data as unknown) as Post[];

export default function MainPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Math.ceil(postData.length / 5));
  const [visiblePosts, setVisiblePosts] = useState<Post[]>([]);
  const [requestType, setRequestType] = useState<"missionaryRequest" | "shortTermRequest">("missionaryRequest");
  const [searchTerm, setSearchTerm] = useState(''); // 검색어를 저장하는 state

  // 검색어에 따른 필터링을 처리하는 useEffect
  useEffect(() => {
    let filteredPosts = postData.filter((post): post is Post => 'id' in post && typeof post.id === 'number' && 'title' in post && typeof post.title === 'string');
    
    if (searchTerm) {
      filteredPosts = filteredPosts.filter(post => post.title && post.title.includes(searchTerm));
    }
    
    setTotalPages(Math.ceil(filteredPosts.length / 5));
    const startIdx = (currentPage - 1) * 5;
    const endIdx = startIdx + 5;
    setVisiblePosts(filteredPosts.slice(startIdx, endIdx));
  }, [currentPage, requestType, searchTerm]);

useEffect(() => {
  const filteredPosts = postData.filter((post): post is Post => post.requestType === requestType);
  setTotalPages(Math.ceil(filteredPosts.length / 5));
  const startIdx = (currentPage - 1) * 5;
  const endIdx = startIdx + 5;
  setVisiblePosts(filteredPosts.slice(startIdx, endIdx));
}, [currentPage, requestType]);

  useEffect(() => {
    const startIdx = (currentPage - 1) * 5;
    const endIdx = startIdx + 5;
    setVisiblePosts(postData.slice(startIdx, endIdx));
  }, [currentPage]);

  return (
    <main className="container mx-auto flex flex-col justify-center items-center min-h-screen p-8 bg-white w-full">
      <h1 className="text-3xl font-bold mb-4">LINKS</h1>    
      {/* 검색 입력 필드와 검색 버튼 */}
      <div className="mb-4 flex">
        <input 
          type="text" 
          value={searchTerm} 
          onChange={e => setSearchTerm(e.target.value)} 
          placeholder="Search..." 
          className="border p-2 rounded mr-2" 
        />
        <button onClick={() => setCurrentPage(1)}>Search</button>
      </div>

      <button onClick={() => setRequestType("missionaryRequest")}>선교사 요청</button>
      <button onClick={() => setRequestType("shortTermRequest")}>단기선교사 요청</button>
      <Link href="/create">  {/* 글 작성 페이지로 이동하는 링크 */}
        <button className="ml-4">글 등록하기</button>
      </Link>
      <div className="grid grid-cols-1 gap-4 w-full md:w-3/4 lg:grid-cols-2 lg:gap-8">
        {visiblePosts.map((post) => (
          <div key={post.id} className="border rounded-lg p-4 hover:bg-gray-100 flex justify-between">
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="mb-1"><strong>Type:</strong> {post.type}</p>
              <p className="mb-1"><strong>Location:</strong> {post.location}</p>
              <p className="mb-3"><strong>Date:</strong> {post.date}</p>
              <Link href={`/main/${post.id}`}>
                <p className="text-purple-500 hover:underline">Read more</p>
              </Link>
            </div>
            <img src={post.image} alt={post.title} className="w-1/4 ml-4 rounded" />
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
