import axios from 'axios';

const getBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;
    // If on localhost, 127.0.0.1, or local LAN IP (e.g. phone on same Wi-Fi)
    if (host === 'localhost' || host === '127.0.0.1' || host.startsWith('192.168.') || host.startsWith('10.') || host.startsWith('172.') || host === '50.0.0.101') {
      return `http://${host}:5001/api`;
    }
  }
  return '/api';
};

const api = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('tridrishti_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined' && (window.location.pathname.startsWith('/dashboard') || window.location.pathname.startsWith('/admin'))) {
        localStorage.removeItem('tridrishti_token');
        localStorage.removeItem('tridrishti_user');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
