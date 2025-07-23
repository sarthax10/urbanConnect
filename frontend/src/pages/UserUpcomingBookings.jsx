import React, { useEffect, useState } from 'react';
import {
  Card,
  Tag,
  Typography,
  Spin,
  Empty,
  message,
  Button,
} from 'antd';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';

import { getBookingsByUser } from '../api/booking';
import { getAllServices, getServiceDurationById } from '../api/service';
import { getAllProfessionals } from '../api/professional';
import SlotGenerator from '../components/SlotGenerator';
import { splitSlotsByDuration } from '../utils/splitSlotsByDuration';


const { Title } = Typography;
const API_BASE_URL = import.meta.env.VITE_API_URL;

const formatAsLocalIso = (dateObj) => {
    const pad = (num) => num.toString().padStart(2, '0');
    return (
      dateObj.getFullYear() +
      '-' +
      pad(dateObj.getMonth() + 1) +
      '-' +
      pad(dateObj.getDate()) +
      'T' +
      pad(dateObj.getHours()) +
      ':' +
      pad(dateObj.getMinutes()) +
      ':' +
      pad(dateObj.getSeconds())
    );
  };


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

const UserUpcomingBookings = () => {
  const { user } = useUser();

  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const [activeRescheduleId, setActiveRescheduleId] = useState(null);
  const [serviceDurationMinutes, setServiceDurationMinutes] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [rescheduleServiceId, setRescheduleServiceId] = useState(null);
  const [rescheduleProfessionalId, setRescheduleProfessionalId] = useState(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const email = user?.primaryEmailAddress?.emailAddress;
      const res = await axios.get(`${API_BASE_URL}/users/email/${encodeURIComponent(email)}`);
      const userId = res.data?.userId;

      const [allBookings, allServices, allProfessionals] = await Promise.all([
        getBookingsByUser(userId),
        getAllServices(),
        getAllProfessionals(),
      ]);

      setServices(allServices);
      setProfessionals(allProfessionals);

      const now = new Date();
      const normalized = allBookings.map((b) => ({
        ...b,
        status: typeof b.status === 'number' ? statusEnumMap[b.status] : b.status,
      }));

      const filtered = normalized.filter((b) => {
        const start = new Date(b.scheduledStart);
        return start > now && ['BOOKED', 'RESCHEDULED'].includes(b.status);
      });

      setBookings(filtered);
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
      message.error('Could not load upcoming bookings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchBookings();
  }, [user]);

  const getServiceName = (id) =>
    services.find((s) => s.serviceId === id)?.name || `Service ID: ${id}`;

  const getProfessionalName = (id) =>
    professionals.find((p) => p.professionalId === id)?.name || `Professional ID: ${id}`;

  const handleCancelBooking = async (bookingId) => {
    try {
      await axios.put(`${API_BASE_URL}/bookings/${bookingId}/status`, {
        status: 'CANCELED',
      });
      message.success('Booking canceled.');
      await fetchBookings();
    } catch (err) {
      console.error(err);
      message.error('Failed to cancel booking.');
    }
  };

  const startReschedule = async (booking) => {
    setActiveRescheduleId(booking.bookingId);
    setSelectedDate('');
    setSelectedSlot(null);
    setSlots([]);

    try {
      const duration = await getServiceDurationById(booking.serviceId);
      console.log(`🧠 Service Duration for ID ${booking.serviceId}:`, duration);
      setServiceDurationMinutes(duration);
      setRescheduleServiceId(booking.serviceId);
      setRescheduleProfessionalId(booking.professionalId);
    } catch (error) {
      console.error('Failed to load service duration:', error);
      message.error('Failed to load service duration');
    }
  };

  useEffect(() => {
    const fetchSlots = async () => {
      console.log('🔎 Slot Fetch Triggered. Variables:', {
        serviceDurationMinutes,
        rescheduleServiceId,
        rescheduleProfessionalId,
        selectedDate,
      });

      if (
        !rescheduleServiceId ||
        !rescheduleProfessionalId ||
        !serviceDurationMinutes ||
        !selectedDate
      ) {
        console.warn('⚠️ fetchSlots skipped: Missing data');
        return;
      }

      try {
        setLoadingSlots(true);

        const res = await axios.get(`${API_BASE_URL}/bookings/available-slots`, {
          params: { serviceId: rescheduleServiceId, date: selectedDate },
        });

        console.log('📥 Raw API response:', res.data);

        const generated = splitSlotsByDuration(res.data, serviceDurationMinutes);
        console.log('📤 Generated slots after splitting:', generated);

        setSlots(generated);
      } catch (err) {
        console.error('⛔ Slot fetch failed:', err);
        message.error('No slots available or server error');
        setSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    };

    if (selectedDate && serviceDurationMinutes) {
      fetchSlots();
    }
  }, [selectedDate, serviceDurationMinutes, rescheduleServiceId]);

  const handleSubmitReschedule = async (bookingId) => {
    if (!selectedSlot) {
      message.warning('Please select a slot');
      return;
    }

    try {
      await axios.put(`${API_BASE_URL}/bookings/${bookingId}/reschedule`, {
        scheduledStart: formatAsLocalIso(new Date(selectedSlot.startTime)),
  scheduledEnd: formatAsLocalIso(new Date(selectedSlot.endTime)),
      });

      message.success('Booking rescheduled!');
      setActiveRescheduleId(null);
      setSelectedSlot(null);
      setSelectedDate('');
      setSlots([]);
      await fetchBookings();
    } catch (err) {
      console.error(err);
      message.error('Failed to reschedule');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 bg-white">
  <Title level={3} className="mb-8">📅 Your Upcoming Bookings</Title>

  {loading ? (
    <div className="text-center py-10">
      <Spin size="large" tip="Loading..." />
    </div>
  ) : bookings.length === 0 ? (
    <Empty description="No upcoming bookings" />
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {bookings.map((booking) => (
        <Card
          key={booking.bookingId}
          title={`Booking #${booking.bookingId}`}
          className="w-full max-w-[380px] shadow-xs border border-gray-200"
        >
          <p><strong>Service:</strong> {getServiceName(booking.serviceId)}</p>
          <p><strong>Professional:</strong> {getProfessionalName(booking.professionalId)}</p>
          <p><strong>Start:</strong> {formatIST(booking.scheduledStart)}</p>
          <p><strong>End:</strong> {formatIST(booking.scheduledEnd)}</p>

          <Tag color={statusColor[booking.status] || 'default'}>{booking.status}</Tag>

          <div className="mt-4 flex gap-2">
            <Button
              danger
              size="small"
              onClick={() => handleCancelBooking(booking.bookingId)}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              size="small"
              onClick={() => startReschedule(booking)}
            >
              Reschedule
            </Button>
          </div>

          {/* Reschedule Logic Section */}
          {activeRescheduleId === booking.bookingId && (
            <div className="bg-gray-50 border mt-4 p-4 rounded">
              <p className="font-medium mb-2">Reschedule this booking</p>

              <input
                type="date"
                value={selectedDate}
                className="mt-2 border px-3 py-2 rounded-md w-full"
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                }}
              />

              {loadingSlots && <p className="text-gray-500 mt-2">Loading slots...</p>}

              {selectedDate && (
                <>
                  <p className="mt-4 font-semibold">Available Time Slots:</p>

                  <div className="mt-4 space-y-6">
                    {professionals.length === 0 ? (
                      <p className="text-gray-500">No professionals found.</p>
                    ) : (
                      professionals.map((pro) => {
                        const proSlots = slots.filter(
                          (slot) => slot.professionalId === pro.professionalId
                        );

                        if (proSlots.length === 0) return null;

                        return (
                          <div key={pro.professionalId} className="border rounded p-4 shadow-sm">
                            <h4 className="text-md font-semibold text-gray-800 mb-1">
                              {pro.name}{' '}
                              <span className="text-sm text-gray-500">({pro.email})</span>
                            </h4>
                            <p className="text-sm italic text-gray-500 mb-2">
                              {pro.profileBio}
                            </p>
                            <p className="mb-3"><strong>Rating:</strong> {pro.rating ?? 'N/A'}</p>

                            <div className="flex flex-wrap gap-2">
                              {proSlots.map((slot, index) => (
                                <button
                                  key={index}
                                  type="button"
                                  onClick={() => setSelectedSlot(slot)}
                                  className={`px-4 py-2 rounded border text-sm transition ${
                                    selectedSlot?.startTime === slot.startTime &&
                                    selectedSlot?.professionalId === slot.professionalId
                                      ? 'bg-blue-600 text-white border-blue-600'
                                      : 'bg-white text-black border-gray-300 hover:border-blue-400'
                                  }`}
                                >
                                  {new Date(slot.startTime).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                  {' - '}
                                  {new Date(slot.endTime).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </button>
                              ))}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  <div className="mt-4 flex gap-3">
                    <Button
                      type="primary"
                      disabled={!selectedSlot}
                      onClick={() => handleSubmitReschedule(booking.bookingId)}
                    >
                      Confirm Reschedule
                    </Button>
                    <Button danger onClick={() => setActiveRescheduleId(null)}>
                      Cancel
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </Card>
      ))}
    </div>
  )}
</div>
  );
};

export default UserUpcomingBookings;