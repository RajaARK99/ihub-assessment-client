import axios from "axios";
import { jwtDecode } from "jwt-decode";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const updateAuthHeader = (config: any) => {
  const token = localStorage.getItem("token");

  if (token) {
    const decodedToken = jwtDecode(token);

    if (
      decodedToken &&
      decodedToken?.exp &&
      decodedToken?.exp > Date.now() / 1000
    ) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } else {
    delete config.headers.Authorization;
  }

  return config;
};

axiosInstance.interceptors.request.use(updateAuthHeader);

export { axiosInstance };
