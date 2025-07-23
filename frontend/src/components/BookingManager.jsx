import React, { useEffect, useState } from 'react';
import { Table, Tag, message, Typography, Select } from 'antd';
import { getAllBookings, updateBookingStatus } from '../api/booking';

const { Title } = Typography;
const { Option } = Select;

const BookingManager = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all bookings
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await getAllBookings();

      // If status is a number, convert it to a string enum name
      const STATUS_MAP = {
        0: 'BOOKED',
        1: 'COMPLETED',
        2: 'CANCELED',
        3: 'RESCHEDULED',
      };

      const cleaned = res.map((booking) => ({
        ...booking,
        status:
          typeof booking.status === 'number'
            ? STATUS_MAP[booking.status] || 'UNKNOWN'
            : booking.status,
      }));

      setBookings(cleaned);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
      message.error('Could not load bookings.');
    } finally {
      setLoading(false);
    }
  };

  // Handle status change from the Select dropdown
  const handleStatusChange = async (bookingId, newStatus) => {
  try {
    await updateBookingStatus(bookingId, newStatus);

    // Optimistically update UI
    setBookings((prev) =>
      prev.map((b) =>
        b.bookingId === bookingId ? { ...b, status: newStatus } : b
      )
    );

    message.success(`Booking marked as ${newStatus}`);
  } catch (err) {
    console.error('❌ Failed to update booking status:', err);
    message.error('Failed to update status.');
  }
};

  useEffect(() => {
    fetchBookings();
  }, []);

  const columns = [
    { title: 'Booking ID', dataIndex: 'bookingId' },
    { title: 'User ID', dataIndex: 'userId' },
    { title: 'Professional ID', dataIndex: 'professionalId' },
    { title: 'Service ID', dataIndex: 'serviceId' },
    {
      title: 'Scheduled Time',
      render: (_, record) => (
        <>
          <div><strong>Start:</strong> {formatIST(record.scheduledStart)}</div>
          <div><strong>End:</strong> {formatIST(record.scheduledEnd)}</div>
        </>
      ),
    },
    {
      title: 'Current Status',
      dataIndex: 'status',
      render: (status) => {
        const colorMap = {
          BOOKED: 'blue',
          COMPLETED: 'green',
          CANCELED: 'red',
          RESCHEDULED: 'orange',
        };
        return <Tag color={colorMap[status] || 'default'}>{status}</Tag>;
      },
    },
    {
      title: 'Update Status',
      key: 'action',
      render: (_, record) => (
        <Select
          value={record.status}
          style={{ width: 130 }}
          onChange={(newStatus) => handleStatusChange(record.bookingId, newStatus)}
        >
          <Option value="BOOKED">Booked</Option>
          <Option value="COMPLETED">Completed</Option>
          <Option value="CANCELED">Canceled</Option>
        </Select>
      ),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <Title level={3}>📋 All Bookings</Title>

      <Table
        columns={columns}
        dataSource={bookings}
        loading={loading}
        rowKey="bookingId"
        pagination={{ pageSize: 5 }}
        bordered
      />
    </div>
  );
};

// Format date to readable IST format
const formatIST = (date) =>
  new Date(date).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

export default BookingManager;
