// src/components/DashboardComponents/StatsOverview/UpcomingStatCard.jsx
import React, { useEffect, useState } from 'react';
import { Card, Statistic, Spin, message } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { getBookingsByUser } from "../../api/booking";
import { useUser } from '@clerk/clerk-react';

const statusEnumMap = {
  0: 'BOOKED',
  1: 'COMPLETED',
  2: 'CANCELED',
  3: 'RESCHEDULED',
};

const UpcomingStatCard = () => {
  const { user } = useUser();
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchUpcomingCount = async () => {
    setLoading(true);
    try {
      const email = user?.primaryEmailAddress?.emailAddress;
      if (!email) return;

      // Fetch userId from backend
      const userRes = await fetch(`${import.meta.env.VITE_API_URL}/users/email/${encodeURIComponent(email)}`);
      const userData = await userRes.json();
      const userId = userData?.userId;

      if (!userId) throw new Error('User not found in backend');

      const bookings = await getBookingsByUser(userId);

      const now = new Date();

      const upcoming = bookings.filter((b) => {
        const startTime = new Date(b.scheduledStart);
        const status = typeof b.status === 'number' ? statusEnumMap[b.status] : b.status;
        return (
          startTime > now &&
          ['BOOKED', 'RESCHEDULED'].includes(status)
        );
      });

      setCount(upcoming.length);
    } catch (err) {
      console.error('Error fetching upcoming bookings:', err);
      message.error('Failed to load upcoming booking count.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchUpcomingCount();
  }, [user]);

  return (
    <Card bordered={false}>
      {loading ? (
        <div className="text-center py-4">
          <Spin size="small" />
        </div>
      ) : (
        <Statistic
          title="Upcoming Bookings"
          value={count}
          prefix={<ClockCircleOutlined />}
          valueStyle={{ color: '#000' }}
        />
      )}
    </Card>
  );
};

export default UpcomingStatCard;
