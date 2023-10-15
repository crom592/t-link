// src/app/create/page.tsx
'use client'; // 이 부분을 추가
import React, { useState ,ChangeEvent } from 'react';

export default function CreatePage() {
  const [formData, setFormData] = useState({
    id: '', // 새로운 id를 설정
    type: '',
    title: '',
    location: '',
    date: '',
    language: '',
    description: '',
    image: '',
    latitude: '',
    longitude: '',
    zoom: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAsyncSubmit();
  };
  
  const handleAsyncSubmit = async () => {
    const res = await fetch('/app/api/addToMockData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
  
    if (res.ok) {
      console.log('Data added:', formData);
    } else {
      console.log('Error:', res.status);
    }
  };
  

  return (
    <main className="container mx-auto flex flex-col justify-center items-center min-h-screen p-8 bg-white w-full">
      <h1 className="text-3xl font-bold mb-4">글 작성하기</h1>    

      <form className="w-full md:w-3/4" onSubmit={handleSubmit}>
        <input 
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="제목"
          className="border p-2 rounded mb-4 w-full"
        />

        <select name="type" value={formData.type} onChange={handleChange} className="border p-2 rounded mb-4 w-full">
          <option value="Looking for Missionary">선교사 요청</option>
          <option value="단기선교 지원자 찾기">단기 선교사 요청</option>
        </select>

        {/* 이후 다른 필드들도 추가 */}
        <input 
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="위치"
          className="border p-2 rounded mb-4 w-full"
        />
        
        <input 
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          placeholder="날짜"
          className="border p-2 rounded mb-4 w-full"
        />

        <input 
          type="text"
          name="language"
          value={formData.language}
          onChange={handleChange}
          placeholder="언어"
          className="border p-2 rounded mb-4 w-full"
        />
        
        <textarea 
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="설명"
          className="border p-2 rounded mb-4 w-full"
        ></textarea>

        {/* 이미지 URL과 지도 정보 등도 추가할 수 있습니다. */}

        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full mt-4">글 작성하기</button>
      </form>
    </main>
  );
}
