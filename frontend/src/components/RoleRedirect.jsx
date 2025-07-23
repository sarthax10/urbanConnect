import { useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserByEmail } from '../api/user'; // API that fetches user from your DB

export default function RoleRedirect() {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoaded || !user) return;

    const fetchRoleAndRedirect = async () => {
      const email = user.primaryEmailAddress.emailAddress;
      const userData = await getUserByEmail(email);

      if (userData?.role === 'admin') {
        navigate('/admindashboard');
      } else {
        navigate('/home');
      }
    };

    fetchRoleAndRedirect();
  }, [isLoaded, user, navigate]);

  return null;
}
