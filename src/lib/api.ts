import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const auth = {
  login: (username: string, password: string) =>
    api.post('/auth/login', { username, password }),
  register: (username: string, password: string) =>
    api.post('/auth/register', { username, password }),
};

// Menu API
export const menu = {
  getAll: () => api.get('/menu'),
  create: (data: Omit<MenuItem, 'id'>) => api.post('/menu', data),
  update: (id: string, data: Partial<MenuItem>) => api.put(`/menu/${id}`, data),
  delete: (id: string) => api.delete(`/menu/${id}`),
};

// Orders API
export const orders = {
  getAll: () => api.get('/orders'),
  create: (data: { items: CartItem[], totalAmount: number }) =>
    api.post('/orders', data),
  updateStatus: (id: string, status: Order['status']) =>
    api.patch(`/orders/${id}/status`, { status }),
};