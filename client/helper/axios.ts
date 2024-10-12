import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:5500/api"
      : "http://localhost:5500/api",
});

export default api;
