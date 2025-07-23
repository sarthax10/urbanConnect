import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_URL;

export const getAllProfessionals = async () => {
  const res = await axios.get(`${API_BASE_URL}/professionals`);
  return res.data;
};

export const createProfessional = async (data) => {
  const res = await axios.post(`${API_BASE_URL}/professionals`, data);
  return res.data;
};

export const getTopBookedProfessionals = async () => {
  const res = await axios.get(`${API_BASE_URL}/professionals/top-booked`);
  return res.data;
};