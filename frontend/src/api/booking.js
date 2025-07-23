import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

// 1. Get all service categories
export const getServiceCategories = async () => {
  const res = await axios.get(`${API_BASE_URL}/services/categories`);
  return res.data;
};

// 2. Get services by category
export const getServicesByCategory = async (category) => {
  const res = await axios.get(`${API_BASE_URL}/services/category/${category}`);
  return res.data;
};

// 3. Get available time slots for a service and date
export const getAvailableSlots = async (serviceId, date) => {
  const res = await axios.get(`${API_BASE_URL}/bookings/available-slots`, {
  params: { serviceId, date }
});
  return res.data;
};

// 4. Create a new booking
export const createBooking = async (bookingData) => {
  const res = await axios.post(`${API_BASE_URL}/bookings`, bookingData);
  return res.data;
};

// 5. Get bookings for a user
export const getBookingsByUser = async (userId) => {
  const res = await axios.get(`${API_BASE_URL}/bookings/user/${userId}`);
  return res.data;
};

// 6. Get upcoming bookings (BOOKED + RESCHEDULED) for a user
export const getUpcomingBookingsForUser = async (userId) => {
  const res = await axios.get(`${API_BASE_URL}/bookings/upcoming/${userId}`);
  return res.data;
};


export const getAllBookings = async () => {
 const res = await axios.get(`${API_BASE_URL}/bookings`); // adjust route to match backend
  return res.data;
};

export const updateBookingStatus = async (bookingId, status) => {
  return axios.put(`${API_BASE_URL}/bookings/${bookingId}/status`, { status });
};

