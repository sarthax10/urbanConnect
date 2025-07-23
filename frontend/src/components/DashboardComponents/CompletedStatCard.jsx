// src/components/DashboardComponents/StatsOverview/CompletedStatCard.jsx
import React, { useEffect, useState } from 'react';
import { Card, Statistic, Spin, message } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useUser } from '@clerk/clerk-react';
import { getBookingsByUser } from '../../api/booking';

const statusEnumMap = {
  0: 'BOOKED',
  1: 'COMPLETED',
  2: 'CANCELED',
  3: 'RESCHEDULED',
};

const CompletedStatCard = () => {
  const { user } = useUser();
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCompletedCount = async () => {
    setLoading(true);
    try {
      const email = user?.primaryEmailAddress?.emailAddress;
      if (!email) return;

      const userRes = await fetch(
        `${import.meta.env.VITE_API_URL}/users/email/${encodeURIComponent(email)}`
      );
      const userData = await userRes.json();
      const userId = userData?.userId;

      if (!userId) throw new Error('User not found');

      const bookings = await getBookingsByUser(userId);

      const completed = bookings.filter((b) => {
        const status =
          typeof b.status === 'number' ? statusEnumMap[b.status] : b.status;
        return status === 'COMPLETED';
      });

      setCount(completed.length);
    } catch (e) {
      console.error('Error fetching completed bookings:', e);
      message.error('Error loading completed booking count.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCompletedCount();
    }
  }, [user]);

  return (
    <Card bordered={false}>
      {loading ? (
        <div className="text-center py-4">
          <Spin size="small" />
        </div>
      ) : (
        <Statistic
          title="Completed Bookings"
          value={count}
          prefix={<CheckCircleOutlined />}
          valueStyle={{ color: '#000' }}
        />
      )}
    </Card>
  );
};

export default CompletedStatCard;
