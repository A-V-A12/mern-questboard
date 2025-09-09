import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5001/api"
    : `${import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "")}/api`;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, 
});

export default api;
