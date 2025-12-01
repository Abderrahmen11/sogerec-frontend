import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

// Track if we've fetched CSRF token
let csrfTokenFetched = false;

// Function to get CSRF cookie
const getCsrfCookie = async () => {
  try {
    await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
      withCredentials: true
    });
    csrfTokenFetched = true;
  } catch (error) {
    console.error('Failed to fetch CSRF cookie:', error);
  }
};

// Add CSRF token from cookie to request headers
api.interceptors.request.use(async (config) => {
  // For state-changing methods, ensure we have a fresh CSRF token
  const stateChangingMethods = ['post', 'put', 'patch', 'delete'];
  if (stateChangingMethods.includes(config.method.toLowerCase()) && !csrfTokenFetched) {
    await getCsrfCookie();
  }

  // Get CSRF token from cookie
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("XSRF-TOKEN="))
    ?.split("=")[1];

  if (token) {
    config.headers["X-XSRF-TOKEN"] = decodeURIComponent(token);
  }

  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // If we get a 419 error, try to refresh CSRF token and retry once
    if (error.response?.status === 419 && !error.config._retry) {
      error.config._retry = true;
      csrfTokenFetched = false; // Reset flag to force refresh
      await getCsrfCookie();
      return api.request(error.config);
    }
    
    return Promise.reject(error);
  }
);

// Initialize CSRF token on app load
getCsrfCookie();

export default api;
