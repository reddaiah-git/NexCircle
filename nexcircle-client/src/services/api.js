import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Base URL for your backend API
});

export const forgotPassword = async (email) => {
  const response = await API.post('/users/forgot-password', { email });
  return response.data;
};

export const resetPassword = async (token, password) => {
  const response = await API.put(`/users/reset-password/${token}`, { password });
  return response.data;
};

export default API;
