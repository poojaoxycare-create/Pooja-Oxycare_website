import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";
const api = axios.create({
  baseURL: apiBaseUrl,
});

// Product API calls
export const createProduct = async (formData, token) => {
  return api.post("/products", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getAllProducts = async () => {
  return api.get("/products");
};

export const getProductById = async (id) => {
  return api.get(`/products/${id}`);
};

export const updateProduct = async (id, formData, token) => {
  return api.put(`/products/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteProduct = async (id, token) => {
  return api.delete(`/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Order API calls
export const getRentedOrders = async (token) => {
  return api.get("/orders/rented", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default api;
