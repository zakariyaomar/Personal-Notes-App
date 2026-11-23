import axios from "axios";
import { getToken } from "./token";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Attach the stored JWT (if any) to every outgoing request.
apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Flattens the backend's error shape ({ error } or { error, details }) into
// a single user-friendly message string.
export function getErrorMessage(err) {
  const data = err?.response?.data;
  if (!data) return err?.message || "Something went wrong";
  if (Array.isArray(data.details) && data.details.length > 0) {
    return data.details.map((d) => d.message).join(", ");
  }
  return data.error || "Something went wrong";
}

export default apiClient;
