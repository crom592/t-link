//app/main/page.tsx
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';


type Post = {
  id: number;
  type: string;
  title: string;
  country: string; // location -> country
  start_date: string; // date -> start_date
  language: string;
  description: string;
  image: string;
  latitude: number;  // mapInfo -> latitude
  longitude: number; // mapInfo -> longitude
  zoom: number;      // mapInfo -> zoom
  requestType: "missionaryRequest" | "shortTermRequest";
};

export default function MainPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [postData, setPostData] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [countPerPage, setCountPerPage] = useState(6);  // <-- 여기에 countPerPage를 선언하고 초기값을 설정
  const [totalPages, setTotalPages] = useState(Math.ceil(postData.length / countPerPage));
  const [totalItems, setTotalItems] = useState(0);
  const [visiblePosts, setVisiblePosts] = useState<Post[]>([]);
  // const [requestType, setRequestType] = useState<"missionaryRequest" | "shortTermRequest">("missionaryRequest");
  // 초기 requestType을 null로 설정합니다.
  const [requestType, setRequestType] = useState<"missionaryRequest" | "shortTermRequest" | null>(null);
  const [searchTerm, setSearchTerm] = useState(''); // 검색어를 저장하는 state
  const fetchPosts = () => {
    const startTime = performance.now();  // Start time
  
    console.log(`Fetching data for page: ${currentPage}`);
  
    // 검색어가 있다면 API URL에 추가
    const searchQuery = searchTerm ? `&search=${searchTerm}` : '';
  
    fetch(`${apiUrl}/api-job/posting/?count_per_page=${countPerPage}&order_by=id&page=${currentPage}${searchQuery}`)
      .then(response => response.json())
      .then(data => {
        const endTime = performance.now();  // End time
        const timeTaken = endTime - startTime;  // Time taken in milliseconds
  
        console.log(`Time taken for fetch: ${timeTaken} ms`);
  
        setPostData(data.items);
        setTotalPages(data.total_page);
        setTotalItems(data.total);
      })
      .catch(error => {
        console.error("Failed to fetch data: ", error);
      });
  };
  
  
  useEffect(() => {
    const startTime = performance.now();  // Start time
  
    console.log(`Fetching data for page: ${currentPage}`);
    
    fetch(`${apiUrl}/api-job/posting/?count_per_page=${countPerPage}&order_by=id&page=${currentPage}`)
      .then(response => response.json())
      .then(data => {
        const endTime = performance.now();  // End time
        const timeTaken = endTime - startTime;  // Time taken in milliseconds
        
        console.log(`Time taken for fetch: ${timeTaken} ms`);
  
        // ... rest of your code
        setPostData(data.items);
        setTotalPages(data.total_page);
        setTotalItems(data.total);
      }).catch(error => {
        console.error("Failed to fetch data: ", error);
      });
  }, [currentPage, countPerPage]);
  

  
  
  
    useEffect(() => {
      // 상태 변수의 현재 값을 출력
      console.log('Current State:', {
        postData,
        currentPage,
        requestType,
        searchTerm,
        countPerPage,
        totalPages
      });
    let filteredPosts = postData;

    // 만약 requestType이 설정되어 있다면 필터링을 적용합니다.
    if (requestType) {
      filteredPosts = postData.filter(post => post.requestType === requestType);
    }

    // Apply search term filter
    if (searchTerm) {
      filteredPosts = filteredPosts.filter(post => post.title.includes(searchTerm));
    }

    // Update total pages
    // const newTotalPages = Math.ceil(filteredPosts.length / countPerPage); // 수정된 부분
    // if (newTotalPages !== totalPages) {
    //   setTotalPages(newTotalPages);
    // }

    // Handle pagination
    const startIdx = (currentPage - 1) * countPerPage; // 수정된 부분
    const endIdx = startIdx + countPerPage; // 수정된 부분
    setVisiblePosts(postData);
    console.log("startIdx : " + startIdx);
    console.log("endIdx : " + endIdx);
    // 필터링과 페이지네이션을 적용한 후의 포스트 배열을 출력
    console.log('Filtered and Paginated Posts:', filteredPosts.slice(startIdx, endIdx));

  }, [postData]);
  

  


return (
  <section className="py-32 bg-slate-300">
    <div className="max-w-screen-xl mx-auto px-4 md:px-2">
      <div className="space-y-5 sm:text-center sm:max-w-md sm:mx-auto">
        <h1 className="text-gray-600 text-3xl font-extrabold sm:text-4xl">LINKS</h1>
        <p className="text-gray-700">"Explore the transformative journey of missionary work and discover the diverse landscapes of mission fields around the world."</p>
        
        <div className="flex justify-center mb-4 flex text-black">
          <input 
            type="text" 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} 
            placeholder="Search..." 
            className="border p-2 rounded mr-2" 
          />
          {/* <button className="text-xl font-semibold border-2 border-white px-4 py-2 mr-3 hover:bg-white hover:text-black transition-colors" onClick={() => setCurrentPage(1)}>Search</button> */}
          <button 
            className="text-xl font-semibold border-2 border-white px-4 py-2 mr-3 hover:bg-white hover:text-black transition-colors" 
            onClick={() => {
              setCurrentPage(1);  // 페이지를 1로 초기화
              fetchPosts();  // API 호출 함수
            }}
          >
            Search
          </button>
          <select onChange={e => setRequestType(e.target.value as any)} className="border p-2 rounded mr-2">
          <option value={undefined}>All</option>
          <option value="missionaryRequest">선교지</option>
          <option value="shortTermRequest">단기 선교사</option>
        </select>
        </div>
         {/* "글 작성하기" 버튼 추가 */}
         <div className="flex justify-center mb-4">
          <Link href="/create">
            <p className="text-2xl font-semibold border-2 border-white px-4 py-2 hover:bg-white hover:text-black transition-colors">
              글 작성하기
            </p>
          </Link>
        </div>
        
        {/* <div className="flex justify-center mb-4 flex text-gray-300">
        <button className="text-2xl font-semibold border-2 border-white px-4 py-2 hover:bg-white hover:text-black transition-colors" onClick={() => setRequestType("missionaryRequest")}>선교지</button>
        <button className="text-2xl font-semibold border-2 border-white px-4 py-2 hover:bg-white hover:text-black transition-colors" onClick={() => setRequestType("shortTermRequest")}>단기 선교사</button>
        </div> */}
      </div>

      <ul className="grid gap-x-8 gap-y-10 mt-16 sm:grid-cols-2 lg:grid-cols-3">
        {visiblePosts.map((post, key) => (
          <li key={post.id} className="w-full mx-auto group sm:max-w-sm">
            <Link href={`/main/${post.id}`}>
              <div style={{ position: 'relative', width: '100%', height: '400px' }}>
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    fill={true}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="rounded-lg"
                    priority={true}
                  />
                </div>
                <div className="mt-3 space-y-2">
                  <span className="block text-indigo-600 text-sm">{post.start_date}</span>
                  <h3 className="text-lg text-gray-800 duration-150 group-hover:text-indigo-600 font-semibold">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm duration-150 group-hover:text-gray-800">{post.description}</p>
                </div>
            </Link>
          </li>
        ))}
      </ul>

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
    </div>
  </section>
);
}
