// frontend/src/services/api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const productApi = {
  // جلب المنتجات مع Pagination
  getProducts: async (page = 1, limit = 20, filters = {}) => {
    const params = { page, limit, ...filters };
    const response = await api.get("/products", { params });
    return response.data;
  },

  // البحث عن منتجات
  searchProducts: async (query, filters = {}) => {
    const params = { query, ...filters };
    const response = await api.get("/products/search", { params });
    return response.data;
  },

  // جلب منتج بواسطة ID
  getProductById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // جلب الإحصائيات
  getStats: async () => {
    const response = await api.get("/products/stats");
    return response.data;
  },

  // جلب الفلاتر المتاحة
  getFilters: async () => {
    const response = await api.get("/products/filters");
    return response.data;
  },

  // جلب المنتجات المميزة
  getFeaturedProducts: async () => {
    const response = await api.get("/products/featured");
    return response.data;
  },
};

export default api;
