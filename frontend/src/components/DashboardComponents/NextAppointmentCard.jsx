// src/components/DashboardComponents/StatsOverview/NextAppointmentCard.jsx
import React, { useEffect, useState } from 'react';
import { Card, Statistic, Spin, message } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { useUser } from '@clerk/clerk-react';
import { getBookingsByUser } from '../../api/booking';

const statusEnumMap = {
  0: 'BOOKED',
  1: 'COMPLETED',
  2: 'CANCELED',
  3: 'RESCHEDULED',
};

// Format date in Indian Standard Time
const formatIST = (date) =>
  new Date(date).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });

const NextAppointmentCard = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [nextAppointment, setNextAppointment] = useState(null);


  const fetchNextAppointment = async () => {
    setLoading(true);
    try {
      const email = user?.primaryEmailAddress?.emailAddress;

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/email/${encodeURIComponent(email)}`
      );
      const userData = await response.json();
      const userId = userData?.userId;
      if (!userId) throw new Error('User not found');

      const bookings = await getBookingsByUser(userId);
      const now = new Date();

      const valid = bookings
        .map((b) => ({
          ...b,
          status: typeof b.status === 'number' ? statusEnumMap[b.status] : b.status,
        }))
        .filter((b) => {
          const start = new Date(b.scheduledStart);
          return (
            start > now && ['BOOKED', 'RESCHEDULED'].includes(b.status)
          );
        })
        .sort((a, b) => new Date(a.scheduledStart) - new Date(b.scheduledStart));

      const next = valid[0];

      setNextAppointment(
        next ? formatIST(next.scheduledStart) : 'No upcoming appointments'
      );
    } catch (err) {
      console.error('Failed to fetch next appointment:', err);
      message.error('Error loading next appointment');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchNextAppointment();
  }, [user]);

  return (
    <Card bordered={false}>
      {loading ? (
        <div className="text-center py-4">
          <Spin size="small" />
        </div>
      ) : (
        <Statistic
          title="Next Appointment"
          prefix={<CalendarOutlined />}
          value={nextAppointment}
          valueStyle={{ color: '#000' }}
        />
      )}
    </Card>
  );
};

export default NextAppointmentCard;
