// app/main/[id]/page.tsx

import { useRouter } from 'next/navigation';
import data from '../../mockData.json'; // Adjust the path accordingly based on your folder structure

export default function DetailPage({ params }: { params: { id: string } }) {
  const postId = params.id;

  // Find the corresponding post based on the postId
  const post = data.find(p => p.id === Number(postId));

  // If the post doesn't exist, display a not found message
  if (!post) return <p>게시물을 찾을 수 없습니다.</p>;

  return (
    <div className="container mx-auto py-6 px-4 flex flex-col justify-center items-center min-h-screen p-8 bg-white">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <img src={post.image} alt={post.title} className="w-full mb-4 rounded-md shadow-lg" />
      <p><strong>Type:</strong> {post.type}</p>
      <p><strong>Location:</strong> {post.location}</p>
      <p><strong>Date:</strong> {post.date}</p>
      <p className="mt-4">{post.description}</p>

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">Location on Map:</h2>
        <iframe
          width="100%"
          height="400"
          frameBorder="0" 
          scrolling="no" 
          marginHeight={0}
          marginWidth={0}
          src={`https://maps.google.com/maps?q=${post.mapInfo?.latitude},${post.mapInfo?.longitude}&z=${post.mapInfo?.zoom}&output=embed`}
          title={`Map of ${post.location}`}>
        </iframe>
      </div>
    </div>
  );
}