// components/RequireAuth.jsx
import { useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';

export default function RequireAuth({ children }) {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return null; // or a loading spinner

  return isSignedIn ? children : <Navigate to="/" replace />;
}
