import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL; 

export const registerUser = async (userData) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/users/register`, userData);
    return res.data;
  } catch (err) {
    if (err.response?.status === 409) {
      console.log("User already exists");
    } else {
      console.error("Registration error:", err);
    }
  }
};

export const getUserByEmail = async (email) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/users/email/${email}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching user by email:", err);
    return null;
  }
};
