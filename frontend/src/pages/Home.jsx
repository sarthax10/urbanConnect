import { SignOutButton } from "@clerk/clerk-react";
import SignupSync from "../components/SignupSync";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center">
      <div className="w-full max-w-2xl p-8 border border-black rounded-lg shadow-lg text-center">
        <SignupSync />
        <h1 className="text-3xl font-bold mb-6">Welcome to UrbanConnect</h1>

        <SignOutButton>
          <button
            className="px-6 py-2 border border-black bg-black text-white rounded hover:bg-white hover:text-black transition-colors duration-300"
            onClick={() => window.location.href = '/'}
          >
            Sign Out
          </button>
        </SignOutButton>
      </div>
    </div>
  );
}
