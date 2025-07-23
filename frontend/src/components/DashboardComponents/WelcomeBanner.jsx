import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';
import {
  CalendarOutlined,
  PlusOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const { Title, Text } = Typography;

const WelcomeBanner = ({ name }) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const email = user?.primaryEmailAddress?.emailAddress;
        if (!email) return;

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/users/email/${encodeURIComponent(email)}`
        );
        const dbUser = await response.json();

        if (dbUser?.role === 'admin') {
          setIsAdmin(true);
        }
      } catch (err) {
        console.error('Failed to fetch user role:', err);
      }
    };

    if (user) {
      fetchUserRole();
    }
  }, [user]);

  return (
    <div className="mb-6 bg-white p-6 rounded-lg shadow-sm">
      <Title level={3}>Welcome, {name}!</Title>
      <Text type="secondary">Here's what's happening in your service hub.</Text>

      <div className="mt-4 flex flex-wrap gap-4">
        {/* Primary-style button */}
        <button
          onClick={() => navigate('/bookingpage')}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md border border-black transition duration-200 hover:bg-white hover:text-black"
        >
          <PlusOutlined />
          Book a Service
        </button>

        <button
          onClick={() => navigate('/my/past-bookings')}
          className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md border border-black transition duration-200 hover:bg-black hover:text-white"
        >
          <CalendarOutlined />
          View My Bookings
        </button>

        {isAdmin && (
          <button
            onClick={() => navigate('/admindashboard')}
            className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md border border-black transition duration-200 hover:bg-black hover:text-white"
          >
            <UserOutlined />
            Admin Dashboard
          </button>
        )}
      </div>
    </div>
  );
};

export default WelcomeBanner;
