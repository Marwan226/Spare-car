// API configuration and helper functions for backend integration
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Generic API call function
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || "An error occurred",
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Network error",
    };
  }
}

// Product API functions
export const productApi = {
  getAll: () => apiCall("/products", { method: "GET" }),
  getById: (id: string) => apiCall(`/products/${id}`, { method: "GET" }),
  create: (product: any) =>
    apiCall("/products", {
      method: "POST",
      body: JSON.stringify(product),
    }),
  update: (id: string, product: any) =>
    apiCall(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(product),
    }),
  delete: (id: string) => apiCall(`/products/${id}`, { method: "DELETE" }),
};

// Order API functions
export const orderApi = {
  getAll: () => apiCall("/orders", { method: "GET" }),
  getById: (id: string) => apiCall(`/orders/${id}`, { method: "GET" }),
  updateStatus: (id: string, status: string) =>
    apiCall(`/orders/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),
};

// Analytics API functions
export const analyticsApi = {
  getDashboardStats: () => apiCall("/analytics/dashboard", { method: "GET" }),
  getSalesData: (period: string) =>
    apiCall(`/analytics/sales?period=${period}`, { method: "GET" }),
  getTopProducts: () => apiCall("/analytics/top-products", { method: "GET" }),
};

// Customer API functions
export const customerApi = {
  getAll: () => apiCall("/customers", { method: "GET" }),
  getById: (id: string) => apiCall(`/customers/${id}`, { method: "GET" }),
};

export default {
  productApi,
  orderApi,
  analyticsApi,
  customerApi,
};
