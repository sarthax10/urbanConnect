import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_URL;

export const createService = async (service) => {
  const res = await axios.post(`${API_BASE_URL}/services`, service);
  return res.data;
};

export const getAllServices = async () => {
  const res = await axios.get(`${API_BASE_URL}/services`);
  return res.data;
};
export const getAllCategories = async () => {
  const res = await axios.get(`${API_BASE_URL}/services/categories`);
  return res.data;
};

// Get services by a specific category
export const getServicesByCategory = async (category) => {
  const res = await axios.get(`${API_BASE_URL}/services/category/${category}`);
  return res.data;
};

export const getServiceDurationById = async (serviceId) => {
  const res = await axios.get(`${API_BASE_URL}/services/${serviceId}`);
  return res.data.durationMinutes; // Make sure your service model exposes this
};
