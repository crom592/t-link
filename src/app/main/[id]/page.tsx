// app/main/[id]/page.tsx
'use client';
import { Route } from 'next';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import Image from 'next/image';
import Script from 'next/script'

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
// declare global {
//   interface Window {
//     kakao: any;
//   }
const containerStyle = {
  width: '400px',
  height: '400px'
};
export default function DetailPage({ params }: { params: { id: string } }) {
  const postId = params.id;
  const [post, setPostData] = useState<Post | null>(null);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY || ''
  })
  const center = {
    lat: post?.latitude || -3.745,
    lng: post?.longitude || -38.523
  };
  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map:any) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map:any) {
    setMap(null)
  }, [])
  useEffect(() => {
    if (postId) {
      fetch(`${apiUrl}/api-job/posting/${postId}`)
        .then(response => response.json())
        .then(data => setPostData(data))
        .catch(error => {
          console.error("Failed to fetch post data: ", error);
        });
    }
  }, [postId]);
  if (!post) return <p>게시물을 찾을 수 없습니다.</p>;
  return (
    <div className="container mx-auto py-6 px-4 flex flex-col justify-center items-center min-h-screen p-8 bg-slate-300">
      <h1 className="text-3xl font-bold mb-4 mt-10">{post.title}</h1>
      <div style={{ position: 'relative', width: '50%', height: '400px' }}>
      <Image 
        src={post.image} 
        alt={post.title} 
        fill={true}
        className="rounded-md"
        priority={true}
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
      />
    </div>
      <p><strong>Type:</strong> {post.type}</p>
      <p><strong>Location:</strong> {post.country}</p>
      <p><strong>Start Date:</strong> {post.start_date}</p>
      <p className="mt-4">{post.description}</p>

      {/* <div className="mt-6 w-full">
        <h2 className="text-xl font-bold mb-2">Location on Map:</h2>
        <Map
          latitude={post.latitude}
          longitude={post.longitude}
          zoom={post.zoom}
          country={post.country}
        />
      </div> */}
      {/* <div className="mt-6 w-full">
      <div className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh]">
        <h2 className="text-xl font-bold mb-2">Location on Map:</h2>
        <div id="map" style={{ width: "100%", height: "100%" }}></div>
      </div>
      </div> */}
      <div className="mt-6 w-full flex flex-col justify-center items-center">
      <h2 className="text-xl font-bold mb-2">Location on Map:</h2>
      <div style={{ width: "400px", height: "400px" }} className="flex justify-center items-center">
        {isLoaded ? (
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={post.zoom} onLoad={onLoad} onUnmount={onUnmount}>
            {/* You can put markers, info windows, etc. as child components here */}
          </GoogleMap>
        ) : (
          <p>Loading map...</p>
        )}
      </div>
    </div>

    </div>
  );
}
