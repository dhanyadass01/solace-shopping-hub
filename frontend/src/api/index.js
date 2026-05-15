import API from './axios';

export const authAPI = {
  login: (data) => API.post('/auth/login', data),
  register: (data) => API.post('/auth/register', data),
  getMe: () => API.get('/auth/me'),
  updateProfile: (data) => API.put('/auth/profile', data),
};

export const productAPI = {
  getAll: (params) => API.get('/products', { params }),
  getById: (id) => API.get(`/products/${id}`),
  create: (data) => API.post('/products', data),
  update: (id, data) => API.put(`/products/${id}`, data),
  delete: (id) => API.delete(`/products/${id}`),
  uploadImage: (formData) => API.post('/products/upload', formData),
  createReview: (id, data) => API.post(`/products/${id}/reviews`, data),
  getCategories: () => API.get('/products/categories'),
};

export const cartAPI = {
  get: () => API.get('/cart'),
  add: (data) => API.post('/cart', data),
  update: (productId, data) => API.put(`/cart/${productId}`, data),
  remove: (productId) => API.delete(`/cart/${productId}`),
  clear: () => API.delete('/cart'),
  applyCoupon: (code) => API.post('/cart/coupon', { code }),
  removeCoupon: () => API.delete('/cart/coupon'),
};

export const orderAPI = {
  create: (data) => API.post('/orders', data),
  getMine: (params) => API.get('/orders/mine', { params }),
  getById: (id) => API.get(`/orders/${id}`),
  getAll: (params) => API.get('/orders', { params }),
  updateStatus: (id, data) => API.put(`/orders/${id}/status`, data),
  getStats: () => API.get('/orders/admin/stats'),
};

export const userAPI = {
  getAll: (params) => API.get('/users', { params }),
  getById: (id) => API.get(`/users/${id}`),
  toggleWishlist: (productId) => API.post('/users/wishlist', { productId }),
};
