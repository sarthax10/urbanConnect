import { useUser } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { registerUser } from '../api/user';

export default function SignupSync() {
  const { isSignedIn, user, isLoaded } = useUser();
  const [synced, setSynced] = useState(false);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || synced) return;

    const email = user?.primaryEmailAddress?.emailAddress;
    const name = user?.fullName;

    if (email && name) {
      registerUser({
        name,
        email,
        role: 'customer', // default role
        createdAt: new Date().toISOString()
      })
        .then(() => {
          setSynced(true);
          console.log("User synced to DB");
        })
        .catch((err) => {
          console.error("Failed to sync user:", err);
        });
    }
  }, [isLoaded, isSignedIn, user, synced]);

  return null;
}
