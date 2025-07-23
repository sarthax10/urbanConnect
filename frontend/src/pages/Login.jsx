import { SignIn } from '@clerk/clerk-react';
import React from 'react';

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black">
      <div className="w-full max-w-md p-6 rounded-lg shadow-lg border border-black bg-white">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-sm text-gray-600">Sign in to UrbanConnect</p>
        </div>
        <SignIn redirectUrl="/redirect" />
      </div>
    </div>
  );
}
