// app/auth/login/page.tsx
import { useEffect } from 'react';
// Declare type for 'gapi'
declare const gapi: any;
declare global {
    interface Window {
      fbAsyncInit: () => void;
    }
  }
export default function AuthPage() {
    // Initialize Google Sign-In
    useEffect(() => {
      gapi.load('auth2', function() {
        gapi.auth2.init({
          client_id: 'YOUR_GOOGLE_CLIENT_ID'
        });
      });
    }, []);
    // Initialize Facebook SDK
    return (
      <div>
        <h1 className="text-2xl mb-4">Login or Sign Up</h1>
        <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-700" onClick={handleGoogleLogin} >Sign in with Google</button>
        <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-700" onClick={handleFacebookLogin}>Sign in with Facebook</button>
      </div>
    );
  }
  