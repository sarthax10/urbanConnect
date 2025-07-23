import React, { useEffect, useState } from 'react';
import {
  Card,
  Tag,
  Typography,
  Spin,
  Empty,
  message,
  Rate,
  Modal,
  Button,
  Input,
} from 'antd';
import { getBookingsByUser } from '../api/booking';
import { getAllServices } from '../api/service';
import { getAllProfessionals } from '../api/professional';
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;
const API_BASE_URL = import.meta.env.VITE_API_URL;

const statusColor = {
  BOOKED: 'blue',
  COMPLETED: 'green',
  CANCELED: 'red',
  RESCHEDULED: 'orange',
};

const statusEnumMap = {
  0: 'BOOKED',
  1: 'COMPLETED',
  2: 'CANCELED',
  3: 'RESCHEDULED',
};

const formatIST = (date) =>
  new Date(date).toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

const UserPastBookings = () => {
  const { user } = useUser();

  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [reviewsByBooking, setReviewsByBooking] = useState({});
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBookingId, setCurrentBookingId] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchPastBookings = async () => {
    setLoading(true);

    try {
      const email = user?.primaryEmailAddress?.emailAddress;
      const userRes = await axios.get(`${API_BASE_URL}/users/email/${encodeURIComponent(email)}`);
      const userData = userRes.data;
      const userId = userData?.userId;

      if (!userId) throw new Error('User not found in backend');

      const [allBookings, allServices, allProfessionals] = await Promise.all([
        getBookingsByUser(userId),
        getAllServices(),
        getAllProfessionals(),
      ]);
      console.log("📦 Total bookings from API:", allBookings.length);
      


      setServices(allServices);
      setProfessionals(allProfessionals);

      const now = new Date();

      const normalized = allBookings.map(b => ({
        ...b,
        status: typeof b.status === 'number' ? statusEnumMap[b.status] : b.status
      }));

      const filtered = normalized.filter(b => {
        const endTime = new Date(b.scheduledEnd);
        const isInPast = endTime.getTime() < now.getTime();
        const isCompletedOrCanceled = ['COMPLETED', 'CANCELED'].includes(b.status);
        return isInPast && isCompletedOrCanceled;
      });

      setBookings(filtered);

      // Fetch reviews in parallel
      const reviewPromises = filtered.map((b) =>
        axios
          .get(`${API_BASE_URL}/reviews/booking/${b.bookingId}`)
          .then((res) => ({ bookingId: b.bookingId, review: res.data }))
          .catch(() => null)
      );

      const reviewResults = await Promise.all(reviewPromises);

      const reviewMap = {};
      reviewResults.forEach((r) => {
        if (r && r.bookingId) {
          reviewMap[r.bookingId] = r.review;
        }
      });

      setReviewsByBooking(reviewMap);
    } catch (err) {
      console.error('Failed to fetch past bookings:', err);
      message.error('Could not load past bookings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchPastBookings();
    }
  }, [user]);

  const getServiceName = (id) => {
    return services.find((s) => s.serviceId === id)?.name || `Service ID: ${id}`;
  };

  const getProfessionalName = (id) => {
    return professionals.find((p) => p.professionalId === id)?.name || `Professional ID: ${id}`;
  };

  const openReviewModal = (bookingId) => {
    setCurrentBookingId(bookingId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setRating(0);
    setComment('');
  };

  const submitReview = async () => {
    if (rating < 1) {
      message.error('Please select a star rating.');
      return;
    }

    try {
      setSubmitting(true);
      const email = user?.primaryEmailAddress?.emailAddress;

      await axios.post(`${API_BASE_URL}/reviews`, {
        bookingId: currentBookingId,
        rating,
        comment,
        email,
      });

      message.success('✅ Review submitted!');
      closeModal();
      await fetchPastBookings();
    } catch (err) {
      console.error('Review submit error:', err);
      message.error('Error submitting review.');
    } finally {
      setSubmitting(false);
    }
  };

return (
  <div className="max-w-6xl mx-auto px-6 py-12 bg-white">
    <Title level={3} className="!mb-8">🕓 Your Past Bookings</Title>

    {loading ? (
      <div className="text-center py-12">
        <Spin size="large" tip="Loading bookings..." />
      </div>
    ) : bookings.length === 0 ? (
      <Empty
        description="No past bookings found. 🎉"
        style={{ marginTop: 48 }}
      />
    ) : (
      <div className="space-y-6">
        {bookings.map((booking) => {
          const review = reviewsByBooking[booking.bookingId];
          const isCompleted = booking.status === 'COMPLETED';

          return (
            <Card
              key={booking.bookingId}
              title={
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <span className="text-lg font-semibold">
                    Booking #{booking.bookingId}
                  </span>
                  <Tag color={statusColor[booking.status] || 'default'}>
                    {booking.status}
                  </Tag>
                </div>
              }
              className="shadow-sm border border-gray-200"
              bordered
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[15px] text-gray-700">
                <p>
                  <strong>Service:</strong> {getServiceName(booking.serviceId)}
                </p>
                <p>
                  <strong>Professional:</strong>{' '}
                  {getProfessionalName(booking.professionalId)}
                </p>
                <p>
                  <strong>Start:</strong> {formatIST(booking.scheduledStart)}
                </p>
                <p>
                  <strong>End:</strong> {formatIST(booking.scheduledEnd)}
                </p>
              </div>

              {/* Review Section */}
              {isCompleted && (
                <div className="mt-5">
                  {review ? (
                    <div>
                      <p className="font-medium mb-1">Your Review</p>
                      <Rate disabled value={review.rating} />
                      {review.comment && (
                        <p className="mt-2 text-gray-600 border-l-4 pl-3 italic text-sm border-gray-300">
                          “{review.comment}”
                        </p>
                      )}
                    </div>
                  ) : (
                    <Button
                      type="primary"
                      className="mt-3"
                      onClick={() => openReviewModal(booking.bookingId)}
                    >
                      Leave a Review
                    </Button>
                  )}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    )}

    {/* REVIEW MODAL */}
    <Modal
      title="⭐ Leave a Review"
      open={isModalOpen}
      onOk={submitReview}
      okText="Submit"
      onCancel={closeModal}
      confirmLoading={submitting}
      destroyOnClose
      okButtonProps={{ type: 'primary' }}
    >
      <div className="space-y-4">
        <div>
          <p className="font-medium mb-1">Rating</p>
          <Rate value={rating} onChange={setRating} />
        </div>

        <div>
          <p className="font-medium mb-1">Comments</p>
          <TextArea
            rows={4}
            placeholder="Write your feedback..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            maxLength={300}
            showCount
          />
        </div>
      </div>
    </Modal>
  </div>
);
};

export default UserPastBookings;
